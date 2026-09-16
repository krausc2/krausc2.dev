import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { remarkReadingTime } from "./src/lib/readingTime.ts";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({
			extensions: [".md"],
			remarkPlugins: [remarkReadingTime]
		}),
		vitePreprocess()
	],
	extensions: [".svelte", ".md"]
};

export default config;
