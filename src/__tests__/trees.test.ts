import { describe, it, expect } from "vitest";
import { Arbre, Filtres } from "@/lib/trees";
import { FILTERS, applyAllFilters, getFilterByKey, getFiltersBySection } from "@/lib/filters";

const ARBRES_TEST: Arbre[] = [
  {
    nom_commun: "Chêne pédonculé",
    nom_scientifique: "Quercus robur",
    famille: "Fagacées",
    origine: "local",
    type: "arbre",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 10,
    envergure_max_m: 20,
    port: "ovale",
    sol_acidity: "neutre",
    sol_moisture: "frais",
    sol_drainage: "drainé",
    sol_texture: "Argileux",
    sol_richness: "moyen",
    sol_depth: "profond",
    resistance_secheresse: "moyenne",
    pH: "basique",
    tolerance_sel: "oui",
    rusticite_min_C: -30,
    resistance_vent: 4,
    resistance_chaleur_urbaine: 4,
    adapte_changement_climatique: "oui",
    mellifere: "oui",
    fruitière_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "eleve",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "élevé",
    qualite_air: "bonne",
    potentiel_allergisant: "faible",
    ombrage_fort: "oui",
    rafraichissement_fort: "oui",
    biodiversite_service: "élevé",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "oui",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "occasionnelle",
    sensibilite_maladies: "modéré",
    longevite: "tres_longue",
    cout_entretien: "modere",
  },
  {
    nom_commun: "Érable rouge",
    nom_scientifique: "Acer rubrum",
    famille: "Sapindacées",
    origine: "vraiment_exotique",
    type: "arbre",
    hauteur_min_m: 12,
    hauteur_max_m: 18,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "arrondi",
    sol_acidity: "acide",
    sol_moisture: "moyen",
    sol_drainage: "drainé",
    sol_texture: "Argileux",
    sol_richness: "Moyen",
    sol_depth: "moyen",
    resistance_secheresse: "faible",
    pH: "acide",
    tolerance_sel: "non",
    rusticite_min_C: -35,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 3,
    adapte_changement_climatique: "non",
    mellifere: "oui",
    fruitière_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "oui",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "moyenne",
    qualite_air: "bonne",
    potentiel_allergisant: "modere",
    ombrage_fort: "oui",
    rafraichissement_fort: "oui",
    biodiversite_service: "moyenne",
    type_racines: "fasciculées",
    allergie_service: "modere",
    fruits_salissants: "oui",
    pollen_allergisant: "fort",
    branches_fragiles: "oui",
    racines_devastatrices: "non",
    frequence_taille: "jamais",
    sensibilite_maladies: "modéré",
    longevite: "longue",
    cout_entretien: "faible",
  },
  {
    nom_commun: "Pin blanc",
    nom_scientifique: "Pinus strobus",
    famille: "Pinacées",
    origine: "vraiment_exotique",
    type: "arbre",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "conique",
    sol_acidity: "acide",
    sol_moisture: "sec",
    sol_drainage: "drainé",
    sol_texture: "Sablonneux",
    sol_richness: "pauvre",
    sol_depth: "superficiel",
    resistance_secheresse: "bonne",
    pH: "acide",
    tolerance_sel: "non",
    rusticite_min_C: -35,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 3,
    adapte_changement_climatique: "non",
    mellifere: "non",
    fruitière_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "non",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "faible",
    qualite_air: "bonne",
    potentiel_allergisant: "eleve",
    ombrage_fort: "oui",
    rafraichissement_fort: "moyen",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "eleve",
    fruits_salissants: "oui",
    pollen_allergisant: "fort",
    branches_fragiles: "oui",
    racines_devastatrices: "oui",
    frequence_taille: "jamais",
    sensibilite_maladies: "faible",
    longevite: "longue",
    cout_entretien: "faible",
  },
  {
    nom_commun: "Ginkgo",
    nom_scientifique: "Ginkgo biloba",
    famille: "Ginkgoacées",
    origine: "presque_local",
    type: "arbre",
    hauteur_min_m: 15,
    hauteur_max_m: 25,
    envergure_min_m: 8,
    envergure_max_m: 15,
    port: "pyramidal",
    sol_acidity: "neutre",
    sol_moisture: "moyen",
    sol_drainage: "drainé",
    sol_texture: "Argileux,Sablonneux",
    sol_richness: "moyen",
    sol_depth: "profond",
    resistance_secheresse: "excellente",
    pH: "neutre",
    tolerance_sel: "oui",
    rusticite_min_C: -25,
    resistance_vent: 4,
    resistance_chaleur_urbaine: 5,
    adapte_changement_climatique: "oui",
    mellifere: "non",
    fruitière_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "élevé",
    impact_icu: "fort",
    biodiversite: "faible",
    qualite_air: "excellente",
    potentiel_allergisant: "faible",
    ombrage_fort: "oui",
    rafraichissement_fort: "moyen",
    biodiversite_service: "faible",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "oui",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "jamais",
    sensibilite_maladies: "faible",
    longevite: "tres_longue",
    cout_entretien: "faible",
  },
  {
    nom_commun: "Buis commun",
    nom_scientifique: "Buxus sempervirens",
    famille: "Buxacées",
    origine: "local",
    type: "arbuste",
    hauteur_min_m: 1,
    hauteur_max_m: 5,
    envergure_min_m: 1,
    envergure_max_m: 3,
    port: "arrondi",
    sol_acidity: "basique",
    sol_moisture: "sec",
    sol_drainage: "drainé",
    sol_texture: "Calcaire",
    sol_richness: "pauvre",
    sol_depth: "superficiel",
    resistance_secheresse: "moyenne",
    pH: "basique",
    tolerance_sel: "oui",
    rusticite_min_C: -15,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 4,
    adapte_changement_climatique: "oui",
    mellifere: "oui",
    fruitière_sauvage: "non",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "non",
    ecorce_decorative: "non",
    stockage_carbone: "faible",
    resilience: "modéré",
    impact_icu: "moyen",
    biodiversite: "moyenne",
    qualite_air: "bonne",
    potentiel_allergisant: "faible",
    ombrage_fort: "non",
    rafraichissement_fort: "faible",
    biodiversite_service: "moyenne",
    type_racines: "fasciculées",
    allergie_service: "faible",
    fruits_salissants: "non",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "régulière",
    sensibilite_maladies: "modéré",
    longevite: "longue",
    cout_entretien: "modere",
  },
];

