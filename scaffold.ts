// Run with `npx tsx scaffold.ts -n projectNameHere`
import { execSync } from "child_process";
import { cpSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";

const { argv } = process;
const stdio = [0, 1, 2];
const directoryPathIndex = argv.indexOf('-d');
const projectNameIndex = argv.indexOf('-n');
const projectRootDir = directoryPathIndex === -1 ? '.' : argv[directoryPathIndex + 1] || ".";
const projectName = argv[argv.indexOf('-n') + 1];
const Packages = [
    "@material-symbols/svg-400",
];
const PackagesDev = [
    "@incutonez/eslint-plugin",
    "@stylistic/eslint-plugin-ts",
    "globals",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "vite-svg-loader",
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "eslint-plugin-simple-import-sort",
    "eslint-plugin-tailwindcss",
    "eslint-plugin-vue",
    "typescript-eslint",
    "@eslint/js",
    "eslint",
    "husky",
    "lint-staged",
    "semantic-release",
    "@semantic-release/exec",
    "@semantic-release/git",
];

if (projectNameIndex === -1 || !projectName) {
    console.error('Project name not specified.  Please add `-n ProjectNameHere` when running this command.')
    process.exit(1);
}
const projectDir = `${projectRootDir}/${projectName}`;
const PostInstallCommands = [
    `cd "${projectDir}"`,
    "npm i",
    `npm i ${Packages.join(' ')}`,
    `npm i -D ${PackagesDev.join(' ')}`,
    "npx tailwindcss init",
    "npx husky init"
]
execSync(`npm create vite@latest ${projectName}`, {
    // We need to specify std in, out, and err, so we get the appropriate options when this command runs
    stdio,
    cwd: projectRootDir
});
execSync(PostInstallCommands.join(' && '), {
    stdio
});
cpSync(`${import.meta.dirname}/scaffold`, projectDir, { force: true, recursive: true });
rmSync(`${projectDir}/tailwind.config.js`);
rmSync(`${projectDir}/public`, { force: true, recursive: true });
rmSync(`${projectDir}/src/assets`, { force: true, recursive: true });
// Just easier to remove the dir entirely and remake it after
rmSync(`${projectDir}/src/components`, { force: true, recursive: true });
mkdirSync(`${projectDir}/src/components`);
const packageContents = JSON.parse(readFileSync(`${projectDir}/package.json`, 'utf8'))
packageContents.name = `@incutonez/${packageContents.name}`;
packageContents.version = "0.0.1";
packageContents["lint-staged"] = {
    "*.{js,mjs,cjs,jsx,ts,tsx,vue}": [
        "npx eslint --fix"
    ]
}
packageContents.release = {
    "branches": [
        "main"
    ],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/npm",
            {
                "npmPublish": false
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ]
};
writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageContents, null, 2));
