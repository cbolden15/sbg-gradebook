import { error, text } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { createSupabaseServiceClient } from '$lib/supabase-server';
import type { RequestHandler } from './$types';

// Required for raw body access in Vercel
export const config = { runtime: 'nodejs' };

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const sig = request.headers.get('stripe-signature');

	if (!sig) error(400, 'Missing stripe-signature header');

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
	} catch {
		error(400, 'Invalid webhook signature');
	}

	// Use service client — no user session in webhook context (bypasses RLS intentionally)
	const supabase = createSupabaseServiceClient();

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;
		const teacherId = session.metadata?.teacher_id;
		if (!teacherId) return text('ok');

		const sub = await stripe.subscriptions.retrieve(session.subscription as string);

		const { error: dbError } = await supabase
			.from('teachers')
			.update({
				plan: 'pro',
				stripe_customer_id: session.customer as string,
				stripe_sub_id: sub.id,
				sub_status: sub.status,
				sub_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString()
			})
			.eq('id', teacherId);

		if (dbError) error(500, 'Failed to update subscription');
	}

	if (
		event.type === 'customer.subscription.updated' ||
		event.type === 'customer.subscription.deleted'
	) {
		const sub = event.data.object as Stripe.Subscription;
		const isActive = sub.status === 'active';

		const { error: dbError } = await supabase
			.from('teachers')
			.update({
				plan: isActive ? 'pro' : 'free',
				sub_status: sub.status,
				sub_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString()
			})
			.eq('stripe_sub_id', sub.id);

		if (dbError) error(500, 'Failed to update subscription');
	}

	return text('ok');
};
