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
	class="block p-5 bg-white rounded-xl border border-[#dde3ea] hover:border-[#4a7ab0] hover:shadow-sm transition-all cursor-pointer"
>
	<h3 class="font-semibold text-[#1a2332]">{cls.name}</h3>
	{#if cls.subject || cls.grade_level}
		<p class="text-sm text-[#4a6080] mt-0.5">{[cls.subject, cls.grade_level].filter(Boolean).join(' · ')}</p>
	{/if}
	<div class="mt-3 flex gap-4 text-xs text-[#8a9ab0] font-medium">
		<span>{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
		<span>{standardCount} standard{standardCount !== 1 ? 's' : ''}</span>
	</div>
</a>
