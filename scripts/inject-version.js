const fs = require("fs");
const path = require("path");

// Lire la version de package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;

// Créer un fichier qui expose la version
const versionFile = path.join(__dirname, "..", "src", "version.ts");
const content = `export const VERSION = "${version}";\n`;

fs.writeFileSync(versionFile, content);
console.log(`Version ${version} injectée dans src/version.ts`);
