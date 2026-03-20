<script lang="ts">
	import { supabase } from '$lib/supabase';
	import MasteryCell from './MasteryCell.svelte';

	let {
		students,
		standards,
		scores: initialScores
	}: {
		students: { id: string; name: string; class_id: string }[];
		standards: { id: string; name: string; description: string | null; sort_order: number }[];
		scores: Record<string, number>;
	} = $props();

	// Intentionally captures initial value only — local state manages optimistic updates
	const seedScores = initialScores;
	let localScores = $state({ ...seedScores });
	let pending = $state(new Set<string>());
	let errorMsg = $state<string | null>(null);

	async function handleScoreSubmit(
		event: CustomEvent<{ studentId: string; standardId: string; score: number }>
	) {
		const { studentId, standardId, score } = event.detail;
		const key = `${studentId}_${standardId}`;

		// Optimistic update
		const prev = localScores[key];
		localScores[key] = score;
		pending.add(key);

		const { error } = await supabase
			.from('scores')
			.insert({ student_id: studentId, standard_id: standardId, score });

		pending.delete(key);

		if (error) {
			// Rollback on failure
			if (prev !== undefined) {
				localScores[key] = prev;
			} else {
				delete localScores[key];
			}
			errorMsg = 'Failed to save score. Please try again.';
			setTimeout(() => (errorMsg = null), 3000);
		}
	}
</script>

{#if errorMsg}
	<div class="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
		{errorMsg}
	</div>
{/if}

{#if students.length === 0 || standards.length === 0}
	<div class="py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
		<p class="text-gray-500 text-sm mb-2">
			{#if students.length === 0}Add students first.{:else}Add standards first.{/if}
		</p>
		<div class="flex justify-center gap-3 mt-3">
			<a href="students" class="text-sm text-blue-600 hover:underline">Add students</a>
			<a href="standards" class="text-sm text-blue-600 hover:underline">Add standards</a>
		</div>
	</div>
{:else}
	<div class="overflow-x-auto rounded-xl border border-gray-200">
		<table class="w-full border-collapse bg-white text-sm">
			<thead>
				<tr class="bg-gray-50 border-b border-gray-200">
					<th
						class="text-left px-4 py-3 font-medium text-gray-600 min-w-32 sticky left-0 bg-gray-50"
					>Student</th>
					{#each standards as std}
						<th
							class="px-2 py-3 font-medium text-gray-600 max-w-24 text-center"
							title={std.description ?? ''}
						>
							<span class="block truncate text-xs">{std.name}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each students as student}
					<tr class="hover:bg-gray-50">
						<td
							class="px-4 py-2 font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-100"
						>
							<a href="students/{student.id}" class="hover:text-blue-600">{student.name}</a>
						</td>
						{#each standards as std}
							{@const key = `${student.id}_${std.id}`}
							<MasteryCell
								studentId={student.id}
								standardId={std.id}
								score={localScores[key] ?? null}
								isPending={pending.has(key)}
								on:scoreSubmit={handleScoreSubmit}
							/>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
