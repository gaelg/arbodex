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
    famille: "Fagacées",
    origine: "native",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 10,
    envergure_max_m: 20,
    port: "ovale",
    sol_acidity: "neutral",
    sol_moisture: "fresh",
    sol_drainage: "good",
    sol_texture: "clay",
    sol_richness: "medium",
    sol_depth: "profond",
    resistance_secheresse: "medium",
    rusticite_min_C: -30,
    resistance_vent: "4",
    resistance_chaleur_urbaine: "good",
    adapte_changement_climatique: "oui",
    mellifere: "oui",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "oui",
    stockage_carbone: "élevé",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "élevé",
    qualite_air: "bonne",
    potentiel_allergisant: "faible",
    ombrage_fort: "oui",
    rafraichissement_fort: "medium",
    biodiversite_service: "élevé",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "non",
    pollen_allergisant: "low",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "occasional",
    sensibilite_maladies: "medium",
    longevite: "très_longue",
    cout_entretien: "medium",
  },
  {
    nom_commun: "Érable rouge",
    nom_scientifique: "Acer rubrum",
    famille: "Sapindacées",
    origine: "west_europe",
    hauteur_min_m: 12,
    hauteur_max_m: 18,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "arrondi",
    sol_acidity: "acide",
    sol_moisture: "moyen",
    sol_drainage: "good",
    sol_texture: "clay",
    sol_richness: "medium",
    sol_depth: "moyen",
    resistance_secheresse: "faible",
    rusticite_min_C: -35,
    resistance_vent: "3",
    resistance_chaleur_urbaine: "medium",
    adapte_changement_climatique: "non",
    mellifere: "oui",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "oui",
    couleur_automnale: "oui",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "moyenne",
    qualite_air: "bonne",
    potentiel_allergisant: "moyen",
    ombrage_fort: "oui",
    rafraichissement_fort: "medium",
    biodiversite_service: "moyenne",
    type_racines: "fasciculées",
    allergie_service: "moyen",
    fruits_salissants: "non",
    pollen_allergisant: "low",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "occasional",
    sensibilite_maladies: "medium",
    longevite: "longue",
    cout_entretien: "medium",
  },
  {
    nom_commun: "Pin blanc",
    nom_scientifique: "Pinus strobus",
    famille: "Pinacées",
    origine: "west_europe",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "conique",
    sol_acidity: "acide",
    sol_moisture: "sec",
    sol_drainage: "good",
    sol_texture: "Sablonneux",
    sol_richness: "pauvre",
    sol_depth: "superficiel",
    resistance_secheresse: "good",
    rusticite_min_C: -35,
    resistance_vent: "3",
    resistance_chaleur_urbaine: "medium",
    adapte_changement_climatique: "non",
    mellifere: "non",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "non",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "faible",
    qualite_air: "bonne",
    potentiel_allergisant: "élevé",
    ombrage_fort: "oui",
    rafraichissement_fort: "medium",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "élevé",
    fruits_salissants: "non",
    pollen_allergisant: "medium",
    branches_fragiles: "oui",
    racines_devastatrices: "oui",
    frequence_taille: "never",
    sensibilite_maladies: "low",
    longevite: "longue",
    cout_entretien: "low",
  },
  {
    nom_commun: "Ginkgo",
    nom_scientifique: "Ginkgo biloba",
    famille: "Ginkgoacées",
    origine: "west_europe",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "pyramidal",
    sol_acidity: "neutral",
    sol_moisture: "moyen",
    sol_drainage: "good",
    sol_texture: "Argileux,Sablonneux",
    sol_richness: "moyen",
    sol_depth: "profond",
    resistance_secheresse: "excellent",
    rusticite_min_C: -25,
    resistance_vent: "4",
    resistance_chaleur_urbaine: "excellent",
    adapte_changement_climatique: "oui",
    mellifere: "non",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "no",
    couleur_automnale: "yes",
    stockage_carbone: "moyen",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "faible",
    qualite_air: "excellente",
    potentiel_allergisant: "faible",
    ombrage_fort: "oui",
    rafraichissement_fort: "medium",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "no",
    pollen_allergisant: "low",
    branches_fragiles: "no",
    racines_devastatrices: "no",
    frequence_taille: "never",
    sensibilite_maladies: "medium",
    longevite: "très_longue",
    cout_entretien: "medium",
  },
];

describe("applyAllFilters", () => {
  const filtresVides: Filtres = {
    recherche: "",
    origine: "",
    sol_acidity: "",
    sol_moisture: "",
    sol_drainage: "",
    sol_texture: "",
    sol_richness: "",
    sol_depth: "profond",
    resistance_secheresse: "",
    rusticite_min: "",
    rusticite_max: "",
    resistance_vent: "",
    resistance_chaleur_urbaine: "",
    adapte_changement_climatique: "",
    mellifere: "",
    ombrage_fort: "",
    rafraichissement_fort: "",
    fruitiere_sauvage: "",
    floraison_remarquable: "",
    couleur_automnale: "",
    pollen_allergisant: "",
    fruits_salissants: "",
    branches_fragiles: "",
    racines_devastatrices: "",
    frequence_taille: "",
    sensibilite_maladies: "",
    cout_entretien: "",
    hauteur_min: "",
    hauteur_max: "",
    envergure_min: "",
    envergure_max: "",
  };

  it("filtre par mellifere", () => {
    const filtres: Filtres = { ...filtresVides, mellifere: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.mellifere).toBe("oui");
    });
  });

  it("filtre par ombrage_fort", () => {
    const filtres: Filtres = { ...filtresVides, ombrage_fort: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(a.ombrage_fort).toBe("oui");
    });
  });

  it("filtre par exposition vent minimum", () => {
    const filtres: Filtres = { ...filtresVides, resistance_vent: "Moyenne" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(["4", "5"]).toContain(a.resistance_vent);
    });
  });

  it("filtre par mellifere", () => {
    const filtres: Filtres = { ...filtresVides, mellifere: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.mellifere).toBe("oui"));
  });

  it("filtre par ombrage_fort", () => {
    const filtres: Filtres = { ...filtresVides, ombrage_fort: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.ombrage_fort).toBe("oui"));
  });

  it("filtre par rafraichissement_fort", () => {
    const filtres: Filtres = {
      ...filtresVides,
      rafraichissement_fort: "medium",
    };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.rafraichissement_fort).toBe("medium"));
  });

  it("origine : Indigène et Europe de l'Ouest disponibles", () => {
    const origines = [...new Set(ARBRES_TEST.map((a) => a.origine))];
    expect(origines).toContain("native");
    expect(origines).toContain("west_europe");
  });

  it("Filtres relatifs utilisent les bonnes échelles", () => {
    const f = getFilterByKey("cout_entretien");
    expect(f?.order?.["low"]).toBe(1);
    expect(f?.order?.["medium"]).toBe(2);
  });

  it("Filtre rafraichissement_fort est de type relative", () => {
    const f = getFilterByKey("rafraichissement_fort");
    expect(f?.type).toBe("relative");
    expect(f?.order?.["medium"]).toBe(2);
    expect(f?.order?.["strong"]).toBe(3);
  });

  it("Section Demandes particulières contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const services = bySection["Demandes particulières"] || [];
    const keys = services.map((f) => f.key);
    expect(keys).toContain("mellifere");
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
    expect(keys).toContain("fruitiere_sauvage");
  });

  it("Section Esthétique contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const esthetique = bySection["Esthétique"] || [];
    const keys = esthetique.map((f) => f.key);
    expect(keys).toContain("floraison_remarquable");
    expect(keys).toContain("couleur_automnale");
  });
});
