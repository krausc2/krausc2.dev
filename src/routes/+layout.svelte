<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Button } from "$lib/components/ui/button";
	import External from "$lib/components/ui/svg-icons/External.svelte";
	//import LinkedIn from "$lib/components/ui/svg-icons/LinkedIn.svelte";
	//import GitHub from "$lib/components/ui/svg-icons/GitHub.svelte";
	import { page } from "$app/state";
	import { fade } from "svelte/transition";
	import { createClock } from "$lib/clock.svelte";
	import pkg from "../../package.json";
	import type { LayoutData } from "./$types";
	import type { Snippet } from "svelte";

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	let isMobileMenuOpen = $state(false);
	let mainElement = $state<HTMLElement>();
	let md = 768; // The cutoff for mobile view from tailwindcss.

	$effect(() => {
		// When url changes, close the mobile menu if it's open and scroll to top.
		if (page.url.pathname) {
			isMobileMenuOpen = false;
			setTimeout(() => {
				mainElement?.scrollTo({ top: 0, behavior: "instant" });
			}, 150); // Wait for page fade out
		}
	});

	/* #TODO Add console.log easter egg here */
	const navItems = $derived([
		{ label: "Home", href: "/" },
		// { label: 'Now', href: '/now' },
		{ label: "Articles", href: "/articles", count: data.counts.articles },
		// { label: "Influences", href: "/influences" },
		{ label: "Projects", href: "/projects", count: data.counts.projects }
	]);

	const clock = createClock();
</script>

<!-- #TODO Add logo to sidebar/nav -->

{#snippet navMenu(isMobile = false)}
	<nav class="flex flex-col">
		<!--
			For each item in array, creates a button with hover effect.
			z-10 (the <Button>)
			z-0 (the gradient <div>)
		-->
		{#each navItems as item (item.href)}
			<div class="group relative font-mono">
				<div
					class="pointer-events-none absolute inset-0 z-0 transform-gpu bg-linear-to-r from-stone-100 to-white transition-opacity duration-700 group-hover:opacity-100 group-hover:duration-200 {page
						.url.pathname === item.href
						? 'opacity-100'
						: 'opacity-0'}"
				></div>
				<Button
					variant="ghost"
					class="relative z-10 flex w-full items-center justify-center hover:bg-transparent {isMobile
						? 'h-16 py-4'
						: ''} {page.url.pathname === item.href ? 'text-custom-coral' : ''} {page.url
						.pathname === item.href
						? 'hover:text-custom-coral'
						: ''}"
					href={item.href}
				>
					{item.label}
					{#if item.count !== undefined}
						<sup class="ml-1">[{item.count}]</sup>
					{/if}
				</Button>
			</div>
		{/each}
	</nav>
{/snippet}

<div class="grid h-screen grid-cols-1 overflow-hidden fade-in md:grid-cols-3 lg:grid-cols-5">
	<aside class="col-span-1 hidden flex-col justify-center border-r md:flex">
		{@render navMenu()}
	</aside>

	<!-- Main Content -->
	<main
		bind:this={mainElement}
		class="relative col-span-1 flex h-full flex-col overflow-y-auto md:col-span-2 lg:col-span-3"
	>
		{#if isMobileMenuOpen}
			<div
				in:fade={{ duration: 150, delay: 150 }}
				out:fade={{ duration: 150 }}
				class="fixed inset-0 z-40 flex flex-col justify-center bg-stone-100 md:hidden"
			>
				<button
					onclick={() => (isMobileMenuOpen = false)}
					class="absolute top-16 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center border bg-stone-100 font-mono text-lg text-stone-900 transition-colors duration-700 hover:text-stone-500 hover:duration-200 md:hidden"
				>
					<span class="-translate-y-px">x</span>
				</button>
				<div class="w-full">
					{@render navMenu(true)}
				</div>
			</div>
		{:else}
			<div
				class="flex h-full flex-col"
				in:fade={{ duration: 150, delay: 150 }}
				out:fade={{ duration: 150 }}
			>
				<button
					onclick={() => (isMobileMenuOpen = true)}
					class="absolute top-16 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center border bg-stone-100 font-mono text-lg text-stone-900 transition-colors duration-700 hover:text-stone-500 hover:duration-200 md:hidden"
				>
					<span class="translate-y-[-1.5px]">☰</span>
				</button>

				<div class="grid flex-1">
					{#key page.url.pathname}
						<div
							class="col-start-1 row-start-1 flex h-full flex-col"
							in:fade={{ duration: 150, delay: 150 }}
							out:fade={{ duration: 150 }}
						>
							<!-- Convert this to multiple +layout.svelte files, current way is not idiomatic for Svelte -->
							{#if page.url.pathname === "/" || page.url.pathname === "/articles" || page.url.pathname === "/projects"}
								{@render children()}
							{:else}
								<div class="mx-auto flex w-full max-w-[100ch] flex-col px-8 pt-16">
									{@render children()}
								</div>
							{/if}

							<div class="mx-auto mt-auto w-full max-w-[100ch] px-8">
								<footer class="border-t pt-4 pb-4 font-mono">
									<!-- <LinkedIn class="text-stone-900" /> -->
									<!-- <GitHub class="text-stone-900" /> -->
									<p>
										📍 Currently in Sydney ( {clock.hours}<span class="blink">:</span>{clock.minutes}
										{clock.emoji} )
									</p>
									<p class="pt-8 text-center font-mono">
										© {new Date().getFullYear()} krausc2
										<span class="hidden lg:inline">
											| Source available at <a
												href="https://github.com/krausc2/krausc2.dev"
												class="inline-flex items-center gap-1"
												target="_blank">GitHub<External /></a
											>
											| v{pkg.version}
										</span>
									</p>
								</footer>
							</div>
						</div>
					{/key}
				</div>
			</div>
		{/if}
	</main>

	<section class="col-span-1 hidden border-l lg:block">
		<!-- #TODO Add right sidebar content -->
	</section>
</div>

<svelte:window
	/*
		If a user has the mobile view open and then resizes the window...
		#TODO Maybe add debounce if it causes performance issues(?)
	*/
	onresize={() => {
		if (window.innerWidth >= md && isMobileMenuOpen) isMobileMenuOpen = false;
	}}
/>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<style>
	.blink {
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		from,
		to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.fade-in {
		animation: fadeIn 300ms ease-in forwards;
		opacity: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
