import { articles } from "./articles/data/articles.js";
import { projects } from "./projects/data/projects";
import type { LayoutServerLoad } from "./$types";

const counts = {
	articles: articles.length,
	projects: projects.length
};

export const load: LayoutServerLoad = () => {
	return {
		counts
	};
};
