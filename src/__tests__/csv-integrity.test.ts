import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import {
  applyAllFilters,
  FILTERS,
  getDefaultFiltersState,
  applyFilter,
  getFilterByKey,
} from "@/lib/filters";
import type { Arbre } from "@/lib/trees";

const CSV_PATH = path.resolve(__dirname, "../../public/trees.csv");
const NB_COLONNES = 19;
const COLONNES_NUMERIQUES = [
  "hauteur_min_m",
  "hauteur_max_m",
  "envergure_min_m",
  "envergure_max_m",
  "rusticite_celsius",
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

  it("des espèces non-arbre ont hauteur_min_m < 5m (les crans doivent les couvrir)", () => {
    const nonArbres = rows.filter(
      (r) => r.strate && r.strate !== "arbre" && r.hauteur_min_m
    );
    const avecPetiteHauteur = nonArbres.filter(
      (r) => Number(r.hauteur_min_m) < 5
    );
    expect(avecPetiteHauteur.length).toBeGreaterThan(0);
  });

  it("RED 1 : la colonne 'strate' remplace 'port' dans l'en-tête", () => {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    const header = csv.split("\n")[0];
    const cols = header.split(";");
    expect(cols).toContain("strate");
    expect(cols).not.toContain("port");
  });

  it("Corylus avellana (Noisetier commun) est présent dans les données", () => {
    const row = rows.find((r) => r.nom_scientifique === "Corylus avellana");
    expect(row).toBeDefined();
    expect(row?.nom_commun).toBe("Noisetier commun");
    expect(row?.origine).toBe("Indigène");
  });

  it("resiste_changement_climatique = 'oui' existe dans les données", () => {
    const ouiCount = rows.filter(
      (r) => r.resiste_changement_climatique === "oui"
    ).length;
    expect(ouiCount).toBeGreaterThan(0);
  });

  it("BUG 1 : resiste_changement_climatique='oui' donne des résultats non-nuls", () => {
    const defaults = getDefaultFiltersState() as any;
    defaults.resiste_changement_climatique = "oui";
    const result = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("BUG 2 : Acidité (ph_sol) donne des résultats différents selon le choix", () => {
    const base = getDefaultFiltersState() as any;

    base.ph_sol = "acid";
    const acidCount = applyAllFilters(
      rows as unknown as Arbre[],
      base,
      FILTERS
    ).length;

    base.ph_sol = "neutral";
    const neutralCount = applyAllFilters(
      rows as unknown as Arbre[],
      base,
      FILTERS
    ).length;

    base.ph_sol = "alkaline";
    const alkalineCount = applyAllFilters(
      rows as unknown as Arbre[],
      base,
      FILTERS
    ).length;

    expect(acidCount).not.toBe(neutralCount);
    expect(neutralCount).not.toBe(alkalineCount);
    expect(acidCount).not.toBe(alkalineCount);
  });

  it("BUG 3 : pollen_allergisant='faible' donne des résultats non-nuls", () => {
    const defaults = getDefaultFiltersState() as any;
    defaults.pollen_allergisant = "faible";
    const result = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("Vérifie que les 3 bugs signalés ne sont pas reproductibles au niveau filtre", () => {
    const defaults = getDefaultFiltersState() as any;

    defaults.resiste_changement_climatique = "oui";
    const climat = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );

    defaults.resiste_changement_climatique = "";
    defaults.ph_sol = "acid";
    const phAcid = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );

    defaults.ph_sol = "";
    defaults.pollen_allergisant = "faible";
    const pollen = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );

    // Les bugs signalent "zéro résultat" — vérifions que ce n'est pas le cas
    expect(climat.length).toBeGreaterThan(0);
    expect(phAcid.length).toBeGreaterThan(0);
    expect(pollen.length).toBeGreaterThan(0);
  });

  // Note : le CSV utilise CRLF. trees.ts parseCSV() doit .trim() l'en-tête
  // pour éviter que headers[N] = "origine\r" au lieu de "origine".
  // Sans cela, arbre.origine est undefined et le filtre Indigène retourne 0.

  it("BUG origine : filtrer par Indigène retourne des résultats (régression CRLF)", () => {
    const defaults = getDefaultFiltersState() as any;
    defaults.origine = "Indigène";
    const result = applyAllFilters(
      rows as unknown as Arbre[],
      defaults,
      FILTERS
    );
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.find((r) => r.nom_commun === "Noisetier commun")
    ).toBeDefined();
  });

  it("a le bon nombre de colonnes dans l'en-tête", () => {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    const header = csv.split("\n")[0];
    const cols = header.split(";");
    expect(cols.length).toBe(NB_COLONNES);
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

  it("famille_botanique non vidrafficheriche à une famille botanique", () => {
    for (let i = 0; i < rows.length; i++) {
      const famille_botanique = rows[i].famille_botanique?.trim();
      if (!famille_botanique) continue;
      expect(
        famille_botanique.endsWith("aceae"),
        `Ligne ${i + 2} : famille_botanique="${famille_botanique}" ne ressemble pas à une famille botanique`
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
