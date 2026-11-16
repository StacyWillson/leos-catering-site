import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = new URL(".", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const output = join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const entries = await readdir(root, { withFileTypes: true });
for (const entry of entries) {
  if (entry.name === "dist" || entry.name.startsWith(".")) continue;
  if (entry.name === "node_modules" || entry.name === "build.mjs" || entry.name === "package.json" || entry.name === "README.md") continue;
  if (entry.isDirectory() && entry.name !== "assets") continue;
  await cp(join(root, entry.name), join(output, entry.name), { recursive: true });
}

console.log("Built static site in dist/");

