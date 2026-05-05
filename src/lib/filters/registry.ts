import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sol - Filtres décomposés (tous par défaut via cases à cocher)
  {
    key: "sol_acidity",
    label: "Acidité",
    section: "Sol",
    type: "multi",
    options: ["Acide", "Neutre", "Calcaire"],
  },
  {
    key: "sol_moisture",
    label: "Humidité",
    section: "Sol",
    type: "multi",
    options: ["Sec", "Frais", "Humide"],
  },
  {
    key: "sol_drainage",
    label: "Drainage",
    section: "Sol",
    type: "multi",
    options: ["Bon", "Moyen", "Mauvais"],
  },
  {
    key: "sol_texture",
    label: "Texture",
    section: "Sol",
    type: "multi",
    options: ["Limoneux", "Argileux", "Sablonneux"],
  },
  {
    key: "sol_richness",
    label: "Richesse",
    section: "Sol",
    type: "multi",
    options: ["Humifère", "Moyen", "Pauvre"],
  },
  {
    key: "sol_depth",
    label: "Profondeur",
    section: "Sol",
    type: "exact",
    options: ["Tous", "Peu profond"],
  },

  // Climat
  {
    key: "adapte_changement_climatique",
    label: "Adapté changement climatique",
    section: "Climat",
    type: "exact",
  },
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse (min)",
    section: "Climat",
    type: "relative",
    order: { faible: 1, moyenne: 2, bonne: 3, excellente: 4 },
  },
  {
    key: "resistance_vent",
    label: "Résistance vent (min)",
    section: "Climat",
    type: "numeric",
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Chaleur urbaine (min)",
    section: "Climat",
    type: "numeric",
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
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes et risques",
    type: "exact",
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes et risques",
    type: "exact",
  },
  {
    key: "racines_devastatrices",
    label: "Racines problématiques",
    section: "Contraintes et risques",
    type: "exact",
  },

  // Entretien
  {
    key: "cout_entretien",
    label: "Coût entretien (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, moyen: 2, élevé: 3 },
  },
  {
    key: "frequence_taille",
    label: "Fréquence taille (max)",
    section: "Entretien",
    type: "relative",
    order: { jamais: 1, occasionnelle: 2, régulière: 3 },
  },
  {
    key: "sensibilite_maladies",
    label: "Sensible aux maladies (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, modérée: 2, élevée: 3 },
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Esthétique",
    type: "exact",
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
