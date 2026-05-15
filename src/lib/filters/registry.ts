import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sols
  {
    key: "ph_sol",
    label: "Acidité",
    section: "Sols",
    type: "multi",
    options: ["all", "acid", "neutral", "alkaline"],
    optionLabels: {
      all: "Tous",
      acid: "Acide",
      neutral: "Neutre",
      alkaline: "Calcaire",
    },
  },
  {
    key: "humidite_sol",
    label: "Humidité",
    section: "Sols",
    type: "multi",
    options: ["all", "dry", "fresh", "wet"],
    optionLabels: {
      all: "Tous",
      dry: "Sec",
      fresh: "Frais",
      wet: "Humide",
    },
  },
  {
    key: "texture_sol",
    label: "Texture",
    section: "Sols",
    type: "multi",
    options: ["all", "loamy", "clay", "sandy"],
    optionLabels: {
      all: "Tous",
      loamy: "Limoneux",
      clay: "Argileux",
      sandy: "Sablonneux",
    },
  },

  // Climat
  {
    key: "rusticite_celsius",
    label: "Grands froids",
    section: "Climat",
    type: "slider",
    order: {
      "-10": -10,
      "-15": -15,
      "-20": -20,
      "-25": -25,
      "-30": -30,
    },
    options: ["-10", "-15", "-20", "-25", "-30"],
    optionLabels: {
      "-10": "−10 °C",
      "-15": "−15 °C",
      "-20": "−20 °C",
      "-25": "−25 °C",
      "-30": "−30 °C",
    },
  },

  // Contraintes du projet
  {
    key: "racines_problematiques",
    label: "Racines problématiques",
    section: "Contraintes du projet",
    type: "exact",
    options: ["all", "non"],
    optionLabels: {
      all: "Peu importe",
      non: "Non",
    },
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes du projet",
    type: "exact",
    options: ["all", "non"],
    optionLabels: {
      all: "Peu importe",
      non: "Non",
    },
  },
  // Demandes particulières — cases à cocher (haut)
  {
    key: "resiste_changement_climatique",
    label: "Adapté au changement climatique",
    section: "Demandes particulières",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },

  // Demandes particulières — curseurs (bas)
  {
    key: "origine",
    label: "Aire d'origine",
    section: "Demandes particulières",
    type: "slider",
    invertDir: true,
    order: {
      Tous: 3,
      "Europe de l'Ouest": 2,
      Indigène: 1,
      "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux": 2,
      "Vraiment exotique": 3,
    },
    options: ["Tous", "Europe de l'Ouest", "Indigène"],
    optionLabels: {
      Tous: "Tous",
      "Europe de l'Ouest": "Europe de l'Ouest",
      Indigène: "Indigène",
    },
  },
  {
    key: "pollen_allergisant",
    label: "Allergisants acceptables",
    section: "Demandes particulières",
    type: "slider",
    invertDir: true,
    order: { faible: 1, moyen: 2, fort: 3 },
    options: ["fort", "moyen", "faible"],
    optionLabels: {
      fort: "Fort",
      moyen: "Moyen",
      faible: "Faible",
    },
  },
  {
    key: "cout_entretien",
    label: "Coût d'entretien acceptable",
    section: "Demandes particulières",
    type: "slider",
    invertDir: true,
    order: { faible: 1, modéré: 2, élevé: 3 },
    options: ["élevé", "modéré", "faible"],
    optionLabels: {
      élevé: "Élevé",
      modéré: "Modéré",
      faible: "Faible",
    },
  },

  // Port / Strate
  {
    key: "strate",
    label: "Strate",
    section: "Contraintes du projet",
    type: "multi",
    options: ["all", "tree", "shrub", "herbaceous", "climbing", "groundcover"],
    optionLabels: {
      all: "Tous",
      tree: "Arbre",
      shrub: "Arbuste",
      herbaceous: "Herbacée",
      climbing: "Grimpant",
      groundcover: "Couvre-sol",
    },
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Tous",
      oui: "Oui",
    },
  },
];

export function isFilterActive(config: FilterConfig, value: string): boolean {
  if (!value) return false;
  if (config.type === "multi" && config.options) {
    const allNonAll = config.options.filter((o) => o !== "all");
    const selected = value.split(",").filter(Boolean);
    if (selected.length === allNonAll.length) return false;
  }
  if (config.type === "slider" && config.options) {
    if (value === config.options[0]) return false;
  }
  return true;
}

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
  const state: Record<string, string> = { recherche: "", optimiste: "" };
  for (const f of FILTERS) {
    // Pour les filtres multi, tout cocher par défaut (sauf "all")
    if (f.type === "multi" && f.options) {
      state[f.key] = f.options.filter((o) => o !== "all").join(",");
    } else if (f.type === "slider") {
      state[f.key] = "";
    } else {
      state[f.key] = "";
    }
  }
  // Ajouter les filtres de dimension (pas dans le registre central)
  state.hauteur_min = "";
  state.hauteur_max = "";
  state.envergure_min = "";
  state.envergure_max = "";
  return state;
}
