"use client";

import { useEffect, useState } from "react";
import { Arbre, Filtres, chargerArbres, appliquerFiltres } from "@/lib/trees";
import FormulaireFiltres from "@/components/FilterForm";
import ListeArbres from "@/components/TreeList";

const FILTRES_VIDES: Filtres = {
  soleil: "",
  besoin_eau: "",
  feuillu: "",
  type_sol: "",
  croissance: "",
  hauteur_min: "",
  hauteur_max: "",
};

export default function Accueil() {
  const [arbres, setArbres] = useState<Arbre[]>([]);
  const [chargement, setChargement] = useState(true);
  const [filtres, setFiltres] = useState<Filtres>(FILTRES_VIDES);

  useEffect(() => {
    chargerArbres().then((donnees) => {
      setArbres(donnees);
      setChargement(false);
    });
  }, []);

  const filtresAppliques = appliquerFiltres(arbres, filtres);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
          Arbodex
        </h1>
        <p className="text-gray-500 mt-1">
          Filtrer les arbres pour trouver ceux qui correspondent à vos critères
        </p>
      </header>

      {chargement ? (
        <div className="text-center py-20 text-gray-400">
          Chargement des arbres...
        </div>
      ) : (
        <>
          <div className="mb-6">
            <FormulaireFiltres
              arbres={arbres}
              filtres={filtres}
              onChange={setFiltres}
            />
          </div>
          <ListeArbres arbres={filtresAppliques} />
        </>
      )}
    </div>
  );
}
