export interface Project {
	slug: string;
	title: string;
	tags: string[];
	description: string;
}

export const projects: Project[] = [
	{
		slug: "blog-site",
		title: "krausc2.dev (Site)",
		tags: ["TypeScript", "Svelte"],
		description:
			"Lightweight blog frontend designed to run on self-hosted infrastructure, with a variety of optimisations such as sveltejs/enhanced-img and minimal external dependencies."
	},
	{
		slug: "blog-infrastructure",
		title: "krausc2.dev (Infrastructure)",
		tags: ["Docker", "Cloudflare", "GitHub Actions", "Tailscale", "Alpine Linux"],
		description:
			"Self-hosted blog infrastructure. Runs on a headless ARM machine over residential Wi-Fi, pushing delivery to the edge for reduced latency/load on local resources."
	}
];
