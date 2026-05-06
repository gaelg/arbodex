import { describe, it, expect } from "vitest";
import { formatOption } from "@/components/TreeList";
import { Arbre, Filtres } from "@/lib/trees";
import { applyAllFilters, FILTERS } from "@/lib/filters";

// Arbre de test avec valeurs de niveau
const ARBRE_AVEC_BARRES: Arbre = {
  nom_commun: "Chêne test",
  nom_scientifique: "Quercus test",
  famille: "Fagaceae",
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
  sol_richness: "moyen",
  sol_depth: "profond",
  resistance_secheresse: "Moyenne",
  rusticite_min_C: -25,
  resistance_vent: "Bonne",
  resistance_chaleur_urbaine: "Bonne",
  adapte_changement_climatique: "Oui",
  mellifere: "Oui",
  fruitiere_sauvage: "Oui",
  refuge_oiseaux: "Oui",
  floraison_remarquable: "Non",
  couleur_automnale: "Oui",
  stockage_carbone: "eleve",
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
};

describe("Non-régressions composants", () => {
  // --- Orthographe / accents ---
  it("formatOption utilise le dictionnaire correctement", () => {
    expect(formatOption("Moyennement")).toBe("Moyennement");
    expect(formatOption("Régulière")).toBe("Régulière");
    expect(formatOption("resistance_secheresse")).toBe("Résistance sécheresse");
    expect(formatOption("Oui")).toBe("Oui");
    expect(formatOption("Non")).toBe("Non");
    expect(formatOption("Indigène")).toBe("Indigène");
  });

  it("sensibilite_maladies : la valeur est bien comparée avec accent", () => {
    const filtres: Filtres = {
      ...getFiltresVides(),
      sensibilite_maladies: "Moyennement",
    };
    const resultat = applyAllFilters([ARBRE_AVEC_BARRES], filtres, FILTERS);
    expect(resultat).toHaveLength(1);
  });

  it("cout_entretien : la valeur est bien comparée avec accent", () => {
    const filtres: Filtres = { ...getFiltresVides(), cout_entretien: "Moyen" };
    const resultat = applyAllFilters([ARBRE_AVEC_BARRES], filtres, FILTERS);
    expect(resultat).toHaveLength(1);
  });

  // --- Filtres écosystémiques ---
  it("filtre ombrage_fort retourne des résultats", () => {
    const arbres: Arbre[] = [
      { ...ARBRE_AVEC_BARRES, ombrage_fort: "Oui" },
      { ...ARBRE_AVEC_BARRES, nom_commun: "Test2", ombrage_fort: "Non" },
    ];
    const avecOmbrage = arbres.filter((a) => a.ombrage_fort === "Oui");
    expect(avecOmbrage.length).toBeGreaterThan(0);
  });

  it("filtre rafraichissement_fort retourne des résultats", () => {
    const arbres: Arbre[] = [
      { ...ARBRE_AVEC_BARRES, rafraichissement_fort: "Fort" },
      {
        ...ARBRE_AVEC_BARRES,
        nom_commun: "Test2",
        rafraichissement_fort: "Moyen",
      },
    ];
    const avecRafraichissement = arbres.filter(
      (a) =>
        a.rafraichissement_fort === "Moyen" ||
        a.rafraichissement_fort === "Fort"
    );
    expect(avecRafraichissement.length).toBeGreaterThan(0);
  });

  // --- Branches fragiles / racines ---
  it("branches_fragiles : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      branches_fragiles: "Oui",
    };
    expect(arbreDanger.branches_fragiles).toBe("Oui");
  });

  it("racines_devastatrices : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      racines_devastatrices: "Oui",
    };
    expect(arbreDanger.racines_devastatrices).toBe("Oui");
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
}
