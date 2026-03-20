<script lang="ts">
	import { translateToGrade, type MasteryConfig } from '$lib/utils/mastery';

	let {
		students,
		standards,
		scores,
		masteryConfig
	}: {
		students: { id: string; name: string }[];
		standards: { id: string }[];
		scores: Record<string, number>;
		masteryConfig: MasteryConfig;
	} = $props();

	const rows = $derived(
		students.map((student) => {
			const studentScores = standards.map((std) => scores[`${student.id}_${std.id}`] ?? null);
			const { percentage, letter } = translateToGrade(studentScores, masteryConfig);
			return { student, percentage, letter };
		})
	);

	function copyTable() {
		const text = rows.map((r) => `${r.student.name}\t${r.percentage}%\t${r.letter}`).join('\n');
		navigator.clipboard.writeText(text);
	}
</script>

<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
	<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
		<h2 class="text-sm font-medium text-gray-900">Computed Grades</h2>
		<button
			onclick={copyTable}
			class="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200"
		>
			Copy for gradebook
		</button>
	</div>
	<table class="w-full text-sm">
		<thead class="bg-gray-50 border-b border-gray-100">
			<tr>
				<th class="text-left px-4 py-2 font-medium text-gray-600">Student</th>
				<th class="text-center px-4 py-2 font-medium text-gray-600">Computed %</th>
				<th class="text-center px-4 py-2 font-medium text-gray-600">Letter</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-50">
			{#each rows as row}
				<tr class="hover:bg-gray-50">
					<td class="px-4 py-2 font-medium text-gray-900">{row.student.name}</td>
					<td class="px-4 py-2 text-center text-gray-700">{row.percentage}%</td>
					<td class="px-4 py-2 text-center font-bold text-gray-900">{row.letter}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
