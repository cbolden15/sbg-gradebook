<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-lg">
	<div class="mb-6">
		<a href="/dashboard" class="text-xs font-medium uppercase tracking-wide text-[#8a9ab0] hover:text-[#4a6080] transition-colors">← Dashboard</a>
		<h1 class="text-lg font-bold text-[#1a2332] mt-2">New Class</h1>
	</div>

	{#if !data.canCreate}
		<div class="p-4 bg-[#e8eef4] border border-[#c0ccd8] rounded-xl mb-6">
			<p class="text-sm text-[#3a5070]">
				Free plan includes {data.limit} class.
				<a href="/account" class="font-semibold underline text-[#1a3a5c]">Upgrade to Pro</a> for unlimited classes.
			</p>
		</div>
	{/if}

	{#if form?.error}
		<p class="mb-4 text-sm text-[#4a6080] bg-[#e8eef4] border border-[#c0ccd8] rounded-lg px-4 py-3">{form.error}</p>
	{/if}

	<form method="POST" class="space-y-4 bg-white p-6 rounded-xl border border-[#dde3ea]">
		<div>
			<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="name">Class name *</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				disabled={!data.canCreate}
				placeholder="e.g. 4th Grade Math - Period 2"
				class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent disabled:bg-[#f4f6f8] disabled:text-[#8a9ab0] placeholder:text-[#c0ccd8]"
			/>
		</div>
		<div>
			<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="subject">Subject</label>
			<input
				id="subject"
				name="subject"
				type="text"
				disabled={!data.canCreate}
				placeholder="e.g. Mathematics"
				class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent disabled:bg-[#f4f6f8] disabled:text-[#8a9ab0] placeholder:text-[#c0ccd8]"
			/>
		</div>
		<div>
			<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="grade_level">Grade level</label>
			<input
				id="grade_level"
				name="grade_level"
				type="text"
				disabled={!data.canCreate}
				placeholder="e.g. 4th Grade"
				class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent disabled:bg-[#f4f6f8] disabled:text-[#8a9ab0] placeholder:text-[#c0ccd8]"
			/>
		</div>
		<button
			type="submit"
			disabled={!data.canCreate}
			class="w-full py-2.5 px-4 bg-[#1a3a5c] text-white rounded-lg font-semibold hover:bg-[#0f2840] transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
		>
			Create class
		</button>
	</form>
</div>
