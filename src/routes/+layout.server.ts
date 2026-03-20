import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user) return { user: null, teacher: null };

	const { data: teacher } = await locals.supabase
		.from('teachers')
		.select('*')
		.eq('id', user.id)
		.single();

	return { user, teacher };
};
