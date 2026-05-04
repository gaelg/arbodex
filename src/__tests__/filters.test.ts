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
    expect(sections).toContain("Services écosystémiques");
  });

  it("getFilterByKey retourne la bonne config", () => {
    const f = getFilterByKey("origine");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
    expect(f?.section).toBe("Services écosystémiques");
    expect(f?.options).toContain("Europe de l'Ouest");
  });

  it("getFiltersBySection regroupe correctement", () => {
    const bySection = getFiltersBySection();
    expect(bySection["Climat"].length).toBeGreaterThan(0);
    expect(bySection["Climat"][0].section).toBe("Climat");
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
    expect((f?.order as any)["faible"]).toBeLessThan(
      (f?.order as any)["excellente"]
    );
  });

  it("Filtres écosystémiques présents", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
  });
});
