import { execSync } from "child_process";

const apps = ["ZeldaWorldBuilder/ui", "Differ/api", "Differ/ui", "Differ/shared", "TipTap", "Modeling", "PrimeVue", "API", "APISpec"];
apps.forEach((app) => {
	console.info(`Updating: ${app}`);
	const out = execSync("npx npm-check-updates -u", {
		cwd: app,
	});
	console.info(out.toString());
});
