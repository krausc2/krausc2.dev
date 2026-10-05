import { projects } from "./projects";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	return Response.json(projects);
};
