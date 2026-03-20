<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-lg">
	<div class="mb-6">
		<a href="/dashboard" class="text-sm text-gray-400 hover:text-gray-600">← Dashboard</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">New Class</h1>
	</div>

	{#if !data.canCreate}
		<div class="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
			<p class="text-sm text-amber-800">
				Free plan includes {data.limit} class.
				<a href="/account" class="font-medium underline">Upgrade to Pro</a> for unlimited classes.
			</p>
		</div>
	{/if}

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	<form method="POST" class="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1" for="name">Class name *</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				disabled={!data.canCreate}
				placeholder="e.g. 4th Grade Math - Period 2"
				class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
			/>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1" for="subject">Subject</label>
			<input
				id="subject"
				name="subject"
				type="text"
				disabled={!data.canCreate}
				placeholder="e.g. Mathematics"
				class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
			/>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1" for="grade_level">Grade level</label>
			<input
				id="grade_level"
				name="grade_level"
				type="text"
				disabled={!data.canCreate}
				placeholder="e.g. 4th Grade"
				class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
			/>
		</div>
		<button
			type="submit"
			disabled={!data.canCreate}
			class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
		>
			Create class
		</button>
	</form>
</div>
