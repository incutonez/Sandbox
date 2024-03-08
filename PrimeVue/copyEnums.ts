/**
 * TODOJEF: To generate the images, we have to manually go into Unity and use the Export Sub-Sprites option that was added through a script
 * // Ref: https://stackoverflow.com/a/69829938/1253609
 */
/**
 * TODOJEF: Move this to the API... it should be what it does whenever the UI hits enums
 */
import { execSync } from "child_process";
import fs from "fs";
import { glob } from "glob";
import path from "path";

const inPath = "../../ZeldaU/Assets/Scripts/Enums/";
const outPath = "src/enums/";

/**
 * This takes a C# enum and turns it into a JSON string
 * @param {String} data
 * @returns {String}
 */
function toEnum(data) {
	let output = "";
	data
		.trim()
		.match(/public enum [^}]+}/g)
		.forEach((match) => {
			// Get the name of the enum
			const matchName = "Zelda" + match.match(/public enum ([^\r{\s]+)/)[1];
			const items: string[] = [];
			// Need the trim because there's some sort of zwnbsp character that'll show up
			match = match
				.trim()
				.replace(/public enum [^{]+/, "")
				// Remove any special descriptions
				// Change = to :
				// Remove any comments
				.replace(/\/\/\/?[^\n]+\n/g, "")
				.replace(/=/g, ":");
			if (match.indexOf("Color(") !== -1) {
				const matches = match.match(/(.*Color\([^)]+.*\r\n)?.*[\w]+[^\r\n]+/g);
				const lastMatch = matches.length - 1;
				matches.forEach((item, index) => {
					const color = item.match(/(?:Color\()([^)]+)/)?.[1];
					if (color) {
						const temp = item.replace(",", `: ${color}`);
						const [, prop] = temp.match(/\r\n\s*(([^:]+\s*:)\s*[^\r\n]+)/);
						match = match.replace(item, prop + (lastMatch === index ? "" : ","));
					}
				});
			}
			match = match.replace(/\[[^\]]+\]\r\n/g, "").replace(/\r\n/g, "");
			// If there are no default values, let's create them
			if (match.indexOf(":") === -1) {
				const parsed: string[] = match.replace(/\s+/g, "")
					.replace(/\{|\}/g, "")
					.split(/([^,]+),/)
					.filter((item) => !!item) ?? [];
				parsed.forEach((item, index) => {
					const name = `${matchName}${item}`;
					output += `export ${`const ${name}: IOption = `} ${JSON.stringify({
						name,
						id: index,
					})};`;
					items.push(name);
				});
			}
			else if (match.indexOf("{") === 0) {
				const parsed = JSON.parse(match.replace(/(\w+)\s*:/g, "\"$1\":"));
				for (const key in parsed) {
					const name = `${matchName}${key}`;
					output += `export ${`const ${name}: IOption = `} ${JSON.stringify({
						name,
						id: parsed[key],
					})};`;
					items.push(name);
				}
			}
			output += `export ${`const ${matchName}: IOption[] =`} [${items.join(", ").replace(/"/g, "")}];`;
		});
	return `import { IOption } from "@/types/components";\n${output}`;
}

async function main() {
	const files = await glob(`${inPath}*.cs`, {
		ignore: [`${inPath}EnumExtensions.cs`],
	});
	const eslintFiles: string[] = [];
	for (const file of files) {
		const data = toEnum(fs.readFileSync(file, "utf8"));
		const ext = path.extname(file);
		const baseName = path.basename(file, ext);
		const filename = `${outPath}Zelda${baseName}.ts`;
		eslintFiles.push(filename);
		fs.writeFileSync(filename, data, {
			flag: "w+",
		});
	}
	execSync(`npx eslint --fix ${eslintFiles.join(" ")}`);
}

if (fs.existsSync(outPath)) {
	fs.rmSync(outPath, {
		recursive: true,
	});
}
fs.mkdirSync(outPath);
main();
