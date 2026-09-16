<script lang="ts">
	import type { ReadingTime as ReadingTimeType } from "$lib/readingTime";

	let { readingTime } = $props<{
		readingTime?: ReadingTimeType;
	}>();
</script>

{#if readingTime}
	<span> | {readingTime.text}</span>
{/if}
