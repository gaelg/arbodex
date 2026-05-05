import { execSync } from "child_process";
import { readFileSync } from "fs";

// Calculate version at build time
function getVersion() {
  // 1. Vercel: use commit SHA (shallow clone, git rev-list unavailable)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return "v" + process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  }

  // 2. Try git command locally - commit count for a number
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
      return "vunknown";
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