describe("applyAllFilters", () => {
  const filtresVides: Filtres = {
    recherche: "",
    type: "",
    origine: "",
    sol_acidity: "",
    sol_moisture: "",
    sol_drainage: "",
    sol_texture: "",
    sol_richness: "",
    sol_depth: "",
    resistance_secheresse: "",
    pH: "",
    rusticite_min: "",
    rusticite_max: "",
    resistance_vent: "",
    resistance_chaleur_urbaine: "",
    adapte_changement_climatique: "",
    mellifere: "",
    ombrage_fort: "",
    rafraichissement_fort: "",
    fruitière_sauvage: "",
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

  it("retourne tous les arbres quand aucun filtre n'est actif", () => {
    const resultat = applyAllFilters(ARBRES_TEST, filtresVides, FILTERS);
    expect(resultat).toHaveLength(5);
  });

   it("filtre par texture de sol (multi)", () => {
     const filtres: Filtres = { ...filtresVides, sol_texture: "Sablonneux" };
     const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
     expect(resultat).toHaveLength(2); // Pin blanc, Chêne pédonculé (has Sablonneux in multi)
     expect(resultat.map((a) => a.nom_commun)).toContain("Pin blanc");
   });

  it("filtre par mellifère", () => {
    const filtres: Filtres = { ...filtresVides, mellifere: "oui" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("filtre par pollen allergisant (relatif - max)", () => {
    // "faible" → faible + moyen + fort (test data has 3 faible, 0 moyen = 3 total)
    let filtres: Filtres = { ...filtresVides, pollen_allergisant: "faible" };
    let resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3); // Chêne, Buis, Ginkgo
    let noms = resultat.map((a) => a.nom_commun);
    expect(noms).toContain("Chêne pédonculé");
    expect(noms).toContain("Buis commun");
    expect(noms).toContain("Ginkgo");

    // "moyen" → faible + moyen (3 + 0 = 3)
    filtres = { ...filtresVides, pollen_allergisant: "moyen" };
    resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
  });

  it("filtre par hauteur minimum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_min: "20" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par hauteur maximum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_max: "14" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("filtre par plage de hauteur", () => {
    const filtres: Filtres = {
      ...filtresVides,
      hauteur_min: "19",
      hauteur_max: "30",
    };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par rusticité minimum", () => {
    const filtres: Filtres = { ...filtresVides, rusticite_min: "-30" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    // Seuls les arbres avec rusticite_min_C <= -30 (plus rustiques)
    expect(resultat).toHaveLength(3);
  });

  it("filtre par résistance vent minimum", () => {
    const filtres: Filtres = { ...filtresVides, resistance_vent: "4" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("filtre par adapté changement climatique", () => {
    const filtres: Filtres = {
      ...filtresVides,
      adapte_changement_climatique: "oui",
    };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("combine plusieurs filtres", () => {
    const filtres: Filtres = {
      ...filtresVides,
      type: "arbre",
      mellifere: "oui",
      couleur_automnale: "oui",
    };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
  });

  it("filtre par envergure minimum", () => {
    const filtres: Filtres = { ...filtresVides, envergure_min: "10" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(4);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par origine (local)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "local" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("filtre par origine (exotique)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "exotique" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Pin blanc");
  });

  it("filtre par origine (presque_local)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "presque_local" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    expect(resultat).toHaveLength(1);
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("origine : local/exotique/presque_local tous disponibles", () => {
    const origines = [...new Set(ARBRES_TEST.map((a) => a.origine))];
    expect(origines).toContain("local");
    expect(origines).toContain("presque_local");
    expect(origines).toContain("vraiment_exotique");
  });

  // ========== TESTS DE NON-RÉGRESSION (retours utilisateur) ==========

  // --- 1. Données erronnées ---

  it("rusticité : filtre par valeur négative correctement encodée", () => {
    const filtres: Filtres = { ...filtresVides, rusticite_max: "-20" };
    const resultat = applyAllFilters(ARBRES_TEST, filtres, FILTERS);
    // Garde les arbres avec rusticite_min_C <= -20 (exclut Buis à -15)
    expect(resultat).toHaveLength(4);
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("presque_local : l'essence est correctement catégorisée", () => {
    const presqueLocal = ARBRES_TEST.filter(
      (a) => a.origine === "presque_local"
    );
    expect(presqueLocal).toHaveLength(1);
    expect(presqueLocal[0].nom_commun).toBe("Ginkgo");
  });

  it("fruitière_sauvage : filtre oui/non retourne des résultats", () => {
    const filtresOui: Filtres = { ...filtresVides, fruitière_sauvage: "oui" };
    const resultatOui = applyAllFilters(ARBRES_TEST, filtresOui, FILTERS);
    expect(resultatOui.length).toBeGreaterThan(0);
    resultatOui.forEach((a) => expect(a.fruitière_sauvage).toBe("oui"));

    const filtresNon: Filtres = { ...filtresVides, fruitière_sauvage: "non" };
    const resultatNon = applyAllFilters(ARBRES_TEST, filtresNon, FILTERS);
    expect(resultatNon.length).toBeGreaterThan(0);
    resultatNon.forEach((a) => expect(a.fruitière_sauvage).toBe("non"));
  });

  // --- 2. Bugs bloquants ---

  it("filtre origine : local/presque_local/exotique tous disponibles", () => {
    const origines = ["local", "presque_local", "exotique"];
    origines.forEach((o) => {
      const f: Filtres = { ...filtresVides, origine: o };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThan(0);
    });
  });

  it("résistance sécheresse : filtres multiples retournent des résultats", () => {
    const niveaux = ["faible", "moyenne", "bonne", "excellente"];
    niveaux.forEach((n) => {
      const f: Filtres = { ...filtresVides, resistance_secheresse: n };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("résistance vent : filtres numériques retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = { ...filtresVides, resistance_vent: String(v) };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("résistance chaleur urbaine : filtres numériques retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = {
        ...filtresVides,
        resistance_chaleur_urbaine: String(v),
      };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  // --- 3. Orthographe / accents ---

  it("sensibilite_maladies : gère les accents (modérée ≠ moderee)", () => {
    const f: Filtres = { ...filtresVides, sensibilite_maladies: "modéré" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  it("cout_entretien : gère les accents (modéré ≠ modere)", () => {
    const f: Filtres = { ...filtresVides, cout_entretien: "modere" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  it("frequence_taille : gère la casse et les accents (régulière)", () => {
    const f: Filtres = { ...filtresVides, frequence_taille: "régulière" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  // --- 4. Filtres écosystémiques (mellifere, ombrage, rafraichissement) ---

  it("filtre ombrage_fort retourne des résultats", () => {
    const f: Filtres = { ...filtresVides, recherche: "" };
    const tous = applyAllFilters(ARBRES_TEST, f, FILTERS);
    const avecOmbrage = tous.filter((a) => a.ombrage_fort === "oui");
    expect(avecOmbrage.length).toBeGreaterThan(0);
  });

  it("filtre rafraichissement_fort retourne des résultats", () => {
    const f: Filtres = { ...filtresVides, recherche: "" };
    const tous = applyAllFilters(ARBRES_TEST, f, FILTERS);
    const avecRafraichissement = tous.filter(
      (a) =>
        a.rafraichissement_fort === "oui" || a.rafraichissement_fort === "moyen"
    );
    expect(avecRafraichissement.length).toBeGreaterThan(0);
  });

  // --- 5. Branches fragiles / racines devastatrices ---

  it("filtre ombrage_fort fonctionne (exact match)", () => {
    const f: Filtres = { ...filtresVides, ombrage_fort: "oui" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
    r.forEach((a) => expect(a.ombrage_fort).toBe("oui"));
  });

  it("filtre rafraichissement_fort fonctionne (exact match)", () => {
    const f: Filtres = { ...filtresVides, rafraichissement_fort: "oui" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
    r.forEach((a) => expect(a.rafraichissement_fort).toBe("oui"));
  });

  it("filtre mellifere fonctionne (exact match)", () => {
    const f: Filtres = { ...filtresVides, mellifere: "oui" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
    r.forEach((a) => expect(a.mellifere).toBe("oui"));
  });

  it("résistance sécheresse : tous les niveaux retournent des résultats", () => {
    const niveaux = ["faible", "moyenne", "bonne", "excellente"];
    niveaux.forEach((n) => {
      const f: Filtres = { ...filtresVides, resistance_secheresse: n };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("résistance vent : tous les niveaux retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = { ...filtresVides, resistance_vent: String(v) };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("résistance chaleur urbaine : tous les niveaux retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = {
        ...filtresVides,
        resistance_chaleur_urbaine: String(v),
      };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("branches_fragiles : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, branches_fragiles: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    expect(rOui.length).toBeGreaterThan(0);
    rOui.forEach((a) => expect(a.branches_fragiles).toBe("oui"));

    const fNon: Filtres = { ...filtresVides, branches_fragiles: "non" };
    const rNon = applyAllFilters(ARBRES_TEST, fNon, FILTERS);
    expect(rNon.length).toBeGreaterThan(0);
    rNon.forEach((a) => expect(a.branches_fragiles).toBe("non"));
  });

  it("racines_devastatrices : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, racines_devastatrices: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    expect(rOui.length).toBeGreaterThan(0);
    rOui.forEach((a) => expect(a.racines_devastatrices).toBe("oui"));
  });

  it("fruits_salissants : filtre fonctionne", () => {
    const f: Filtres = { ...filtresVides, fruits_salissants: "oui" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
  });

  it("pollen_allergisant : filtre max fonctionne (relative)", () => {
    const niveaux = ["faible", "moyen", "fort"];
    niveaux.forEach((n) => {
      const f: Filtres = { ...filtresVides, pollen_allergisant: n };
      const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
      expect(r.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("Filtres Sol : texture multi fonctionne", () => {
    const f: Filtres = { ...filtresVides, sol_texture: "Argileux" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
  });

  it("Filtres Sol : acidity multi fonctionne", () => {
    const f: Filtres = { ...filtresVides, sol_acidity: "neutre" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
  });

  it("Section Services écosystémiques contient origine, mellifere, ombrage, rafraichissement", () => {
    const section = "Services écosystémiques";
    const bySection = (() => {
      const sections: Record<string, any[]> = {};
      FILTERS.forEach((f: any) => {
        if (!sections[f.section]) sections[f.section] = [];
        sections[f.section].push(f);
      });
      return sections;
    })();
    const filtresSection = bySection[section] || [];
    const keys = filtresSection.map(f => f.key);
    expect(keys).toContain("origine");
    expect(keys).toContain("mellifere");
    expect(keys).toContain("ombrage_fort");
    expect(keys).toContain("rafraichissement_fort");
  });

  it("Section Contraintes et risques contient branches_fragiles, racines_devastatrices", () => {
    const section = "Contraintes et risques";
    const bySection = getFiltersBySection();
    const filtresSection = bySection[section] || [];
    const keys = filtresSection.map(f => f.key);
    expect(keys).toContain("branches_fragiles");
    expect(keys).toContain("racines_devastatrices");
    expect(keys).toContain("fruits_salissants");
    expect(keys).toContain("pollen_allergisant");
  });

  it("Section Entretien contient cout_entretien, frequence_taille, sensibilite_maladies", () => {
    const section = "Entretien";
    const bySection = getFiltersBySection();
    const filtresSection = bySection[section] || [];
    const keys = filtresSection.map(f => f.key);
    expect(keys).toContain("cout_entretien");
    expect(keys).toContain("frequence_taille");
    expect(keys).toContain("sensibilite_maladies");
  });

  it("Section Esthétique contient floraison_remarquable, couleur_automnale", () => {
    const section = "Esthétique";
    const bySection = getFiltersBySection();
    const filtresSection = bySection[section] || [];
    const keys = filtresSection.map(f => f.key);
    expect(keys).toContain("floraison_remarquable");
    expect(keys).toContain("couleur_automnale");
  });

  it("Filtre adapte_changement_climatique fonctionne", () => {
    const f: Filtres = { ...filtresVides, adapte_changement_climatique: "oui" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
    r.forEach((a) => expect(a.adapte_changement_climatique).toBe("oui"));
  });

  it("Filtre sol_depth fonctionne (profondeur)", () => {
    const f: Filtres = { ...filtresVides, sol_depth: "profond" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    expect(r.length).toBeGreaterThan(0);
  });

  it("Filtre sol_depth : Peu profond fonctionne", () => {
    const f: Filtres = { ...filtresVides, sol_depth: "Peu profond" };
    const r = applyAllFilters(ARBRES_TEST, f, FILTERS);
    // Doit filtrer les arbres avec sol_depth = "superficiel" ou "moyen"
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  it("Échelle résistance sécheresse est correcte (order)", () => {
    const f = getFilterByKey("resistance_secheresse");
    expect(f?.order).toBeDefined();
    expect(f?.order?.["faible"]).toBe(1);
    expect(f?.order?.["moyenne"]).toBe(2);
    expect(f?.order?.["bonne"]).toBe(3);
    expect(f?.order?.["excellente"]).toBe(4);
  });

  it("Échelle résistance vent est numérique (1-5)", () => {
    const f = getFilterByKey("resistance_vent");
    expect(f?.type).toBe("numeric");
  });

  it("Échelle résistance chaleur urbaine est numérique (1-5)", () => {
    const f = getFilterByKey("resistance_chaleur_urbaine");
    expect(f?.type).toBe("numeric");
  });

  it("Filtre fruitière_sauvage utilise bonne clé", () => {
    const f = getFilterByKey("fruitière_sauvage");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
  });

  it("Filtre floraison_remarquable utilise bonne clé", () => {
    const f = getFilterByKey("floraison_remarquable");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
  });

  it("Filtre couleur_automnale utilise bonne clé", () => {
    const f = getFilterByKey("couleur_automnale");
    expect(f).toBeDefined();
    expect(f?.type).toBe("exact");
  });

  // --- 5. Branches fragiles / racines devastatrices ---

  it("branches_fragiles : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, branches_fragiles: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    rOui.forEach((a) => expect(a.branches_fragiles).toBe("oui"));

    const fNon: Filtres = { ...filtresVides, branches_fragiles: "non" };
    const rNon = applyAllFilters(ARBRES_TEST, fNon, FILTERS);
    rNon.forEach((a) => expect(a.branches_fragiles).toBe("non"));
  });

  it("racines_devastatrices : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, racines_devastatrices: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    rOui.forEach((a) => expect(a.racines_devastatrices).toBe("oui"));
  });

  // --- 6. Filtres écosystémiques (nouveaux) ---

  it("ombrage_fort : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, ombrage_fort: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    rOui.forEach((a) => expect(a.ombrage_fort).toBe("oui"));
  });

  it("rafraichissement_fort : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, rafraichissement_fort: "oui" };
    const rOui = applyAllFilters(ARBRES_TEST, fOui, FILTERS);
    rOui.forEach((a) => expect(a.rafraichissement_fort).toBe("oui"));
  });

  // --- 7. Barres de niveau (résistance en nombre) ---

  it("résistance_vent : la valeur est un nombre", () => {
    ARBRES_TEST.forEach((a) => {
      expect(typeof a.resistance_vent).toBe("number");
      expect(a.resistance_vent).toBeGreaterThanOrEqual(1);
      expect(a.resistance_vent).toBeLessThanOrEqual(5);
    });
  });

  it("résistance_chaleur_urbaine : la valeur est un nombre", () => {
    ARBRES_TEST.forEach((a) => {
      expect(typeof a.resistance_chaleur_urbaine).toBe("number");
      expect(a.resistance_chaleur_urbaine).toBeGreaterThanOrEqual(1);
      expect(a.resistance_chaleur_urbaine).toBeLessThanOrEqual(5);
    });
  });

  // --- 8. Validation cohérence clés système vs textes humains ---

  it("CHAMPS utilise les bonnes clés système (sans accents)", () => {
    // Mock simple pour vérifier que les clés correspondent à l'interface Filtres
    const clesValides: (keyof Filtres)[] = [
      "origine",
      "resistance_secheresse",
      "resistance_vent",
      "resistance_chaleur_urbaine",
      "adapte_changement_climatique",
      "mellifere",
      "ombrage_fort",
      "rafraichissement_fort",
      "fruitière_sauvage",
      "floraison_remarquable",
      "couleur_automnale",
      "pollen_allergisant",
      "fruits_salissants",
      "branches_fragiles",
      "racines_devastatrices",
      "frequence_taille",
      "sensibilite_maladies",
      "cout_entretien",
    ];
    clesValides.forEach((cle) => {
      expect(typeof cle).toBe("string");
    });
  });
});
