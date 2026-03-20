<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#f4f6f8]">
	<nav class="bg-white border-b border-[#dde3ea] px-6 py-3 flex items-center justify-between">
		<a href="/dashboard" class="text-xs font-bold tracking-[0.14em] uppercase text-[#4a6080] hover:text-[#1a2332] transition-colors">
			SBG Gradebook
		</a>
		<div class="flex items-center gap-5">
			<a href="/account" class="text-sm text-[#8a9ab0] hover:text-[#1a2332] transition-colors">Account</a>
			<form method="POST" action="/api/auth/signout">
				<button class="text-sm text-[#8a9ab0] hover:text-[#1a2332] transition-colors cursor-pointer">Sign out</button>
			</form>
		</div>
	</nav>
	<main class="max-w-5xl mx-auto px-6 py-8">
		{@render children()}
	</main>
</div>
