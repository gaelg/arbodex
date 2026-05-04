const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Utiliser le hash du commit court (ex: "104c810") ou la version de package.json
let version;
try {
  // Essayer d'obtenir le hash du commit (déploiement Vercel)
  version = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
} catch (e) {
  // Fallback : version de package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  version = packageJson.version;
}

// Créer un fichier qui expose la version
const versionFile = path.join(__dirname, "..", "src", "version.ts");
const content = `export const VERSION = "${version}";\n`;

fs.writeFileSync(versionFile, content);
console.log(`Version ${version} injectée dans src/version.ts`);
