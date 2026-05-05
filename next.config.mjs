import { execSync } from "child_process";
import { readFileSync } from "fs";

// Calculate version at build time
function getVersion() {
  // 1. Vercel: use commit SHA (auto-set by Vercel)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return "v" + process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  }

  // 2. Try git command locally - commit count
  try {
    const commitCount = execSync("git rev-list --count HEAD", {
      encoding: "utf8",
    }).trim();
    return "v" + commitCount;
  } catch (e) {
    // 3. Fallback to package.json
    try {
      const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
      return "v" + packageJson.version;
    } catch (e2) {
      return "v0.2.0";
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: getVersion(),
  },
};

export default nextConfig;
