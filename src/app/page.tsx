"use client";

import { useEffect, useState } from "react";
import { Arbre, Filtres, chargerArbres, appliquerFiltres } from "@/lib/trees";
import FormulaireFiltres from "@/components/FilterForm";
import ListeArbres from "@/components/TreeList";

const FILTRES_VIDES: Filtres = {
  type: "",
  type_sol: "",
  resistance_secheresse: "",
  pH: "",
  rusticite_min: "",
  rusticite_max: "",
  resistance_vent: "",
  resistance_chaleur_urbaine: "",
  adapte_changement_climatique: "",
  mellifere: "",
  fruitiere_sauvage: "",
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

  const filtresAppliques = appliquerFiltres(arbres, filtres);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {!installed && installable && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-green-800">
              Installer Arbodex sur votre appareil
            </h3>
            <p className="text-sm text-green-700">
              Accédez à Arbodex hors connexion, directement depuis votre écran
              d'accueil.
            </p>
          </div>
          <button
            onClick={installer}
            className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 whitespace-nowrap"
          >
            Installer
          </button>
        </div>
      )}

      {!installed && !installable && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 text-sm">
            💡 Installer Arbodex comme application
          </h3>
          <div className="mt-2 text-sm text-amber-700 space-y-1">
            <p>
              <strong>Chrome / Edge :</strong> Cliquez sur l'icône{" "}
              <span className="font-mono">⊕</span> dans la barre d'adresse, ou
              Menu → Installer Arbodex.
            </p>
            <p>
              <strong>Safari (iPhone) :</strong> Appuyez sur{" "}
              <span className="font-mono">⎋</span> (Partager) → Sur l'écran
              d'accueil.
            </p>
            <p>
              <strong>Android :</strong> Menu (⋮) → Installer l'application.
            </p>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
          Arbodex
        </h1>
        <p className="text-gray-500 mt-1">
          142 essences pour les paysagistes — Hauts-de-France & Benelux
        </p>
      </header>

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
          <ListeArbres arbres={filtresAppliques} />
        </>
      )}

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Sources de données
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700">Arboclimat (HDF)</p>
            <p className="text-xs text-gray-500 mt-1">
              68 espèces — Données climat, services écosystémiques et
              résilience. Source : Hauts-de-France.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Sésame (Metz)</p>
            <p className="text-xs text-gray-500 mt-1">
              85 espèces — Critères de sélection pour projets urbains. Climat
              similaire au Nord de la France.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">ClimEssences (ONF)</p>
            <p className="text-xs text-gray-500 mt-1">
              149 espèces — Adaptation des essences forestières au changement
              climatique. Source : ONF / CRPF.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Pépinières locales</p>
            <p className="text-xs text-gray-500 mt-1">
              Tortefontaine, Haendries, Plant'Haies, Avenir — Disponibilité
              réelle en Nord France / Benelux.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Végébase</p>
            <p className="text-xs text-gray-500 mt-1">
              Base de 197 000+ plantes — Référence pour caractéristiques
              botaniques et culturales.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Grenoble Métropole</p>
            <p className="text-xs text-gray-500 mt-1">
              305 espèces, 31 critères — Données techniques pour l'aménagement
              urbain.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Arbodex v1 — Données fournies à titre indicatif. Toujours vérifier
            auprès de votre pépiniériste pour la disponibilité et l'adaptation
            locale.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
