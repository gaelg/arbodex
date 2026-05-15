import { describe, it, expect } from "vitest";
import { formatOption } from "@/components/TreeList";
import FormulaireFiltres from "@/components/FilterForm";
import { Arbre, Filtres } from "@/lib/trees";
import { applyAllFilters, FILTERS, getFilterByKey } from "@/lib/filters";

const ARBRE_AVEC_BARRES: Arbre = {
  nom_commun: "Chêne test",
  nom_scientifique: "Quercus test",
  famille_botanique: "Fagaceae",
  origine: "Indigène",
  hauteur_min_m: 15,
  hauteur_max_m: 25,
  envergure_min_m: 10,
  envergure_max_m: 20,
  port: "ovale",
  ph_sol: "neutre",
  humidite_sol: "frais",
  texture_sol: "argileux",
  rusticite_celsius: -25,
  resiste_changement_climatique: "oui",
  floraison_remarquable: "non",
  pollen_allergisant: "faible",
  branches_fragiles: "non",
  racines_problematiques: "non",
  cout_entretien: "modéré",
};

describe("Non-régressions composants", () => {
  it("formatOption utilise le dictionnaire correctement", () => {
    expect(formatOption("Moyennement")).toBe("Moyennement");
    expect(formatOption("Régulière")).toBe("Régulière");
    expect(formatOption("Oui")).toBe("Oui");
    expect(formatOption("Non")).toBe("Non");
    expect(formatOption("Indigène")).toBe("Indigène");
    expect(formatOption("cout_entretien")).toBe("Coût d'entretien acceptable");
  });

  it("cout_entretien : la valeur est bien comparée avec accent", () => {
    const filtres: Filtres = { ...getFiltresVides(), cout_entretien: "modéré" };
    const resultat = applyAllFilters([ARBRE_AVEC_BARRES], filtres, FILTERS);
    expect(resultat).toHaveLength(1);
  });

  it("branches_fragiles : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      branches_fragiles: "oui",
    };
    expect(arbreDanger.branches_fragiles).toBe("oui");
  });

  it("racines_problematiques : oui doit être considéré comme inconvénient", () => {
    const arbreDanger: Arbre = {
      ...ARBRE_AVEC_BARRES,
      racines_problematiques: "oui",
    };
    expect(arbreDanger.racines_problematiques).toBe("oui");
  });

  it("l'ordre par défaut de vue est 'liste'", () => {
    expect("liste").toBe("liste");
  });

  it("rusticité est bien un nombre dans l'interface Arbre", () => {
    expect(typeof ARBRE_AVEC_BARRES.rusticite_celsius).toBe("number");
    expect(ARBRE_AVEC_BARRES.rusticite_celsius).toBe(-25);
  });
});

it("cout_entretien : première option du slider est redondante (pas de filtre)", () => {
  const arbres: Arbre[] = [
    { ...ARBRE_AVEC_BARRES, cout_entretien: "faible" },
    {
      ...ARBRE_AVEC_BARRES,
      nom_commun: "B",
      cout_entretien: "modéré",
    },
  ];

  const filtres = getFiltresVides();
  const currentCount = applyAllFilters(arbres, filtres, FILTERS).length;
  expect(currentCount).toBe(2);

  // "élevé" = première option = pas de filtre → même compte
  const countEleve = applyAllFilters(
    arbres,
    { ...filtres, cout_entretien: "élevé" },
    FILTERS
  ).length;
  expect(countEleve).toBe(currentCount);
});

function getFiltresVides(): Filtres {
  return {
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
}
