import { FilterConfig, FilterType } from "./types";
import { Arbre } from "../trees";

// Normalisation accents pour recherche
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

//Types de base pour les comparaisons
function matchExact(filter: string, value: string | number): boolean {
  if (!filter) return true;
  return String(value) === filter;
}

function matchPartial(filter: string, value: string): boolean {
  if (!filter) return true;
  return value.includes(filter);
}

function matchRelative(
  filter: string,
  value: string,
  order: Record<string, number>
): boolean {
  if (!filter) return true;
  const seuil = order[filter];
  const val = order[value];
  if (seuil === undefined || val === undefined) {
    return String(value) === filter;
  }
  return val <= seuil;
}

function matchNumeric(filter: string, value: number): boolean {
  if (!filter) return true;
  return value >= Number(filter);
}

function matchRange(
  min: string,
  max: string,
  valueMin: number,
  valueMax: number
): boolean {
  if (min && valueMax < Number(min)) return false;
  if (max && valueMin > Number(max)) return false;
  return true;
}

function matchSearch(query: string, arbre: Arbre): boolean {
  if (!query) return true;
  const q = normalize(query);
  return (
    normalize(arbre.nom_commun).includes(q) ||
    normalize(arbre.nom_scientifique).includes(q) ||
    normalize(arbre.famille).includes(q)
  );
}

// Calculateur "presque_local" (à implementer avec coordonnées GPS + rayon 700km)
// Pour l'instant : retourne la valeur du champ
function computeOrigine(arbre: Arbre): string {
  return arbre.origine; // TODO: calculer distance HDF < 700km
}

// Applique UN filtre selon son type
export function applyFilter(
  arbre: Arbre,
  config: FilterConfig,
  value: string
): boolean {
  // Pour l'origine, on pourrait utiliser un compute si besoin
  const fieldValue = (arbre as any)[config.key];

  switch (config.type) {
    case "exact":
      return matchExact(value, fieldValue);
    case "partial":
      return matchPartial(value, String(fieldValue));
    case "relative":
      return matchRelative(value, fieldValue, config.order || {});
    case "numeric":
      return matchNumeric(value, Number(fieldValue));
    case "search":
      return matchSearch(value, arbre);
    default:
      return true;
  }
}

// Applique tous les filtres depuis l'état (record<string,string>)
export function applyAllFilters(
  arbres: Arbre[],
  filters: Record<string, string>,
  filterConfigs: FilterConfig[]
): Arbre[] {
  return arbres.filter((arbre) => {
    // 1. Recherche textuelle (spéciale)
    if (!matchSearch(filters.recherche || "", arbre)) return false;

    // 2. Filtres dimension (range)
    if (
      !matchRange(
        filters.hauteur_min || "",
        filters.hauteur_max || "",
        arbre.hauteur_min_m,
        arbre.hauteur_max_m
      )
    )
      return false;

    if (
      !matchRange(
        filters.envergure_min || "",
        filters.envergure_max || "",
        arbre.envergure_min_m,
        arbre.envergure_max_m
      )
    )
      return false;

    // 3. Rusticité (range numérique)
    if (
      filters.rusticite_min &&
      arbre.rusticite_min_C < Number(filters.rusticite_min)
    )
      return false;
    if (
      filters.rusticite_max &&
      arbre.rusticite_min_C > Number(filters.rusticite_max)
    )
      return false;

    // 4. Autres filtres via la config
    for (const config of filterConfigs) {
      if (config.key === "origine") continue; // Déjà géré via compute si besoin
      if (
        filters[config.key] &&
        !applyFilter(arbre, config, filters[config.key])
      ) {
        return false;
      }
    }

    return true;
  });
}
