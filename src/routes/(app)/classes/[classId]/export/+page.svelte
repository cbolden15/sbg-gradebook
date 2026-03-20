<script lang="ts">
	import type { PageData } from './$types';
	import GradeTable from '$lib/components/GradeTable.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-sm text-gray-400 hover:text-gray-600">← {data.cls.name}</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">Grade Export</h1>
		<p class="text-sm text-gray-500">Copy computed grades to paste into your official gradebook.</p>
	</div>

	<div class="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
		<strong>How grades are computed:</strong> Each student's average mastery level across all standards
		is translated to a percentage. Click "Copy for gradebook" to copy a tab-separated table.
	</div>

	<GradeTable
		students={data.grid.students}
		standards={data.grid.standards}
		scores={data.grid.scores ?? {}}
		masteryConfig={data.cls.mastery_config}
	/>
</div>
