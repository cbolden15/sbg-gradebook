import type { SupabaseClient } from '@supabase/supabase-js';

export const FREE_TIER_LIMITS = {
	classes: 1,
	studentsPerClass: 15,
	standardsPerClass: 10
} as const;

export async function checkClassLimit(
	supabase: SupabaseClient,
	teacherId: string
): Promise<{ allowed: boolean; current: number }> {
	const { count } = await supabase
		.from('classes')
		.select('*', { count: 'exact', head: true })
		.eq('teacher_id', teacherId);

	return {
		allowed: (count ?? 0) < FREE_TIER_LIMITS.classes,
		current: count ?? 0
	};
}

export async function checkStudentLimit(
	supabase: SupabaseClient,
	classId: string
): Promise<{ allowed: boolean; current: number }> {
	const { count } = await supabase
		.from('students')
		.select('*', { count: 'exact', head: true })
		.eq('class_id', classId);

	return {
		allowed: (count ?? 0) < FREE_TIER_LIMITS.studentsPerClass,
		current: count ?? 0
	};
}

export async function checkStandardLimit(
	supabase: SupabaseClient,
	classId: string
): Promise<{ allowed: boolean; current: number }> {
	const { count } = await supabase
		.from('standards')
		.select('*', { count: 'exact', head: true })
		.eq('class_id', classId);

	return {
		allowed: (count ?? 0) < FREE_TIER_LIMITS.standardsPerClass,
		current: count ?? 0
	};
}
