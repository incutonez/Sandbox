/**
 * TODOJEF: To generate the images, we have to manually go into Unity and use the Export Sub-Sprites option that was added through a script
 * // Ref: https://stackoverflow.com/a/69829938/1253609
 */
/**
 * TODOJEF: Move this to the API... it should be what it does whenever the UI hits enums
 */
import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { glob } from "glob";
import { startCase } from "lodash-es";
import path from "path";
import { IZeldaEnum } from "./src/types/components";

const inPath = "../../ZeldaU/Assets/Scripts/Enums/";
const outPath = "src/enums/zelda/";
const imageBasePath = "src/assets/zelda/";
const SrcRegex = /^src/;

function createEnum({ matchName = "", item = "", index, items }) {
	const name = `${matchName}${item}`;
	const imagePath = `${imageBasePath}${matchName}/${item}.png`;
	let imageImport = "";
	const config: IZeldaEnum = {
		displayName: startCase(item),
		name: item,
		id: index,
	};
	items.push(name);
	if (existsSync(imagePath)) {
		imageImport = `import { default as Image${name} } from "${imagePath.replace(SrcRegex, "@")}";\n`;
		config.imageSrc = `Image${name}`;
	}
	const configStr = JSON.stringify(config).replace(/"imageSrc":"(\w+)"/, "\"imageSrc\":$1");
	return `${imageImport}export ${`const ${name}: IZeldaEnum = `} ${configStr};`;
}

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
			const matchName = match.match(/public enum ([^\r{\s]+)/)[1];
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
					output += createEnum({
						matchName,
						item,
						index,
						items,
					});
				});
			}
			else if (match.indexOf("{") === 0) {
				const parsed = JSON.parse(match.replace(/(\w+)\s*:/g, "\"$1\":"));
				for (const key in parsed) {
					output += createEnum({
						matchName,
						item: key,
						index: parsed[key],
						items,
					});
				}
			}
			output += `export ${`const ${matchName}: IZeldaEnum[] =`} [${items.join(", ").replace(/"/g, "")}];`;
		});
	return `import { IZeldaEnum } from "@/types/components";\n${output}`;
}

async function main() {
	const files = await glob(`${inPath}*.cs`, {
		ignore: [`${inPath}EnumExtensions.cs`],
	});
	const eslintFiles: string[] = [];
	for (const file of files) {
		const data = toEnum(readFileSync(file, "utf8"));
		const ext = path.extname(file);
		const baseName = path.basename(file, ext);
		const filename = `${outPath}${baseName}.ts`;
		eslintFiles.push(filename);
		writeFileSync(filename, data, {
			flag: "w+",
		});
	}
	execSync(`npx eslint --fix ${eslintFiles.join(" ")}`);
}

if (existsSync(outPath)) {
	rmSync(outPath, {
		recursive: true,
	});
}
mkdirSync(outPath);
main();
