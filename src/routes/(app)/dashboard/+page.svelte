<script lang="ts">
	import type { PageData } from './$types';
	import ClassCard from '$lib/components/ClassCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-lg font-bold text-[#1a2332] tracking-tight">My Classes</h1>
	<a
		href="/classes/new"
		class="px-4 py-2 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors cursor-pointer"
	>
		+ New Class
	</a>
</div>

{#if data.classes.length === 0}
	<div class="text-center py-16 bg-white rounded-xl border border-dashed border-[#c0ccd8]">
		<p class="text-[#8a9ab0] text-sm mb-3">No classes yet.</p>
		<a href="/classes/new" class="text-[#1a3a5c] text-sm font-medium hover:underline">Create your first class →</a>
	</div>
{:else}
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.classes as cls}
			<ClassCard {cls} />
		{/each}
	</div>
{/if}
