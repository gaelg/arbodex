import Papa from "papaparse";

export interface Arbre {
  nom_commun: string;
  nom_scientifique: string;
  famille: string;
  origine: string;
  type: string;
  hauteur_min_m: number;
  hauteur_max_m: number;
  envergure_min_m: number;
  envergure_max_m: number;
  port: string;
  type_sol: string;
  resistance_secheresse: string;
  pH: string;
  tolerance_sel: string;
  rusticite_min_C: number;
  resistance_vent: number;
  resistance_chaleur_urbaine: number;
  adapte_changement_climatique: string;
  mellifere: string;
  fruitiere_sauvage: string;
  refuge_oiseaux: string;
  floraison_remarquable: string;
  couleur_automnale: string;
  ecorce_decorative: string;
  stockage_carbone: string;
  resilience: string;
  impact_icu: string;
  biodiversite: string;
  qualite_air: string;
  potentiel_allergisant: string;
  ombrage_fort: string;
  rafraichissement_fort: string;
  biodiversite_service: string;
  type_racines: string;
  allergie_service: string;
  fruits_salissants: string;
  pollen_allergisant: string;
  branches_fragiles: string;
  racines_devastatrices: string;
  frequence_taille: string;
  sensibilite_maladies: string;
  longevite: string;
  cout_entretien: string;
}

export interface Filtres {
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
  adapte_changement_climatique: string;
  mellifere: string;
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

function correspond(filtre: string, valeur: string | number): boolean {
  if (!filtre) return true;
  return String(valeur) === filtre;
}

export function appliquerFiltres(arbres: Arbre[], filtres: Filtres): Arbre[] {
  return arbres.filter((arbre) => {
    if (filtres.recherche) {
      const q = filtres.recherche.toLowerCase();
      if (
        !arbre.nom_commun.toLowerCase().includes(q) &&
        !arbre.nom_scientifique.toLowerCase().includes(q) &&
        !arbre.famille.toLowerCase().includes(q)
      )
        return false;
    }
    if (!correspond(filtres.type, arbre.type)) return false;
    if (!correspond(filtres.origine, arbre.origine)) return false;
    if (filtres.type_sol && !arbre.type_sol.includes(filtres.type_sol))
      return false;
    if (!correspond(filtres.resistance_secheresse, arbre.resistance_secheresse))
      return false;
    if (!correspond(filtres.pH, arbre.pH)) return false;
    if (
      filtres.rusticite_min &&
      arbre.rusticite_min_C < Number(filtres.rusticite_min)
    )
      return false;
    if (
      filtres.rusticite_max &&
      arbre.rusticite_min_C > Number(filtres.rusticite_max)
    )
      return false;
    if (
      filtres.resistance_vent &&
      arbre.resistance_vent < Number(filtres.resistance_vent)
    )
      return false;
    if (
      filtres.resistance_chaleur_urbaine &&
      arbre.resistance_chaleur_urbaine <
        Number(filtres.resistance_chaleur_urbaine)
    )
      return false;
    if (
      !correspond(
        filtres.adapte_changement_climatique,
        arbre.adapte_changement_climatique
      )
    )
      return false;
    if (!correspond(filtres.mellifere, arbre.mellifere)) return false;
    if (!correspond(filtres.fruitiere_sauvage, arbre.fruitiere_sauvage))
      return false;
    if (!correspond(filtres.floraison_remarquable, arbre.floraison_remarquable))
      return false;
    if (!correspond(filtres.couleur_automnale, arbre.couleur_automnale))
      return false;
    if (!correspond(filtres.pollen_allergisant, arbre.pollen_allergisant))
      return false;
    if (!correspond(filtres.fruits_salissants, arbre.fruits_salissants))
      return false;
    if (!correspond(filtres.branches_fragiles, arbre.branches_fragiles))
      return false;
    if (!correspond(filtres.racines_devastatrices, arbre.racines_devastatrices))
      return false;
    if (!correspond(filtres.frequence_taille, arbre.frequence_taille))
      return false;
    if (!correspond(filtres.sensibilite_maladies, arbre.sensibilite_maladies))
      return false;
    if (!correspond(filtres.cout_entretien, arbre.cout_entretien)) return false;
    if (
      filtres.hauteur_min &&
      arbre.hauteur_max_m < Number(filtres.hauteur_min)
    )
      return false;
    if (
      filtres.hauteur_max &&
      arbre.hauteur_min_m > Number(filtres.hauteur_max)
    )
      return false;
    if (
      filtres.envergure_min &&
      arbre.envergure_max_m < Number(filtres.envergure_min)
    )
      return false;
    if (
      filtres.envergure_max &&
      arbre.envergure_min_m > Number(filtres.envergure_max)
    )
      return false;
    return true;
  });
}
