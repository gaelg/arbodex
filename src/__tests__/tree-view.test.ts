import { describe, it, expect } from "vitest";
import { getNonQualiFields, getBadgesForTree } from "@/components/TreeList";
import { Arbre } from "@/lib/trees";

const BASE: Arbre = {
  nom_commun: "Test",
  nom_scientifique: "Testus testus",
  cultivar: "",
  famille_botanique: "Testaceae",
  origine: "Indigène",
  hauteur_min_m: 5,
  hauteur_max_m: 10,
  envergure_min_m: 3,
  envergure_max_m: 6,
  strate: "tree",
  ph_sol: "acid",
  humidite_sol: "fresh",
  texture_sol: "loamy",
  rusticite_celsius: -15,
  resiste_changement_climatique: "oui",
  floraison_remarquable: "",
  pollen_allergisant: "fort",
  branches_fragiles: "non",
  racines_problematiques: "moyen",
  cout_entretien: "modéré",
};

describe("Ordre des champs non-qualitatifs", () => {
  it("getNonQualiFields retourne les champs dans l'ordre attendu (sans Origine, devenue qualitative)", () => {
    const rows = getNonQualiFields(BASE);
    const labels = rows.map((r) => r.label);
    expect(labels).toEqual([
      "Nom scientifique",
      "Famille",
      "Strate",
      "Dimensions",
      "pH tolérés",
      "Humidité",
      "Texture",
      "Rusticité",
    ]);
  });

  it("getNonQualiFields marque les champs vides comme hasData=false", () => {
    const empty: Arbre = { ...BASE, ph_sol: "" };
    const rows = getNonQualiFields(empty);
    expect(rows.find((r) => r.label === "pH tolérés")?.hasData).toBe(false);
  });

  it("Dimensions est toujours présent même si aucune donnée ne manque jamais", () => {
    const rows = getNonQualiFields(BASE);
    expect(rows.find((r) => r.label === "Dimensions")).toBeDefined();
  });
});

describe("Badges qualitatifs par valeur", () => {
  it("pollen_allergisant=fort → badge rouge", () => {
    const badges = getBadgesForTree(BASE);
    const pollen = badges.find((b) => b.text.toLowerCase().includes("pollen"));
    expect(pollen).toBeDefined();
    expect(pollen!.color).toContain("red");
  });

  it("pollen_allergisant=faible → badge vert", () => {
    const a: Arbre = { ...BASE, pollen_allergisant: "faible" };
    const badges = getBadgesForTree(a);
    const pollen = badges.find((b) => b.text.toLowerCase().includes("pollen"));
    expect(pollen).toBeDefined();
    expect(pollen!.color).toContain("green");
  });

  it("pollen_allergisant=moyen → badge orange", () => {
    const a: Arbre = { ...BASE, pollen_allergisant: "moyen" };
    const badges = getBadgesForTree(a);
    const pollen = badges.find((b) => b.text.toLowerCase().includes("pollen"));
    expect(pollen).toBeDefined();
    expect(pollen!.color).toContain("orange");
  });

  it("branches_fragiles=non → badge vert", () => {
    const badges = getBadgesForTree(BASE);
    const b = badges.find((x) => x.text.toLowerCase().includes("branches"));
    expect(b).toBeDefined();
    expect(b!.color).toContain("green");
  });

  it("branches_fragiles=oui → badge rouge", () => {
    const a: Arbre = { ...BASE, branches_fragiles: "oui" };
    const badges = getBadgesForTree(a);
    const b = badges.find((x) => x.text.toLowerCase().includes("branches"));
    expect(b).toBeDefined();
    expect(b!.color).toContain("red");
  });

  it("cout_entretien=modéré → badge jaune (ne pas confondre avec modérément)", () => {
    const badges = getBadgesForTree(BASE);
    const cout = badges.find((x) => x.text === "Coût modéré");
    expect(cout).toBeDefined();
    expect(cout!.color).toContain("yellow");
  });

  it("cout_entretien=élevé → badge rouge", () => {
    const a: Arbre = { ...BASE, cout_entretien: "élevé" };
    const badges = getBadgesForTree(a);
    const cout = badges.find((x) => x.text === "Coût élevé");
    expect(cout).toBeDefined();
    expect(cout!.color).toContain("red");
  });

  it("cout_entretien=faible → badge vert", () => {
    const a: Arbre = { ...BASE, cout_entretien: "faible" };
    const badges = getBadgesForTree(a);
    const cout = badges.find((x) => x.text === "Coût faible");
    expect(cout).toBeDefined();
    expect(cout!.color).toContain("green");
  });

  it("racines_problematiques=moyen → badge orange", () => {
    const badges = getBadgesForTree(BASE);
    const r = badges.find((x) => x.text.toLowerCase().includes("racines"));
    expect(r).toBeDefined();
    expect(r!.color).toContain("orange");
  });

  it("racines_problematiques=non → badge vert", () => {
    const a: Arbre = { ...BASE, racines_problematiques: "non" };
    const badges = getBadgesForTree(a);
    const r = badges.find((x) => x.text.toLowerCase().includes("racines"));
    expect(r).toBeDefined();
    expect(r!.color).toContain("green");
  });

  it("pas de badge si valeur absente", () => {
    const a: Arbre = { ...BASE, pollen_allergisant: "" };
    const badges = getBadgesForTree(a);
    expect(
      badges.find((b) => b.text.toLowerCase().includes("pollen"))
    ).toBeUndefined();
  });

  it("floraison_remarquable=oui → badge vert", () => {
    const a: Arbre = { ...BASE, floraison_remarquable: "oui" };
    const badges = getBadgesForTree(a);
    expect(badges.find((b) => b.text.includes("Floraison"))).toBeDefined();
  });

  it("resiste_changement_climatique=oui → badge vert", () => {
    const badges = getBadgesForTree(BASE);
    expect(badges.find((b) => b.text.includes("Adapté"))).toBeDefined();
  });

  it("origine=Indigène → badge vert 'Origine locale'", () => {
    const badges = getBadgesForTree(BASE);
    const o = badges.find((b) => b.text === "Origine locale");
    expect(o).toBeDefined();
    expect(o!.color).toContain("green");
  });

  it("origine=exotique → badge rouge 'Origine exotique'", () => {
    const a: Arbre = { ...BASE, origine: "Vraiment exotique" };
    const badges = getBadgesForTree(a);
    const o = badges.find((b) => b.text === "Origine exotique");
    expect(o).toBeDefined();
    expect(o!.color).toContain("red");
  });

  it("origine=presque locale → badge orange 'Origine presque locale'", () => {
    const a: Arbre = {
      ...BASE,
      origine: "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux",
    };
    const badges = getBadgesForTree(a);
    const o = badges.find((b) => b.text === "Origine presque locale");
    expect(o).toBeDefined();
    expect(o!.color).toContain("orange");
  });

  it("pas de badge origine si valeur absente", () => {
    const a: Arbre = { ...BASE, origine: "" };
    const badges = getBadgesForTree(a);
    expect(badges.find((b) => b.text.includes("Origine"))).toBeUndefined();
  });
});
