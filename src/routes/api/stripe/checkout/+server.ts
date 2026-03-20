import { json, error } from '@sveltejs/kit';
import Stripe from 'stripe';
import {
	STRIPE_SECRET_KEY,
	STRIPE_PRICE_MONTHLY,
	STRIPE_PRICE_YEARLY
} from '$env/static/private';
import { PUBLIC_APP_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.getUser();
	if (!user) error(401, 'Unauthorized');

	const { period } = await request.json();
	if (period !== 'monthly' && period !== 'yearly') error(400, 'Invalid period');
	const priceId = period === 'monthly' ? STRIPE_PRICE_MONTHLY : STRIPE_PRICE_YEARLY;

	const { data: teacher } = await locals.supabase
		.from('teachers')
		.select('stripe_customer_id, email')
		.eq('id', user.id)
		.single();

	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		payment_method_types: ['card'],
		customer: teacher?.stripe_customer_id ?? undefined,
		customer_email: teacher?.stripe_customer_id ? undefined : user.email,
		line_items: [{ price: priceId, quantity: 1 }],
		success_url: `${PUBLIC_APP_URL}/account?upgrade=success`,
		cancel_url: `${PUBLIC_APP_URL}/account`,
		metadata: { teacher_id: user.id }
	});

	return json({ url: session.url });
};
