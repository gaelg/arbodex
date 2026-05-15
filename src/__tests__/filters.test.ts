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
  applyAllFilters,
} from "@/lib/filters";

describe("Système de filtres encapsulé", () => {
  it("FILTERS contient tous les filtres essentiels", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("branches_fragiles");
    expect(keys).toContain("ph_sol");
    expect(keys).toContain("floraison_remarquable");
    expect(keys).toContain("strate");
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

  it("getFiltersBySection regroupe correctement", () => {
    const bySection = getFiltersBySection();
    expect(bySection["Climat"].length).toBeGreaterThan(0);
    expect(bySection["Climat"][0].section).toBe("Climat");
    expect(bySection["Esthétique"].length).toBe(1);
  });

  it("getDefaultFiltersState retourne un état vide", () => {
    const state = getDefaultFiltersState();
    expect(state.recherche).toBe("");
    expect(state.branches_fragiles).toBe("");
    expect(state.hauteur_min).toBe("");
  });

  it("isFilterActive : multi avec toutes les options = inactif", () => {
    const config = getFilterByKey("ph_sol")!;
    expect(isFilterActive(config, "acid,neutral,alkaline")).toBe(false);
    expect(isFilterActive(config, "acid")).toBe(true);
    expect(isFilterActive(config, "")).toBe(false);
    expect(isFilterActive(config, "acid,neutral")).toBe(true);
  });

  it("isFilterActive : exact avec valeur = actif", () => {
    const config = getFilterByKey("branches_fragiles")!;
    expect(isFilterActive(config, "non")).toBe(true);
    expect(isFilterActive(config, "")).toBe(false);
  });

  it("Multi-filtres Sol : 'all' ne doit pas être dans l'état par défaut", () => {
    const state = getDefaultFiltersState();
    expect(state.ph_sol).toBe("acid,neutral,alkaline");
    expect(state.ph_sol.split(",")).not.toContain("all");
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

  it("Section Sol contient uniquement des filtres Sol", () => {
    const bySection = getFiltersBySection();
    const solFilters = bySection["Sols"] || [];

    for (const f of solFilters) {
      expect(f.section).toBe("Sols");
    }
  });
});

it("Filtre texture : rien coché = tous les résultats", () => {
  const config = getFilterByKey("texture_sol")!;
  const arbre1 = { texture_sol: "sablonneux" } as any;
  const arbre2 = { texture_sol: "" } as any;
  const arbre3 = { texture_sol: "argileux" } as any;

  expect(applyFilter(arbre1, config, "")).toBe(true);
  expect(applyFilter(arbre2, config, "")).toBe(true);
  expect(applyFilter(arbre3, config, "")).toBe(true);
});

it("BUG stepCount : hauteur_max=20 ne doit filtrer que les arbres avec hauteur_min > 20", () => {
  const arbrePetit = { hauteur_min_m: 0.5, hauteur_max_m: 1 } as any;
  const arbreGrand = { hauteur_min_m: 15, hauteur_max_m: 25 } as any;
  const arbreTresGrand = { hauteur_min_m: 25, hauteur_max_m: 35 } as any;
  const arbreVide = { hauteur_min_m: "", hauteur_max_m: "" } as any;

  // hauteur_max=20 : ne filtre que si hauteur_min > 20
  const config = { key: "hauteur_max" } as any;

  // matchRange("", "20", 0.5, 1) → 0.5 > 20 ? non → true
  expect(
    applyAllFilters(
      [arbrePetit, arbreGrand, arbreTresGrand, arbreVide],
      { hauteur_min: "", hauteur_max: "20" } as any,
      []
    )
  ).toHaveLength(3); // tous sauf arbreTresGrand (hauteur_min=25 > 20)
});

it("Filtre texture : sablonneux coché = sablonneux + sans contrainte", () => {
  const config = getFilterByKey("texture_sol")!;
  const arbreSablonneux = { texture_sol: "sablonneux" } as any;
  const arbreSansContrainte = { texture_sol: "" } as any;
  const arbreArgileux = { texture_sol: "argileux" } as any;

  expect(applyFilter(arbreSablonneux, config, "sandy")).toBe(true);
  expect(applyFilter(arbreSansContrainte, config, "sandy")).toBe(true);
  expect(applyFilter(arbreArgileux, config, "sandy")).toBe(false);
});
