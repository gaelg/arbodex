import { Arbre } from "@/lib/trees";

interface Props {
  arbres: Arbre[];
}

function Badge({ actif, texte }: { actif: boolean; texte: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs rounded-full ${
        actif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
      }`}
    >
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
            className={`w-3 h-3 rounded-sm ${
              i <= niveau ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ListeArbres({ arbres }: Props) {
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
                  actif={arbre.origine === "indigene"}
                  texte={arbre.origine}
                />
              </p>
              <p>
                <span className="font-medium text-gray-700">Dimensions :</span>{" "}
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
                <span className="font-medium text-gray-700">Sécheresse :</span>{" "}
                {arbre.resistance_secheresse}
              </p>
              <p>
                <span className="font-medium text-gray-700">Rusticité :</span>{" "}
                {arbre.rusticite_min_C}°C
              </p>

              <div className="pt-1 space-y-1">
                <Barre niveau={arbre.resistance_vent} label="Résistance vent" />
                <Barre
                  niveau={arbre.resistance_chaleur_urbaine}
                  label="Chaleur urbaine"
                />
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                <Badge actif={arbre.mellifere === "oui"} texte="Mellifère" />
                <Badge
                  actif={arbre.floraison_remarquable === "oui"}
                  texte="Floraison"
                />
                <Badge
                  actif={arbre.couleur_automnale === "oui"}
                  texte="Couleur automne"
                />
                <Badge
                  actif={arbre.adapte_changement_climatique === "oui"}
                  texte="Adapté climat futur"
                />
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                <Badge
                  actif={arbre.pollen_allergisant === "oui"}
                  texte="Allergisant"
                />
                <Badge
                  actif={arbre.fruits_salissants === "oui"}
                  texte="Fruits salissants"
                />
                <Badge
                  actif={arbre.branches_fragiles === "oui"}
                  texte="Branches fragiles"
                />
                <Badge
                  actif={arbre.racines_devastatrices === "oui"}
                  texte="Racines agres."
                />
              </div>

              <div className="pt-1 border-t border-gray-100 mt-2">
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Taille :</span>{" "}
                  {arbre.frequence_taille} ·{" "}
                  <span className="font-medium text-gray-700">Maladies :</span>{" "}
                  {arbre.sensibilite_maladies} ·{" "}
                  <span className="font-medium text-gray-700">Coût :</span>{" "}
                  {arbre.cout_entretien}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
