import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sol - Filtres décomposés (tous par défaut via cases à cocher)
  {
    key: "sol_acidity",
    label: "Acidité",
    section: "Sol",
    type: "multi",
    options: ["Acide", "Neutre", "Calcaire"],
    optionLabels: {
      "Acide": "Acide",
      "Neutre": "Neutre",
      "Calcaire": "Calcaire"
    }
  },
  {
    key: "sol_moisture",
    label: "Humidité",
    section: "Sol",
    type: "multi",
    options: ["Sec", "Frais", "Humide"],
    optionLabels: {
      "Sec": "Sec",
      "Frais": "Frais",
      "Humide": "Humide"
    }
  },
  {
    key: "sol_drainage",
    label: "Drainage",
    section: "Sol",
    type: "multi",
    options: ["Bon", "Moyen", "Mauvais"],
    optionLabels: {
      "Bon": "Bon",
      "Moyen": "Moyen",
      "Mauvais": "Mauvais"
    }
  },
  {
    key: "sol_texture",
    label: "Texture",
    section: "Sol",
    type: "multi",
    options: ["Limoneux", "Argileux", "Sablonneux"],
    optionLabels: {
      "Limoneux": "Limoneux",
      "Argileux": "Argileux",
      "Sablonneux": "Sablonneux"
    }
  },
  {
    key: "sol_richness",
    label: "Richesse",
    section: "Sol",
    type: "multi",
    options: ["Humifère", "Moyen", "Pauvre"],
    optionLabels: {
      "Humifère": "Humifère",
      "Moyen": "Moyen",
      "Pauvre": "Pauvre"
    }
  },
  {
    key: "sol_depth",
    label: "Profondeur",
    section: "Sol",
    type: "exact",
    options: ["Tous", "Peu profond"],
    optionLabels: {
      "Tous": "Tous",
      "Peu profond": "Peu profond"
    }
  },

  // Climat
  {
    key: "adapte_changement_climatique",
    label: "Adapté changement climatique",
    section: "Climat",
    type: "exact",
    optionLabels: {
      oui: "Oui, adapté",
      non: "Non"
    }
  },
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse (min)",
    section: "Climat",
    type: "relative",
    order: { faible: 1, moyenne: 2, bonne: 3, excellente: 4 },
    optionLabels: {
      faible: "Faible",
      moyenne: "Moyenne",
      bonne: "Bonne",
      excellente: "Excellente"
    }
  },
  {
    key: "resistance_vent",
    label: "Résistance vent (min)",
    section: "Climat",
    type: "numeric",
    optionLabels: {
      "1": "Très faible",
      "2": "Faible",
      "3": "Moyenne",
      "4": "Bonne",
      "5": "Excellente"
    }
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Chaleur urbaine (min)",
    section: "Climat",
    type: "numeric",
    optionLabels: {
      "1": "Très faible",
      "2": "Faible",
      "3": "Moyenne",
      "4": "Bonne",
      "5": "Excellente"
    }
  },
  {
    key: "rusticite_min_C",
    label: "Rusticité minimale (°C)",
    section: "Climat",
    type: "numeric",
  },

  // Services écosystémiques
  {
    key: "origine",
    label: "Origine",
    section: "Services écosystémiques",
    type: "exact",
    options: ["local", "presque_local", "exotique"],
    optionLabels: {
      local: "Local (HDF)",
      presque_local: "Presque local (< 700 km)",
      exotique: "Exotique"
    }
  },
  {
    key: "mellifere",
    label: "Mellifère",
    section: "Services écosystémiques",
    type: "exact",
    optionLabels: {
      oui: "Oui, mellifère",
      non: "Non"
    }
  },
  {
    key: "ombrage_fort",
    label: "Ombrage fort",
    section: "Services écosystémiques",
    type: "exact",
    optionLabels: {
      oui: "Oui, ombrage fort",
      non: "Non"
    }
  },
  {
    key: "rafraichissement_fort",
    label: "Rafraîchissement fort",
    section: "Services écosystémiques",
    type: "exact",
    optionLabels: {
      oui: "Oui, rafraîchit",
      non: "Non"
    }
  },
  {
    key: "fruitière_sauvage",
    label: "Fruits sauvages",
    section: "Services écosystémiques",
    type: "exact",
    optionLabels: {
      oui: "Oui, fruits comestibles",
      non: "Non"
    }
  },
  {
    key: "pollen_allergisant",
    label: "Allergisant (max)",
    section: "Contraintes et risques",
    type: "relative",
    order: { faible: 1, moyen: 2, fort: 3 },
    optionLabels: {
      faible: "Faible",
      moyen: "Moyen",
      fort: "Fort"
    }
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes et risques",
    type: "exact",
    optionLabels: {
      oui: "Oui, salissant",
      non: "Non"
    }
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes et risques",
    type: "exact",
    optionLabels: {
      oui: "Oui, fragiles",
      non: "Non"
    }
  },
  {
    key: "racines_devastatrices",
    label: "Racines problématiques",
    section: "Contraintes et risques",
    type: "exact",
    optionLabels: {
      oui: "Oui, dévastatrices",
      non: "Non"
    }
  },

  // Entretien
  {
    key: "cout_entretien",
    label: "Coût entretien (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, moyen: 2, élevé: 3 },
    optionLabels: {
      faible: "Faible",
      moyen: "Moyen",
      élevé: "Élevé"
    }
  },
  {
    key: "frequence_taille",
    label: "Fréquence taille (max)",
    section: "Entretien",
    type: "relative",
    order: { jamais: 1, occasionnelle: 2, régulière: 3 },
    optionLabels: {
      jamais: "Jamais",
      occasionnelle: "Occasionnelle",
      régulière: "Régulière"
    }
  },
  {
    key: "sensibilite_maladies",
    label: "Sensible aux maladies (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, modérée: 2, élevée: 3 },
    optionLabels: {
      faible: "Faible",
      modérée: "Modérée",
      élevée: "Élevée"
    }
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
    optionLabels: {
      oui: "Oui, remarquable",
      non: "Non"
    }
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Esthétique",
    type: "exact",
    optionLabels: {
      oui: "Oui, remarquable",
      non: "Non"
    }
  },
  {
    key: "ecorce_decorative",
    label: "Écorce décorative",
    section: "Esthétique",
    type: "exact",
    optionLabels: {
      oui: "Oui, décorative",
      non: "Non"
    }
  },
];

// Helpers pour récupérer les infos
export function getFilterByKey(key: string): FilterConfig | undefined {
  return FILTERS.find((f) => f.key === key);
}

export function getFiltersBySection(): Record<string, FilterConfig[]> {
  const sections: Record<string, FilterConfig[]> = {};
  for (const f of FILTERS) {
    if (!sections[f.section]) sections[f.section] = [];
    sections[f.section].push(f);
  }
  return sections;
}

export function getAllSections(): string[] {
  return [...new Set(FILTERS.map((f) => f.section))];
}

export function getDefaultFiltersState(): Record<string, string> {
  const state: Record<string, string> = { recherche: "" };
  for (const f of FILTERS) {
    state[f.key] = "";
  }
  // Ajouter les filtres de dimension (pas dans le registre central)
  state.hauteur_min = "";
  state.hauteur_max = "";
  state.envergure_min = "";
  state.envergure_max = "";
  state.rusticite_min = "";
  state.rusticite_max = "";
  return state;
}
