export type FilterType =
  | "exact" // Correspondance exacte (oui/non, local/exotique)
  | "partial" // Correspondance partielle (type_sol: "Argileux" match "Argileux/Sableux")
  | "range" // Intervalle numérique (hauteur: 15-25m)
  | "relative" // Échelle ordonnée (faible ≤ moyen ≤ fort)
  | "numeric" // Comparaison numérique directe (vent ≥ 4)
  | "search" // Recherche textuelle avec normalisation accents
  | "multi"; // Cases à cocher (plusieurs choix possibles)

export interface FilterConfig {
  key: string; // Clé système (ex: "origine")
  label: string; // Libellé humain (ex: "Origine")
  section: string; // Section UI (ex: "Essence")
  type: FilterType;
  options?: string[]; // Options prédéfinies (pour exact/relative)
  order?: Record<string, number>; // Échelle ordonnée (pour relative)
  min?: number; // Min pour range
  max?: number; // Max pour range
  compute?: (arbre: any) => string; // Calcul dynamique (ex: presque_local)
}

export interface FiltersState {
  recherche: string;
  [key: string]: string; // Clés dynamiques selon FilterConfig
}
