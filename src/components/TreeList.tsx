"use client";

import { useState } from "react";
import Image from "next/image";
import { Arbre, normalizeScientifique } from "@/lib/trees";
import type { ProvenanceMap } from "@/lib/provenance";
import ProvenanceTooltip from "@/components/ProvenanceTooltip";

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
  resiste_changement_climatique: "Adapté changement climatique",
  pollen_allergisant: "Allergisants acceptables",
  cout_entretien: "Coût d'entretien acceptable",
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

function formatOrigine(origine: string): string {
  if (!origine) return "";
  if (origine === "Indigène") return "Local";
  if (origine === "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux")
    return "Presque local";
  if (origine === "Europe de l'Ouest") return "Europe de l'Ouest";
  return origine;
}

function formatStrate(strate: string): string {
  const labels: Record<string, string> = {
    tree: "Arbre",
    shrub: "Arbuste",
    herbaceous: "Herbacée",
    climbing: "Grimpant",
    groundcover: "Couvre-sol",
  };
  return labels[strate] || strate || "";
}

function formatPH(val: string): string {
  const labels: Record<string, string> = {
    acid: "Acide",
    neutral: "Neutre",
    alkaline: "Calcaire",
  };
  return labels[val] || val || "Tous";
}

function formatHumidite(val: string): string {
  const labels: Record<string, string> = {
    dry: "Sec",
    fresh: "Frais",
    wet: "Humide",
  };
  return labels[val] || val || "Tous";
}

function formatTexture(val: string): string {
  const labels: Record<string, string> = {
    loamy: "Limoneux",
    clay: "Argileux",
    sandy: "Sablonneux",
  };
  return labels[val] || val || "Tous";
}

export interface FieldDef {
  label: string;
  value: string;
  hasData: boolean;
  fieldKey?: string;
}

export interface BadgeDef {
  text: string;
  color: string;
  fieldKey?: string;
}

export interface BadgeEntry {
  text: string;
  color: string;
  fieldKey: string;
}

function qualiteCouleur(
  valeur: string,
  map: Record<string, string>
): string | null {
  return map[valeur] || null;
}

export function getNonQualiFields(arbre: Arbre): FieldDef[] {
  return [
    {
      label: "Nom scientifique",
      value: arbre.nom_scientifique,
      hasData: !!arbre.nom_scientifique,
    },
    {
      label: "Famille",
      value: arbre.famille_botanique,
      hasData: !!arbre.famille_botanique,
      fieldKey: "famille_botanique",
    },
    {
      label: "Strate",
      value: formatStrate(arbre.strate),
      hasData: !!arbre.strate,
      fieldKey: "strate",
    },
    {
      label: "Dimensions",
      value: `${arbre.hauteur_min_m}–${arbre.hauteur_max_m}m H × ${arbre.envergure_min_m}–${arbre.envergure_max_m}m L`,
      hasData: true,
      fieldKey: "hauteur_max_m",
    },
    {
      label: "pH tolérés",
      value: formatPH(arbre.ph_sol),
      hasData: !!arbre.ph_sol,
      fieldKey: "ph_sol",
    },
    {
      label: "Humidité",
      value: formatHumidite(arbre.humidite_sol),
      hasData: !!arbre.humidite_sol,
      fieldKey: "humidite_sol",
    },
    {
      label: "Texture",
      value: formatTexture(arbre.texture_sol),
      hasData: !!arbre.texture_sol,
      fieldKey: "texture_sol",
    },
    {
      label: "Rusticité",
      value: arbre.rusticite_celsius ? `${arbre.rusticite_celsius}°C` : "",
      hasData: !!arbre.rusticite_celsius,
      fieldKey: "rusticite_celsius",
    },
  ];
}

