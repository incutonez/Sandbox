import fs from "fs";

let [pathToDir] = process.argv.slice(2);
const GuidRegex = /_[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}|\[Explicit\]/ig;
if (!pathToDir) {
	throw Error("Please specify the path!");
}
pathToDir = pathToDir.replace("\"", "");
fs.readdirSync(pathToDir).forEach((file) => {
	if (GuidRegex.test(file)) {
		file = `${pathToDir}\\${file}`;
		fs.renameSync(file, file.replace(GuidRegex, ""));
	}
});
