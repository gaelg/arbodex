import { readFileSync } from "fs";

// Calculate version once at startup
function getVersion() {
  try {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    return packageJson.version;
  } catch (e2) {
    return "0.0.111";
  }
}

const version = getVersion();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
