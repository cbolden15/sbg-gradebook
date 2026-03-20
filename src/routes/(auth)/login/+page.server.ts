import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');
		const password = String(data.get('password') ?? '');

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) return fail(400, { error: 'Invalid email or password.' });

		// Validate redirect target to prevent open redirect (security finding S-02)
		const next = url.searchParams.get('next') ?? '/dashboard';
		const safeNext = next.startsWith('/') ? next : '/dashboard';
		redirect(303, safeNext);
	}
};
