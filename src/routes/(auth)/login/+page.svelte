<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { form, data }: { form: ActionData; data: PageData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
	<div class="w-full max-w-md">
		<div class="text-center mb-8">
			<span class="text-xs font-bold tracking-[0.18em] uppercase text-[#4a6080]">SBG Gradebook</span>
		</div>

		<div class="p-8 bg-white rounded-2xl border border-[#dde3ea] shadow-sm">
			<h1 class="text-xl font-bold text-[#1a2332] mb-1">Sign in</h1>
			<p class="text-sm text-[#8a9ab0] mb-6">Welcome back</p>

			{#if data?.message === 'confirm-email'}
				<p class="mb-4 text-sm text-[#3a5070] bg-[#e8f0f8] border border-[#b0cce8] rounded-lg px-4 py-3">Account created! Check your email to confirm your address, then sign in.</p>
			{/if}
			{#if form?.error}
				<p class="mb-4 text-sm text-[#4a6080] bg-[#e8eef4] border border-[#c0ccd8] rounded-lg px-4 py-3">{form.error}</p>
			{/if}

			<form method="POST" class="space-y-4">
				<div>
					<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="email">Email</label>
					<input id="email" name="email" type="email" required autocomplete="email"
						class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent text-sm text-[#1a2332] bg-white placeholder:text-[#c0ccd8]" />
				</div>
				<div>
					<label class="block text-xs font-semibold uppercase tracking-wide text-[#4a6080] mb-1.5" for="password">Password</label>
					<input id="password" name="password" type="password" required autocomplete="current-password"
						class="w-full px-3 py-2.5 border border-[#dde3ea] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent text-sm text-[#1a2332] bg-white" />
				</div>
				<button type="submit"
					class="w-full py-2.5 px-4 bg-[#1a3a5c] text-white rounded-lg font-semibold hover:bg-[#0f2840] transition-colors text-sm cursor-pointer mt-2">
					Sign in
				</button>
			</form>

			<p class="mt-5 text-center text-sm text-[#8a9ab0]">
				No account? <a href="/signup" class="text-[#1a3a5c] font-medium hover:underline">Sign up free</a>
			</p>
		</div>
	</div>
</div>
