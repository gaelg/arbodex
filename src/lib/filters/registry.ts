import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sol
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
    options: ["Tous", "Oui"],
  },
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse (mini)",
    section: "Climat",
    type: "relative",
    order: { Moyenne: 2, Bonne: 3, Excellente: 4 },
    options: ["Tous", "Moyenne", "Bonne", "Excellente"],
  },
  {
    key: "resistance_vent",
    label: "Résistance vent (mini)",
    section: "Climat",
    type: "relative",
    order: { Moyenne: 2, Bonne: 3, Excellente: 4 },
    options: ["Tous", "Moyenne", "Bonne", "Excellente"],
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Résistance chaleur urbaine (mini)",
    section: "Climat",
    type: "relative",
    order: { Moyenne: 2, Bonne: 3, Excellente: 4 },
    options: ["Tous", "Moyenne", "Bonne", "Excellente"],
  },
  {
    key: "rusticite_min_C",
    label: "Rusticité minimale (°C)",
    section: "Climat",
    type: "numeric",
  },

  // Services
  {
    key: "origine",
    label: "Origine",
    section: "Services",
    type: "exact",
    options: ["Tous", "Europe de l'Ouest", "Indigène"],
  },
  {
    key: "mellifere",
    label: "Mellifère",
    section: "Services",
    type: "exact",
    options: ["Tous", "Oui"],
  },
  {
    key: "ombrage_fort",
    label: "Ombrage",
    section: "Services",
    type: "exact",
    options: ["Tous", "Oui"],
  },
  {
    key: "rafraichissement_fort",
    label: "Rafraîchissement minimal",
    section: "Services",
    type: "relative",
    order: { Moyen: 2, Fort: 3 },
    options: ["Tous", "Moyen", "Fort"],
  },
  {
    key: "fruitiere_sauvage",
    label: "Fruits pour la faune",
    section: "Services",
    type: "exact",
    options: ["Tous", "Oui"],
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
    options: ["Tous", "Oui"],
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Esthétique",
    type: "exact",
    options: ["Tous", "Oui"],
  },

  // Contraintes et risques
  {
    key: "pollen_allergisant",
    label: "Allergisant (maxi)",
    section: "Contraintes et risques",
    type: "relative",
    order: { Faiblement: 1, Moyennement: 2 },
    options: ["Tous", "Moyennement", "Faiblement"],
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes et risques",
    type: "exact",
    options: ["Tous", "Non"],
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes et risques",
    type: "exact",
    options: ["Tous", "Non"],
  },
  {
    key: "racines_devastatrices",
    label: "Racines problématiques",
    section: "Contraintes et risques",
    type: "exact",
    options: ["Tous", "Non"],
  },

  // Entretien
  {
    key: "cout_entretien",
    label: "Coût entretien (maxi)",
    section: "Entretien",
    type: "relative",
    order: { Faible: 1, Moyen: 2 },
    options: ["Tous", "Moyen", "Faible"],
  },
  {
    key: "frequence_taille",
    label: "Fréquence taille (maxi)",
    section: "Entretien",
    type: "relative",
    order: { Jamais: 1, Occasionnelle: 2 },
    options: ["Tous", "Occasionnelle", "Jamais"],
  },
  {
    key: "sensibilite_maladies",
    label: "Sensible aux maladies (maxi)",
    section: "Entretien",
    type: "relative",
    order: { Faiblement: 1, Moyennement: 2 },
    options: ["Tous", "Moyennement", "Faiblement"],
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
