import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: student } = await locals.supabase
		.from('students')
		.select('id, name, class_id')
		.eq('id', params.studentId)
		.eq('class_id', params.classId)
		.single();

	if (!student) redirect(303, `/classes/${params.classId}`);

	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name')
		.eq('id', params.classId)
		.single();

	const { data: standards } = await locals.supabase
		.from('standards')
		.select('id, name')
		.eq('class_id', params.classId)
		.order('sort_order');

	// All scores for this student ordered by time
	const { data: scores } = await locals.supabase
		.from('scores')
		.select('standard_id, score, assessed_at')
		.eq('student_id', params.studentId)
		.order('assessed_at', { ascending: true });

	// Group scores by standard
	const scoresByStandard: Record<string, { score: number; assessed_at: string }[]> = {};
	for (const s of scores ?? []) {
		if (!scoresByStandard[s.standard_id]) scoresByStandard[s.standard_id] = [];
		scoresByStandard[s.standard_id].push({ score: s.score, assessed_at: s.assessed_at });
	}

	return {
		student,
		cls: cls ?? { id: params.classId, name: 'Class' },
		standards: standards ?? [],
		scoresByStandard
	};
};
