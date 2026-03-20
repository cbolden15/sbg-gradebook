<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
		<a href="/dashboard" class="font-semibold text-gray-900 text-sm">SBG Gradebook</a>
		<div class="flex items-center gap-4">
			<a href="/account" class="text-sm text-gray-500 hover:text-gray-900">Account</a>
			<form method="POST" action="/api/auth/signout">
				<button class="text-sm text-gray-500 hover:text-gray-900">Sign out</button>
			</form>
		</div>
	</nav>
	<main class="max-w-5xl mx-auto px-6 py-8">
		{@render children()}
	</main>
</div>
