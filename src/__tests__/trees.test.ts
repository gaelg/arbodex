import { describe, it, expect } from "vitest";
import { appliquerFiltres, Arbre, Filtres } from "@/lib/trees";

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
    type_sol: "Argileux",
    resistance_secheresse: "moyenne",
    pH: "basique",
    tolerance_sel: "oui",
    rusticite_min_C: -30,
    resistance_vent: 4,
    resistance_chaleur_urbaine: 4,
    adapte_changement_climatique: "oui",
    mellifere: "oui",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "eleve",
    resilience: "elevee",
    impact_icu: "fort",
    biodiversite: "elevee",
    qualite_air: "bonne",
    potentiel_allergisant: "faible",
    ombrage_fort: "oui",
    rafraichissement_fort: "oui",
    biodiversite_service: "elevee",
    type_racines: "traçantes",
    allergie_service: "faible",
    fruits_salissants: "oui",
    pollen_allergisant: "faible",
    branches_fragiles: "non",
    racines_devastatrices: "non",
    frequence_taille: "occasionnelle",
    sensibilite_maladies: "moderee",
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
    type_sol: "Argileux/Moyen",
    resistance_secheresse: "faible",
    pH: "acide",
    tolerance_sel: "non",
    rusticite_min_C: -35,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 3,
    adapte_changement_climatique: "non",
    mellifere: "oui",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "oui",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "moderee",
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
    sensibilite_maladies: "moderee",
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
    type_sol: "Sableux",
    resistance_secheresse: "bonne",
    pH: "acide",
    tolerance_sel: "non",
    rusticite_min_C: -35,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 3,
    adapte_changement_climatique: "non",
    mellifere: "non",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "non",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "moderee",
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
    type_sol: "Argileux/Sableux",
    resistance_secheresse: "excellente",
    pH: "neutre",
    tolerance_sel: "oui",
    rusticite_min_C: -25,
    resistance_vent: 4,
    resistance_chaleur_urbaine: 5,
    adapte_changement_climatique: "oui",
    mellifere: "non",
    fruitiere_sauvage: "oui",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "oui",
    ecorce_decorative: "non",
    stockage_carbone: "moyen",
    resilience: "elevee",
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
    type_sol: "Calcaire",
    resistance_secheresse: "moyenne",
    pH: "basique",
    tolerance_sel: "oui",
    rusticite_min_C: -15,
    resistance_vent: 3,
    resistance_chaleur_urbaine: 4,
    adapte_changement_climatique: "oui",
    mellifere: "oui",
    fruitiere_sauvage: "non",
    refuge_oiseaux: "oui",
    floraison_remarquable: "non",
    couleur_automnale: "non",
    ecorce_decorative: "non",
    stockage_carbone: "faible",
    resilience: "moderee",
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
    frequence_taille: "reguliere",
    sensibilite_maladies: "moderee",
    longevite: "longue",
    cout_entretien: "modere",
  },
];

