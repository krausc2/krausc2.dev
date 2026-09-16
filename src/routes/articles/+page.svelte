<!--
#TODO:

Research load functions in Svelte and if that would be better than the below solution.

When article loading becomes prohibitively slow, consider converting setup to pagination and a server-side lazy load cache singleton. Create `src/lib/server/articles.ts` file 

Keep the throbber for UX and initial cache miss.

Add search by tags and keyword on server cache.

* let articleCache = null;
* ...
* const imports = import.meta.glob("$lib/articles/*.md");
* ... sort articles etc
* articleCache = loadedArticles;
* return articleCache;
-->

<script lang="ts">
	import { fade } from "svelte/transition";
	import { formatDate } from "$lib/utils";
	import ReadingTime from "$lib/components/ui/ReadingTime.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<section class="mb-32">
	<div class="mx-auto max-w-[100ch] px-8 pt-16">
		<p class="border-b pb-4 text-5xl leading-none font-bold">articles</p>

		<div class="mb-8 flex flex-col gap-8 border-b border-stone-300 pt-8 pb-8">
			<p>
				This is a collection of articles I've written on a wide variety of topics including:
				tutorials, reviews for books (and albums), philosophy, and other shower thoughts.
			</p>
		</div>
	</div>

	<!-- #TODO Add search function -->
	<!-- #TODO Add tag pill buttons -->
	<!-- #TODO Colours for each tag based on vibes -->
	<div class="grid">
		{#await data.streamed.articles}
			<div
				class="col-start-1 row-start-1 mx-auto max-w-[100ch] animate-pulse px-8 pt-12"
				out:fade={{ duration: 150 }}
			>
				There is no server error. Your internet just genuinely sucks...
			</div>
		{:then articles}
			<div class="col-start-1 row-start-1">
				{#each articles as article, i (article.slug)}
					<a
						href="/articles/{article.slug}"
						class="group relative block py-8"
						in:fade|global={{ duration: 150, delay: 150 + i * 150 }}
					>
						<div
							class="pointer-events-none absolute inset-0 z-0 transform-gpu bg-linear-to-r from-white to-stone-100 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:duration-200"
						></div>
						<div class="relative z-10 mx-auto max-w-[70ch] px-8">
							<p class="text-xl font-bold">{article.title}</p>
							<div class="flex flex-col md:flex-row md:items-baseline md:justify-between">
								<p class="text-sm">
									{formatDate(article.date)}
									<ReadingTime readingTime={article.readingTime} />
								</p>
								<p class="font-mono text-sm text-custom-coral">#{article.tag}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</div>
</section>
