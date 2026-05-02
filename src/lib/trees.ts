import Papa from "papaparse";

export interface Arbre {
  especes: string;
  hauteur_min_m: number;
  hauteur_max_m: number;
  zone: string;
  soleil: string;
  besoin_eau: string;
  feuillu: string;
  type_sol: string;
  croissance: string;
}

export interface Filtres {
  soleil: string;
  besoin_eau: string;
  feuillu: string;
  type_sol: string;
  croissance: string;
  hauteur_min: string;
  hauteur_max: string;
}

export async function chargerArbres(): Promise<Arbre[]> {
  const res = await fetch("/trees.csv");
  const csv = await res.text();
  const resultat = Papa.parse<Arbre>(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  return resultat.data as Arbre[];
}

export function appliquerFiltres(
  arbres: Arbre[],
  filtres: Filtres
): Arbre[] {
  return arbres.filter((arbre) => {
    if (filtres.soleil && arbre.soleil !== filtres.soleil) return false;
    if (filtres.besoin_eau && arbre.besoin_eau !== filtres.besoin_eau)
      return false;
    if (filtres.feuillu && arbre.feuillu !== filtres.feuillu) return false;
    if (filtres.type_sol && !arbre.type_sol.includes(filtres.type_sol))
      return false;
    if (filtres.croissance && arbre.croissance !== filtres.croissance)
      return false;
    if (filtres.hauteur_min && arbre.hauteur_max_m < Number(filtres.hauteur_min))
      return false;
    if (filtres.hauteur_max && arbre.hauteur_min_m > Number(filtres.hauteur_max))
      return false;
    return true;
  });
}
