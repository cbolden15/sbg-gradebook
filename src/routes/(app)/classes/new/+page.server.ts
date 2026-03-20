import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkClassLimit, FREE_TIER_LIMITS } from '$lib/utils/limits';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { teacher } = await parent();
	const user = await locals.getUser();

	const { allowed, current } = await checkClassLimit(locals.supabase, user!.id);
	const isPro = teacher?.plan === 'pro';

	return { canCreate: isPro || allowed, current, limit: FREE_TIER_LIMITS.classes, isPro };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const user = await locals.getUser();
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const subject = String(data.get('subject') ?? '').trim() || null;
		const grade_level = String(data.get('grade_level') ?? '').trim() || null;

		if (!name) return fail(400, { error: 'Class name is required.' });

		// Re-check limit at action time to prevent TOCTOU race
		const { data: teacher } = await locals.supabase
			.from('teachers')
			.select('plan')
			.eq('id', user!.id)
			.single();

		if (teacher?.plan !== 'pro') {
			const { allowed } = await checkClassLimit(locals.supabase, user!.id);
			if (!allowed) return fail(402, { error: 'Upgrade to Pro to create more classes.' });
		}

		const { data: cls, error } = await locals.supabase
			.from('classes')
			.insert({ teacher_id: user!.id, name, subject, grade_level })
			.select()
			.single();

		if (error) return fail(500, { error: 'Failed to create class.' });

		redirect(303, `/classes/${cls.id}/students`);
	}
};
