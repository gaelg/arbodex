const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

let version = null;

// 1. Try Vercel-provided env var (for Vercel builds)
if (process.env.VERCEL_GIT_COMMIT_SHA) {
  version = process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  console.log(`Version from VERCEL_GIT_COMMIT_SHA: ${version}`);
}

// 2. Try git command (local builds or Vercel with git)
if (!version) {
  try {
    version = execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
    }).trim();
    console.log(`Version from git: ${version}`);
  } catch (e) {
    console.log("Git command failed, falling back to package.json");
  }
}

// 3. Fallback to package.json version
if (!version) {
  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    version = packageJson.version;
    console.log(`Version from package.json: ${version}`);
  } catch (e) {
    console.error("Failed to read package.json:", e.message);
    version = "unknown";
  }
}

// Create version file
const versionFile = path.join(__dirname, "..", "src", "version.ts");
const content = `export const VERSION = "${version}";\n`;

try {
  fs.writeFileSync(versionFile, content);
  console.log(`Version ${version} injectée dans src/version.ts`);
} catch (e) {
  console.error("Failed to write version file:", e.message);
  process.exit(1);
}
