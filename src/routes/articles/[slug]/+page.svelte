<script lang="ts">
	import { formatDate } from "$lib/utils";
	import BackButton from "$lib/components/ui/BackButton.svelte";
	import ReadingTime from "$lib/components/ui/ReadingTime.svelte";

	let { data } = $props();
</script>

<div class="relative">
	<BackButton href="/articles" />
	<p class="invisible pb-4 text-5xl leading-none font-bold">"title"</p>
</div>

<article class="flex flex-col border-t">
	<div class="mx-auto w-full max-w-[70ch]">
		<p class="pt-16 text-left text-2xl font-bold">{data.meta.title}</p>

		<p class="pb-8 text-sm">
			{formatDate(data.meta.date)}
			<ReadingTime readingTime={data.meta.readingTime} />
		</p>

		<div class="article-body">
			<data.content />
		</div>
	</div>
</article>
