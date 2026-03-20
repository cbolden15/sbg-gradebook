<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
		<h1 class="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
		<p class="text-gray-500 text-sm mb-6">SBG Gradebook</p>

		{#if form?.error}
			<p class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{form.error}</p>
		{/if}

		<form method="POST" class="space-y-4">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
				<input id="email" name="email" type="email" required autocomplete="email"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="password">Password</label>
				<input id="password" name="password" type="password" required autocomplete="current-password"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
			</div>
			<button type="submit"
				class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
				Sign in
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-500">
			No account? <a href="/signup" class="text-blue-600 hover:underline">Sign up free</a>
		</p>
	</div>
</div>
