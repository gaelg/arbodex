"use client";

import { useState } from "react";
import { Arbre, Filtres } from "@/lib/trees";
import {
  FILTERS,
  getFiltersBySection,
  getAllSections,
  getDefaultFiltersState,
  isFilterActive,
  applyAllFilters,
} from "@/lib/filters";
import type { FilterConfig } from "@/lib/filters";

interface Props {
  arbres: Arbre[];
  filtres: Filtres;
  onChange: (filtres: Filtres) => void;
}

export default function FormulaireFiltres({
  arbres,
  filtres,
  onChange,
}: Props) {
  const sections = getAllSections();
  const sectionsFiltres = getFiltersBySection();

  const [sectionsOuvertes, setSectionsOuvertes] = useState<
    Record<string, boolean>
  >(() => {
    const init: Record<string, boolean> = {};
    for (const s of sections) init[s] = false;
    return init;
  });

  const toggleSection = (section: string) => {
    setSectionsOuvertes((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const replierTout = () => {
    const toutesFermees: Record<string, boolean> = {};
    for (const s of sections) toutesFermees[s] = false;
    // Aussi fermer la section Dimensions
    toutesFermees["Dimensions"] = false;
    setSectionsOuvertes(toutesFermees);
    // Aussi réinitialiser la recherche
    mettreAJour("recherche", "");
  };

  const mettreAJour = (cle: string, valeur: string) => {
    onChange({ ...filtres, [cle]: valeur });
    if (cle === "recherche" && valeur) {
      const toutesFermees: Record<string, boolean> = {};
      for (const s of sections) toutesFermees[s] = false;
      setSectionsOuvertes(toutesFermees);
    }
  };

  const reinitialiser = () => {
    onChange(getDefaultFiltersState() as any);
  };

  function optionsUniques(cle: string): string[] {
    const vals = new Set<string>();
    for (const a of arbres) {
      const v = (a as any)[cle];
      if (v) vals.add(String(v));
    }
    return [...vals].sort();
  }

  function getOptions(config: FilterConfig): string[] {
    if (config.options) return config.options;
    return optionsUniques(config.key);
  }

  // Vérifie si un filtre est de type multi (cases à cocher)
  function isMultiFilter(config: FilterConfig): boolean {
    return config.type === "multi";
  }

  // Gère les changements pour les filtres multi
  function toggleMultiFilter(config: FilterConfig, option: string) {
    const currentValue = ((filtres as any)[config.key] || "") as string;
    const selected = currentValue
      ? currentValue.split(",").filter(Boolean)
      : [];

    const idx = selected.indexOf(option);
    if (idx >= 0) {
      selected.splice(idx, 1);
    } else {
      selected.push(option);
    }

    mettreAJour(config.key, selected.join(","));
  }

  // Vérifie si une option est sélectionnée dans un filtre multi
  function isOptionSelected(config: FilterConfig, option: string): boolean {
    if (option === "all") return false; // "Tous" n'est pas une vraie option à cocher
    const currentValue = ((filtres as any)[config.key] || "") as string;
    const selected = currentValue
      ? currentValue.split(",").filter(Boolean)
      : [];
    return selected.includes(option);
  }

  function formatFilterOption(config: FilterConfig, opt: string): string {
    // Utiliser optionLabels du registry
    if (config.optionLabels && config.optionLabels[opt]) {
      return config.optionLabels[opt];
    }
    return opt; // Fallback: retourne la machine name
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Barre de recherche */}
      <div className="mb-4">
        <label
          htmlFor="recherche"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rechercher une essence
        </label>
        <input
          id="recherche"
          type="text"
          value={filtres.recherche}
          onChange={(e) => mettreAJour("recherche", e.target.value)}
          placeholder="Ex: Chêne, Érable, Buis..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-green-800">Mon projet</h2>
        <button
          onClick={replierTout}
          className="text-xs text-green-700 hover:text-green-900 font-medium"
        >
          Replier tout
        </button>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const filtresSection = sectionsFiltres[section] || [];
          const ouvert = sectionsOuvertes[section] ?? false;
          const nbActifs = filtresSection.filter((config) => {
            const value = (filtres as any)[config.key];
            return isFilterActive(config, value || "");
          }).length;

          return (
            <div
              key={section}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
              >
                <h3 className="text-sm font-semibold text-gray-700">
                  {section}
                  {nbActifs > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      {nbActifs}
                    </span>
                  )}
                </h3>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${ouvert ? "rotate-180" : ""}`}
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
              </button>
              {ouvert && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtresSection.map((config) => {
                    const opts = getOptions(config);
                    const value = (filtres as any)[config.key] || "";

                    // Filtres multi : cases à cocher
                    if (isMultiFilter(config)) {
                      return (
                        <div key={config.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {config.label}
                          </label>
                          <div className="space-y-1">
                            {opts
                              .filter((o) => o !== "all")
                              .map((opt) => {
                                const selected = isOptionSelected(config, opt);
                                const newValue = selected
                                  ? value
                                      .split(",")
                                      .filter(Boolean)
                                      .filter((o: string) => o !== opt)
                                      .join(",")
                                  : value
                                    ? `${value},${opt}`
                                    : opt;
                                const count = applyAllFilters(
                                  arbres,
                                  {
                                    ...filtres,
                                    [config.key]: newValue,
                                  } as any,
                                  FILTERS
                                ).length;
                                return (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      onChange={() =>
                                        toggleMultiFilter(config, opt)
                                      }
                                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span>
                                      {formatFilterOption(config, opt)}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({count})
                                    </span>
                                  </label>
                                );
                              })}
                          </div>
                        </div>
                      );
                    }

                    // Filtres standard : select
                    return (
                      <div key={config.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {config.label}
                        </label>
                        <select
                          value={value}
                          onChange={(e) =>
                            mettreAJour(config.key, e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">
                            {formatFilterOption(config, "all")}
                          </option>
                          {opts
                            .filter((o) => o !== "all")
                            .map((opt) => {
                              const count = applyAllFilters(
                                arbres,
                                {
                                  ...filtres,
                                  [config.key]: opt,
                                } as any,
                                FILTERS
                              ).length;
                              return (
                                <option key={opt} value={opt}>
                                  {formatFilterOption(config, opt)} ({count})
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Dimensions - toujours visible */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("Dimensions")}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
          >
            <h3 className="text-sm font-semibold text-gray-700">Dimensions</h3>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${sectionsOuvertes["Dimensions"] ? "rotate-180" : ""}`}
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
          </button>
          {sectionsOuvertes["Dimensions"] && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    H. min (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.hauteur_min}
                    onChange={(e) => mettreAJour("hauteur_min", e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    H. max (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.hauteur_max}
                    onChange={(e) => mettreAJour("hauteur_max", e.target.value)}
                    placeholder="50"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    E. min (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.envergure_min}
                    onChange={(e) =>
                      mettreAJour("envergure_min", e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    E. max (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.envergure_max}
                    onChange={(e) =>
                      mettreAJour("envergure_max", e.target.value)
                    }
                    placeholder="30"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Rusticité min (°C)
                  </label>
                  <input
                    type="number"
                    value={filtres.rusticite_min}
                    onChange={(e) =>
                      mettreAJour("rusticite_min", e.target.value)
                    }
                    placeholder="-40"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Rusticité max (°C)
                  </label>
                  <input
                    type="number"
                    value={filtres.rusticite_max}
                    onChange={(e) =>
                      mettreAJour("rusticite_max", e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}
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
