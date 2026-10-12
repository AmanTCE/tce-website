// Builds the site for Netlify into ./out: a static export with clean URLs
// (/about, /services/video-production). The enquiry form posts to Netlify Forms,
// so the /api route (which needs a server) is set aside during the build.
// Netlify runs this through netlify.toml; locally: npm run build:netlify.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const api = path.join(root, "app/api");
const apiAside = path.join(root, ".api-aside");

fs.renameSync(api, apiAside);
try {
  execSync("npx next build", { cwd: root, stdio: "inherit", env: { ...process.env, NETLIFY_BUILD: "1" } });
} finally {
  fs.renameSync(apiAside, api);
}
console.log("Netlify site ready in out/");
