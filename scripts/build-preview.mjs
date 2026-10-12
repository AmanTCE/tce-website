// Builds a flat, path-agnostic static export of the site into ./preview.
// Every page becomes a top-level .html file and every URL is relative, so the
// preview runs from any folder or host. The contact API is excluded (static
// hosting has no server); the form says plainly that nothing is sent.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const api = path.join(root, "app/api");
const apiAside = path.join(root, ".api-aside");
const out = path.join(root, "out");
const dest = path.join(root, "preview");

fs.renameSync(api, apiAside);
try {
  execSync("npx next build", { cwd: root, stdio: "inherit", env: { ...process.env, PREVIEW: "1" } });
} finally {
  fs.renameSync(apiAside, api);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

for (const file of walk(out)) {
  const rel = path.relative(out, file);
  if (rel.endsWith(".txt") && !/^(robots|llms)\.txt$/.test(rel)) continue; // RSC payloads: not used without client routing
  if (rel.includes("/polyfills-")) continue; // legacy-browser polyfills (nomodule), not needed for the preview
  if (rel.endsWith(".woff")) continue; // every browser we target uses the .woff2 files
  // Artifact hosting reserves names starting with "_", so _next becomes next-assets.
  let target = rel.replace(/^_next\//, "next-assets/");
  if (rel.endsWith(".html")) {
    if (rel === "index.html") target = "home.html";
    else target = rel.replace(/\//g, "-");
    if (target === "_not-found.html" || target === "404.html") continue;
  }
  const to = path.join(dest, target);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (/\.(html|js|css)$/.test(rel)) {
    let s = fs.readFileSync(file, "utf8");
    if (rel.endsWith(".css")) s = s.replaceAll("/_next/static/media/", "../media/");
    else s = s.replaceAll('"/_next/', '"./next-assets/').replaceAll("'/_next/", "'./next-assets/").replaceAll("(/_next/", "(./next-assets/");
    if (rel.endsWith(".html")) s = s.replace(/<script[^>]*polyfills-[^>]*><\/script>/g, "").replaceAll('href="/brand/', 'href="./brand/').replaceAll('href="/media/', 'href="./media/').replaceAll('href="/icon.png', 'href="./icon.png').replaceAll('content="/media/', 'content="./media/');
    fs.writeFileSync(to, s);
  } else {
    fs.copyFileSync(file, to);
  }
}

// Launcher page: the artifact's entry point simply opens home.html.
fs.writeFileSync(
  path.join(dest, "index.html"),
  `<title>The Creative Economy</title>
<meta http-equiv="refresh" content="0; url=home.html">
<style>body{margin:0;background:#050913;color:#fff;font:14px/1.5 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}a{color:#8dc3f2}</style>
<p>Opening the TCE website preview… <a href="home.html">Continue</a></p>
<script>location.replace("home.html")</script>
`,
);

const files = walk(dest);
console.log(`Preview ready: ${files.length} files in ${path.relative(root, dest)}/`);
