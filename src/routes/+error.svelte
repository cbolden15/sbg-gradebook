<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">{$page.status}</h1>
		<p class="text-gray-500 mb-4">{$page.error?.message ?? 'Something went wrong.'}</p>
		<a href="/dashboard" class="text-blue-600 hover:underline text-sm">← Back to dashboard</a>
	</div>
</div>
