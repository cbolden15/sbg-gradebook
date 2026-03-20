<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-sm text-gray-400 hover:text-gray-600">← {data.cls.name}</a>
		<h1 class="text-xl font-bold text-gray-900 mt-2">Standards</h1>
		<p class="text-sm text-gray-500">{data.count} of {data.isPro ? '∞' : data.limit} standards</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	{#if data.canAdd}
		<form method="POST" action="?/add" class="space-y-3 mb-6 bg-white p-4 rounded-xl border border-gray-200">
			<div>
				<label class="block text-xs font-medium text-gray-600 mb-1" for="std-name">Standard name *</label>
				<input
					id="std-name"
					name="name"
					type="text"
					required
					maxlength="200"
					placeholder="e.g. Can identify the main idea of a passage"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label class="block text-xs font-medium text-gray-600 mb-1" for="std-desc">Description (optional)</label>
				<input
					id="std-desc"
					name="description"
					type="text"
					maxlength="500"
					placeholder="Additional detail or standard code"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
			>
				Add Standard
			</button>
		</form>
	{:else}
		<div class="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
			<p class="text-sm text-amber-800">
				Limit reached. <a href="/account" class="font-medium underline">Upgrade to Pro</a> for unlimited
				standards.
			</p>
		</div>
	{/if}

	<div class="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
		{#each data.standards as std, i}
			<div class="flex items-start justify-between px-4 py-3">
				<div>
					<p class="text-sm font-medium text-gray-900">{i + 1}. {std.name}</p>
					{#if std.description}
						<p class="text-xs text-gray-400 mt-0.5">{std.description}</p>
					{/if}
				</div>
				<form method="POST" action="?/remove">
					<input type="hidden" name="standardId" value={std.id} />
					<button type="submit" class="text-xs text-gray-400 hover:text-red-500 ml-4">Remove</button>
				</form>
			</div>
		{:else}
			<p class="px-4 py-8 text-center text-sm text-gray-400">No standards yet. Add one above.</p>
		{/each}
	</div>

	<div class="mt-6">
		<a
			href="/classes/{data.cls.id}"
			class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
		>
			Go to Mastery Grid →
		</a>
	</div>
</div>
