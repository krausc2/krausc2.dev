<script lang="ts">
	import { SPLASHES_DATA } from "#lib/splashes.svelte.js";

	const daySplashes = [...SPLASHES_DATA.day].sort((a, b) => a[0].localeCompare(b[0]));
	const nightSplashes = [...SPLASHES_DATA.night].sort((a, b) => a[0].localeCompare(b[0]));
</script>

<section class="mb-24 flex flex-col md:mb-32">
	<p class="border-b pb-4 text-5xl leading-none font-bold">splashes</p>
	<div class="flex flex-col gap-8 border-b pt-4 pb-4">
		<p>
			The following are a set of provocative, memorable, and motivating phrases I've collected from
			the media I consume. I don't endorse all of them, but they're still useful nonetheless. Spend
			some time watching them tick by, or scroll your way down... cheater.
		</p>
	</div>
	<p class="border-b pt-16 pb-4 text-xl font-bold">Daytime</p>
	<div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
		{#each daySplashes as splash (splash[0])}
			<p class="pt-4 pb-4 font-mono">{splash[0]}</p>
			<p class="pb-8 pl-4 italic md:pt-4 md:pb-4 md:pl-0">{splash[1] || " "}</p>
		{/each}
	</div>
	<p class="border-b pt-12 pb-4 text-xl font-bold">Nighttime</p>
	<div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
		{#each nightSplashes as splash (splash[0])}
			<p class="pt-4 pb-4 font-mono">{splash[0]}</p>
			<p class="pb-8 pl-4 italic md:pt-4 md:pb-4 md:pl-0">{splash[1] || " "}</p>
		{/each}
	</div>
</section>
