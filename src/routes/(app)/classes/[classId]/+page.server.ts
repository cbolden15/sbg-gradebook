import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name, subject, grade_level, mastery_config')
		.eq('id', params.classId)
		.single();

	if (!cls) redirect(303, '/dashboard');

	// Single RPC call returns all grid data (students, standards, latest scores)
	const { data: gridData, error } = await locals.supabase.rpc('get_mastery_grid', {
		p_class_id: params.classId
	});

	if (error) redirect(303, '/dashboard');

	return {
		cls,
		grid: (gridData as {
			students: Array<{ id: string; name: string; class_id: string; created_at: string }>;
			standards: Array<{
				id: string;
				name: string;
				description: string | null;
				sort_order: number;
				class_id: string;
				created_at: string;
			}>;
			scores: Record<string, number>;
		}) ?? { students: [], standards: [], scores: {} }
	};
};
