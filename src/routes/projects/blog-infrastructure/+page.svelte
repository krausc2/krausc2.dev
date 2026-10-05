<script lang="ts">
	import BackButton from "#lib/components/ui/BackButton.svelte";
</script>

<div class="relative">
	<BackButton href="/projects" />
	<p class="invisible pb-4 text-5xl leading-none font-bold">"title"</p>
</div>

<article class="mb-16 flex flex-col gap-4 border-t pt-4">
	<p class="text-2xl font-bold">Test Project</p>

	<div class="article-body">
		<p>This is a test project to verify the new layout.</p>
	</div>
</article>
