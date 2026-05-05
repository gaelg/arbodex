"use client";

import { useEffect, useState } from "react";
import { Arbre, Filtres, chargerArbres } from "@/lib/trees";
import { applyAllFilters, FILTERS } from "@/lib/filters";
import FormulaireFiltres from "@/components/FilterForm";
import ListeArbres from "@/components/TreeList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FILTRES_VIDES: Filtres = {
  recherche: "",
  type: "",
  origine: "",
  sol_acidity: "",
  sol_moisture: "",
  sol_drainage: "",
  sol_texture: "",
  sol_richness: "",
  sol_depth: "",
  resistance_secheresse: "",
  pH: "",
  rusticite_min: "",
  rusticite_max: "",
  resistance_vent: "",
  resistance_chaleur_urbaine: "",
  adapte_changement_climatique: "",
  mellifere: "",
  ombrage_fort: "",
  rafraichissement_fort: "",
  fruitière_sauvage: "",
  floraison_remarquable: "",
  couleur_automnale: "",
  pollen_allergisant: "",
  fruits_salissants: "",
  branches_fragiles: "",
  racines_devastatrices: "",
  frequence_taille: "",
  sensibilite_maladies: "",
  cout_entretien: "",
  hauteur_min: "",
  hauteur_max: "",
  envergure_min: "",
  envergure_max: "",
};

export default function Accueil() {
  const [arbres, setArbres] = useState<Arbre[]>([]);
  const [chargement, setChargement] = useState(true);
  const [filtres, setFiltres] = useState<Filtres>(FILTRES_VIDES);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    chargerArbres().then((donnees) => {
      setArbres(donnees);
      setChargement(false);
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installer = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
    setInstallable(false);
  };

  const filtres_appliques = applyAllFilters(arbres, filtres, FILTERS);
  const [show_scroll_to_results, set_show_scroll_to_results] = useState(false);

  useEffect(() => {
    const on_scroll = () => {
      const el = document.getElementById("liste-arbres");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Afficher si on a scrolle assez et que la liste n'est pas visible
      set_show_scroll_to_results(
        window.scrollY > 400 && rect.top > window.innerHeight
      );
    };
    window.addEventListener("scroll", on_scroll);
    return () => window.removeEventListener("scroll", on_scroll);
  }, []);

  const scroll_to_results = () => {
    const el = document.getElementById("liste-arbres");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <Header
        installable={installable}
        installed={installed}
        installer={installer}
      />

      {chargement ? (
        <div className="text-center py-20 text-gray-400">
          Chargement des essences...
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
          <div className="mb-6" id="liste-arbres">
            <ListeArbres arbres={filtres_appliques} />
          </div>
        </>
      )}

      {show_scroll_to_results &&
        !chargement &&
        filtres_appliques.length > 0 && (
          <button
            onClick={scroll_to_results}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-green-700 text-white rounded-full shadow-lg text-sm font-medium hover:bg-green-800 transition-opacity"
          >
            ↑ Voir les résultats
          </button>
        )}

      <Footer />
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
// Force redeploy lun. 04 mai 2026 19:10:01 CEST
