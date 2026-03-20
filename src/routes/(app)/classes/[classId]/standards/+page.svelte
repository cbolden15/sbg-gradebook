<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/classes/{data.cls.id}" class="text-xs font-medium uppercase tracking-wide text-[#8a9ab0] hover:text-[#4a6080] transition-colors">← {data.cls.name}</a>
		<h1 class="text-lg font-bold text-[#1a2332] mt-2">Standards</h1>
		<p class="text-sm text-[#4a6080]">{data.count} of {data.isPro ? '∞' : data.limit} standards</p>
	</div>

	{#if form?.error}
		<p class="mb-4 text-sm text-[#4a6080] bg-[#e8eef4] border border-[#c0ccd8] rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	{#if data.canAdd}
		<form method="POST" action="?/add" class="space-y-3 mb-6 bg-white p-4 rounded-xl border border-[#dde3ea]">
			<div>
				<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="std-name">Standard name *</label>
				<input
					id="std-name"
					name="name"
					type="text"
					required
					maxlength="200"
					placeholder="e.g. Can identify the main idea of a passage"
					class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent placeholder:text-[#c0ccd8]"
				/>
			</div>
			<div>
				<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="std-desc">Description (optional)</label>
				<input
					id="std-desc"
					name="description"
					type="text"
					maxlength="500"
					placeholder="Additional detail or standard code"
					class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent placeholder:text-[#c0ccd8]"
				/>
			</div>
			<button
				type="submit"
				class="px-4 py-2.5 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors cursor-pointer"
			>
				Add Standard
			</button>
		</form>
	{:else}
		<div class="p-4 bg-[#e8eef4] border border-[#c0ccd8] rounded-xl mb-6">
			<p class="text-sm text-[#3a5070]">
				Limit reached. <a href="/account" class="font-semibold underline text-[#1a3a5c]">Upgrade to Pro</a> for unlimited standards.
			</p>
		</div>
	{/if}

	<div class="bg-white rounded-xl border border-[#dde3ea] divide-y divide-[#f0f4f8]">
		{#each data.standards as std, i}
			<div class="flex items-start justify-between px-4 py-3">
				<div>
					<p class="text-sm font-medium text-[#1a2332]">{i + 1}. {std.name}</p>
					{#if std.description}
						<p class="text-xs text-[#8a9ab0] mt-0.5">{std.description}</p>
					{/if}
				</div>
				<form method="POST" action="?/remove">
					<input type="hidden" name="standardId" value={std.id} />
					<button type="submit" class="text-xs text-[#8a9ab0] hover:text-[#e05050] transition-colors ml-4 cursor-pointer">Remove</button>
				</form>
			</div>
		{:else}
			<p class="px-4 py-8 text-center text-sm text-[#8a9ab0]">No standards yet. Add one above.</p>
		{/each}
	</div>

	<div class="mt-6">
		<a
			href="/classes/{data.cls.id}"
			class="px-4 py-2 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2840] transition-colors"
		>
			Go to Mastery Grid →
		</a>
	</div>
</div>
