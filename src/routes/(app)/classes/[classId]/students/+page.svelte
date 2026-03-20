<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-xs font-medium uppercase tracking-wide text-[#8a9ab0] hover:text-[#4a6080] transition-colors">← {data.cls.name}</a>
		<h1 class="text-lg font-bold text-[#1a2332] mt-2">Students</h1>
		<p class="text-sm text-[#4a6080]">{data.count} of {data.isPro ? '∞' : data.limit} students</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-[#4a6080] bg-[#e8eef4] border border-[#c0ccd8] rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	{#if data.canAdd}
		<form method="POST" action="?/add" class="flex gap-2 mb-6">
			<input
				name="name"
				type="text"
				required
				placeholder="Student name"
				class="flex-1 px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent placeholder:text-[#c0ccd8]"
			/>
			<button
				type="submit"
				class="px-4 py-2.5 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors cursor-pointer"
			>
				Add
			</button>
		</form>
	{:else}
		<div class="p-4 bg-[#e8eef4] border border-[#c0ccd8] rounded-xl mb-6">
			<p class="text-sm text-[#3a5070]">
				Limit reached. <a href="/account" class="font-semibold underline text-[#1a3a5c]">Upgrade to Pro</a> for unlimited students.
			</p>
		</div>
	{/if}

	<div class="bg-white rounded-xl border border-[#dde3ea] divide-y divide-[#f0f4f8]">
		{#each data.students as student}
			<div class="flex items-center justify-between px-4 py-3">
				<a
					href="/classes/{data.cls.id}/students/{student.id}"
					class="text-sm font-medium text-[#1a2332] hover:text-[#1a3a5c] transition-colors"
				>
					{student.name}
				</a>
				<form method="POST" action="?/remove">
					<input type="hidden" name="studentId" value={student.id} />
					<button type="submit" class="text-xs text-[#8a9ab0] hover:text-[#e05050] transition-colors cursor-pointer">Remove</button>
				</form>
			</div>
		{:else}
			<p class="px-4 py-8 text-center text-sm text-[#8a9ab0]">No students yet. Add one above.</p>
		{/each}
	</div>

	<div class="mt-6">
		<a
			href="/classes/{data.cls.id}/standards"
			class="px-4 py-2 bg-[#e8eef4] text-[#3a5070] text-sm font-medium rounded-lg hover:bg-[#d8e4f0] transition-colors"
		>
			Next: Add Standards →
		</a>
	</div>
</div>
