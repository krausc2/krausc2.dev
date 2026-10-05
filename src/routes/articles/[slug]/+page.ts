import { error } from "@sveltejs/kit";
import type { Article } from "../data/+server";

export async function load({ params }) {
	try {
		const article = await import(`#lib/articles/${params.slug}.md`);
		const meta = (article.metadata as Partial<Article>) || {};

		return {
			content: article.default,
			meta: {
				...meta,
				title: meta.title || "UNDEFINED",
				date: (meta.date || "UNDEFINED").slice(0, 10),
				lastModified: (meta.lastModified || meta.date || "UNDEFINED").slice(0, 10),
				tag: meta.tag || "UNDEFINED"
			}
		};
		// For resource that is not found, display 404
		// #TODO: Create a custom set of error message pages
	} catch {
		throw error(404, `Could not find ${params.slug}`);
	}
}
