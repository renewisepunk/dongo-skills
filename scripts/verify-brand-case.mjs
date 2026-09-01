import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules"]);
// Preserve exact legacy identifiers (for example, `DONGO-12`), environment
// variables such as `DONGO_TOKEN`, and required managed filenames such as
// `DONGO.managed.md`. Standalone product copy must remain lowercase.
const uppercaseBrand = /\b(?:Dongo|DONGO)\b(?![-_.])/u;

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(absolute));
    else if (entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

const files = [
  path.join(root, "README.md"),
  ...await markdownFiles(path.join(root, "skills")),
];
const violations = [];
for (const file of files) {
  const value = await readFile(file, "utf8");
  if (uppercaseBrand.test(value)) violations.push(path.relative(root, file));
}

if (violations.length > 0) {
  console.error("Skill and documentation copy must spell the brand as lowercase dongo:");
  for (const file of violations) console.error(`- ${file}`);
  process.exit(1);
}
