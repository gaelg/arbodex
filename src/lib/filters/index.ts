export {
  FILTERS,
  getFilterByKey,
  getFiltersBySection,
  getAllSections,
  getDefaultFiltersState,
} from "./registry";
export type { FilterConfig, FilterType, FiltersState } from "./types";
export { applyFilter, applyAllFilters } from "./appiers";
import { Arbre } from "../trees";
import { FILTERS, getDefaultFiltersState } from "./registry";
import { applyAllFilters } from "./appiers";

// Type compatible avec l'ancien code (pour transition progressive)
export interface FiltersStateLegacy {
  recherche: string;
  type: string;
  origine: string;
  type_sol: string;
  resistance_secheresse: string;
  pH: string;
  rusticite_min: string;
  rusticite_max: string;
  resistance_vent: string;
  resistance_chaleur_urbaine: string;
  adapté_changement_climatique: string;
  mellifere: string;
  ombrage_fort: string;
  rafraichissement_fort: string;
  fruitiere_sauvage: string;
  floraison_remarquable: string;
  couleur_automnale: string;
  pollen_allergisant: string;
  fruits_salissants: string;
  branches_fragiles: string;
  racines_devastatrices: string;
  frequence_taille: string;
  sensibilite_maladies: string;
  cout_entretien: string;
  hauteur_min: string;
  hauteur_max: string;
  envergure_min: string;
  envergure_max: string;
}

// Adaptateur : convertit l'ancien format → nouveau
function adaptFilters(legacy: FiltersStateLegacy): Record<string, string> {
  const state = getDefaultFiltersState();
  state.recherche = legacy.recherche;
  state.type_sol = legacy.type_sol;
  state.pH = legacy.pH;
  state.resistance_secheresse = legacy.resistance_secheresse;
  state.resistance_vent = legacy.resistance_vent;
  state.resistance_chaleur_urbaine = legacy.resistance_chaleur_urbaine;
  state.adapté_changement_climatique = legacy.adapté_changement_climatique;
  state.mellifere = legacy.mellifere;
  state.ombrage_fort = legacy.ombrage_fort;
  state.rafraichissement_fort = legacy.rafraichissement_fort;
  state.fruitiere_sauvage = legacy.fruitiere_sauvage;
  state.floraison_remarquable = legacy.floraison_remarquable;
  state.couleur_automnale = legacy.couleur_automnale;
  state.pollen_allergisant = legacy.pollen_allergisant;
  state.fruits_salissants = legacy.fruits_salissants;
  state.branches_fragiles = legacy.branches_fragiles;
  state.racines_devastatrices = legacy.racines_devastatrices;
  state.frequence_taille = legacy.frequence_taille;
  state.sensibilite_maladies = legacy.sensibilite_maladies;
  state.cout_entretien = legacy.cout_entretien;
  state.hauteur_min = legacy.hauteur_min;
  state.hauteur_max = legacy.hauteur_max;
  state.envergure_min = legacy.envergure_min;
  state.envergure_max = legacy.envergure_max;
  state.rusticite_min = legacy.rusticite_min;
  state.rusticite_max = legacy.rusticite_max;
  return state;
}

// Nouvelle fonction principale (pour transition)
export function appliquerFiltres(
  arbres: Arbre[],
  legacyFilters: FiltersStateLegacy
): Arbre[] {
  const newFilters = adaptFilters(legacyFilters);
  return applyAllFilters(arbres, newFilters, FILTERS);
}
