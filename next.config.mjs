import { execSync, execSync } from "child_process";
import { readFileSync } from "fs";

// Calculate version once at startup
function getVersion() {
  // 1. Vercel: use commit SHA (auto-set by Vercel)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  }

  // 2. Try git command locally - commit count
  try {
    const commitCount = execSync("git rev-list --count HEAD", {
      encoding: "utf8",
    }).trim();
    return commitCount;
  } catch (e) {
    // 3. Fallback to package.json
    try {
      const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
      return packageJson.version;
    } catch (e2) {
      return "0.2.0";
    }
  }
}

const version = getVersion();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
};

export default nextConfig;
