<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = "" }: Props = $props();
</script>

<span class="inline-flex items-baseline gap-1 text-3xl {className}">
	<span class="inline-block w-[1ch] animate-bounce text-center [animation-delay:-0.32s]">.</span>
	<span class="inline-block w-[1ch] animate-bounce text-center [animation-delay:-0.16s]">.</span>
	<span class="inline-block w-[1ch] animate-bounce text-center">.</span>
</span>
