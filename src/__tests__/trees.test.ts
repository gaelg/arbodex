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
    origine: "Indigène",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 10,
    envergure_max_m: 20,
    port: "ovale",
    sol_acidity: "neutre",
    sol_moisture: "frais",
    sol_drainage: "Bon",
    sol_texture: "Argileux",
    sol_richness: "Moyen",
    sol_depth: "profond",
    resistance_secheresse: "Moyenne",
    rusticite_min_C: -30,
    resistance_vent: "Bonne",
    resistance_chaleur_urbaine: "Bonne",
    adapte_changement_climatique: "Oui",
    mellifere: "Oui",
    fruitiere_sauvage: "Oui",
    refuge_oiseaux: "Oui",
    floraison_remarquable: "Non",
    couleur_automnale: "Oui",
    stockage_carbone: "élevé",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "élevé",
    qualite_air: "bonne",
    potentiel_allergisant: "faible",
    ombrage_fort: "Oui",
    rafraichissement_fort: "Moyen",
    biodiversite_service: "élevé",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "Non",
    pollen_allergisant: "Faiblement",
    branches_fragiles: "Non",
    racines_devastatrices: "Non",
    frequence_taille: "Occasionnelle",
    sensibilite_maladies: "Moyennement",
    longevite: "très_longue",
    cout_entretien: "Moyen",
  },
  {
    nom_commun: "Érable rouge",
    nom_scientifique: "Acer rubrum",
    famille: "Sapindacées",
    origine: "Europe de l'Ouest",
    hauteur_min_m: 12,
    hauteur_max_m: 18,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "arrondi",
    sol_acidity: "acide",
    sol_moisture: "moyen",
    sol_drainage: "Bon",
    sol_texture: "Argileux",
    sol_richness: "Moyen",
    sol_depth: "moyen",
    resistance_secheresse: "faible",
    rusticite_min_C: -35,
    resistance_vent: "Moyenne",
    resistance_chaleur_urbaine: "Moyenne",
    adapte_changement_climatique: "Non",
    mellifere: "Oui",
    fruitiere_sauvage: "Oui",
    refuge_oiseaux: "Oui",
    floraison_remarquable: "Oui",
    couleur_automnale: "Oui",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "moyenne",
    qualite_air: "bonne",
    potentiel_allergisant: "moyen",
    ombrage_fort: "Oui",
    rafraichissement_fort: "Moyen",
    biodiversite_service: "moyenne",
    type_racines: "fasciculées",
    allergie_service: "moyen",
    fruits_salissants: "Non",
    pollen_allergisant: "Moyennement",
    branches_fragiles: "Non",
    racines_devastatrices: "Non",
    frequence_taille: "Occasionnelle",
    sensibilite_maladies: "Moyennement",
    longevite: "longue",
    cout_entretien: "Moyen",
  },
  {
    nom_commun: "Pin blanc",
    nom_scientifique: "Pinus strobus",
    famille: "Pinacées",
    origine: "Europe de l'Ouest",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "conique",
    sol_acidity: "acide",
    sol_moisture: "sec",
    sol_drainage: "Bon",
    sol_texture: "Sablonneux",
    sol_richness: "pauvre",
    sol_depth: "superficiel",
    resistance_secheresse: "Bonne",
    rusticite_min_C: -35,
    resistance_vent: "Moyenne",
    resistance_chaleur_urbaine: "Moyenne",
    adapte_changement_climatique: "Non",
    mellifere: "Non",
    fruitiere_sauvage: "Oui",
    refuge_oiseaux: "Oui",
    floraison_remarquable: "Non",
    couleur_automnale: "Non",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "faible",
    qualite_air: "bonne",
    potentiel_allergisant: "élevé",
    ombrage_fort: "Oui",
    rafraichissement_fort: "Moyen",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "élevé",
    fruits_salissants: "Non",
    pollen_allergisant: "Moyennement",
    branches_fragiles: "Oui",
    racines_devastatrices: "Oui",
    frequence_taille: "Jamais",
    sensibilite_maladies: "Faiblement",
    longevite: "longue",
    cout_entretien: "Faible",
  },
  {
    nom_commun: "Ginkgo",
    nom_scientifique: "Ginkgo biloba",
    famille: "Ginkgoacées",
    origine: "Europe de l'Ouest",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "pyramidal",
    sol_acidity: "neutre",
    sol_moisture: "moyen",
    sol_drainage: "Bon",
    sol_texture: "Argileux,Sablonneux",
    sol_richness: "moyen",
    sol_depth: "profond",
    resistance_secheresse: "Excellente",
    rusticite_min_C: -25,
    resistance_vent: "Bonne",
    resistance_chaleur_urbaine: "Excellente",
    adapte_changement_climatique: "Oui",
    mellifere: "Non",
    fruitiere_sauvage: "Oui",
    refuge_oiseaux: "Oui",
    floraison_remarquable: "Non",
    couleur_automnale: "Oui",
    stockage_carbone: "moyen",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "faible",
    qualite_air: "excellente",
    potentiel_allergisant: "faible",
    ombrage_fort: "Oui",
    rafraichissement_fort: "Moyen",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "Non",
    pollen_allergisant: "Faiblement",
    branches_fragiles: "Non",
    racines_devastatrices: "Non",
    frequence_taille: "Jamais",
    sensibilite_maladies: "Moyennement",
    longevite: "très_longue",
    cout_entretien: "Moyen",
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
    sol_depth: "",
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

  it("filtre par origine (Indigène)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "Indigène" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(1);
    expect(resultat[0].nom_commun).toBe("Chêne pédonculé");
  });

  it("filtre par origine (Europe de l'Ouest)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "Europe de l'Ouest" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Pin blanc");
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("filtre par résistance vent minimum", () => {
    const filtres: Filtres = { ...filtresVides, resistance_vent: "Moyenne" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => {
      expect(["Moyenne", "Bonne", "Excellente"]).toContain(a.resistance_vent);
    });
  });

  it("filtre par mellifere", () => {
    const filtres: Filtres = { ...filtresVides, mellifere: "Oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.mellifere).toBe("Oui"));
  });

  it("filtre par ombrage_fort", () => {
    const filtres: Filtres = { ...filtresVides, ombrage_fort: "Oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.ombrage_fort).toBe("Oui"));
  });

  it("filtre par rafraichissement_fort", () => {
    const filtres: Filtres = { ...filtresVides, rafraichissement_fort: "Moyen" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat.length).toBeGreaterThan(0);
    resultat.forEach((a) => expect(a.rafraichissement_fort).toBe("Moyen"));
  });

  it("origine : Indigène et Europe de l'Ouest disponibles", () => {
    const origines = [...new Set(ARBRES_TEST.map((a) => a.origine))];
    expect(origines).toContain("Indigène");
    expect(origines).toContain("Europe de l'Ouest");
  });

  it("Filtres relatifs utilisent les bonnes échelles", () => {
    const f = getFilterByKey("resistance_secheresse");
    expect(f?.order?.["Moyenne"]).toBe(2);
    expect(f?.order?.["Bonne"]).toBe(3);
    expect(f?.order?.["Excellente"]).toBe(4);
  });

  it("Filtre rafraichissement_fort est de type relative", () => {
    const f = getFilterByKey("rafraichissement_fort");
    expect(f?.type).toBe("relative");
    expect(f?.order?.["Moyen"]).toBe(2);
    expect(f?.order?.["Fort"]).toBe(3);
  });

  it("Section Services contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const services = bySection["Services"] || [];
    const keys = services.map((f) => f.key);
    expect(keys).toContain("origine");
    expect(keys).toContain("mellifere");
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
  });

  it("Section Esthétique contient les bons filtres", () => {
    const bySection = getFiltersBySection();
    const esthetique = bySection["Esthétique"] || [];
    const keys = esthetique.map((f) => f.key);
    expect(keys).toContain("floraison_remarquable");
    expect(keys).toContain("couleur_automnale");
  });
});
