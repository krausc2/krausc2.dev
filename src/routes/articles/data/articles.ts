import type { ReadingTime } from "#lib/readingTime.js";

// Define Article interface with optional fields
export interface Article {
	slug: string;
	title?: string;
	date?: string;
	lastModified?: string;
	tag?: string;
	readingTime?: ReadingTime;
}

const imports = import.meta.glob("#lib/articles/*.md", { eager: true });

export const articles: Article[] = Object.entries(imports).map(([filepath, module]) => {
	const contents = module as { metadata?: Partial<Article> };
	const cleanPath = filepath.replaceAll("\\", "/");
	const slug = cleanPath.slice(cleanPath.lastIndexOf("/") + 1, cleanPath.lastIndexOf("."));
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

articles.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

export const newestArticle = articles[0];
