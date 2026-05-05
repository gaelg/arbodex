const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Strategy: use VERCEL_GIT_COMMIT_SHA (provided by Vercel) or git hash or package.json
let version;

// 1. Try Vercel-provided env var first (most reliable during Vercel builds)
if (process.env.VERCEL_GIT_COMMIT_SHA) {
  version = process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
} else {
  try {
    // 2. Try git command (local builds)
    version = execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
    }).trim();
  } catch (e) {
    // 3. Fallback to package.json version
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    version = packageJson.version;
  }
}

// Créer un fichier qui expose la version
const versionFile = path.join(__dirname, "..", "src", "version.ts");
const content = `export const VERSION = "${version}";\n`;

fs.writeFileSync(versionFile, content);
console.log(`Version ${version} injectée dans src/version.ts`);
