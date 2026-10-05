import { projects } from "./projects/data/projects";
import type { LayoutServerLoad } from "./$types";

const articleFiles = import.meta.glob("#lib/articles/*.md");

const counts = {
	articles: Object.keys(articleFiles).length,
	projects: projects.length
};

export const load: LayoutServerLoad = () => {
	return {
		counts
	};
};
