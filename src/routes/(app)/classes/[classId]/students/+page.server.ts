import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkStudentLimit, FREE_TIER_LIMITS } from '$lib/utils/limits';

export const load: PageServerLoad = async ({ locals, params, parent }) => {
	const { teacher } = await parent();

	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name')
		.eq('id', params.classId)
		.single();

	if (!cls) redirect(303, '/dashboard');

	const { data: students } = await locals.supabase
		.from('students')
		.select('id, name, created_at')
		.eq('class_id', params.classId)
		.order('name');

	const isPro = teacher?.plan === 'pro';
	const count = students?.length ?? 0;
	const canAdd = isPro || count < FREE_TIER_LIMITS.studentsPerClass;

	return {
		cls,
		students: students ?? [],
		canAdd,
		count,
		limit: FREE_TIER_LIMITS.studentsPerClass,
		isPro
	};
};

export const actions: Actions = {
	add: async ({ request, locals, params }) => {
		const user = await locals.getUser();
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();

		if (!name) return fail(400, { error: 'Student name is required.' });

		// Verify class ownership
		const { data: cls } = await locals.supabase
			.from('classes')
			.select('id')
			.eq('id', params.classId)
			.eq('teacher_id', user!.id)
			.single();

		if (!cls) return fail(403, { error: 'Not found.' });

		// Re-check limit at action time
		const { data: teacher } = await locals.supabase
			.from('teachers')
			.select('plan')
			.eq('id', user!.id)
			.single();

		if (teacher?.plan !== 'pro') {
			const { allowed } = await checkStudentLimit(locals.supabase, params.classId);
			if (!allowed) return fail(402, { error: 'Upgrade to Pro for more than 15 students per class.' });
		}

		const { error } = await locals.supabase
			.from('students')
			.insert({ class_id: params.classId, name });

		if (error) return fail(500, { error: 'Failed to add student.' });
		return { success: true };
	},

	remove: async ({ request, locals }) => {
		const data = await request.formData();
		const studentId = String(data.get('studentId') ?? '');

		// Ownership enforced by RLS
		const { error } = await locals.supabase.from('students').delete().eq('id', studentId);

		if (error) return fail(500, { error: 'Failed to remove student.' });
		return { success: true };
	}
};
