import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkStandardLimit, FREE_TIER_LIMITS } from '$lib/utils/limits';

export const load: PageServerLoad = async ({ locals, params, parent }) => {
	const { teacher } = await parent();

	const { data: cls } = await locals.supabase
		.from('classes')
		.select('id, name')
		.eq('id', params.classId)
		.single();

	if (!cls) redirect(303, '/dashboard');

	const { data: standards } = await locals.supabase
		.from('standards')
		.select('id, name, description, sort_order')
		.eq('class_id', params.classId)
		.order('sort_order');

	const isPro = teacher?.plan === 'pro';
	const count = standards?.length ?? 0;
	const canAdd = isPro || count < FREE_TIER_LIMITS.standardsPerClass;

	return {
		cls,
		standards: standards ?? [],
		canAdd,
		count,
		limit: FREE_TIER_LIMITS.standardsPerClass,
		isPro
	};
};

export const actions: Actions = {
	add: async ({ request, locals, params }) => {
		const user = await locals.getUser();
		const data = await request.formData();
		const name = String(data.get('name') ?? '')
			.trim()
			.slice(0, 200);
		const description =
			String(data.get('description') ?? '')
				.trim()
				.slice(0, 500) || null;

		if (!name) return fail(400, { error: 'Standard name is required.' });

		const { data: cls } = await locals.supabase
			.from('classes')
			.select('id')
			.eq('id', params.classId)
			.eq('teacher_id', user!.id)
			.single();

		if (!cls) return fail(403, { error: 'Not found.' });

		const { data: teacher } = await locals.supabase
			.from('teachers')
			.select('plan')
			.eq('id', user!.id)
			.single();

		if (teacher?.plan !== 'pro') {
			const { allowed } = await checkStandardLimit(locals.supabase, params.classId);
			if (!allowed)
				return fail(402, { error: 'Upgrade to Pro for more than 10 standards per class.' });
		}

		const { count } = await locals.supabase
			.from('standards')
			.select('*', { count: 'exact', head: true })
			.eq('class_id', params.classId);

		const { error } = await locals.supabase
			.from('standards')
			.insert({ class_id: params.classId, name, description, sort_order: (count ?? 0) + 1 });

		if (error) return fail(500, { error: 'Failed to add standard.' });
		return { success: true };
	},

	remove: async ({ request, locals }) => {
		const data = await request.formData();
		const standardId = String(data.get('standardId') ?? '');

		const { error } = await locals.supabase.from('standards').delete().eq('id', standardId);
		if (error) return fail(500, { error: 'Failed to remove standard.' });
		return { success: true };
	}
};
