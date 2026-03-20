import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Json } from '$lib/database.types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name, mastery_config')
		.eq('id', params.classId)
		.single();

	if (!cls) redirect(303, '/dashboard');

	const { data: gridData } = await locals.supabase.rpc('get_mastery_grid', {
		p_class_id: params.classId
	});

	const grid = (gridData as unknown as {
		students: Array<{ id: string; name: string; class_id: string; created_at: string }>;
		standards: Array<{ id: string; name: string; description: string | null; sort_order: number }>;
		scores: Record<string, number>;
	}) ?? { students: [], standards: [], scores: {} };

	return { cls, grid };
};
