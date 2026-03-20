import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getUser();

	const { data: classes } = await locals.supabase
		.from('classes')
		.select(
			`
      id, name, subject, grade_level, created_at,
      students(count),
      standards(count)
    `
		)
		.eq('teacher_id', user!.id)
		.order('created_at', { ascending: false });

	return { classes: classes ?? [] };
};
