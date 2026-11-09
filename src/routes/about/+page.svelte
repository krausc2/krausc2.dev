<script lang="ts">
	import { onMount } from "svelte";
	import { createAgeCounter } from "#lib/age.svelte.js";
	import { PUBLIC_EMAIL } from "$app/env/public";
	import External from "#lib/components/ui/svg-icons/External.svelte";
	import childhoodPhoto from "#lib/assets/childhood_photo.jpg?enhanced";

	let emailAddress = $state("[EMAIL PROTECTED]");
	let emailHref = $state("");
	let photoLoaded = $state(false);
	let photo = $state<HTMLElement>();

	onMount(() => {
		emailAddress = PUBLIC_EMAIL;
		emailHref = `mailto:${PUBLIC_EMAIL}`;

		// photo = <img> (dev) or <picture> (prod)
		const img = photo instanceof HTMLImageElement ? photo : photo?.querySelector("img");
		if (img?.complete) {
			photoLoaded = true;
		}
	});

	const age = createAgeCounter();
</script>

<!--
	Re-do this whole section eventually.

	Should start with brief into, then image to the side, then Q&A style section with expandable answers.
	Also add a timeline of career and education in style of git graph, education becomes branch off to the side,
	volunteer work becomes another branch, etc.

	Title of section "Let's go back in time" or something like that.
-->

<section class="mx-auto flex w-full max-w-[100ch] flex-col lg:block">
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
			></enhanced:img>
		</div>
	</figure>

	<p class="-order-2 mb-8 pt-8 text-left text-xl">
		G'day, <span class="font text-custom-coral">I'm Curtis</span>, a Cyber Security Engineer in
		Sydney, currently finishing my undergraduate studies at Macquarie University.
	</p>

	<p class="-order-1 mb-8 text-left">
		My focus area for the past few years has been hybrid infrastructure (Defender, Sentinel, Entra
		ID, Azure), IT operations, and cyber risk management. I'm <span
			class="pointer-events-none font-mono text-custom-coral tabular-nums select-none"
			>{age.value}</span
		> years old, enjoy building software as a hobby, and have a strong interest in the intersection of
		technology, philosophy, and art.
	</p>

	<p class="text-left lg:mb-4">
		Feel free to read some read some <a href="/articles" class="font-mono text-custom-coral"
			>articles</a
		>, or otherwise reach out if you'd like to chat about tech, cyber security, or anything in
		between:
		<a href={emailHref} class="inline-flex items-center gap-1 font-mono text-custom-coral"
			>{emailAddress}<External /></a
		>.
	</p>
</section>