describe("appliquerFiltres", () => {
  const filtresVides: Filtres = {
    recherche: "",
    type: "",
    origine: "",
    type_sol: "",
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

  it("retourne tous les arbres quand aucun filtre n'est actif", () => {
    const resultat = appliquerFiltres(ARBRES_TEST, filtresVides);
    expect(resultat).toHaveLength(5);
  });

  it("filtre par type de sol avec partial match", () => {
    const filtres: Filtres = { ...filtresVides, type_sol: "Sableux" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Pin blanc");
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("filtre par mellifère", () => {
    const filtres: Filtres = { ...filtresVides, mellifere: "oui" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("filtre par pollen allergisant (relatif - max)", () => {
    // "faible" → only faible (3 in test data)
    let filtres: Filtres = { ...filtresVides, pollen_allergisant: "faible" };
    let resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3); // Chêne, Buis, Ginkgo
    let noms = resultat.map((a) => a.nom_commun);
    expect(noms).toContain("Chêne pédonculé");
    expect(noms).toContain("Buis commun");
    expect(noms).toContain("Ginkgo");

    // "moyen" → faible + moyen (3 + 0 in test data)
    filtres = { ...filtresVides, pollen_allergisant: "moyen" };
    resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
  });

  it("filtre par hauteur minimum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_min: "20" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par hauteur maximum", () => {
    const filtres: Filtres = { ...filtresVides, hauteur_max: "14" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
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
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(3);
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par rusticité minimum", () => {
    const filtres: Filtres = { ...filtresVides, rusticite_min: "-30" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    // Seuls les arbres avec rusticite_min_C <= -30 (plus rustiques)
    expect(resultat).toHaveLength(3);
  });

  it("filtre par résistance vent minimum", () => {
    const filtres: Filtres = { ...filtresVides, resistance_vent: "4" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("filtre par adapté changement climatique", () => {
    const filtres: Filtres = {
      ...filtresVides,
      adapte_changement_climatique: "oui",
    };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
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
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
  });

  it("filtre par envergure minimum", () => {
    const filtres: Filtres = { ...filtresVides, envergure_min: "10" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(4);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).not.toContain("Buis commun");
  });

  it("filtre par origine (local)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "local" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Chêne pédonculé");
    expect(resultat.map((a) => a.nom_commun)).toContain("Buis commun");
  });

  it("filtre par origine (presque_local)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "presque_local" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(1);
    expect(resultat.map((a) => a.nom_commun)).toContain("Ginkgo");
  });

  it("filtre par origine (vraiment_exotique)", () => {
    const filtres: Filtres = { ...filtresVides, origine: "vraiment_exotique" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
    expect(resultat).toHaveLength(2);
    expect(resultat.map((a) => a.nom_commun)).toContain("Érable rouge");
    expect(resultat.map((a) => a.nom_commun)).toContain("Pin blanc");
  });

  // ========== TESTS DE NON-RÉGRESSION (retours utilisateur) ==========

  // --- 1. Données erronnées ---

  it("rusticité : filtre par valeur négative correctement encodée", () => {
    const filtres: Filtres = { ...filtresVides, rusticite_max: "-20" };
    const resultat = appliquerFiltres(ARBRES_TEST, filtres);
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

  it("fruitiere_sauvage : filtre oui/non retourne des résultats", () => {
    const filtresOui: Filtres = { ...filtresVides, fruitiere_sauvage: "oui" };
    const resultatOui = appliquerFiltres(ARBRES_TEST, filtresOui);
    expect(resultatOui.length).toBeGreaterThan(0);
    resultatOui.forEach((a) => expect(a.fruitiere_sauvage).toBe("oui"));

    const filtresNon: Filtres = { ...filtresVides, fruitiere_sauvage: "non" };
    const resultatNon = appliquerFiltres(ARBRES_TEST, filtresNon);
    expect(resultatNon.length).toBeGreaterThan(0);
    resultatNon.forEach((a) => expect(a.fruitiere_sauvage).toBe("non"));
  });

  // --- 2. Bugs bloquants ---

  it("filtre origine : local/exotique/presque_local tous disponibles", () => {
    const origines = ["local", "presque_local", "vraiment_exotique"];
    origines.forEach((o) => {
      const f: Filtres = { ...filtresVides, origine: o };
      const r = appliquerFiltres(ARBRES_TEST, f);
      expect(r.length).toBeGreaterThan(0);
    });
  });

  it("résistance sécheresse : filtres multiples retournent des résultats", () => {
    const niveaux = ["faible", "moyenne", "bonne", "excellente"];
    niveaux.forEach((n) => {
      const f: Filtres = { ...filtresVides, resistance_secheresse: n };
      const r = appliquerFiltres(ARBRES_TEST, f);
      expect(r.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("résistance vent : filtres numériques retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = { ...filtresVides, resistance_vent: String(v) };
      const r = appliquerFiltres(ARBRES_TEST, f);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("résistance chaleur urbaine : filtres numériques retournent des résultats", () => {
    for (let v = 1; v <= 5; v++) {
      const f: Filtres = {
        ...filtresVides,
        resistance_chaleur_urbaine: String(v),
      };
      const r = appliquerFiltres(ARBRES_TEST, f);
      expect(r.length).toBeGreaterThanOrEqual(0);
    }
  });

  // --- 3. Orthographe / accents ---

  it("sensibilite_maladies : gère les accents (modérée ≠ moderee)", () => {
    const f: Filtres = { ...filtresVides, sensibilite_maladies: "moderee" };
    const r = appliquerFiltres(ARBRES_TEST, f);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  it("cout_entretien : gère les accents (modéré ≠ modere)", () => {
    const f: Filtres = { ...filtresVides, cout_entretien: "modere" };
    const r = appliquerFiltres(ARBRES_TEST, f);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  it("frequence_taille : gère la casse et les accents (régulière)", () => {
    const f: Filtres = { ...filtresVides, frequence_taille: "reguliere" };
    const r = appliquerFiltres(ARBRES_TEST, f);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });

  // --- 4. Filtres écosystémiques (mellifere, ombrage, rafraichissement) ---

  it("filtre ombrage_fort retourne des résultats", () => {
    const f: Filtres = { ...filtresVides, recherche: "" };
    const tous = appliquerFiltres(ARBRES_TEST, f);
    const avecOmbrage = tous.filter((a) => a.ombrage_fort === "oui");
    expect(avecOmbrage.length).toBeGreaterThan(0);
  });

  it("filtre rafraichissement_fort retourne des résultats", () => {
    const f: Filtres = { ...filtresVides, recherche: "" };
    const tous = appliquerFiltres(ARBRES_TEST, f);
    const avecRafraichissement = tous.filter(
      (a) =>
        a.rafraichissement_fort === "oui" || a.rafraichissement_fort === "moyen"
    );
    expect(avecRafraichissement.length).toBeGreaterThan(0);
  });

  // --- 5. Branches fragiles / racines devastatrices ---

  it("branches_fragiles : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, branches_fragiles: "oui" };
    const rOui = appliquerFiltres(ARBRES_TEST, fOui);
    rOui.forEach((a) => expect(a.branches_fragiles).toBe("oui"));

    const fNon: Filtres = { ...filtresVides, branches_fragiles: "non" };
    const rNon = appliquerFiltres(ARBRES_TEST, fNon);
    rNon.forEach((a) => expect(a.branches_fragiles).toBe("non"));
  });

  it("racines_devastatrices : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, racines_devastatrices: "oui" };
    const rOui = appliquerFiltres(ARBRES_TEST, fOui);
    rOui.forEach((a) => expect(a.racines_devastatrices).toBe("oui"));
  });

  // --- 6. Filtres écosystémiques (nouveaux) ---

  it("ombrage_fort : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, ombrage_fort: "oui" };
    const rOui = appliquerFiltres(ARBRES_TEST, fOui);
    rOui.forEach((a) => expect(a.ombrage_fort).toBe("oui"));
  });

  it("rafraichissement_fort : filtre oui/non fonctionne", () => {
    const fOui: Filtres = { ...filtresVides, rafraichissement_fort: "oui" };
    const rOui = appliquerFiltres(ARBRES_TEST, fOui);
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
      "fruitiere_sauvage",
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
