import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { remarkReadingTime } from "./src/lib/readingTime.ts";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit({
			preprocess: [
				mdsvex({ extensions: [".md"], remarkPlugins: [remarkReadingTime] }),
				vitePreprocess()
			],
			extensions: [".svelte", ".md"],
			adapter: adapter()
		})
	]
});
