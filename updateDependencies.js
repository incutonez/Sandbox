import { execSync } from "child_process";

const apps = [
	"TipTap",
	"Modeling",
	"ui",
	"api",
	"spec",
];
apps.forEach((app) => {
	console.info(`Updating: ${app}`);
	const out = execSync("npx npm-check-updates -u", {
		cwd: app,
	});
	console.info(out.toString());
});
