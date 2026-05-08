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

  const currentCount = applyAllFilters(arbres, filtres as any, FILTERS).length;

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

          const filtresVisibles = filtresSection.filter((config) => {
            const val = (filtres as any)[config.key] || "";
            if (val) return true;
            if (config.type === "multi") {
              const opts = getOptions(config).filter((o) => o !== "all");
              return opts.some((opt) => {
                const selected = isOptionSelected(config, opt);
                const toggleValue = selected
                  ? val
                      .split(",")
                      .filter(Boolean)
                      .filter((o: string) => o !== opt)
                      .join(",")
                  : val
                    ? `${val},${opt}`
                    : opt;
                const tc = applyAllFilters(
                  arbres,
                  { ...filtres, [config.key]: toggleValue } as any,
                  FILTERS
                ).length;
                return tc !== currentCount;
              });
            }
            if (config.type === "slider") {
              return getOptions(config).some((opt) => {
                const tc = applyAllFilters(
                  arbres,
                  { ...filtres, [config.key]: opt } as any,
                  FILTERS
                ).length;
                return tc !== currentCount;
              });
            }
            const opts = getOptions(config).filter((o) => o !== "all");
            return opts.some((opt) => {
              const tc = applyAllFilters(
                arbres,
                { ...filtres, [config.key]: opt } as any,
                FILTERS
              ).length;
              return tc !== currentCount;
            });
          });

          if (filtresVisibles.length === 0) return null;

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
                <div className="p-4">
                  {section === "Sols" && (
                    <p className="text-xs text-gray-500 mb-3 italic">
                      Décochez ce qui ne s&apos;applique pas
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtresVisibles.map((config) => {
                      const opts = getOptions(config);
                      const value = (filtres as any)[config.key] || "";

                      if (config.type === "slider") {
                        // Filtres slider : curseurs à crans (implanté plus haut)
                        const opts = getOptions(config);
                        const optionData = opts.map((opt) => {
                          const toggleCount = applyAllFilters(
                            arbres,
                            { ...filtres, [config.key]: opt } as any,
                            FILTERS
                          ).length;
                          const delta = toggleCount - currentCount;
                          const disabled =
                            toggleCount === currentCount && value !== opt;
                          return { opt, toggleCount, delta, disabled };
                        });

                        const anyActionable = optionData.some(
                          (o) => !o.disabled
                        );
                        if (!anyActionable && !value) return null;

                        const selectedIdx = value
                          ? optionData.findIndex((o) => o.opt === value)
                          : -1;
                        const maxRaw = optionData.length - 1;

                        return (
                          <div key={config.key} className="relative pt-1 pb-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              {config.label}
                            </label>
                            <div
                              role="slider"
                              tabIndex={selectedIdx >= 0 ? 0 : -1}
                              aria-label={config.label}
                              aria-valuemin={0}
                              aria-valuemax={maxRaw}
                              aria-valuenow={Math.max(0, selectedIdx)}
                              className="relative h-10 mx-1"
                              onClick={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const pct = x / rect.width;
                                const rawIdx = Math.round(pct * maxRaw);
                                const idx = Math.min(
                                  Math.max(0, rawIdx),
                                  maxRaw
                                );
                                const opt = optionData[idx].opt;
                                if (optionData[idx].disabled) return;
                                const isFirst = opt === optionData[0].opt;
                                mettreAJour(
                                  config.key,
                                  isFirst ? "" : opt === value ? "" : opt
                                );
                              }}
                              onKeyDown={(e) => {
                                const cur = Math.max(0, selectedIdx);
                                if (
                                  e.key === "ArrowRight" ||
                                  e.key === "ArrowDown"
                                ) {
                                  for (let i = cur + 1; i <= maxRaw; i++) {
                                    if (!optionData[i].disabled) {
                                      mettreAJour(
                                        config.key,
                                        optionData[i].opt
                                      );
                                      break;
                                    }
                                  }
                                } else if (
                                  e.key === "ArrowLeft" ||
                                  e.key === "ArrowUp"
                                ) {
                                  for (let i = cur - 1; i >= 0; i--) {
                                    if (!optionData[i].disabled) {
                                      mettreAJour(
                                        config.key,
                                        i === 0 ? "" : optionData[i].opt
                                      );
                                      break;
                                    }
                                  }
                                }
                              }}
                            >
                              <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full pointer-events-none" />
                              <div
                                className="absolute top-1/2 -translate-y-1/2 h-2 bg-green-500 rounded-full transition-all pointer-events-none"
                                style={{
                                  width:
                                    selectedIdx >= 0
                                      ? `${(selectedIdx / maxRaw) * 100}%`
                                      : "0%",
                                }}
                              />
                              {optionData.map(({ opt, disabled }) => {
                                const isSelected = value === opt;
                                const pct =
                                  (optionData.findIndex((o) => o.opt === opt) /
                                    maxRaw) *
                                  100;
                                return (
                                  <div
                                    key={opt}
                                    className="absolute top-1/2 -translate-y-1/2"
                                    style={{
                                      left: `${pct}%`,
                                      marginLeft: "-8px",
                                    }}
                                  >
                                    <div
                                      role="button"
                                      tabIndex={-1}
                                      aria-label={formatFilterOption(
                                        config,
                                        opt
                                      )}
                                      className={`w-4 h-4 rounded-full border-2 bg-white transition-colors ${
                                        isSelected
                                          ? "border-green-600 bg-green-600"
                                          : disabled
                                            ? "border-gray-200 bg-gray-100"
                                            : "border-gray-400 hover:border-green-400 cursor-pointer"
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (disabled) return;
                                        mettreAJour(
                                          config.key,
                                          isSelected ? "" : opt
                                        );
                                      }}
                                      onKeyDown={() => {}}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex justify-between px-0.5 mt-1">
                              {optionData.map(({ opt, delta, disabled }) => {
                                const isSelected = value === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() =>
                                      mettreAJour(
                                        config.key,
                                        isSelected ? "" : opt
                                      )
                                    }
                                    className={`text-xs text-center transition-colors ${
                                      isSelected
                                        ? "text-green-700 font-semibold"
                                        : disabled
                                          ? "text-gray-300 cursor-not-allowed"
                                          : "text-gray-500 hover:text-gray-700"
                                    }`}
                                  >
                                    <div>{formatFilterOption(config, opt)}</div>
                                    {delta !== 0 && !disabled && (
                                      <div
                                        className={`text-[10px] font-mono ${delta < 0 ? "text-red-400" : "text-green-500"}`}
                                      >
                                        {delta > 0 ? `+${delta}` : `${delta}`}
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      // Filtres multi : cases à cocher
                      if (isMultiFilter(config)) {
                        const optionData = opts
                          .filter((o) => o !== "all")
                          .map((opt) => {
                            const selected = isOptionSelected(config, opt);
                            const toggleValue = selected
                              ? value
                                  .split(",")
                                  .filter(Boolean)
                                  .filter((o: string) => o !== opt)
                                  .join(",")
                              : value
                                ? `${value},${opt}`
                                : opt;
                            const toggleCount = applyAllFilters(
                              arbres,
                              { ...filtres, [config.key]: toggleValue } as any,
                              FILTERS
                            ).length;
                            const delta = toggleCount - currentCount;
                            return { opt, selected, toggleCount, delta };
                          })
                          .filter(
                            ({ toggleCount }) => toggleCount !== currentCount
                          );

                        if (optionData.length === 0) return null;

                        return (
                          <div key={config.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {config.label}
                            </label>
                            <div className="space-y-1">
                              {optionData.map(({ opt, selected, delta }) => (
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
                                  <span>{formatFilterOption(config, opt)}</span>
                                  <span className="text-xs font-mono text-gray-400">
                                    {delta > 0 ? `+${delta}` : `${delta}`}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // Filtres exact à option unique : cases à cocher
                      const nonAllOpts =
                        config.options?.filter((o) => o !== "all") || [];
                      const isSingleOpt = nonAllOpts.length === 1;
                      if (isSingleOpt) {
                        const optValue = nonAllOpts[0];
                        const checked = value === optValue;
                        const toggleValue = checked ? "" : optValue;
                        const toggleCount = applyAllFilters(
                          arbres,
                          {
                            ...filtres,
                            [config.key]: toggleValue,
                          } as any,
                          FILTERS
                        ).length;
                        const delta = toggleCount - currentCount;
                        const disabled = toggleCount === currentCount;

                        if (!checked && disabled) return null;

                        return (
                          <div key={config.key}>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={() =>
                                  mettreAJour(config.key, toggleValue)
                                }
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                              />
                              <span className={disabled ? "text-gray-300" : ""}>
                                {optValue === "non"
                                  ? `Pas de ${config.label.toLowerCase()}`
                                  : config.label}
                              </span>
                              {delta !== 0 && !disabled && (
                                <span className="text-xs font-mono text-gray-400">
                                  {delta > 0 ? `+${delta}` : `${delta}`}
                                </span>
                              )}
                            </label>
                          </div>
                        );
                      }

                      // Filtres standard : select
                      const selectOptions = opts
                        .filter((o) => o !== "all")
                        .filter((opt) => {
                          const count = applyAllFilters(
                            arbres,
                            { ...filtres, [config.key]: opt } as any,
                            FILTERS
                          ).length;
                          return count !== currentCount;
                        });

                      if (selectOptions.length === 0) return null;

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
                            {selectOptions.map((opt) => {
                              const count = applyAllFilters(
                                arbres,
                                { ...filtres, [config.key]: opt } as any,
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
