import { describe, it, expect } from "vitest";
import {
  FILTERS,
  getFilterByKey,
  getFiltersBySection,
  getAllSections,
  getDefaultFiltersState,
  isFilterActive,
  FilterConfig,
  applyFilter,
} from "@/lib/filters";

describe("Système de filtres encapsulé", () => {
  it("FILTERS contient tous les filtres essentiels", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("mellifere");
    expect(keys).toContain("branches_fragiles");
    expect(keys).toContain("frequence_taille");
  });

  it("Sections sont correctement définies", () => {
    const sections = getAllSections();
    expect(sections).not.toContain("Essence");
    expect(sections).toContain("Sols");
    expect(sections).toContain("Climat");
    expect(sections).toContain("Demandes particulières");
    expect(sections).toContain("Esthétique");
    expect(sections).toContain("Contraintes du projet");
  });

  it("getFilterByKey retourne la bonne config pour mellifere", () => {
    const f = getFilterByKey("mellifere");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
    expect(f?.section).toBe("Demandes particulières");
    expect(f?.options).toContain("all");
    expect(f?.optionLabels?.["oui"]).toBe("Oui");
  });

  it("getFiltersBySection regroupe correctement", () => {
    const bySection = getFiltersBySection();
    expect(bySection["Climat"].length).toBeGreaterThan(0);
    expect(bySection["Climat"][0].section).toBe("Climat");
    expect(bySection["Esthétique"].length).toBe(2);
  });

  it("getDefaultFiltersState retourne un état vide", () => {
    const state = getDefaultFiltersState();
    expect(state.recherche).toBe("");
    expect(state.mellifere).toBe("");
    expect(state.hauteur_min).toBe("");
  });

  it("isFilterActive : multi avec toutes les options = inactif", () => {
    const config = getFilterByKey("sol_acidity")!;
    expect(isFilterActive(config, "acid,neutral,alkaline")).toBe(false);
    expect(isFilterActive(config, "acid")).toBe(true);
    expect(isFilterActive(config, "")).toBe(false);
    expect(isFilterActive(config, "acid,neutral")).toBe(true);
  });

  it("isFilterActive : relatif/exact avec valeur = actif", () => {
    const config = getFilterByKey("mellifere")!;
    expect(isFilterActive(config, "oui")).toBe(true);
    expect(isFilterActive(config, "")).toBe(false);
  });

  it("Multi-filtres Sol : 'all' ne doit pas être dans l'état par défaut", () => {
    const state = getDefaultFiltersState();
    expect(state.sol_acidity).toBe("acid,neutral,alkaline");
    expect(state.sol_acidity.split(",")).not.toContain("all");
  });

  it("Types de filtres sont valides", () => {
    FILTERS.forEach((f: FilterConfig) => {
      expect([
        "exact",
        "partial",
        "range",
        "relative",
        "numeric",
        "search",
        "multi",
        "slider",
      ]).toContain(f.type);
    });
  });

  it("Filtres slider ont une échelle ordonnée", () => {
    const f = getFilterByKey("cout_entretien");
    expect(f?.order).toBeDefined();
    const order = f!.order!;
    expect(order["faible"]).toBeLessThan(order["élevé"]);
  });

  it("Filtres Services présents", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("mellifere");
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
  });

  it("Filtre mellifere a les bonnes options", () => {
    const f = getFilterByKey("mellifere");
    expect(f).toBeDefined();
    expect(f?.options).toContain("all");
    expect(f?.options).toContain("oui");
    expect(f?.options).not.toContain("yes");
  });

  it("Filtre mellifere est de type exact", () => {
    const f = getFilterByKey("mellifere");
    expect(f?.type).toBe("exact");
    expect(f?.options).toContain("all");
    expect(f?.optionLabels?.["oui"]).toBe("Oui");
  });

  it("Filtre ombrage_fort est de type exact", () => {
    const f = getFilterByKey("ombrage_fort");
    expect(f?.type).toBe("exact");
    expect(f?.options).toContain("all");
    expect(f?.optionLabels?.["oui"]).toBe("Oui");
  });

  it("Filtre rafraichissement_fort est de type exact", () => {
    const f = getFilterByKey("rafraichissement_fort");
    expect(f?.type).toBe("exact");
    expect(f?.options).toContain("fort");
    expect(f?.optionLabels?.["fort"]).toBe("Fort");
  });

  it("Section Sol contient uniquement des filtres Sol", () => {
    const bySection = getFiltersBySection();
    const solFilters = bySection["Sols"] || [];

    for (const f of solFilters) {
      expect(f.section).toBe("Sols");
    }
  });
});

it("Filtre texture : rien coché = tous les résultats", () => {
  const config = getFilterByKey("sol_texture")!;
  const arbre1 = { sol_texture: "sablonneux" } as any;
  const arbre2 = { sol_texture: "" } as any;
  const arbre3 = { sol_texture: "argileux" } as any;

  // Rien coché (valeur vide)
  expect(applyFilter(arbre1, config, "")).toBe(true);
  expect(applyFilter(arbre2, config, "")).toBe(true);
  expect(applyFilter(arbre3, config, "")).toBe(true);
});

it("sol_depth : slider profondeur de sol (cm)", () => {
  const config = getFilterByKey("sol_depth")!;
  expect(config.type).toBe("slider");

  const arbre60 = { sol_depth: "60" } as any;
  const arbre150 = { sol_depth: "150" } as any;
  const arbreVide = { sol_depth: "" } as any;

  // User sets soil depth to 80cm → species rooting >80cm are hidden
  expect(applyFilter(arbre60, config, "80")).toBe(true); // 60 ≤ 80 → ok
  expect(applyFilter(arbre150, config, "80")).toBe(false); // 150 > 80 → caché
  expect(applyFilter(arbreVide, config, "80")).toBe(true); // pas de donnée → ok

  // No filter selected → all pass
  expect(applyFilter(arbre60, config, "")).toBe(true);
  expect(applyFilter(arbre150, config, "")).toBe(true);
});

it("Filtre texture : sablonneux coché = sablonneux + sans contrainte", () => {
  const config = getFilterByKey("sol_texture")!;
  const arbreSablonneux = { sol_texture: "sablonneux" } as any;
  const arbreSansContrainte = { sol_texture: "" } as any;
  const arbreArgileux = { sol_texture: "argileux" } as any;

  // "sandy" coché (machine name pour "Sablonneux")
  expect(applyFilter(arbreSablonneux, config, "sandy")).toBe(true);
  expect(applyFilter(arbreSansContrainte, config, "sandy")).toBe(true);
  expect(applyFilter(arbreArgileux, config, "sandy")).toBe(false);
});
