import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name')
		.eq('id', params.classId)
		.single();

	if (!cls) redirect(303, '/dashboard');

	const [{ data: students }, { data: standards }] = await Promise.all([
		locals.supabase.from('students').select('id, name').eq('class_id', params.classId).order('name'),
		locals.supabase
			.from('standards')
			.select('id, name')
			.eq('class_id', params.classId)
			.order('sort_order')
	]);

	return { cls, students: students ?? [], standards: standards ?? [] };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const user = await locals.getUser();
		const formData = await request.formData();

		// Verify class ownership
		const { data: cls } = await locals.supabase
			.from('classes')
			.select('id')
			.eq('id', params.classId)
			.eq('teacher_id', user!.id)
			.single();

		if (!cls) return fail(403, { error: 'Not found.' });

		const entries: Array<{ student_id: string; standard_id: string; score: number }> = [];

		for (const [key, value] of formData.entries()) {
			if (!key.startsWith('score_')) continue;

			const parts = key.slice(6).split('_');
			if (parts.length !== 2) continue;

			const [studentId, standardId] = parts;
			if (!UUID_REGEX.test(studentId) || !UUID_REGEX.test(standardId)) continue;

			const score = parseInt(String(value), 10);
			if (isNaN(score) || score < 1 || score > 4) continue;

			entries.push({ student_id: studentId, standard_id: standardId, score });
		}

		if (entries.length === 0) return fail(400, { error: 'No scores entered.' });
		if (entries.length > 500) return fail(400, { error: 'Too many scores in one submission.' });

		const { error } = await locals.supabase.from('scores').insert(entries);
		if (error) return fail(500, { error: 'Failed to save scores.' });

		redirect(303, `/classes/${params.classId}`);
	}
};
