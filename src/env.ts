import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	PUBLIC_EMAIL: { public: true, schema: (input) => input ?? "" }
});
