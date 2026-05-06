"use client";

import { useState } from "react";
import Image from "next/image";
import { Arbre } from "@/lib/trees";

const OPTION_LABELS: Record<string, string> = {
  faible: "Faible",
  moyenne: "Moyenne",
  bonne: "Bonne",
  excellente: "Excellente",
  modéré: "Modéré",
  élevé: "Élevé",
  jamais: "Jamais",
  occasionnelle: "Occasionnelle",
  régulière: "Régulière",
  modérée: "Modérée",
  élevée: "Élevée",
  oui: "Oui",
  non: "Non",
  local: "Local",
  presque_local: "Presque local",
  vraiment_exotique: "Vraiment exotique",
  resistance_secheresse: "Résistance sécheresse",
  resistance_vent: "Résistance vent",
  resistance_chaleur_urbaine: "Chaleur urbaine",
  adapte_changement_climatique: "Adapté changement climatique",
  fruitiere_sauvage: "Fruits sauvages",
  fruits_salissants: "Fruits salissants",
  pollen_allergisant: "Pollen allergisant",
  frequence_taille: "Fréquence taille",
  sensibilite_maladies: "Sensibilité maladies",
  cout_entretien: "Coût entretien",
};

export function formatOption(opt: string) {
  if (!opt) return "";
  const label = OPTION_LABELS[opt];
  if (label) return label;
  return String(opt)
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatNumericLevel(val: number | string): string {
  const n = Number(val);
  if (isNaN(n)) return String(val);
  const map: Record<number, string> = {
    1: "Très faible",
    2: "Faible",
    3: "Moyen",
    4: "Fort",
    5: "Très fort",
  };
  return map[n] || String(n);
}

interface Props {
  arbres: Arbre[];
}

function EmojiBadge({
  valeur,
  map,
  couleurs,
  title,
}: {
  valeur: string;
  map: Record<string, string>;
  couleurs?: Record<string, string>;
  title?: string;
}) {
  const emoji = map[valeur] || "";
  const couleur = couleurs?.[valeur] || "text-green-600";
  return (
    <span className={`text-sm ${couleur}`} title={title}>
      {emoji}
    </span>
  );
}

function getBadgeColor(key: string, valeur: string): string {
  const v = valeur.toLowerCase();
  const sémantique: Record<string, { positif: string[]; negatif: string[] }> = {
    origine: {
      positif: ["local", "presque_local"],
      negatif: ["vraiment_exotique"],
    },
    mellifere: { positif: ["oui"], negatif: [] },
    fruitiere_sauvage: { positif: ["oui"], negatif: [] },
    refuge_oiseaux: { positif: ["oui"], negatif: [] },
    floraison_remarquable: { positif: ["oui"], negatif: [] },
    couleur_automnale: { positif: ["oui"], negatif: [] },
    adapte_changement_climatique: { positif: ["oui"], negatif: [] },
    ombrage_fort: { positif: ["oui"], negatif: [] },
    rafraichissement_fort: { positif: ["oui"], negatif: [] },
    resistance_secheresse: {
      positif: ["bonne", "excellente"],
      negatif: ["faible"],
    },
    cout_entretien: { positif: ["faible", "modéré"], negatif: ["élevé"] },
    sensibilite_maladies: { positif: ["faible"], negatif: ["élevée"] },
    frequence_taille: { positif: ["jamais"], negatif: ["régulière"] },
    pollen_allergisant: { positif: [], negatif: ["fort"] },
    fruits_salissants: { positif: [], negatif: ["oui"] },
    branches_fragiles: { positif: [], negatif: ["oui"] },
    racines_devastatrices: { positif: [], negatif: ["oui"] },
  };
  const config = sémantique[key];
  if (!config) return "bg-gray-100 text-gray-500";
  if (config.positif.includes(v)) return "bg-green-100 text-green-800";
  if (config.negatif.includes(v)) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-500";
}

function Badge({
  texte,
  couleur,
  filterKey,
  valeur,
}: {
  texte: string;
  couleur?: string;
  filterKey?: string;
  valeur?: string;
}) {
  const base = "inline-block px-2 py-0.5 text-xs rounded-full";
  const autoCouleur =
    filterKey && valeur
      ? getBadgeColor(filterKey, valeur)
      : "bg-gray-100 text-gray-500";
  return <span className={`${base} ${couleur || autoCouleur}`}>{texte}</span>;
}

function Barre({ niveau, label }: { niveau: number; label: string }) {
  const safeLevel = isNaN(niveau) ? 0 : Math.max(0, Math.min(5, niveau));
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-24">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${i <= safeLevel ? "bg-green-500" : "bg-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600">
        {formatNumericLevel(niveau)}
      </span>
    </div>
  );
}

