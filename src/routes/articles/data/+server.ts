import { articles } from "./articles.js";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	return Response.json(articles);
};
