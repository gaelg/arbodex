"use client";

import { useState, useRef } from "react";
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
                        return (
                          <SingleSlider
                            key={config.key}
                            config={config}
                            value={value}
                            arbres={arbres}
                            filtres={filtres}
                            currentCount={currentCount}
                            mettreAJour={mettreAJour}
                          />
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
            <h3 className="text-sm font-semibold text-gray-700">
              Dimensions adaptées
            </h3>
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
            <div className="p-4 space-y-6">
              {/* Hauteur - curseur double */}
              <DualRangeSlider
                label="Hauteur (m)"
                steps={[0, 5, 10, 15, 20, 30, 50]}
                stepCounts={[0, 5, 10, 15, 20, 30, 50].map(
                  (s) =>
                    applyAllFilters(
                      arbres,
                      {
                        ...filtres,
                        hauteur_min: String(s),
                        hauteur_max: String(s),
                      } as any,
                      FILTERS
                    ).length
                )}
                currentCount={currentCount}
                valueMin={filtres.hauteur_min}
                valueMax={filtres.hauteur_max}
                onChangeMin={(v) => mettreAJour("hauteur_min", v)}
                onChangeMax={(v) => mettreAJour("hauteur_max", v)}
              />

              {/* Envergure - curseur double */}
              <DualRangeSlider
                label="Envergure (m)"
                steps={[0, 5, 10, 15, 20, 30]}
                stepCounts={[0, 5, 10, 15, 20, 30].map(
                  (s) =>
                    applyAllFilters(
                      arbres,
                      {
                        ...filtres,
                        envergure_min: String(s),
                        envergure_max: String(s),
                      } as any,
                      FILTERS
                    ).length
                )}
                currentCount={currentCount}
                valueMin={filtres.envergure_min}
                valueMax={filtres.envergure_max}
                onChangeMin={(v) => mettreAJour("envergure_min", v)}
                onChangeMax={(v) => mettreAJour("envergure_max", v)}
              />
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

function DualRangeSlider({
  label,
  steps,
  stepCounts,
  currentCount,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
}: {
  label: string;
  steps: number[];
  stepCounts?: number[];
  currentCount?: number;
  valueMin: string;
  valueMax: string;
  onChangeMin: (v: string) => void;
  onChangeMax: (v: string) => void;
}) {
  const maxRaw = steps.length - 1;
  const minVal = valueMin ? Number(valueMin) : steps[0];
  const maxVal = valueMax ? Number(valueMax) : steps[steps.length - 1];
  const minActive = valueMin !== "";
  const maxActive = valueMax !== "";

  const toIdx = (v: number) => {
    let closest = 0,
      closestDist = Infinity;
    steps.forEach((s, i) => {
      const d = Math.abs(s - v);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    });
    return closest;
  };

  const minIdx = toIdx(minVal);
  const maxIdx = toIdx(maxVal);

  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const valFromPointer = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * maxRaw);
  };

  const isStepActive = (i: number) => i >= minIdx && i <= maxIdx;

  const onPointerDown = (which: "min" | "max") => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(which);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const idx = valFromPointer(e.clientX);
    if (dragging === "min") {
      const clamped = Math.min(idx, maxActive ? maxIdx : maxRaw);
      onChangeMin(clamped === 0 ? "" : String(steps[clamped]));
    } else {
      const clamped = Math.max(idx, minActive ? minIdx : 0);
      onChangeMax(clamped === maxRaw ? "" : String(steps[clamped]));
    }
  };

  const onPointerUp = () => setDragging(null);

  return (
    <div className="relative pt-1 pb-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>
          Min :{" "}
          <strong className={minActive ? "text-green-700" : ""}>
            {minActive ? `${minVal}m` : "—"}
          </strong>
        </span>
        <span>
          Max :{" "}
          <strong className={maxActive ? "text-green-700" : ""}>
            {maxActive ? `${maxVal}m` : "—"}
          </strong>
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative h-10 mx-1 select-none touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full pointer-events-none" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-green-500 rounded-full pointer-events-none"
          style={{
            left: `${(minIdx / maxRaw) * 100}%`,
            width: `${((maxIdx - minIdx) / maxRaw) * 100}%`,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 rounded-full border-2 border-green-600 bg-white shadow cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ left: `${(minIdx / maxRaw) * 100}%` }}
          onPointerDown={onPointerDown("min")}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-green-700 rounded" />
          </div>
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 rounded-full border-2 border-green-600 bg-white shadow cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ left: `${(maxIdx / maxRaw) * 100}%` }}
          onPointerDown={onPointerDown("max")}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-green-700 rounded" />
          </div>
        </div>
        {steps.map((step, i) => (
          <div
            key={step}
            className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 -ml-0.5 rounded-full pointer-events-none ${
              isStepActive(i) ? "bg-green-600" : "bg-gray-300"
            }`}
            style={{ left: `${(i / maxRaw) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between px-0.5 mt-1">
        {steps.map((step, i) => {
          const active = isStepActive(i);
          const delta =
            currentCount && stepCounts ? stepCounts[i] - currentCount : 0;
          return (
            <div key={step} className="text-center">
              <span
                className={`text-[10px] ${active ? "text-green-700 font-semibold" : "text-gray-400"}`}
              >
                {step}
              </span>
              {stepCounts && currentCount && stepCounts[i] > 0 && (
                <div
                  className={`text-[9px] font-mono ${delta > 0 ? "text-green-600" : delta < 0 ? "text-red-400" : "text-gray-400"}`}
                >
                  {delta > 0
                    ? `+${delta}`
                    : delta < 0
                      ? `${delta}`
                      : `${stepCounts[i]}`}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SingleSlider({
  config,
  value,
  arbres,
  filtres,
  currentCount,
  mettreAJour,
}: {
  config: FilterConfig;
  value: string;
  arbres: Arbre[];
  filtres: Filtres;
  currentCount: number;
  mettreAJour: (key: string, val: string) => void;
}) {
  const opts = config.options || [];
  const firstOpt = opts[0];
  const optionData = opts.map((opt) => {
    const toggleCount = applyAllFilters(
      arbres,
      { ...filtres, [config.key]: opt } as any,
      FILTERS
    ).length;
    return {
      opt,
      toggleCount,
      delta: toggleCount - currentCount,
      disabled:
        opt !== firstOpt && toggleCount === currentCount && value !== opt,
    };
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const dragValueRef = useRef<string>(value);
  const maxRaw = optionData.length - 1;
  const anyActionable = optionData.some((o) => !o.disabled);
  if (!anyActionable && !value) return null;

  const selectedIdx = value ? optionData.findIndex((o) => o.opt === value) : 0;
  const displayIdx = selectedIdx >= 0 ? selectedIdx : 0;
  const visualIdx = dragging && dragIdx !== null ? dragIdx : displayIdx;

  const commitValue = (idx: number) => {
    if (idx < 0 || idx > maxRaw || optionData[idx].disabled) return;
    mettreAJour(
      config.key,
      optionData[idx].opt === optionData[0].opt ? "" : optionData[idx].opt
    );
  };

  const idxFromPointer = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    return Math.round(
      Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * maxRaw
    );
  };

  const nearestEnabled = (idx: number) => {
    if (!optionData[idx].disabled) return idx;
    for (let dist = 1; dist <= maxRaw; dist++) {
      if (idx - dist >= 0 && !optionData[idx - dist].disabled)
        return idx - dist;
      if (idx + dist <= maxRaw && !optionData[idx + dist].disabled)
        return idx + dist;
    }
    return idx;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragValueRef.current = value;
    setDragIdx(visualIdx);
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragIdx(Math.max(0, Math.min(maxRaw, idxFromPointer(e.clientX))));
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (dragIdx !== null) {
      const enabled = nearestEnabled(dragIdx);
      if (enabled >= 0 && enabled <= maxRaw) commitValue(enabled);
      setDragIdx(null);
    }
  };

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-single-handle]")) return;
    commitValue(nearestEnabled(idxFromPointer(e.clientX)));
  };

  return (
    <div className="relative pt-1 pb-2">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {config.label}
      </label>
      <div
        ref={trackRef}
        className="relative h-10 mx-1 select-none touch-none"
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full pointer-events-none" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-green-500 rounded-full pointer-events-none transition-all"
          style={{ width: `${(visualIdx / maxRaw) * 100}%` }}
        />
        {optionData.map(({ opt, disabled }, i) => (
          <div
            key={opt}
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${(i / maxRaw) * 100}%`,
              marginLeft: i === maxRaw ? "-1px" : "-2px",
            }}
          >
            <div
              className={`w-1 h-1 rounded-full ${
                i <= visualIdx
                  ? "bg-green-600"
                  : disabled
                    ? "bg-gray-200"
                    : "bg-gray-400"
              }`}
            />
          </div>
        ))}
        <div
          data-single-handle
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 rounded-full border-2 border-green-600 bg-white shadow cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ left: `${(visualIdx / maxRaw) * 100}%` }}
          onPointerDown={handlePointerDown}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-green-700 rounded" />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-0.5 mt-1">
        {optionData.map(({ opt, delta, disabled }) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              disabled={disabled}
              onClick={() => mettreAJour(config.key, isSelected ? "" : opt)}
              className={`text-xs text-center transition-colors ${
                isSelected
                  ? "text-green-700 font-semibold"
                  : disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div>{config.optionLabels?.[opt] || opt}</div>
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