export function getBadgesForTree(arbre: Arbre): BadgeEntry[] {
  const badges: BadgeEntry[] = [];

  const pollenMap: Record<string, string> = {
    faible: "bg-green-100 text-green-800",
    moyen: "bg-orange-100 text-orange-800",
    fort: "bg-red-100 text-red-800",
  };
  const pollenCouleur = qualiteCouleur(arbre.pollen_allergisant, pollenMap);
  if (pollenCouleur) {
    const label: Record<string, string> = {
      faible: "Pollen peu allergisant",
      moyen: "Pollen modérément allergisant",
      fort: "Pollen très allergisant",
    };
    badges.push({
      text: label[arbre.pollen_allergisant],
      color: pollenCouleur,
      fieldKey: "pollen_allergisant",
    });
  }

  const branchesMap: Record<string, string> = {
    non: "bg-green-100 text-green-800",
    oui: "bg-red-100 text-red-800",
  };
  const branchesCouleur = qualiteCouleur(arbre.branches_fragiles, branchesMap);
  if (branchesCouleur) {
    badges.push({
      text:
        arbre.branches_fragiles === "oui"
          ? "Branches fragiles"
          : "Branches solides",
      color: branchesCouleur,
      fieldKey: "branches_fragiles",
    });
  }

  const racinesMap: Record<string, string> = {
    non: "bg-green-100 text-green-800",
    moyen: "bg-orange-100 text-orange-800",
    oui: "bg-red-100 text-red-800",
  };
  const racinesCouleur = qualiteCouleur(
    arbre.racines_problematiques,
    racinesMap
  );
  if (racinesCouleur) {
    const label: Record<string, string> = {
      non: "Racines non-problématiques",
      moyen: "Racines modérément problématiques",
      oui: "Racines problématiques",
    };
    badges.push({
      text: label[arbre.racines_problematiques],
      color: racinesCouleur,
      fieldKey: "racines_problematiques",
    });
  }

  const coutMap: Record<string, string> = {
    faible: "bg-green-100 text-green-800",
    modéré: "bg-yellow-100 text-yellow-800",
    élevé: "bg-red-100 text-red-800",
  };
  const coutCouleur = qualiteCouleur(arbre.cout_entretien, coutMap);
  if (coutCouleur) {
    const label: Record<string, string> = {
      faible: "Coût faible",
      modéré: "Coût modéré",
      élevé: "Coût élevé",
    };
    badges.push({
      text: label[arbre.cout_entretien],
      color: coutCouleur,
      fieldKey: "cout_entretien",
    });
  }

  if (arbre.floraison_remarquable === "oui") {
    badges.push({
      text: "Floraison remarquable",
      color: "bg-green-100 text-green-800",
      fieldKey: "floraison_remarquable",
    });
  }

  if (arbre.resiste_changement_climatique === "oui") {
    badges.push({
      text: "Adapté au changement climatique",
      color: "bg-green-100 text-green-800",
      fieldKey: "resiste_changement_climatique",
    });
  }

  const origineMap: Record<string, string> = {
    Indigène: "bg-green-100 text-green-800",
    "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux":
      "bg-orange-100 text-orange-800",
    "Vraiment exotique": "bg-red-100 text-red-800",
  };
  const origineCouleur = qualiteCouleur(arbre.origine, origineMap);
  if (origineCouleur) {
    const label: Record<string, string> = {
      Indigène: "Origine locale",
      "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux":
        "Origine presque locale",
      "Vraiment exotique": "Origine exotique",
    };
    badges.push({
      text: label[arbre.origine],
      color: origineCouleur,
      fieldKey: "origine",
    });
  }

  return badges;
}

interface Props {
  arbres: Arbre[];
  provenance?: ProvenanceMap;
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

export default function ListeArbres({ arbres, provenance }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpanded(expanded === i ? null : i);
  };

  const getProv = (arbre: Arbre, fieldKey: string) => {
    if (!provenance) return undefined;
    const norm = normalizeScientifique(arbre.nom_scientifique);
    return provenance[norm]?.[fieldKey];
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
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-3"
          >
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
            {expanded === i && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 space-y-1">
                {getNonQualiFields(arbre)
                  .filter((r) => r.hasData)
                  .map((row) => (
                    <p key={row.label}>
                      <span className="font-medium text-gray-700">
                        {row.label} :
                      </span>{" "}
                      {row.label === "Nom scientifique" ? (
                        <span className="italic">{row.value}</span>
                      ) : (
                        <ProvenanceTooltip
                          provenance={
                            row.fieldKey
                              ? getProv(arbre, row.fieldKey)
                              : undefined
                          }
                        >
                          <span>{row.value}</span>
                        </ProvenanceTooltip>
                      )}
                    </p>
                  ))}

                {/* Badges qualitatifs : couleur selon la valeur */}
                {getBadgesForTree(arbre).length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {getBadgesForTree(arbre).map((b) => (
                      <ProvenanceTooltip
                        key={b.text}
                        provenance={getProv(arbre, b.fieldKey)}
                      >
                        <span
                          className={`inline-block px-2 py-0.5 text-xs rounded-full ${b.color}`}
                        >
                          {b.text}
                        </span>
                      </ProvenanceTooltip>
                    ))}
                  </div>
                )}

                {/* Images */}
                {[
                  arbre.image_port,
                  arbre.image_fleurs,
                  arbre.image_fruits,
                ].some(Boolean) && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {arbre.image_port && (
                      <Image
                        src={arbre.image_port}
                        alt="Port"
                        width={120}
                        height={120}
                        className="rounded object-cover w-full h-24"
                      />
                    )}
                    {arbre.image_fleurs && (
                      <Image
                        src={arbre.image_fleurs}
                        alt="Fleurs"
                        width={120}
                        height={120}
                        className="rounded object-cover w-full h-24"
                      />
                    )}
                    {arbre.image_fruits && (
                      <Image
                        src={arbre.image_fruits}
                        alt="Fruits"
                        width={120}
                        height={120}
                        className="rounded object-cover w-full h-24"
                      />
                    )}
                  </div>
                )}

                {/* Données manquantes */}
                {getNonQualiFields(arbre).filter((r) => !r.hasData).length >
                  0 && (
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">
                      Données non renseignées :
                    </p>
                    <p className="text-xs text-gray-400">
                      {getNonQualiFields(arbre)
                        .filter((r) => !r.hasData)
                        .map((r) => r.label)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
