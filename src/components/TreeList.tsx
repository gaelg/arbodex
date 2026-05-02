import { Arbre } from "@/lib/trees";

interface Props {
  arbres: Arbre[];
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
        {arbres.length} arbre(s) trouvé(s)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {arbres.map((arbre, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-green-800 text-lg">
              {arbre.especes}
            </h3>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Hauteur :</span>{" "}
                {arbre.hauteur_min_m}–{arbre.hauteur_max_m} m
              </p>
              <p>
                <span className="font-medium text-gray-700">Zone :</span>{" "}
                {arbre.zone}
              </p>
              <p>
                <span className="font-medium text-gray-700">Soleil :</span>{" "}
                {arbre.soleil}
              </p>
              <p>
                <span className="font-medium text-gray-700">Eau :</span>{" "}
                {arbre.besoin_eau}
              </p>
              <p>
                <span className="font-medium text-gray-700">Feuillu :</span>{" "}
                {arbre.feuillu}
              </p>
              <p>
                <span className="font-medium text-gray-700">Sol :</span>{" "}
                {arbre.type_sol}
              </p>
              <p>
                <span className="font-medium text-gray-700">Croissance :</span>{" "}
                {arbre.croissance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
