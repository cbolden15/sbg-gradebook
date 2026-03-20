import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');
		const password = String(data.get('password') ?? '');
		const full_name = String(data.get('full_name') ?? '');

		if (password.length < 8) return fail(400, { error: 'Password must be at least 8 characters.' });

		const { error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: { data: { full_name } }
		});

		if (error) return fail(400, { error: error.message });

		// If email confirmation is required, send to login with a message
		redirect(303, '/login?message=confirm-email');
	}
};
