import { execSync } from "child_process";
import { readFileSync } from "fs";

// Calculate version at build time
function getVersion() {
  // 1. Vercel: use commit count from env (set in Vercel dashboard)
  if (process.env.NEXT_PUBLIC_VERSION) {
    return "v" + process.env.NEXT_PUBLIC_VERSION;
  }

  // 2. Try git command locally - commit count for a number
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: getVersion(),
  },
};

export default nextConfig;
