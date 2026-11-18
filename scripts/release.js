import { execSync } from "node:child_process";

const type = process.argv[2] || "patch";
const current = execSync("git describe --tags --abbrev=0").toString().trim();
let [major, minor, patch] = current.replace(/^v/, "").split(".").map(Number);

if (type === "major") {
	major++;
	minor = 0;
	patch = 0;
} else if (type === "minor") {
	minor++;
	patch = 0;
} else if (type === "patch") {
	patch++;
} else {
	throw new Error(`Invalid release type "${type}". Expected "major", "minor", or "patch".`);
}

const next = `v${major}.${minor}.${patch}`;

execSync("git push", { stdio: "inherit" });
execSync(`git tag ${next}`, { stdio: "inherit" });
execSync(`git push origin ${next}`, { stdio: "inherit" });
