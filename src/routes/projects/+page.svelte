<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { env } from "$env/dynamic/public";
	import External from "$lib/components/ui/svg-icons/External.svelte";
	import ProjectTag from "$lib/components/ui/ProjectTag.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	let emailAddress = $state("[EMAIL PROTECTED]");
	let emailHref = $state("");

	onMount(() => {
		emailAddress = env.PUBLIC_EMAIL;
		emailHref = `mailto:${env.PUBLIC_EMAIL}`;
	});
</script>

<section class="mb-32">
	<div class="mx-auto max-w-[100ch] px-8 pt-16">
		<p class="border-b pb-4 text-5xl leading-none font-bold">projects</p>

		<div class="mb-8 flex flex-col gap-8 border-b border-stone-300 pt-8 pb-8">
			<p>
				See something that's broken or just kinda sucks? Open an issue on <a
					href="https://github.com/krausc2?tab=repositories"
					target="_blank"
					class="inline-flex items-center gap-1 font-mono text-custom-coral">GitHub <External /></a
				>
				or send an email to
				<a href={emailHref} class="inline-flex items-center gap-1 font-mono text-custom-coral"
					>{emailAddress} <External /></a
				> and I'll gladly credit your contribution.
			</p>
		</div>
	</div>

	<div class="grid">
		{#await data.streamed.projects}
			<div
				class="col-start-1 row-start-1 mx-auto max-w-[100ch] animate-pulse px-8 pt-12"
				out:fade={{ duration: 150 }}
			>
				There is no server error. Your internet just genuinely sucks...
			</div>
		{:then projects}
			<div class="col-start-1 row-start-1">
				{#each projects as project, i (project.slug)}
					<a
						href="/projects/{project.slug}"
						class="group relative block py-4"
						in:fade|global={{ duration: 150, delay: 150 + i * 150 }}
					>
						<!-- #TODO Fix formatting/style; currently absolutely jank, but *feels* right -->
						<div
							class="pointer-events-none absolute inset-0 z-0 transform-gpu bg-linear-to-r from-white to-stone-100 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:duration-200"
						></div>
						<div class="relative z-10 mx-auto flex max-w-[70ch] flex-col gap-4 px-8 pt-4 md:block">
							<div
								class="aspect-3/2 w-full bg-stone-200 md:float-right md:mb-4 md:ml-6 md:w-1/2"
							></div>

							<p class="pt-4 text-2xl font-bold md:mb-4 md:pt-0 lg:text-base">{project.title}</p>

							<p class="text-base md:mb-4 md:text-sm">{project.description}</p>

							<div class="flex flex-wrap gap-4 pt-2 pb-4 md:clear-both">
								{#each project.tags as tag (tag)}
									<ProjectTag {tag} />
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</div>
</section>
