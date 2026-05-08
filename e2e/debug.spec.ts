import { test } from "@playwright/test";

test("debug: check chargerArbres output", async ({ page }) => {
  const logs: string[] = [];
  page.on("console", (msg) => logs.push(msg.text()));

  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(3000);

  // Now try to call the app's chargerArbres to see what it returns
  const result = await page.evaluate(async () => {
    try {
      // The parser is bundled as an async function i()
      // Let's manually call it
      // We can access it through the module system
      const res = await fetch("/trees.csv");
      const csv = await res.text();

      // Manual parse using the same logic as the app
      const lines = csv.split("\n");
      const headers = lines[0].split(";");
      const trees: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = line.split(";");
        const row: any = {};
        for (let j = 0; j < headers.length; j++) {
          const raw = values[j] ?? "";
          if (raw === "") {
            row[headers[j]] = "";
            continue;
          }
          const num = Number(raw);
          if (!isNaN(num)) row[headers[j]] = num;
          else row[headers[j]] = raw;
        }
        trees.push(row);
      }

      // Check key fields on first tree
      const first = trees[0];

      return {
        totalTrees: trees.length,
        firstTreeNom: first?.nom_commun,
        firstTreeFamille: first?.famille,
        firstTreeOrigine: first?.origine,
        firstTreeHauteur: first?.hauteur_max_m,
      };
    } catch (e: any) {
      return { error: e.message };
    }
  });

  console.log("Manual parse result:", JSON.stringify(result, null, 2));
  console.log("\nConsole logs:", logs.join("\n"));
});
