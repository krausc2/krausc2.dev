<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";

	let { href = "/" } = $props<{ href: string }>();
</script>

<Button
	{href}
	variant="ghost"
	class="absolute top-0 left-0 z-50 flex h-12 w-12 cursor-pointer items-center justify-center border bg-stone-100 font-mono text-lg text-stone-900 transition-colors duration-700 hover:text-stone-500 hover:duration-200"
>
	&lt;
</Button>
