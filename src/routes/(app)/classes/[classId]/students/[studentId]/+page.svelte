<script lang="ts">
	import type { PageData } from './$types';
	import { SCORE_COLORS } from '$lib/utils/mastery';

	let { data }: { data: PageData } = $props();

	function currentScore(history: { score: number }[]) {
		return history[history.length - 1]?.score ?? null;
	}
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.student.class_id}" class="text-sm text-gray-400 hover:text-gray-600">
			← {data.cls.name}
		</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">{data.student.name}</h1>
		<p class="text-sm text-gray-500">{data.standards.length} standards tracked</p>
	</div>

	<div class="space-y-3">
		{#each data.standards as std}
			{@const history = data.scoresByStandard[std.id] ?? []}
			{@const current = currentScore(history)}
			<div class="bg-white rounded-xl border border-gray-200 p-4">
				<div class="flex items-start justify-between mb-2">
					<p class="text-sm font-medium text-gray-900">{std.name}</p>
					{#if current !== null}
						<span
							class="px-2 py-0.5 text-xs font-bold rounded-full border {SCORE_COLORS[current]}"
						>
							{current}
						</span>
					{:else}
						<span
							class="px-2 py-0.5 text-xs rounded-full bg-gray-50 text-gray-400 border border-gray-100"
						>
							Not assessed
						</span>
					{/if}
				</div>

				{#if history.length > 0}
					<div class="flex items-center gap-1.5 mt-2">
						{#each history as h, i}
							<div class="flex items-center gap-1">
								<span
									class="w-6 h-6 flex items-center justify-center text-xs font-bold rounded {SCORE_COLORS[h.score]}"
								>
									{h.score}
								</span>
								{#if i < history.length - 1}
									<span class="text-gray-300 text-xs">→</span>
								{/if}
							</div>
						{/each}
						<span class="ml-2 text-xs text-gray-400">
							{history.length} attempt{history.length !== 1 ? 's' : ''}
						</span>
					</div>
				{/if}
			</div>
		{:else}
			<p class="text-center py-8 text-sm text-gray-400">No standards defined for this class.</p>
		{/each}
	</div>
</div>