export default function ListeArbres({ arbres }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpanded(expanded === i ? null : i);
  };

  if (arbres.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">
          Aucun arbre ne correspond à vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        {arbres.length} essence(s) trouvée(s)
      </p>

      <div className="space-y-2">
        {arbres.map((arbre, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleExpand(i);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">
                  {arbre.nom_commun}
                </h3>
                <p className="text-xs text-gray-500 italic">
                  {arbre.nom_scientifique}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                <EmojiBadge
                  valeur={arbre.pollen_allergisant}
                  map={{ fort: "🤧", moyen: "😊", faible: "😌" }}
                  couleurs={{
                    fort: "text-red-600",
                    moyen: "text-yellow-600",
                    faible: "text-green-600",
                  }}
                  title="Potentiel allergisant"
                />
                <EmojiBadge
                  valeur={arbre.pollen_allergisant}
                  map={{ fort: "🤧", moyen: "😊", faible: "😌" }}
                  couleurs={{
                    fort: "text-red-600",
                    moyen: "text-orange-500",
                    faible: "text-green-600",
                  }}
                  title="Allergie : fort, moyen, faible"
                />
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {arbre.hauteur_max_m}m
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    expanded === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {expanded === i && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Famille :</span>{" "}
                  {arbre.famille}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Origine :</span>{" "}
                  {arbre.origine === "local"
                    ? "Local"
                    : arbre.origine === "presque_local"
                      ? "Presque local"
                      : "Vraiment exotique"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Dimensions :
                  </span>{" "}
                  {arbre.hauteur_min_m}–{arbre.hauteur_max_m}m H ×{" "}
                  {arbre.envergure_min_m}–{arbre.envergure_max_m}m L
                </p>
                <p>
                  <span className="font-medium text-gray-700">Port :</span>{" "}
                  {arbre.port}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Sol :</span>{" "}
                  {arbre.sol_acidity || "Tous"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Sécheresse :
                  </span>{" "}
                  {arbre.resistance_secheresse}
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Rusticité :
                  </span>{" "}
                  {arbre.rusticite_min_C}°C
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <Badge
                    texte="🐝 Mellifère"
                    couleur={
                      arbre.mellifere === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="🍇 Fruits sauvages"
                    couleur={
                      arbre.fruitiere_sauvage === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="🌸 Floraison remarquable"
                    couleur={
                      arbre.floraison_remarquable === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="🍂 Couleur automnale"
                    couleur={
                      arbre.couleur_automnale === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="🌡️ Adapté climat futur"
                    couleur={
                      arbre.adapte_changement_climatique === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                </div>
                <div className="pt-1 border-t border-gray-100 mt-2">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">
                      Taille :
                    </span>{" "}
                    {formatOption(arbre.frequence_taille)} ·{" "}
                    <span className="font-medium text-gray-700">
                      Maladies :
                    </span>{" "}
                    {formatOption(arbre.sensibilite_maladies)} ·{" "}
                    <span className="font-medium text-gray-700">Coût :</span>{" "}
                    {formatOption(arbre.cout_entretien)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
