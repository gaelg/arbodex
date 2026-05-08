export interface Arbre {
  nom_commun: string;
  nom_scientifique: string;
  famille: string;
  origine: string;
  hauteur_min_m: number;
  hauteur_max_m: number;
  envergure_min_m: number;
  envergure_max_m: number;
  port: string;
  type_racines: string;
  sol_acidity: string;
  sol_moisture: string;
  sol_drainage: string;
  sol_texture: string;
  sol_richness: string;
  sol_depth: string;
  resistance_secheresse: string;
  rusticite_min_C: number;
  resistance_vent: string;
  resistance_chaleur_urbaine: string;
  adapte_changement_climatique: string;
  mellifere: string;
  fruitiere_sauvage: string;
  refuge_oiseaux: string;
  floraison_remarquable: string;
  couleur_automnale: string;
  stockage_carbone: string;
  resilience: string;
  impact_icu: string;
  biodiversite: string;
  qualite_air: string;
  potentiel_allergisant: string;
  ombrage_fort: string;
  rafraichissement_fort: string;
  biodiversite_service: string;
  allergie_service: string;
  fruits_salissants: string;
  pollen_allergisant: string;
  branches_fragiles: string;
  racines_devastatrices: string;
  frequence_taille: string;
  sensibilite_maladies: string;
  longevite: string;
  cout_entretien: string;
  // Nouveau : aire de répartition native (pour presque_local)
  regions_natives?: string;
  // Photos fiables (URLs)
  photos_port?: string;
  photos_fleurs?: string;
  photos_fruits?: string;
  // URLs d'images (Wikimedia Commons ou autres sources libres)
  image_port?: string;
  image_fleurs?: string;
  image_fruits?: string;
}

export interface Filtres {
  recherche: string;
  origine: string;
  sol_acidity: string;
  sol_moisture: string;
  sol_drainage: string;
  sol_texture: string;
  sol_richness: string;
  sol_depth: string;
  resistance_secheresse: string;
  rusticite_min: string;
  rusticite_max: string;
  resistance_vent: string;
  resistance_chaleur_urbaine: string;
  adapte_changement_climatique: string;
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

function parseCSV(csv: string): Record<string, unknown>[] {
  const lines = csv.split("\n");
  const headers = lines[0].split(";");
  const data: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(";");
    const row: Record<string, unknown> = {};

    for (let j = 0; j < headers.length; j++) {
      const raw = values[j] ?? "";
      if (raw === "") {
        row[headers[j]] = "";
        continue;
      }
      const num = Number(raw);
      if (!isNaN(num) && raw !== "" && raw !== "true" && raw !== "false") {
        row[headers[j]] = num;
      } else {
        row[headers[j]] = raw;
      }
    }

    data.push(row);
  }

  return data;
}

export async function chargerArbres(): Promise<Arbre[]> {
  const res = await fetch("/trees.csv");
  const csv = await res.text();
  return parseCSV(csv) as unknown as Arbre[];
}
