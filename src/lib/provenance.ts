export interface ProvenanceEntry {
  source: string;
  source_label: string;
  url: string;
  value: string;
  description: string;
}

export type ProvenanceMap = Record<string, Record<string, ProvenanceEntry>>;

export async function chargerProvenance(): Promise<ProvenanceMap> {
  const res = await fetch("/trees.csv.provenance.json");
  return res.json();
}
