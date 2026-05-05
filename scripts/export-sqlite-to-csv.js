const { execSync } = require("child_process");
const fs = require("fs");

try {
  // Récupérer les colonnes
  const columnsOutput = execSync(
    `sqlite3 -header -csv trees.db "SELECT * FROM arbres;"`,
    { cwd: process.cwd(), encoding: "utf8" }
  );

  // Convertir en CSV avec ; comme séparateur
  const lines = columnsOutput.trim().split("\n");
  const csvLines = lines.map((line) => {
    return line
      .split(",")
      .map((cell) => {
        // Si contient ; ou " il faut quoter
        if (cell.includes(";") || cell.includes('"')) {
          return '"' + cell.replace(/"/g, '""') + '"';
        }
        return cell;
      })
      .join(";");
  });

  const csvData = csvLines.join("\n");
  fs.writeFileSync("public/trees.csv", csvData);
  console.log("Export CSV réussi : public/trees.csv");
} catch (e) {
  console.error("Erreur export:", e.message);
}
