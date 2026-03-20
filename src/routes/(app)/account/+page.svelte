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
	<h1 class="text-lg font-bold text-[#1a2332] tracking-tight mb-6">Account</h1>

	<div class="bg-white rounded-xl border border-[#dde3ea] p-6 mb-4">
		<div class="flex items-center justify-between mb-1">
			<h2 class="font-semibold text-[#1a2332]">Current Plan</h2>
			<span
				class="px-2.5 py-0.5 text-xs font-bold rounded-full tracking-wide {isPro
					? 'bg-[#1a3a5c] text-[#b0d0f0]'
					: 'bg-[#e8eef4] text-[#4a6080]'}"
			>
				{isPro ? 'Pro' : 'Free'}
			</span>
		</div>
		<p class="text-sm text-[#4a6080]">
			{isPro
				? 'Unlimited classes, students, and standards.'
				: '1 class · 15 students · 10 standards'}
		</p>
	</div>

	{#if !isPro}
		<div class="bg-white rounded-xl border border-[#dde3ea] p-6">
			<h2 class="font-semibold text-[#1a2332] mb-1">Upgrade to Pro</h2>
			<p class="text-sm text-[#4a6080] mb-5">Unlimited everything. Cancel anytime.</p>

			<div class="grid grid-cols-2 gap-3">
				<button
					onclick={() => startCheckout('monthly')}
					class="p-4 border-2 border-[#dde3ea] rounded-xl hover:border-[#4a7ab0] text-center transition-colors cursor-pointer"
				>
					<div class="text-2xl font-bold text-[#1a2332]">$9</div>
					<div class="text-xs text-[#8a9ab0] mt-0.5">per month</div>
				</button>
				<button
					onclick={() => startCheckout('yearly')}
					class="p-4 border-2 border-[#1a3a5c] rounded-xl bg-[#e8f0f8] text-center cursor-pointer"
				>
					<div class="text-2xl font-bold text-[#1a2332]">$79</div>
					<div class="text-xs text-[#4a7ab0] font-medium mt-0.5">per year · save $29</div>
				</button>
			</div>
		</div>
	{:else}
		<div class="bg-white rounded-xl border border-[#dde3ea] p-6">
			<h2 class="font-semibold text-[#1a2332] mb-1">Billing</h2>
			<p class="text-sm text-[#4a6080] mb-4">
				{data.teacher?.sub_status === 'active' ? 'Subscription active' : (data.teacher?.sub_status ?? 'Active')}
				{#if data.teacher?.sub_period_end}
					· renews {new Date(data.teacher.sub_period_end).toLocaleDateString()}
				{/if}
			</p>
			<button
				onclick={openPortal}
				class="px-4 py-2 bg-[#e8eef4] text-[#3a5070] text-sm font-medium rounded-lg hover:bg-[#d8e4f0] transition-colors cursor-pointer"
			>
				Manage billing
			</button>
		</div>
	{/if}
</div>
