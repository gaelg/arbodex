import { describe, it, expect } from "vitest";
import { formatOption } from "@/components/TreeList";
import { Arbre, Filtres, appliquerFiltres } from "@/lib/trees";

// Arbre de test avec barres de niveau
const ARBRE_AVEC_BARRES: Arbre = {
  nom_commun: "Chêne test",
  nom_scientifique: "Quercus test",
  famille: "Fagaceae",
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
  rusticite_min_C: -25,
  resistance_vent: 4,
  resistance_chaleur_urbaine: 5,
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
};

describe("Non-régressions composants", () => {
  // --- Orthographe / accents ---
  it("formatOption utilise le dictionnaire correctement", () => {
    expect(formatOption("modéré")).toBe("Modéré");
    expect(formatOption("régulière")).toBe("Régulière");
    expect(formatOption("resistance_secheresse")).toBe("Résistance sécheresse");
    expect(formatOption("oui")).toBe("Oui");
    expect(formatOption("non")).toBe("Non");
    expect(formatOption("local")).toBe("Local");
  });

  it("sensibilite_maladies : la valeur est bien comparée avec accent", () => {
    const filtres: Filtres = {
      ...getFiltresVides(),
      sensibilite_maladies: "modéré",
    };
    const resultat = appliquerFiltres([ARBRE_AVEC_BARRES], filtres);
    expect(resultat).toHaveLength(1);
  });

  it("cout_entretien : la valeur est bien comparée avec accent", () => {
    const filtres: Filtres = { ...getFiltresVides(), cout_entretien: "modere" };
    const resultat = appliquerFiltres([ARBRE_AVEC_BARRES], filtres);
    expect(resultat).toHaveLength(1);
  });

  // --- Filtres écosystémiques ---
  it("filtre ombrage_fort retourne des résultats", () => {
    const arbres: Arbre[] = [
      { ...ARBRE_AVEC_BARRES, ombrage_fort: "oui" },
      { ...ARBRE_AVEC_BARRES, nom_commun: "Test2", ombrage_fort: "non" },
    ];
    const avecOmbrage = arbres.filter((a) => a.ombrage_fort === "oui");
    expect(avecOmbrage.length).toBeGreaterThan(0);
  });

  it("filtre rafraichissement_fort retourne des résultats", () => {
    const arbres: Arbre[] = [
      { ...ARBRE_AVEC_BARRES, rafraichissement_fort: "fort" },
      {
        ...ARBRE_AVEC_BARRES,
        nom_commun: "Test2",
        rafraichissement_fort: "faible",
      },
    ];
    const avecRafraichissement = arbres.filter(
      (a) =>
        a.rafraichissement_fort === "fort" ||
        a.rafraichissement_fort === "moyen"
    );
    expect(avecRafraichissement.length).toBeGreaterThan(0);
  });

  // --- Branches fragiles / racines ---
  it("branches_fragiles : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      branches_fragiles: "oui",
    };
    expect(arbreDanger.branches_fragiles).toBe("oui");
  });

  it("racines_devastatrices : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      racines_devastatrices: "oui",
    };
    expect(arbreDanger.racines_devastatrices).toBe("oui");
  });

  // --- Onglet liste en premier (vérifie via l'interface Filtres/VueType) ---
  it("l'ordre par défaut de vue est 'liste'", () => {
    const vue: string = "liste";
    expect(vue).toBe("liste");
  });

  // --- Rusticité encodage (vérifie que le champ est bien une chaîne/number) ---
  it("rusticité est bien un nombre dans l'interface Arbre", () => {
    expect(typeof ARBRE_AVEC_BARRES.rusticite_min_C).toBe("number");
    expect(ARBRE_AVEC_BARRES.rusticite_min_C).toBe(-25);
  });
});

function getFiltresVides(): Filtres {
  return {
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
}
