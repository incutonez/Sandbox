import { execSync } from "child_process";
import { readdirSync } from "fs";

const stdio = [0, 1, 2];
readdirSync("packages/").forEach((packageName) => {
	console.info(`Updating: ${packageName}`);
	execSync("npx npm-check-updates -u", {
		stdio,
		cwd: `packages/${packageName}`,
	});
}, {
	stdio,
});
