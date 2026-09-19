import krausc2 from "$lib/assets/krausc2-dev.mp4";

export interface Project {
	slug: string;
	title: string;
	tags: string[];
	description: string;
	video?: string;
}

export const projects: Project[] = [
	{
		slug: "blog-infrastructure",
		title: "krausc2.dev",
		tags: ["Svelte", "Docker", "Cloudflare", "GitHub Actions"],
		description:
			"Self-hosted blog infrastructure. Runs on a headless ARM machine over residential Wi-Fi, pushing delivery to the edge for reduced latency/load on local resources.",
		video: krausc2
	}
];
