import { describe, it, expect } from "vitest";
import {
  FILTERS,
  getFilterByKey,
  getFiltersBySection,
  getAllSections,
  getDefaultFiltersState,
  FilterConfig,
  applyFilter,
} from "@/lib/filters";

describe("Système de filtres encapsulé", () => {
  it("FILTERS contient tous les filtres essentiels", () => {
    const keys = FILTERS.map((f: FilterConfig) => f.key);
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

  it("getFilterByKey retourne la bonne config pour mellifere", () => {
    const f = getFilterByKey("mellifere");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
    expect(f?.section).toBe("Services");
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
    const order = f!.order!;
    expect(order["medium"]).toBeLessThan(order["excellent"]);
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

  it("Filtre rafraichissement_fort est de type relative", () => {
    const f = getFilterByKey("rafraichissement_fort");
    expect(f?.type).toBe("relative");
    expect(f?.options).toContain("all");
    expect(f?.options).toContain("medium");
    expect(f?.options).toContain("strong");
    expect(f?.optionLabels?.["medium"]).toBe("Moyenne");
    expect(f?.optionLabels?.["strong"]).toBe("Fort");
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

  it("optionLabels fournit le texte d'affichage pour les options", () => {
    const f = getFilterByKey("resistance_secheresse");
    expect(f?.optionLabels).toBeDefined();
    expect(f?.optionLabels?.["medium"]).toBe("Moyenne");
    expect(f?.optionLabels?.["good"]).toBe("Bonne");
  });

  it("Options utilisent des machine names", () => {
    const f = getFilterByKey("resistance_secheresse");
    expect(f?.options).toContain("medium");
    expect(f?.options).toContain("good");
    expect(f?.options).not.toContain("Moyenne");
  });

  it("Filtre multi sol_acidity filtre correctement (bug #2)", () => {
    const config = getFilterByKey("sol_acidity")!;
    // Arbre avec sol_acidity = "acide" (données CSV)
    const arbreAcide = { sol_acidity: "acide" } as any;
    const arbreNeutre = { sol_acidity: "neutre" } as any;

    // Filtre sélectionné : "acid" (valeur du filtre)
    // Ce test doit échouer car "acid" != "acide" (bug actuel)
    expect(applyFilter(arbreAcide, config, "acid")).toBe(true);
    expect(applyFilter(arbreNeutre, config, "acid")).toBe(false);
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
