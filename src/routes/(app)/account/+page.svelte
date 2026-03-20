<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const isPro = $derived(data.teacher?.plan === 'pro');

	async function startCheckout(period: 'monthly' | 'yearly') {
		const res = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ period })
		});
		const { url } = await res.json();
		window.location.href = url;
	}

	async function openPortal() {
		const res = await fetch('/api/stripe/portal', { method: 'POST' });
		const { url } = await res.json();
		window.location.href = url;
	}
</script>

<div class="max-w-lg">
	<h1 class="text-xl font-bold text-gray-900 mb-6">Account</h1>

	<div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
		<div class="flex items-center justify-between mb-1">
			<h2 class="font-semibold text-gray-900">Current Plan</h2>
			<span
				class="px-2 py-0.5 text-xs font-bold rounded-full {isPro
					? 'bg-blue-100 text-blue-800'
					: 'bg-gray-100 text-gray-600'}"
			>
				{isPro ? 'Pro' : 'Free'}
			</span>
		</div>
		<p class="text-sm text-gray-500">
			{isPro
				? 'Unlimited classes, students, and standards.'
				: '1 class · 15 students · 10 standards'}
		</p>
	</div>

	{#if !isPro}
		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<h2 class="font-semibold text-gray-900 mb-1">Upgrade to Pro</h2>
			<p class="text-sm text-gray-500 mb-4">Unlimited everything. Cancel anytime.</p>

			<div class="grid grid-cols-2 gap-3">
				<button
					onclick={() => startCheckout('monthly')}
					class="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 text-center transition-colors"
				>
					<div class="text-xl font-bold text-gray-900">$9</div>
					<div class="text-xs text-gray-500">per month</div>
				</button>
				<button
					onclick={() => startCheckout('yearly')}
					class="p-4 border-2 border-blue-500 rounded-xl bg-blue-50 text-center"
				>
					<div class="text-xl font-bold text-blue-900">$79</div>
					<div class="text-xs text-blue-600">per year · save $29</div>
				</button>
			</div>
		</div>
	{:else}
		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<h2 class="font-semibold text-gray-900 mb-1">Billing</h2>
			<p class="text-sm text-gray-500 mb-4">
				{data.teacher?.sub_status === 'active' ? 'Subscription active' : (data.teacher?.sub_status ?? 'Active')}
				{#if data.teacher?.sub_period_end}
					· renews {new Date(data.teacher.sub_period_end).toLocaleDateString()}
				{/if}
			</p>
			<button
				onclick={openPortal}
				class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
			>
				Manage billing
			</button>
		</div>
	{/if}
</div>
