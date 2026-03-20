import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	return { message: url.searchParams.get('message') };
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');
		const password = String(data.get('password') ?? '');

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			const msg = error.message.toLowerCase().includes('email')
				? 'Please confirm your email address before signing in. Check your inbox.'
				: 'Invalid email or password.';
			return fail(400, { error: msg });
		}

		// Validate redirect target to prevent open redirect (security finding S-02)
		const next = url.searchParams.get('next') ?? '/dashboard';
		const safeNext = next.startsWith('/') ? next : '/dashboard';
		redirect(303, safeNext);
	}
};
