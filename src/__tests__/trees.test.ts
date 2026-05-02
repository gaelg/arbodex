import { describe, it, expect } from "vitest";
import { appliquerFiltres, Arbre, Filtres } from "@/lib/trees";

const ARBRES_TEST: Arbre[] = [
  {
    especes: "Chene",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    zone: "4-9",
    soleil: "Plein soleil",
    besoin_eau: "Moyen",
    feuillu: "Oui",
    type_sol: "Argileux",
    croissance: "Lente",
  },
  {
    especes: "Erable rouge",
    hauteur_min_m: 12,
    hauteur_max_m: 18,
    zone: "3-9",
    soleil: "Plein soleil a ombre partielle",
    besoin_eau: "Eleve",
    feuillu: "Oui",
    type_sol: "Argileux/Moyen",
    croissance: "Moyenne",
  },
  {
    especes: "Pin blanc",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    zone: "3-8",
    soleil: "Plein soleil",
    besoin_eau: "Moyen",
    feuillu: "Non",
    type_sol: "Sableux",
    croissance: "Moyenne",
  },
  {
    especes: "Ginkgo",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    zone: "4-8",
    soleil: "Plein soleil a ombre partielle",
    besoin_eau: "Bas",
    feuillu: "Oui",
    type_sol: "Argileux/Sableux",
    croissance: "Lente",
  },
];

describe("appliquerFiltres", () => {
  const filtresVides: Filtres = {
    soleil: "",
    besoin_eau: "",
    feuillu: "",
    type_sol: "",
    croissance: "",
    hauteur_min: "",
    hauteur_max: "",
  };

  it("retourne tous les arbres quand aucun filtre n'est actif", () => {
    const resultat = appliquerFiltres(ARBRES_TEST, filtresVides);
    expect(resultat).toHaveLength(4);
  });

  it("filtre par soleil exact", () => {
    const filtres: Filtres = { ...filtresVides, soleil: "Plein soleil" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.especes)).toContain("Chene");
    expect(resultat.map((a) => a.especes)).toContain("Pin blanc");
  });

  it("filtre par besoin en eau", () => {
    const filtres: Filtres = { ...filtresVides, besoin_eau: "Bas" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(1);
    expect(resultat[0].especes).toBe("Ginkgo");
  });

  it("filtre par feuillu", () => {
    const filtres: Filtres = { ...filtresVides, feuillu: "Non" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(1);
    expect(resultat[0].especes).toBe("Pin blanc");
  });

  it("filtre par type de sol avec partial match", () => {
    const filtres: Filtres = { ...filtresVides, type_sol: "Sableux" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.especes)).toContain("Pin blanc");
    expect(resultat.map((a) => a.especes)).toContain("Ginkgo");
  });

  it("filtre par croissance", () => {
    const filtres: Filtres = { ...filtresVides, croissance: "Lente" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.especes)).toContain("Chene");
    expect(resultat.map((a) => a.especes)).toContain("Ginkgo");
  });

  it("filtre par hauteur minimum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_min: "20" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.especes)).not.toContain("Erable rouge");
  });

  it("filtre par hauteur maximum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_max: "14" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(1);
    expect(resultat[0].especes).toBe("Erable rouge");
  });

  it("filtre par plage de hauteur", () => {
    const filtres: Filtres = {
      ...filtresVides,
      hauteur_min: "19",
      hauteur_max: "30",
    };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.especes)).not.toContain("Erable rouge");
  });

  it("combine plusieurs filtres", () => {
    const filtres: Filtres = {
      ...filtresVides,
      soleil: "Plein soleil a ombre partielle",
      feuillu: "Oui",
    };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.especes)).toContain("Erable rouge");
    expect(resultat.map((a) => a.especes)).toContain("Ginkgo");
  });

  it("retourne un tableau vide quand aucun arbre ne correspond", () => {
    const filtres: Filtres = {
      ...filtresVides,
      soleil: "Plein soleil",
      besoin_eau: "Bas",
    };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(0);
  });
});
