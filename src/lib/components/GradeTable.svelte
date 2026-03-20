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

<div class="bg-white rounded-xl border border-[#dde3ea] overflow-hidden">
	<div class="flex items-center justify-between px-4 py-3 border-b border-[#f0f4f8]">
		<h2 class="text-xs font-semibold uppercase tracking-wide text-[#4a6080]">Computed Grades</h2>
		<button
			onclick={copyTable}
			class="px-3 py-1.5 bg-[#e8eef4] text-[#3a5070] text-xs font-semibold rounded-lg hover:bg-[#d8e4f0] transition-colors cursor-pointer"
		>
			Copy for gradebook
		</button>
	</div>
	<table class="w-full text-sm">
		<thead class="bg-[#f4f6f8] border-b border-[#dde3ea]">
			<tr>
				<th class="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#4a6080]">Student</th>
				<th class="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#4a6080]">Computed %</th>
				<th class="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#4a6080]">Letter</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-[#f0f4f8]">
			{#each rows as row}
				<tr class="hover:bg-[#f8fafc]">
					<td class="px-4 py-2.5 font-medium text-[#1a2332]">{row.student.name}</td>
					<td class="px-4 py-2.5 text-center text-[#4a6080]">{row.percentage}%</td>
					<td class="px-4 py-2.5 text-center font-bold text-[#1a2332]">{row.letter}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
