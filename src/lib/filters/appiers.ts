import { FilterConfig, FilterType } from "./types";
import { Arbre, Filtres } from "../trees";

// Échelles ordonnées pour les comparaisons (doivent correspondre à l'ideation)
const ORDER: Record<string, Record<string, number>> = {
  resistance_secheresse: { low: 1, medium: 2, good: 3, excellent: 4 },
  resistance_vent: { low: 1, medium: 2, good: 3, excellent: 4 },
  resistance_chaleur_urbaine: { low: 1, medium: 2, good: 3, excellent: 4 },
  pollen_allergisant: { low: 1, medium: 2 },
  sensibilite_maladies: { low: 1, medium: 2 },
  cout_entretien: { low: 1, medium: 2 },
  frequence_taille: { never: 1, occasional: 2 },
  rafraichissement_fort: { medium: 2, strong: 3 },
};

// Normalisation accents pour recherche
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Types de base pour les comparaisons
function matchExact(filter: string, value: string | number): boolean {
  if (!filter || filter === "Tous") return true;
  return String(value) === filter;
}

function matchPartial(filter: string, value: string): boolean {
  if (!filter) return true;
  return value.includes(filter);
}

function matchRelative(
  filter: string,
  value: string,
  order: Record<string, number>,
  isMax: boolean = false
): boolean {
  if (!filter || filter === "Tous") return true;
  const seuil = order[filter];
  const val = order[value];
  if (seuil === undefined || val === undefined) {
    return String(value) === filter;
  }
  return isMax ? val <= seuil : val >= seuil;
}

function matchNumeric(filter: string, value: number): boolean {
  if (!filter || filter === "Tous") return true;
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
      const isMax =
        config.key.includes("max") || config.label?.includes("(max)");
      return matchRelative(value, fieldValue, config.order || {}, isMax);
    case "numeric":
      return matchNumeric(value, Number(fieldValue));
    case "search":
      return matchSearch(value, arbre);
    case "multi":
      // value est une chaîne d'options séparées par des virgules
      if (!value) return true;
      const selected = value.split(",").filter(Boolean);
      if (selected.length === 0) return true;

      // Pour les filtres sol, on utilise les nouvelles colonnes directement
      if (config.key.startsWith("sol_")) {
        const arbreValues = fieldValue ? fieldValue.split(",") : [];

        // Si arbre a une valeur vide (tous types), tout passe
        if (arbreValues.length === 0) return true;

        // Vérifie si au moins une valeur de l'arbre correspond aux sélections
        return selected.some((s) => arbreValues.includes(s));
      }
      return true;
    default:
      return true;
  }
}

// Applique tous les filtres
export function applyAllFilters(
  arbres: Arbre[],
  filters: Filtres,
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
        filters[config.key as keyof Filtres] &&
        !applyFilter(arbre, config, filters[config.key as keyof Filtres])
      ) {
        return false;
      }
    }

    return true;
  });
}

// Calcule l'origine réelle pour le filtrage
function computeOrigine(arbre: Arbre): string {
  // Règle 1: Indigène = HDF/Benelux in repartition area
  if (arbre.origine === "Indigène") return "Indigène";

  // Règle 2: Europe de l'Ouest = Western Europe but NOT HDF/Benelux
  if (arbre.origine === "Europe de l'Ouest") return "Europe de l'Ouest";

  // Règle 3: Exotique = NOT in Western Europe
  if (arbre.origine === "Exotique") return "Exotique";

  // Par défaut, considérer comme Europe de l'Ouest
  return arbre.origine || "Europe de l'Ouest";
}
