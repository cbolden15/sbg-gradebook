<script lang="ts">
	let {
		cls
	}: {
		cls: {
			id: string;
			name: string;
			subject: string | null;
			grade_level: string | null;
			students: { count: number }[];
			standards: { count: number }[];
		};
	} = $props();

	const studentCount = $derived(cls.students[0]?.count ?? 0);
	const standardCount = $derived(cls.standards[0]?.count ?? 0);
</script>

<a
	href="/classes/{cls.id}"
	class="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
>
	<h3 class="font-semibold text-gray-900">{cls.name}</h3>
	{#if cls.subject || cls.grade_level}
		<p class="text-sm text-gray-500 mt-0.5">{[cls.subject, cls.grade_level].filter(Boolean).join(' · ')}</p>
	{/if}
	<div class="mt-3 flex gap-4 text-sm text-gray-400">
		<span>{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
		<span>{standardCount} standard{standardCount !== 1 ? 's' : ''}</span>
	</div>
</a>
