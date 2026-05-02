import { Arbre, Filtres } from "@/lib/trees";

interface Props {
  arbres: Arbre[];
  filtres: Filtres;
  onChange: (filtres: Filtres) => void;
}

const CHAMPS_SELECT: { cle: keyof Filtres; etiquette: string }[] = [
  { cle: "soleil", etiquette: "Soleil" },
  { cle: "besoin_eau", etiquette: "Besoin en eau" },
  { cle: "feuillu", etiquette: "Feuillu" },
  { cle: "type_sol", etiquette: "Type de sol" },
  { cle: "croissance", etiquette: "Croissance" },
];

export default function FormulaireFiltres({
  arbres,
  filtres,
  onChange,
}: Props) {
  const optionsSoleil = [...new Set(arbres.map((a) => a.soleil))].sort();
  const optionsEau = [...new Set(arbres.map((a) => a.besoin_eau))].sort();
  const optionsSol = [...new Set(arbres.map((a) => a.type_sol))].sort();
  const optionsCroissance = [...new Set(arbres.map((a) => a.croissance))].sort();

  const mettreAJour = (cle: keyof Filtres, valeur: string) => {
    onChange({ ...filtres, [cle]: valeur });
  };

  const reinitialiser = () => {
    onChange({
      soleil: "",
      besoin_eau: "",
      feuillu: "",
      type_sol: "",
      croissance: "",
      hauteur_min: "",
      hauteur_max: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-green-800 mb-4">Filtres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHAMPS_SELECT.map(({ cle, etiquette }) => {
          const options =
            cle === "soleil"
              ? optionsSoleil
              : cle === "besoin_eau"
                ? optionsEau
                : cle === "type_sol"
                  ? optionsSol
                  : optionsCroissance;

          return (
            <div key={cle}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {etiquette}
              </label>
              <select
                value={filtres[cle]}
                onChange={(e) => mettreAJour(cle, e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tous</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hauteur min. (m)
          </label>
          <input
            type="number"
            min={0}
            value={filtres.hauteur_min}
            onChange={(e) => mettreAJour("hauteur_min", e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hauteur max. (m)
          </label>
          <input
            type="number"
            min={0}
            value={filtres.hauteur_max}
            onChange={(e) => mettreAJour("hauteur_max", e.target.value)}
            placeholder="50"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={reinitialiser}
        className="mt-4 text-sm text-green-700 hover:text-green-900 font-medium"
      >
        Effacer tous les filtres
      </button>
    </div>
  );
}
