const fs = require("fs");
const { execSync } = require("child_process");
const csv = require("papaparse");

// Lire le CSV
const csvData = fs.readFileSync("public/trees.csv", "utf8");
const results = csv.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  delimiter: ";",
});

const rows = results.data;
if (rows.length === 0) {
  console.log("Aucune donnée dans le CSV");
  process.exit(1);
}

// Préparer les colonnes
const columns = Object.keys(rows[0]);
const placeholders = columns.map(() => "?").join(", ");
const columnNames = columns.map((c) => `"${c}"`).join(", ");

// Créer un fichier SQL temporaire
let sql = `DELETE FROM arbres;\n`;
rows.forEach((row) => {
  const values = columns
    .map((col) => {
      const val = row[col] || "";
      return `'${val.replace(/'/g, "''")}'`;
    })
    .join(", ");
  sql += `INSERT INTO arbres (${columnNames}) VALUES (${values});\n`;
});

fs.writeFileSync("/tmp/import.sql", sql);
console.log(`SQL généré : ${rows.length} lignes`);

// Importer dans SQLite
try {
  execSync(`sqlite3 trees.db < /tmp/import.sql`, { stdio: "inherit" });
  console.log(`${rows.length} essences importées dans trees.db`);
} catch (e) {
  console.error("Erreur import:", e.message);
}
