import { FilterConfig, FilterType } from "./types";
import { Arbre } from "../trees";

// Normalisation accents pour recherche
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Types de base pour les comparaisons
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
  return val >= seuil;
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

// Régions françaises avec coordonnées (centres)
const REGIONS: Record<string, { lat: number; lon: number }> = {
  "Hauts-de-France": { lat: 49.9, lon: 2.3 },
  "Île-de-France": { lat: 48.86, lon: 2.35 },
  Normandie: { lat: 49.18, lon: -0.37 },
  "Grand Est": { lat: 48.68, lon: 6.17 },
  "Bourgogne-Franche-Comté": { lat: 47.28, lon: 5.02 },
  "Centre-Val de Loire": { lat: 47.75, lon: 1.68 },
  "Pays de la Loire": { lat: 47.48, lon: -0.55 },
  Bretagne: { lat: 48.12, lon: -2.83 },
  "Nouvelle-Aquitaine": { lat: 45.76, lon: 0.58 },
  Occitanie: { lat: 43.6, lon: 2.25 },
  "Auvergne-Rhône-Alpes": { lat: 45.76, lon: 4.83 },
  "Provence-Alpes-Côte d'Azur": { lat: 43.53, lon: 5.43 },
  Corse: { lat: 42.03, lon: 9.01 },
};

const HDF: { lat: number; lon: number } = REGIONS["Hauts-de-France"];
const RAYON_MAX_KM = 700;

// Calcul de distance haversine (km)
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Vérifie si une essence est "presque local" (aire native à < 700km de HDF)
function isPresqueLocal(arbre: Arbre): boolean {
  if (!arbre.regions_natives) {
    // Si pas de données, on utilise le champ existant
    return arbre.origine === "presque_local";
  }

  const regions = arbre.regions_natives.split(",").map((r) => r.trim());
  for (const reg of regions) {
    const coord = REGIONS[reg];
    if (coord) {
      const dist = haversine(HDF.lat, HDF.lon, coord.lat, coord.lon);
      if (dist <= RAYON_MAX_KM) return true;
    }
  }
  return false;
}

// Applique UN filtre selon son type
export function applyFilter(
  arbre: Arbre,
  config: FilterConfig,
  value: string
): boolean {
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

// Applique tous les filtres
export function applyAllFilters(
  arbres: Arbre[],
  filters: Record<string, string>,
  filterConfigs: FilterConfig[]
): Arbre[] {
  return arbres.filter((arbre) => {
    // 1. Recherche textuelle
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
      if (config.key === "origine") {
        // Logique spéciale pour l'origine
        const expected = computeOrigine(arbre);
        if (filters[config.key] && expected !== filters[config.key]) {
          return false;
        }
        continue;
      }
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

// Calcule l'origine réelle (local/presque_local/vraiment_exotique)
function computeOrigine(arbre: Arbre): string {
  if (arbre.origine === "local") return "local";
  if (arbre.origine === "vraiment_exotique") return "vraiment_exotique";
  if (isPresqueLocal(arbre)) return "presque_local";
  return "vraiment_exotique";
}
