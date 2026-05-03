"use client";

import { useState } from "react";
import { Arbre } from "@/lib/trees";

function formatOption(opt: string) {
  return opt
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace("Resistance", "Résistance")
    .replace("Mellifere", "Mellifère")
    .replace("Fruitiere", "Fruitière")
    .replace("Floraison", "Floraison")
    .replace("Couleur", "Couleur")
    .replace("Adapte", "Adapté")
    .replace("Pollen", "Pollen")
    .replace("Frequence", "Fréquence")
    .replace("Sensibilite", "Sensibilité")
    .replace("Cout", "Coût")
    .replace("Oui", "Oui")
    .replace("Non", "Non");
}

type VueType = "cartes" | "liste" | "tableau";

interface Props {
  arbres: Arbre[];
}

function EmojiBadge({
  valeur,
  map,
  couleurs,
}: {
  valeur: string;
  map: Record<string, string>;
  couleurs?: Record<string, string>;
}) {
  const emoji = map[valeur] || "✅";
  const couleur = couleurs?.[valeur] || "text-green-600";
  return <span className={`text-sm ${couleur}`}>{emoji}</span>;
}

function Badge({ texte, couleur }: { texte: string; couleur?: string }) {
  const base = "inline-block px-2 py-0.5 text-xs rounded-full";
  return (
    <span className={`${base} ${couleur || "bg-gray-100 text-gray-500"}`}>
      {texte}
    </span>
  );
}

function Barre({ niveau, label }: { niveau: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-24">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${i <= niveau ? "bg-green-500" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ListeArbres({ arbres }: Props) {
  const [vue, setVue] = useState<VueType>("liste");

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
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {arbres.length} essence(s) trouvée(s)
        </p>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(["cartes", "liste", "tableau"] as VueType[]).map((v) => (
            <button
              key={v}
              onClick={() => setVue(v)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                vue === v
                  ? "bg-white text-green-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {vue === "liste" && (
        <div className="space-y-2">
          {arbres.map((arbre, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between"
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
                  valeur={arbre.type}
                  map={{ arbre: "🌳", arbuste: "🌿" }}
                />
                <EmojiBadge
                  valeur={arbre.pollen_allergisant}
                  map={{ fort: "🤧", moyen: "🤢", faible: "✅" }}
                  couleurs={{
                    fort: "text-red-600",
                    moyen: "text-orange-500",
                    faible: "text-green-600",
                  }}
                />
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {arbre.hauteur_max_m}m
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {vue === "tableau" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-3 py-2">Essence</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Origine</th>
                <th className="px-3 py-2">Hauteur</th>
                <th className="px-3 py-2">Allergie</th>
                <th className="px-3 py-2">Sécheresse</th>
                <th className="px-3 py-2">Climat</th>
              </tr>
            </thead>
            <tbody>
              {arbres.map((arbre, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-3 py-2">
                    <div className="font-medium text-green-800">
                      {arbre.nom_commun}
                    </div>
                    <div className="text-xs italic text-gray-500">
                      {arbre.nom_scientifique}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        arbre.type === "arbre"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {arbre.type}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        arbre.origine === "local"
                          ? "bg-green-100 text-green-800"
                          : arbre.origine === "presque_local"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {arbre.origine === "local"
                        ? "Local"
                        : arbre.origine === "presque_local"
                          ? "Presque"
                          : "Exotique"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {arbre.hauteur_min_m}–{arbre.hauteur_max_m}m
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        arbre.pollen_allergisant === "fort"
                          ? "bg-red-100 text-red-800"
                          : arbre.pollen_allergisant === "moyen"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {formatOption(arbre.pollen_allergisant)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {arbre.résistance_secheresse}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        arbre.adapte_changement_climatique === "oui"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {arbre.adapte_changement_climatique === "oui"
                        ? "Oui"
                        : "Non"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vue === "cartes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arbres.map((arbre, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">
                    {arbre.nom_commun}
                  </h3>
                  <p className="text-xs text-gray-500 italic">
                    {arbre.nom_scientifique}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    arbre.type === "arbre"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {arbre.type}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Famille :</span>{" "}
                  {arbre.famille}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Origine :</span>{" "}
                  <Badge
                    texte={
                      arbre.origine === "local"
                        ? "Local"
                        : arbre.origine === "presque_local"
                          ? "Presque local"
                          : "Vraiment exotique"
                    }
                    couleur={
                      arbre.origine === "local"
                        ? "bg-green-100 text-green-800"
                        : arbre.origine === "presque_local"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  />
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Dimensions :
                  </span>{" "}
                  {arbre.hauteur_min_m}–{arbre.hauteur_max_m}m H ×{" "}
                  {arbre.envergure_min_m}–{arbre.envergure_max_m}m E
                </p>
                <p>
                  <span className="font-medium text-gray-700">Port :</span>{" "}
                  {arbre.port}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Sol :</span>{" "}
                  {arbre.type_sol} (pH {arbre.pH})
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Sécheresse :
                  </span>{" "}
                  {arbre.résistance_secheresse}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Rusticité :</span>{" "}
                  {arbre.rusticite_min_C}°C
                </p>

                <div className="pt-1 space-y-1">
                  <Barre
                    niveau={arbre.résistance_vent}
                    label="Résistance vent"
                  />
                  <Barre
                    niveau={arbre.résistance_chaleur_urbaine}
                    label="Chaleur urbaine"
                  />
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  <Badge
                    texte="Mellifère"
                    couleur={
                      arbre.mellifere === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="Floraison"
                    couleur={
                      arbre.floraison_remarquable === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="Couleur automne"
                    couleur={
                      arbre.couleur_automnale === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="Adapté climat futur"
                    couleur={
                      arbre.adapte_changement_climatique === "oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  <Badge
                    texte={`Allergisant: ${formatOption(arbre.pollen_allergisant)}`}
                    couleur={
                      arbre.pollen_allergisant === "fort"
                        ? "bg-red-100 text-red-800"
                        : arbre.pollen_allergisant === "moyen"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }
                  />
                  <Badge
                    texte="Fruits salissants"
                    couleur={
                      arbre.fruits_salissants === "oui"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="Branches fragiles"
                    couleur={
                      arbre.branches_fragiles === "oui"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                  <Badge
                    texte="Racines agres."
                    couleur={
                      arbre.racines_devastatrices === "oui"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  />
                </div>

                <div className="pt-1 border-t border-gray-100 mt-2">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Taille :</span>{" "}
                    {arbre.frequence_taille} ·{" "}
                    <span className="font-medium text-gray-700">
                      Maladies :
                    </span>{" "}
                    {arbre.sensibilite_maladies} ·{" "}
                    <span className="font-medium text-gray-700">Coût :</span>{" "}
                    {arbre.cout_entretien}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
