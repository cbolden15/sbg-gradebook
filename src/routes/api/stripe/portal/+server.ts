import { json, error } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_APP_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user) error(401, 'Unauthorized');

	const { data: teacher } = await locals.supabase
		.from('teachers')
		.select('stripe_customer_id')
		.eq('id', user.id)
		.single();

	if (!teacher?.stripe_customer_id) error(400, 'No Stripe customer found');

	const session = await stripe.billingPortal.sessions.create({
		customer: teacher.stripe_customer_id,
		return_url: `${PUBLIC_APP_URL}/account`
	});

	return json({ url: session.url });
};
