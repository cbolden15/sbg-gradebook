<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-sm text-gray-400 hover:text-gray-600">← {data.cls.name}</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">Students</h1>
		<p class="text-sm text-gray-500">{data.count} of {data.isPro ? '∞' : data.limit} students</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	{#if data.canAdd}
		<form method="POST" action="?/add" class="flex gap-2 mb-6">
			<input
				name="name"
				type="text"
				required
				placeholder="Student name"
				class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
			>
				Add
			</button>
		</form>
	{:else}
		<div class="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
			<p class="text-sm text-amber-800">
				Limit reached. <a href="/account" class="font-medium underline">Upgrade to Pro</a> for unlimited
				students.
			</p>
		</div>
	{/if}

	<div class="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
		{#each data.students as student}
			<div class="flex items-center justify-between px-4 py-3">
				<a
					href="/classes/{data.cls.id}/students/{student.id}"
					class="text-sm font-medium text-gray-900 hover:text-blue-600"
				>
					{student.name}
				</a>
				<form method="POST" action="?/remove">
					<input type="hidden" name="studentId" value={student.id} />
					<button type="submit" class="text-xs text-gray-400 hover:text-red-500">Remove</button>
				</form>
			</div>
		{:else}
			<p class="px-4 py-8 text-center text-sm text-gray-400">No students yet. Add one above.</p>
		{/each}
	</div>

	<div class="mt-6">
		<a
			href="/classes/{data.cls.id}/standards"
			class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
		>
			Next: Add Standards →
		</a>
	</div>
</div>
