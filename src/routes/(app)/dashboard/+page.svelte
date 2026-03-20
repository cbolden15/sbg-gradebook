<script lang="ts">
	import type { PageData } from './$types';
	import ClassCard from '$lib/components/ClassCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-xl font-bold text-gray-900">My Classes</h1>
	<a
		href="/classes/new"
		class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
	>
		+ New Class
	</a>
</div>

{#if data.classes.length === 0}
	<div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
		<p class="text-gray-500 mb-3">No classes yet.</p>
		<a href="/classes/new" class="text-blue-600 text-sm hover:underline">Create your first class →</a>
	</div>
{:else}
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.classes as cls}
			<ClassCard {cls} />
		{/each}
	</div>
{/if}
