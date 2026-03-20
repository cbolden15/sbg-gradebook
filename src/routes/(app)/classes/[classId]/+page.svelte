<script lang="ts">
	import type { PageData } from './$types';
	import MasteryGrid from '$lib/components/MasteryGrid.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-between mb-4">
	<div>
		<a href="/dashboard" class="text-sm text-gray-400 hover:text-gray-600">← Dashboard</a>
		<h1 class="text-xl font-bold text-gray-900 mt-1">{data.cls.name}</h1>
		{#if data.cls.subject || data.cls.grade_level}
			<p class="text-sm text-gray-400">
				{[data.cls.subject, data.cls.grade_level].filter(Boolean).join(' · ')}
			</p>
		{/if}
	</div>
	<div class="flex gap-2">
		<a
			href="/classes/{data.cls.id}/assess"
			class="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
		>
			Record Assessment
		</a>
		<a
			href="/classes/{data.cls.id}/export"
			class="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
		>
			Export Grades
		</a>
	</div>
</div>

<div class="flex gap-4 mb-4 text-sm text-gray-500">
	<a href="/classes/{data.cls.id}/students" class="hover:text-blue-600">
		{data.grid.students.length} students
	</a>
	<a href="/classes/{data.cls.id}/standards" class="hover:text-blue-600">
		{data.grid.standards.length} standards
	</a>
</div>

<MasteryGrid
	students={data.grid.students}
	standards={data.grid.standards}
	scores={data.grid.scores ?? {}}
/>
