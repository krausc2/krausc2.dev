import { json } from "@sveltejs/kit";
import * as path from "node:path";
import type { RequestHandler } from "./$types";
import type { ReadingTime } from "$lib/readingTime";

// Define Article interface with optional fields
export interface Article {
	slug: string;
	title?: string;
	date?: string;
	lastModified?: string;
	tag?: string;
	readingTime?: ReadingTime;
}

const imports = import.meta.glob("$lib/articles/*.md", { eager: true });

const articleCache: Article[] = Object.entries(imports).map(([filepath, module]) => {
	const contents = module as { metadata?: Partial<Article> };
	const slug = path.parse(filepath).name;
	const meta = contents.metadata || {};

	return {
		slug,
		title: meta.title || "UNDEFINED",
		date: (meta.date || "UNDEFINED").slice(0, 10),
		lastModified: (meta.lastModified || meta.date || "UNDEFINED").slice(0, 10),
		tag: meta.tag || "UNDEFINED",
		readingTime: meta.readingTime
	};
});

articleCache.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

export const GET: RequestHandler = async () => {
	return json(articleCache);
};
