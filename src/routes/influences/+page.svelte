<script lang="ts">
	import { influenceCategories } from "./data";
</script>

<section class="mb-32 flex flex-col">
	<p class="border-b pb-4 text-5xl leading-none font-bold">influences</p>

	<div class="flex flex-col gap-8 border-b border-stone-300 pt-4 pb-4">
		<p>
			An <span class="font-bold">/influences</span> page was an idea that came to me after reflecting
			on the many books, albums, and games I've found influential in some way.
		</p>
		<p>
			I wanted a place to collate, share, and reflect on how these influences have shaped my
			worldview; for <i>better</i> or <i>worse</i>, they have driven me <i>towards</i> or
			<i>away</i> from certain ideas and ways of thinking. It's not a reading list, nor a picture board,
			and not a music playlist, but rather a curated map of influences (though it can certainly be made
			up of those things).
		</p>
		<p>
			If you want to read about how to create your own influences page, you can find out more in <a
				href="#lib/articles/influences"
				class="text-custom-coral hover:underline">this article</a
			>.
		</p>
	</div>

	{#each influenceCategories as category (category.type)}
		<section class="pt-16">
			<div class="border-b pb-4">
				<span class="text-xl font-bold">{category.type}</span>
			</div>
			<ul>
				{#each category.items as item (item.title)}
					<li class="pt-4">
						<p>{item.creator} - {item.title}</p>
						<p class="pb-4 text-sm">{item.year}</p>
						<p class="text-sm">{item.reflection}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</section>
