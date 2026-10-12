// Builds the site for static hosting on Wix (Wix Headless "drop") into ./wix-site.
// Same flat export as the preview, but for real visitors: no preview notes, the
// form hands enquiries to WhatsApp, and index.html is the home page.
// Wix limits a drop to 3 MB per file and 20 MB per site, so videos are left out
// here and served from the site's Wix Media Manager instead (see README).
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const preview = path.join(root, "preview");
const dest = path.join(root, "wix-site");

execSync("node scripts/build-preview.mjs", { cwd: root, stdio: "inherit", env: { ...process.env, PUBLIC_STATIC: "1" } });

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(preview, dest, { recursive: true });
// index.html is the home page; links to home point at the site root ("./").
fs.renameSync(path.join(dest, "home.html"), path.join(dest, "index.html"));

for (const f of fs.readdirSync(path.join(dest, "media/video"))) {
  if (/\.(mp4|webm)$/.test(f)) fs.rmSync(path.join(dest, "media/video", f));
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const files = walk(dest);
const total = files.reduce((n, f) => n + fs.statSync(f).size, 0);
const big = files.filter((f) => fs.statSync(f).size > 3 * 1024 * 1024);
console.log(`Wix site ready: ${files.length} files, ${(total / 1e6).toFixed(1)} MB in wix-site/`);
if (big.length || total > 20 * 1024 * 1024) {
  console.error("Over Wix limits:", big.map((f) => path.relative(dest, f)));
  process.exit(1);
}
