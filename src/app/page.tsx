"use client";

import { useEffect, useState } from "react";
import { Arbre, Filtres, chargerArbres } from "@/lib/trees";
import { chargerProvenance } from "@/lib/provenance";
import type { ProvenanceMap } from "@/lib/provenance";
import {
  applyAllFilters,
  FILTERS,
  getDefaultFiltersState,
} from "@/lib/filters";
import FormulaireFiltres from "@/components/FilterForm";
import ListeArbres from "@/components/TreeList";
import Header from "@/components/Header";

export default function Accueil() {
  const [arbres, setArbres] = useState<Arbre[]>([]);
  const [provenance, setProvenance] = useState<ProvenanceMap | null>(null);
  const [chargement, setChargement] = useState(true);
  const [filtres, setFiltres] = useState<Filtres>(
    getDefaultFiltersState() as unknown as Filtres
  );
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    Promise.all([chargerArbres(), chargerProvenance()]).then(
      ([donnees, prov]) => {
        setArbres(donnees);
        setProvenance(prov);
        setChargement(false);
      }
    );
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

  const filtres_appliques = applyAllFilters(arbres, filtres, FILTERS).sort(
    (a, b) => a.nom_commun.localeCompare(b.nom_commun, "fr")
  );
  const [show_scroll_to_results, set_show_scroll_to_results] = useState(false);

  useEffect(() => {
    const on_scroll = () => {
      const el = document.getElementById("liste-arbres");
      if (!el) return;
      const rect = el.getBoundingClientRect();
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
        essencesCount={arbres.length}
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
            <ListeArbres
              arbres={filtres_appliques}
              provenance={provenance ?? undefined}
            />
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

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
        <a
          href="/mentions-legales"
          className="text-xs text-gray-400 hover:text-green-700 underline"
        >
          Mentions légales
        </a>
      </footer>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
// Force redeploy lun. 04 mai 2026 19:10:01 CEST
