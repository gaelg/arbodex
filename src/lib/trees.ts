export interface Arbre {
  nom_commun: string;
  nom_scientifique: string;
  cultivar: string;
  famille_botanique: string;
  origine: string;
  hauteur_min_m: number;
  hauteur_max_m: number;
  envergure_min_m: number;
  envergure_max_m: number;
  strate: string;
  ph_sol: string;
  humidite_sol: string;
  texture_sol: string;
  rusticite_celsius: number;
  resiste_changement_climatique: string;
  floraison_remarquable: string;
  pollen_allergisant: string;
  branches_fragiles: string;
  racines_problematiques: string;
  cout_entretien: string;
  regions_natives?: string;
  photos_port?: string;
  photos_fleurs?: string;
  photos_fruits?: string;
  image_port?: string;
  image_fleurs?: string;
  image_fruits?: string;
}

export interface Filtres {
  optimiste: string;
  recherche: string;
  origine: string;
  ph_sol: string;
  humidite_sol: string;
  texture_sol: string;
  resiste_changement_climatique: string;
  floraison_remarquable: string;
  pollen_allergisant: string;
  branches_fragiles: string;
  racines_problematiques: string;
  cout_entretien: string;
  strate: string;
  hauteur_min: string;
  hauteur_max: string;
  envergure_min: string;
  envergure_max: string;
}

function parseCSV(csv: string): Record<string, unknown>[] {
  const lines = csv.split("\n");
  const headers = lines[0].trim().split(";");
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
