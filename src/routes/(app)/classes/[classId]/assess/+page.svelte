<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div>
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-sm text-gray-400 hover:text-gray-600">← {data.cls.name}</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">Record Assessment</h1>
		<p class="text-sm text-gray-500">Enter scores for one or more standards. Leave blank to skip.</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	<form method="POST">
		<div class="overflow-x-auto rounded-xl border border-gray-200">
			<table class="w-full text-sm bg-white border-collapse">
				<thead class="bg-gray-50 border-b border-gray-200">
					<tr>
						<th class="text-left px-4 py-3 font-medium text-gray-600 min-w-32">Student</th>
						{#each data.standards as std}
							<th class="px-3 py-3 text-center font-medium text-gray-600 max-w-28">
								<span class="block truncate text-xs" title={std.name}>{std.name}</span>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each data.students as student}
						<tr>
							<td class="px-4 py-2 font-medium text-gray-900">{student.name}</td>
							{#each data.standards as std}
								<td class="px-2 py-2 text-center">
									<select
										name="score_{student.id}_{std.id}"
										class="w-16 px-1 py-1 border border-gray-200 rounded text-sm text-center bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
				class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
			>
				Save Assessment
			</button>
			<a
				href="/classes/{data.cls.id}"
				class="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
			>
				Cancel
			</a>
		</div>
	</form>
</div>
