<script lang="ts">
	import { onMount } from "svelte";
	import { slide, fade } from "svelte/transition";
	import { createSplash } from "$lib/splashes.svelte";
	import { createScramble } from "$lib/scramble.svelte";
	import { createAgeCounter } from "$lib/age.svelte";
	import { env } from "$env/dynamic/public";
	import BinaryCanvas from "$lib/BinaryCanvas.svelte";
	import External from "$lib/components/ui/svg-icons/External.svelte";
	import MoreInfo from "$lib/components/ui/svg-icons/MoreInfo.svelte";
	import childhoodPhoto from "$lib/assets/childhood_photo.jpg?enhanced";

	let emailAddress = $state("[EMAIL PROTECTED]");
	let emailHref = $state("");
	let splashReady = $state(false);
	let showTerminal = $state(true);
	let photoLoaded = $state(false);
	let photo = $state<HTMLElement>();
	let terminalWidth = $state(0);
	let terminalHeight = $state(0);
	// Odd numbers just feel ugly
	let evenWidth = $derived(terminalWidth - (terminalWidth % 2));
	let evenHeight = $derived(terminalHeight - (terminalHeight % 2));

	onMount(() => {
		emailAddress = env.PUBLIC_EMAIL;
		emailHref = `mailto:${env.PUBLIC_EMAIL}`;
		splashReady = true;

		// photo = <img> (dev) or <picture> (prod)
		const img = photo instanceof HTMLImageElement ? photo : photo?.querySelector("img");
		if (img?.complete) {
			photoLoaded = true;
		}
	});

	/* #TODO Test for hydration error based on client/server timezones. */

	const hour = new Date().getHours();
	const splash = createScramble(createSplash(hour >= 18 || hour < 5));
	const age = createAgeCounter();
</script>

<!-- #TODO Fix layout issues where elements draw outside their bounds on small window sizes -->

<section class="relative flex min-h-screen flex-col border-t border-b">
	<BinaryCanvas />
	<div class="bg-hero-gradient pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

	<div class="mx-auto flex w-full max-w-[120ch] flex-1 flex-col justify-center px-8">
		<div class="relative">
			<h1 class="block text-center text-[4rem] leading-none font-bold md:inline-flex md:text-left">
				krausc2
			</h1>
			{#if showTerminal}
				<div out:slide={{ delay: 300, duration: 300 }}>
					<div out:fade={{ duration: 300 }}>
						<div class="hidden items-center gap-2 bg-stone-200 px-4 py-3 md:mt-4 md:flex">
							<button
								onclick={() => (showTerminal = false)}
								class="h-3 w-3 cursor-pointer rounded-full bg-custom-coral transition-colors duration-150 hover:bg-orange-300"
								aria-label="Close terminal"
							></button>
							<div class="h-3 w-3 rounded-full bg-stone-400"></div>
							<div class="h-3 w-3 rounded-full bg-stone-600"></div>
							<span class="ml-2 text-sm text-stone-500"
								>motd - zsh - {evenWidth} x {evenHeight}</span
							>
						</div>
						<div
							bind:clientWidth={terminalWidth}
							bind:clientHeight={terminalHeight}
							class="hidden bg-stone-900 px-6 py-6 font-mono text-custom-coral md:grid"
						>
							<!-- Ghost element to set dynamic height based on longest quote -->
							<div
								class="pointer-events-none invisible col-start-1 row-start-1 flex items-start justify-between gap-4"
								aria-hidden="true"
							>
								<div>
									motd@system ~ # {splash.longestValue}<span class="cursor opacity-0">|</span>
								</div>
								<div class="flex h-6 shrink-0 items-center"><MoreInfo /></div>
							</div>
							<!-- Visible splash text -->
							<div
								class="col-start-1 row-start-1 flex items-start justify-between gap-4 text-custom-coral{!splashReady
									? 'animate-pulse'
									: ''}"
							>
								<div>
									<!-- #TODO Investigate layout shift/flicker on line break (quote over 1 line in length) -->
									motd@system ~ # {splash.value}{#if splashReady}<span class="cursor">|</span>{/if}
								</div>
								<div class="flex h-6 shrink-0 items-center">
									<a
										href="/splashes"
										class="text-stone-500 transition-colors duration-700 hover:text-custom-coral hover:duration-200"
									>
										<MoreInfo />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!--
	Re-do this whole section eventually.

	Should start with brief into, then image to the side, then Q&A style section with expandable answers.
	Also add a timeline of career and education in style of git graph, education becomes branch off to the side,
	volunteer work becomes another branch, etc.

	Title of section "Let's go back in time" or something like that.
-->

<section class="mx-auto flex w-full max-w-[100ch] flex-col px-8 pt-16 pb-32 lg:block">
	<div class="order-first">
		<p class="border-b pb-4 text-5xl leading-none font-bold">about</p>
	</div>

	<figure
		class="mx-auto mb-8 w-2/3 max-w-sm lg:float-right lg:mx-0 lg:mb-4 lg:ml-8 lg:w-2/5 lg:max-w-none lg:pt-8"
	>
		<div
			class="relative aspect-3/4 w-full overflow-hidden [&_picture]:relative [&_picture]:z-10 [&_picture]:block [&_picture]:size-full"
		>
			<div class="absolute inset-0 animate-pulse bg-stone-300" aria-hidden="true"></div>
			<enhanced:img
				bind:this={photo}
				src={childhoodPhoto}
				alt="Photo of me circa 2014."
				onload={() => (photoLoaded = true)}
				class="size-full object-cover transition-opacity duration-700 {photoLoaded
					? 'opacity-100'
					: 'opacity-0'}"
			/>
		</div>
	</figure>

	<p class="-order-2 mb-8 pt-8 text-xl">
		G'day, <span class="font text-custom-coral">I'm Curtis</span>, a Cyber Security Engineer in
		Sydney, currently finishing my undergraduate studies at Macquarie University.
	</p>

	<p class="-order-1 mb-8">
		My focus area for the past few years has been hybrid infrastructure (Defender, Sentinel, Entra
		ID, Azure), IT operations, and cyber risk management. I'm <span
			class="pointer-events-none font-mono text-custom-coral tabular-nums select-none"
			>{age.value}</span
		> years old, enjoy building software as a hobby, and have a strong interest in the intersection of
		technology, philosophy, and art.
	</p>

	<p class="lg:mb-4">
		Feel free to read some read some <a href="/articles" class="font-mono text-custom-coral"
			>articles</a
		>, or otherwise reach out if you'd like to chat about tech, cyber security, or anything in
		between:
		<a href={emailHref} class="inline-flex items-center gap-1 font-mono text-custom-coral"
			>{emailAddress}<External /></a
		>.
	</p>
</section>

<style>
	.cursor {
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

	.bg-hero-gradient {
		/* Solid band at center, gradient above and below */
		background-image: linear-gradient(
			to bottom,
			rgba(245, 245, 244, 0.15) 0%,
			#f5f5f4 25%,
			#f5f5f4 75%,
			rgba(245, 245, 244, 0.15) 100%
		);
	}
</style>
