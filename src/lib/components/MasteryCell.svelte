<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { SCORE_COLORS } from '$lib/utils/mastery';

	let {
		studentId,
		standardId,
		score,
		isPending = false
	}: {
		studentId: string;
		standardId: string;
		score: number | null;
		isPending?: boolean;
	} = $props();

	const dispatch = createEventDispatcher<{
		scoreSubmit: { studentId: string; standardId: string; score: number };
	}>();

	let editing = $state(false);

	function handleClick() {
		if (!isPending) editing = true;
	}

	function handleSelect(newScore: number) {
		editing = false;
		dispatch('scoreSubmit', { studentId, standardId, score: newScore });
	}
</script>

{#if editing}
	<td class="p-0 relative">
		<div class="absolute z-10 top-0 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-1 flex gap-1">
			{#each [1, 2, 3, 4] as s}
				<button
					onclick={() => handleSelect(s)}
					class="w-8 h-8 rounded text-sm font-bold {SCORE_COLORS[s]} border hover:opacity-80 transition-opacity"
				>
					{s}
				</button>
			{/each}
			<button
				onclick={() => (editing = false)}
				class="w-8 h-8 rounded text-xs text-gray-400 border border-gray-200 hover:bg-gray-50"
			>✕</button>
		</div>
		<div class="w-12 h-10"></div>
	</td>
{:else}
	<td
		onclick={handleClick}
		class="w-12 h-10 text-center text-sm font-semibold cursor-pointer border border-gray-100 transition-opacity {isPending
			? 'opacity-50'
			: ''} {SCORE_COLORS[score ?? 'null']}"
	>
		{score ?? '—'}
	</td>
{/if}
