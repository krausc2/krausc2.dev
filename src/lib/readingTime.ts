export interface ReadingTime {
	words: number;
	minutes: number;
	text: string;
}

export function calculateReadingTime(content: string, wordsPerMinute = 200): ReadingTime {
	// Strip YAML frontmatter
	const clean = content.replace(/^---[\s\S]*?---\s*/, "");

	// Strip code blocks and HTML/Svelte tags
	const text = clean.replace(/```[\s\S]*?```/g, "").replace(/<[^>]+>/g, "");

	// Match words
	const words = text.match(/\b\w+\b/g)?.length || 0;
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

	return {
		words,
		minutes,
		text: `${minutes} min read`
	};
}

export function remarkReadingTime() {
	return function (
		_tree: unknown, // Unused
		file: { contents?: string; data: { fm?: Record<string, unknown> } }
	) {
		const raw = typeof file.contents === "string" ? file.contents : "";
		file.data.fm = file.data.fm || {};
		file.data.fm.readingTime = calculateReadingTime(raw);
	};
}
