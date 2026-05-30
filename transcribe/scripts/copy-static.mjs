import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = resolve(root, "dist");

await mkdir(dist, { recursive: true });
await copyFile(resolve(root, "manifest.json"), resolve(dist, "manifest.json"));
await copyFile(resolve(dist, "src/popup/popup.html"), resolve(dist, "popup.html"));
await copyFile(resolve(dist, "src/offscreen/offscreen.html"), resolve(dist, "offscreen.html"));
