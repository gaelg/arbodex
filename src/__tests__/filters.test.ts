import { describe, it, expect } from "vitest";
import {
  FILTERS,
  getFilterByKey,
  getFiltersBySection,
  getAllSections,
  getDefaultFiltersState,
  FilterConfig,
  FilterType,
} from "@/lib/filters";

describe("Système de filtres encapsulé", () => {
  it("FILTERS contient tous les filtres essentiels", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("origine");
    expect(keys).toContain("resistance_secheresse");
    expect(keys).toContain("mellifere");
    expect(keys).toContain("branches_fragiles");
    expect(keys).toContain("frequence_taille");
  });

  it("Sections sont correctement définies", () => {
    const sections = getAllSections();
    expect(sections).not.toContain("Essence");
    expect(sections).toContain("Sol");
    expect(sections).toContain("Climat");
    expect(sections).toContain("Services");
    expect(sections).toContain("Esthétique");
    expect(sections).toContain("Contraintes et risques");
    expect(sections).toContain("Entretien");
  });

  it("getFilterByKey retourne la bonne config", () => {
    const f = getFilterByKey("origine");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
    expect(f?.section).toBe("Services");
    expect(f?.options).toContain("Tous");
    expect(f?.options).toContain("Europe de l'Ouest");
    expect(f?.options).toContain("Indigène");
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
    expect(state.origine).toBe("");
    expect(state.hauteur_min).toBe("");
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
      ]).toContain(f.type);
    });
  });

  it("Filtres relatifs ont une échelle ordonnée", () => {
    const f = getFilterByKey("resistance_secheresse");
    expect(f?.order).toBeDefined();
    expect(f?.order?.["Moyenne"]).toBeLessThan(f?.order?.["Excellente"]);
  });

  it("Filtres Services présents", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("mellifere");
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
  });

  it("Filtre origine a les bonnes options", () => {
    const f = getFilterByKey("origine");
    expect(f).toBeDefined();
    expect(f?.options).toContain("Tous");
    expect(f?.options).toContain("Europe de l'Ouest");
    expect(f?.options).toContain("Indigène");
  });

  it("Filtre mellifere est de type exact", () => {
    const f = getFilterByKey("mellifere");
    expect(f?.type).toBe("exact");
    expect(f?.options).toContain("Tous");
    expect(f?.options).toContain("Oui");
  });

  it("Filtre ombrage_fort est de type exact", () => {
    const f = getFilterByKey("ombrage_fort");
    expect(f?.type).toBe("exact");
    expect(f?.options).toContain("Tous");
    expect(f?.options).toContain("Oui");
  });

  it("Filtre rafraichissement_fort est de type relative", () => {
    const f = getFilterByKey("rafraichissement_fort");
    expect(f?.type).toBe("relative");
    expect(f?.options).toContain("Tous");
    expect(f?.options).toContain("Moyen");
    expect(f?.options).toContain("Fort");
  });

  it("Section Sol contient uniquement des filtres Sol", () => {
    const bySection = getFiltersBySection();
    const solFilters = bySection["Sol"] || [];
    solFilters.forEach((f: FilterConfig) => {
      expect(f.section).toBe("Sol");
      expect(f.key).toMatch(/^sol_/);
    });
  });

  it("Section Climat contient uniquement des filtres Climat", () => {
    const bySection = getFiltersBySection();
    const climatFilters = bySection["Climat"] || [];
    climatFilters.forEach((f: FilterConfig) => {
      expect(f.section).toBe("Climat");
    });
  });
});
