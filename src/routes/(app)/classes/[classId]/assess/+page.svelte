<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div>
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-xs font-medium uppercase tracking-wide text-[#8a9ab0] hover:text-[#4a6080] transition-colors">← {data.cls.name}</a>
		<h1 class="text-lg font-bold text-[#1a2332] mt-2">Record Assessment</h1>
		<p class="text-sm text-[#4a6080]">Enter scores for one or more standards. Leave blank to skip.</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-[#4a6080] bg-[#e8eef4] border border-[#c0ccd8] rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	<form method="POST">
		<div class="overflow-x-auto rounded-xl border border-[#dde3ea]">
			<table class="w-full text-sm bg-white border-collapse">
				<thead class="bg-[#f4f6f8] border-b border-[#dde3ea]">
					<tr>
						<th class="text-left px-4 py-3 font-semibold text-[#4a6080] text-xs uppercase tracking-wide min-w-32">Student</th>
						{#each data.standards as std}
							<th class="px-3 py-3 text-center font-semibold text-[#4a6080] text-xs uppercase tracking-wide max-w-28">
								<span class="block truncate" title={std.name}>{std.name}</span>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-[#f0f4f8]">
					{#each data.students as student}
						<tr class="hover:bg-[#f8fafc]">
							<td class="px-4 py-2.5 font-medium text-[#1a2332]">{student.name}</td>
							{#each data.standards as std}
								<td class="px-2 py-2 text-center">
									<select
										name="score_{student.id}_{std.id}"
										class="w-16 px-1 py-1.5 border border-[#dde3ea] rounded text-sm text-center text-[#1a2332] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent cursor-pointer"
									>
										<option value="">—</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
									</select>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mt-4 flex gap-3">
			<button
				type="submit"
				class="px-6 py-2.5 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors cursor-pointer"
			>
				Save Assessment
			</button>
			<a
				href="/classes/{data.cls.id}"
				class="px-6 py-2.5 bg-[#e8eef4] text-[#3a5070] text-sm font-medium rounded-lg hover:bg-[#d8e4f0] transition-colors"
			>
				Cancel
			</a>
		</div>
	</form>
</div>
