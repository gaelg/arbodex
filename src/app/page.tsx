"use client";

import { useEffect, useState } from "react";
import { Arbre, Filtres, chargerArbres, appliquerFiltres } from "@/lib/trees";
import FormulaireFiltres from "@/components/FilterForm";
import ListeArbres from "@/components/TreeList";

const FILTRES_VIDES: Filtres = {
  recherche: "",
  type: "",
  origine: "",
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
              Acc{"\u00e9"}dez {"\u00e0"} Arbodex hors connexion, directement
              depuis votre {"\u00e9"}cran d{"\u0027"}accueil.
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
            {"\ud83d\udca1"} Installer Arbodex comme application
          </h3>
          <div className="mt-2 text-sm text-amber-700 space-y-1">
            <p>
              <strong>Chrome / Edge :</strong> Cliquez sur l{"\u0027"}ic
              {"\u00f4"}
              ne <span className="font-mono">{"\u2295"}</span> dans la barre d
              {"\u0027"}adresse, ou Menu {"\u2192"} Installer Arbodex.
            </p>
            <p>
              <strong>Safari (iPhone) :</strong> Appuyez sur{" "}
              <span className="font-mono">{"\u238b"}</span> (Partager){" "}
              {"\u2192"} Sur l{"\u0027"}
              {"\u00e9"}cran d{"\u0027"}accueil.
            </p>
            <p>
              <strong>Android :</strong> Menu ({"\u22ee"}) {"\u2192"} Installer
              l{"\u0027"}application.
            </p>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
          Arbodex
        </h1>
        <p className="text-gray-500 mt-1">
          142 essences pour les paysagistes {"\u2014"} Hauts-de-France & Benelux
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
          Sources de donn{"\u00e9"}es
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700">Arboclimat (HDF)</p>
            <p className="text-xs text-gray-500 mt-1">
              68 esp{"\u00e8"}ces {"\u2014"} Donn{"\u00e9"}es climat, services
              {"\u00e9"}cosyst{"\u00e9"}miques et r{"\u00e9"}silience. Source :
              Hauts-de-France.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">S{"\u00e9"}same (Metz)</p>
            <p className="text-xs text-gray-500 mt-1">
              85 esp{"\u00e8"}ces {"\u2014"} Crit{"\u00e8"}res de s{"\u00e9"}
              lection pour projets urbains. Climat similaire au Nord de la
              France.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">ClimEssences (ONF)</p>
            <p className="text-xs text-gray-500 mt-1">
              149 esp{"\u00e8"}ces {"\u2014"} Adaptation des essences forresti
              {"\u00e8"}res au changement climatique. Source : ONF / CRPF.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              P{"\u00e9"}pini{"\u00e8"}res locales
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Tortefontaine, Haendries, Plant{"\u0027"}Haies, Avenir {"\u2014"}{" "}
              Disponibilit{"\u00e9"} r{"\u00e9"}elle en Nord France / Benelux.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              V{"\u00e9"}g{"\u00e9"}base
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Base de 197 000+ plantes {"\u2014"} R{"\u00e9"}f{"\u00e9"}rence
              pour caract{"\u00e9"}ristiques botaniques et culturales.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              Grenoble M{"\u00e9"}tropole
            </p>
            <p className="text-xs text-gray-500 mt-1">
              305 esp{"\u00e8"}ces, 31 crit{"\u00e8"}res {"\u2014"} Donn
              {"\u00e9"}
              es techniques pour l{"\u0027"}am{"\u00e9"}nagement urbain.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-gray-400">
            Arbodex v1 {"\u2014"} Donn{"\u00e9"}es fournies {"\u00e0"} titre
            indicatif. Toujours v{"\u00e9"}rifier aupr{"\u00e8"}s de votre p
            {"\u00e9"}pini{"\u00e8"}riste pour la disponibilit{"\u00e9"} et l
            {"\u0027"}adaptation locale.
          </p>
          <a
            href="/mentions-legales"
            className="text-xs text-gray-400 hover:text-green-700 underline"
          >
            Mentions l{"\u00e9"}gales
          </a>
        </div>
      </footer>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
