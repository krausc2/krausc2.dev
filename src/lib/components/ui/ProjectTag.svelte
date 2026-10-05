<script lang="ts">
	import type { Component } from "svelte";

	// Icon imports
	import SvelteIcon from "#lib/components/ui/svg-icons/Svelte.svelte";
	import TypeScriptIcon from "#lib/components/ui/svg-icons/TypeScript.svelte";
	import CloudflareIcon from "#lib/components/ui/svg-icons/Cloudflare.svelte";
	import DockerIcon from "#lib/components/ui/svg-icons/Docker.svelte";
	import GitHubIcon from "#lib/components/ui/svg-icons/GitHub.svelte";
	import TailscaleIcon from "#lib/components/ui/svg-icons/Tailscale.svelte";
	import AlpineIcon from "#lib/components/ui/svg-icons/Linux.svelte";

	let { tag } = $props<{ tag: string }>();

	const tagConfig: Record<string, { icon: Component<{ size?: string }>; color: string }> = {
		Svelte: { icon: SvelteIcon, color: "text-[#FF3E00]" },
		TypeScript: { icon: TypeScriptIcon, color: "text-[#007acc]" },
		Cloudflare: { icon: CloudflareIcon, color: "text-[#F48120]" },
		Docker: { icon: DockerIcon, color: "text-[#2560FF]" },
		"GitHub Actions": { icon: GitHubIcon, color: "text-[#181717]" },
		Tailscale: { icon: TailscaleIcon, color: "text-[#1A1A1A]" },
		"Alpine Linux": { icon: AlpineIcon, color: "text-[#333333]" }
	};

	let config = $derived(tagConfig[tag]);
</script>

{#if config}
	{@const Icon = config.icon}
	<span class="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-sm {config.color}">
		<Icon size="14" />
		{tag}
	</span>
{:else}
	<span class="px-2 py-1 font-mono text-sm text-custom-coral">{tag}</span>
{/if}
