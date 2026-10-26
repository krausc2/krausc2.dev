<script lang="ts">
	import type { Picture } from "@sveltejs/enhanced-img";

	let {
		src,
		alt = "",
		class: className = ""
	}: {
		src: Picture;
		alt?: string;
		class?: string;
	} = $props();
</script>

<picture class="block">
	{#each Object.entries(src.sources) as [format, srcset] (format)}
		<source {srcset} type="image/{format}" />
	{/each}
	<img
		src={src.img.src}
		{alt}
		width={src.img.w}
		height={src.img.h}
		class={className}
		loading="lazy"
	/>
</picture>
