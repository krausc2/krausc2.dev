<script lang="ts">
	import { mount } from "svelte";
	import { formatDate } from "#lib/utils.js";
	import BackButton from "#lib/components/ui/BackButton.svelte";
	import ReadingTime from "#lib/components/ui/ReadingTime.svelte";
	import External from "#lib/components/ui/svg-icons/External.svelte";

	let { data } = $props();

	function externalLinks(node: HTMLElement) {
		node.querySelectorAll("a").forEach((link) => {
			if (
				link.hostname !== window.location.hostname ||
				link.getAttribute("href")?.startsWith("http")
			) {
				link.target = "_blank";
				link.rel = "noopener noreferrer";
				link.classList.add("inline-flex", "items-center", "gap-1");
				mount(External, { target: link });
			}
		});
	}
</script>

<div class="relative">
	<BackButton href="/articles" />
	<p class="invisible pb-4 text-5xl leading-none font-bold">"title"</p>
</div>

<article class="flex flex-col border-t">
	<div class="mx-auto w-full max-w-[70ch] min-w-0">
		<p class="pt-16 text-left text-3xl font-bold">{data.meta.title}</p>

		<p class="pb-8 text-sm">
			{formatDate(data.meta.date)}
			<ReadingTime readingTime={data.meta.readingTime} />
		</p>

		<div class="article-body pb-24" use:externalLinks>
			<data.content />
		</div>
	</div>
</article>
