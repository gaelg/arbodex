import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const CSV_PATH = path.resolve(__dirname, "../../public/trees.csv");
const NB_COLONNES = 39;
const COLONNES_NUMERIQUES = [
  "hauteur_min_m",
  "hauteur_max_m",
  "envergure_min_m",
  "envergure_max_m",
  "rusticite_min_C",
];
const COLONNES_REQUISES = ["nom_commun", "nom_scientifique"];

function parseCSV(): Record<string, string>[] {
  const csv = fs.readFileSync(CSV_PATH, "utf-8");
  const result = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";",
  });
  return result.data;
}

describe("Intégrité du CSV", () => {
  const rows = parseCSV();

  it("a le bon nombre de colonnes dans l'en-tête", () => {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    const header = csv.split("\n")[0];
    expect(header.split(";").length).toBe(NB_COLONNES);
  });

  it("contient des données", () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  it("a le même nombre de colonnes pour chaque ligne", () => {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    const lignes = csv.trim().split("\n");
    for (let i = 1; i < lignes.length; i++) {
      const nf = lignes[i].split(";").length;
      expect(
        nf,
        `Ligne ${i + 1} a ${nf} colonnes au lieu de ${NB_COLONNES}`
      ).toBe(NB_COLONNES);
    }
  });

  it("colonnes obligatoires non vides", () => {
    for (const col of COLONNES_REQUISES) {
      for (let i = 0; i < rows.length; i++) {
        expect(
          rows[i][col]?.trim(),
          `Ligne ${i + 2} : ${col} est vide`
        ).toBeTruthy();
      }
    }
  });

  it("famille non vide ressemble à une famille botanique", () => {
    for (let i = 0; i < rows.length; i++) {
      const famille = rows[i].famille?.trim();
      if (!famille) continue;
      expect(
        famille.endsWith("aceae"),
        `Ligne ${i + 2} : famille="${famille}" ne ressemble pas à une famille botanique`
      ).toBe(true);
    }
  });

  it("origine non vide est une valeur attendue", () => {
    for (let i = 0; i < rows.length; i++) {
      const origine = rows[i].origine?.trim();
      if (!origine) continue;
      expect(
        [
          "Indigène",
          "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux",
          "Vraiment exotique",
        ].includes(origine),
        `Ligne ${i + 2} : origine="${origine}" inattendue`
      ).toBe(true);
    }
  });

  it("colonnes numériques contiennent des nombres valides", () => {
    for (const col of COLONNES_NUMERIQUES) {
      for (let i = 0; i < rows.length; i++) {
        const val = rows[i][col]?.trim();
        if (val) {
          expect(
            isNaN(Number(val)),
            `Ligne ${i + 2} : ${col}="${val}" n'est pas un nombre`
          ).toBe(false);
        }
      }
    }
  });
});
