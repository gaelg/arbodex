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
  résistance_sécheresse: string;
  pH: string;
  tolerance_sel: string;
  rusticite_min_C: number;
  résistance_vent: number;
  résistance_chaleur_urbaine: number;
  adapte_changement_climatique: string;
  mellifere: string;
  fruitière_sauvage: string;
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
  résistance_sécheresse: string;
  pH: string;
  rusticite_min: string;
  rusticite_max: string;
  résistance_vent: string;
  résistance_chaleur_urbaine: string;
  adapte_changement_climatique: string;
  mellifere: string;
  fruitière_sauvage: string;
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

// Échelles ordonnées pour filtres relatifs (≤ max choisi)
const ORDER: Record<string, Record<string, number>> = {
  pollen_allergisant: { faible: 1, moyen: 2, fort: 3 },
  sensibilite_maladies: { faible: 1, moderee: 2, elevee: 3 },
  cout_entretien: { faible: 1, modere: 2, eleve: 3 },
  frequence_taille: { jamais: 1, occasionnelle: 2, reguliere: 3 },
  résistance_sécheresse: { faible: 1, moyenne: 2, bonne: 3, excellente: 4 },
};

function correspondRelatif(
  cle: string,
  filtre: string,
  valeur: string
): boolean {
  if (!filtre) return true;
  const echelle = ORDER[cle];
  if (!echelle) return String(valeur) === filtre;
  const seuil = echelle[filtre];
  const val = echelle[valeur];
  if (seuil === undefined || val === undefined)
    return String(valeur) === filtre;
  return val <= seuil; // ≤ max choisi
}

export function appliquerFiltres(arbres: Arbre[], filtres: Filtres): Arbre[] {
  return arbres
    .filter((arbre) => {
      if (filtres.recherche) {
        const q = filtres.recherche
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const commun = arbre.nom_commun
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const scient = arbre.nom_scientifique
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const fam = arbre.famille
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (!commun.includes(q) && !scient.includes(q) && !fam.includes(q))
          return false;
      }
      if (!correspond(filtres.origine, arbre.origine)) return false;
      if (filtres.type_sol && !arbre.type_sol.includes(filtres.type_sol))
        return false;
      if (
        !correspondRelatif(
          "résistance_sécheresse",
          filtres.résistance_sécheresse,
          arbre.résistance_sécheresse
        )
      )
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
        filtres.résistance_vent &&
        arbre.résistance_vent < Number(filtres.résistance_vent)
      )
        return false;
      if (
        filtres.résistance_chaleur_urbaine &&
        arbre.résistance_chaleur_urbaine <
          Number(filtres.résistance_chaleur_urbaine)
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
      if (!correspond(filtres.fruitière_sauvage, arbre.fruitière_sauvage))
        return false;
      if (
        !correspond(filtres.floraison_remarquable, arbre.floraison_remarquable)
      )
        return false;
      if (!correspond(filtres.couleur_automnale, arbre.couleur_automnale))
        return false;
      if (
        !correspondRelatif(
          "pollen_allergisant",
          filtres.pollen_allergisant,
          arbre.pollen_allergisant
        )
      )
        return false;
      if (!correspond(filtres.fruits_salissants, arbre.fruits_salissants))
        return false;
      if (!correspond(filtres.branches_fragiles, arbre.branches_fragiles))
        return false;
      if (
        !correspond(filtres.racines_devastatrices, arbre.racines_devastatrices)
      )
        return false;
      if (
        !correspondRelatif(
          "frequence_taille",
          filtres.frequence_taille,
          arbre.frequence_taille
        )
      )
        return false;
      if (
        !correspondRelatif(
          "sensibilite_maladies",
          filtres.sensibilite_maladies,
          arbre.sensibilite_maladies
        )
      )
        return false;
      if (
        !correspondRelatif(
          "cout_entretien",
          filtres.cout_entretien,
          arbre.cout_entretien
        )
      )
        return false;
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
    })
    .sort((a, b) => a.nom_commun.localeCompare(b.nom_commun, "fr"));
}
