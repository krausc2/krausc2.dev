<script lang="ts">
	import { onMount } from "svelte";
	import { slide, fade } from "svelte/transition";
	import { createSplash } from "#lib/splashes.svelte.js";
	import { createScramble } from "#lib/scramble.svelte.js";
	import BinaryCanvas from "#lib/BinaryCanvas.svelte";
	import MoreInfo from "#lib/components/ui/svg-icons/MoreInfo.svelte";

	let splashReady = $state(false);
	let showTerminal = $state(true);
	let terminalWidth = $state(0);
	let terminalHeight = $state(0);
	// Odd numbers just feel ugly
	let evenWidth = $derived(terminalWidth - (terminalWidth % 2));

	let evenHeight = $derived(terminalHeight - (terminalHeight % 2));

	onMount(() => {
		splashReady = true;
	});

	/* #TODO Test for hydration error based on client/server timezones. */

	const hour = new Date().getHours();
	const splash = createScramble(createSplash(hour >= 18 || hour < 5));
</script>

<!-- #TODO Fix layout issues where elements draw outside their bounds on small window sizes -->

<section class="relative flex min-h-dvh flex-col border-t border-b">
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
							class="hidden bg-stone-900 px-8 py-6 font-mono md:grid"
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
									motd@system ~ #
									{splash.value}{#if splashReady}<span class="cursor">|</span>{/if}
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
