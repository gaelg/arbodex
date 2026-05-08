export type FilterType =
  | "exact" // Correspondance exacte (oui/non, local/exotique)
  | "partial" // Correspondance partielle (type_sol: "Argileux" match "Argileux/Sableux")
  | "range" // Intervalle numérique (hauteur: 15-25m)
  | "relative" // Échelle ordonnée (faible ≤ moyen ≤ fort)
  | "numeric" // Comparaison numérique directe (vent ≥ 4)
  | "search" // Recherche textuelle avec normalisation accents
  | "multi" // Cases à cocher (plusieurs choix possibles)
  | "slider"; // Curseur à crans (vent, chaleur, grands froids)

export interface FilterConfig {
  key: string;
  label: string;
  section: string;
  type: FilterType;
  options?: string[];
  order?: Record<string, number>;
  optionLabels?: Record<string, string>;
}

export interface FiltersState {
  recherche: string;
  [key: string]: string; // Clés dynamiques selon FilterConfig
}
