<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
	<div class="text-center">
		<p class="text-xs font-bold tracking-[0.18em] uppercase text-[#4a6080] mb-4">SBG Gradebook</p>
		<h1 class="text-5xl font-bold text-[#1a2332] mb-3">{$page.status}</h1>
		<p class="text-[#4a6080] mb-6">{$page.error?.message ?? 'Something went wrong.'}</p>
		<a href="/dashboard" class="text-sm text-[#1a3a5c] font-medium hover:underline">← Back to dashboard</a>
	</div>
</div>
