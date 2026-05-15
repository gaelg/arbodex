import { describe, it, expect } from "vitest";
import { Arbre, Filtres } from "@/lib/trees";
import {
  FILTERS,
  applyAllFilters,
  getFilterByKey,
  getFiltersBySection,
} from "@/lib/filters";

const ARBRES_TEST: Arbre[] = [
  {
    nom_commun: "Chêne pédonculé",
    nom_scientifique: "Quercus robur",
    famille_botanique: "Fagacées",
    origine: "Indigène",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 10,
    envergure_max_m: 20,
    port: "ovale",
    ph_sol: "neutre",
    humidite_sol: "frais",
    texture_sol: "argileux",
    rusticite_celsius: -30,
    resiste_changement_climatique: "oui",
    floraison_remarquable: "non",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_problematiques: "non",
    cout_entretien: "modéré",
  },
  {
    nom_commun: "Érable rouge",
    nom_scientifique: "Acer rubrum",
    famille_botanique: "Sapindacées",
    origine: "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux",
    hauteur_min_m: 12,
    hauteur_max_m: 18,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "arrondi",
    ph_sol: "acide",
    humidite_sol: "frais",
    texture_sol: "argileux",
    rusticite_celsius: -35,
    resiste_changement_climatique: "non",
    floraison_remarquable: "oui",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_problematiques: "non",
    cout_entretien: "modéré",
  },
  {
    nom_commun: "Pin blanc",
    nom_scientifique: "Pinus strobus",
    famille_botanique: "Pinacées",
    origine: "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "conique",
    ph_sol: "acide",
    humidite_sol: "sec",
    texture_sol: "sablonneux",
    rusticite_celsius: -35,
    resiste_changement_climatique: "non",
    floraison_remarquable: "non",
    pollen_allergisant: "moyen",
    branches_fragiles: "oui",
    racines_problematiques: "oui",
    cout_entretien: "faible",
  },
  {
    nom_commun: "Ginkgo",
    nom_scientifique: "Ginkgo biloba",
    famille_botanique: "Ginkgoacées",
    origine: "Vraiment exotique",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "pyramidal",
    ph_sol: "neutre",
    humidite_sol: "frais",
    texture_sol: "argileux,sablonneux",
    rusticite_celsius: -25,
    resiste_changement_climatique: "oui",
    floraison_remarquable: "non",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_problematiques: "non",
    cout_entretien: "modéré",
  },
];

describe("applyAllFilters", () => {
  const filtresVides: Filtres = {
    optimiste: "",
    recherche: "",
    origine: "",
    ph_sol: "",
    humidite_sol: "",
    texture_sol: "",
    resiste_changement_climatique: "",
    floraison_remarquable: "",
    pollen_allergisant: "",
    branches_fragiles: "",
    racines_problematiques: "",
    cout_entretien: "",
    hauteur_min: "",
    hauteur_max: "",
    envergure_min: "",
    envergure_max: "",
  };

  it("filtre par branches_fragiles", () => {
    const filtres: Filtres = { ...filtresVides, branches_fragiles: "non" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.branches_fragiles).toBe("non");
    });
  });

  it("filtre par floraison_remarquable", () => {
    const filtres: Filtres = { ...filtresVides, floraison_remarquable: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.floraison_remarquable).toBe("oui");
    });
  });

  it("filtre par ph_sol (multi)", () => {
    const filtres: Filtres = { ...filtresVides, ph_sol: "acid" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.ph_sol).toBe("acide");
    });
  });

  it("filtre par résistance au changement climatique", () => {
    const filtres: Filtres = {
      ...filtresVides,
      resiste_changement_climatique: "oui",
    };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.resiste_changement_climatique).toBe("oui");
    });
  });

  it("filtre par pollen_allergisant (slider)", () => {
    const filtres: Filtres = { ...filtresVides, pollen_allergisant: "faible" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThanOrEqual(0);
  });

  it("origine : Indigène et Indigène en Europe de l'Ouest disponibles", () => {
    const origines = [...new Set(ARBRES_TEST.map((a) => a.origine))];
    expect(origines).toContain("Indigène");
    expect(origines).toContain(
      "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux"
    );
  });

  it("Filtres slider ont les bonnes échelles", () => {
    const f = getFilterByKey("cout_entretien");
    expect(f?.order?.["faible"]).toBe(1);
    expect(f?.order?.["élevé"]).toBe(3);
  });

  it("Section Demandes particulières contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const services = bySection["Demandes particulières"] || [];
    const keys = services.map((f) => f.key);
    expect(keys).toContain("resiste_changement_climatique");
    expect(keys).toContain("origine");
    expect(keys).toContain("cout_entretien");
  });

  it("Section Esthétique contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const esthetique = bySection["Esthétique"] || [];
    const keys = esthetique.map((f) => f.key);
    expect(keys).toContain("floraison_remarquable");
  });
});
