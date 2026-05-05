import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";

// Calculate version once at startup
const version = (() => {
  // 1. Check for version file (written by CI/CD)
  if (existsSync(".version")) {
    return "v" + readFileSync(".version", "utf8").trim();
  }

  // 2. Vercel: use commit SHA (auto-set by Vercel)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return "v" + process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  }

  // 3. Try git command locally - commit count
  try {
    const commitCount = execSync("git rev-list --count HEAD", {
      encoding: "utf8",
    }).trim();
    return "v" + commitCount;
  } catch (e) {
    // 4. Fallback to package.json
    try {
      const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
      return "v" + packageJson.version;
    } catch (e2) {
      return "v0.2.0";
    }
  }
})();

// Write version to file for persistence (if not already written by CI)
try {
  if (!existsSync(".version")) {
    writeFileSync(".version", version.replace("v", ""));
  }
} catch (e) {
  // Ignore write errors
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
};

export default nextConfig;
