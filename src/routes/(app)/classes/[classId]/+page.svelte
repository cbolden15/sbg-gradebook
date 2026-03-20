<script lang="ts">
	import type { PageData } from './$types';
	import MasteryGrid from '$lib/components/MasteryGrid.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-start justify-between mb-5">
	<div>
		<a href="/dashboard" class="text-xs font-medium uppercase tracking-wide text-[#8a9ab0] hover:text-[#4a6080] transition-colors">← Dashboard</a>
		<h1 class="text-lg font-bold text-[#1a2332] mt-1.5">{data.cls.name}</h1>
		{#if data.cls.subject || data.cls.grade_level}
			<p class="text-sm text-[#4a6080] mt-0.5">
				{[data.cls.subject, data.cls.grade_level].filter(Boolean).join(' · ')}
			</p>
		{/if}
	</div>
	<div class="flex gap-2 mt-1">
		<a
			href="/classes/{data.cls.id}/assess"
			class="px-3 py-2 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors"
		>
			Record Assessment
		</a>
		<a
			href="/classes/{data.cls.id}/export"
			class="px-3 py-2 bg-[#e8eef4] text-[#3a5070] text-sm font-medium rounded-lg hover:bg-[#d8e4f0] transition-colors"
		>
			Export Grades
		</a>
	</div>
</div>

<div class="flex gap-4 mb-5 text-xs font-medium uppercase tracking-wide text-[#8a9ab0]">
	<a href="/classes/{data.cls.id}/students" class="hover:text-[#1a3a5c] transition-colors">
		{data.grid.students.length} students
	</a>
	<a href="/classes/{data.cls.id}/standards" class="hover:text-[#1a3a5c] transition-colors">
		{data.grid.standards.length} standards
	</a>
</div>

<MasteryGrid
	students={data.grid.students}
	standards={data.grid.standards}
	scores={data.grid.scores ?? {}}
/>
