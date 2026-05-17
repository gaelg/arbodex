"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { ProvenanceEntry } from "@/lib/provenance";

interface Props {
  provenance?: ProvenanceEntry;
  children: React.ReactNode;
}

export default function ProvenanceTooltip({ provenance, children }: Props) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    timer.current = setTimeout(() => setOpen(false), 100);
  }, []);

  const toggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen((v) => !v);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  if (!provenance) return <>{children}</>;

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center gap-0.5 cursor-help"
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          toggle(e as unknown as React.MouseEvent);
      }}
    >
      {children}
      <svg
        className="w-3 h-3 text-gray-400 shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zM7.5 6h1v4h-1zm0-2h1v1h-1z" />
      </svg>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <span className="block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-64 leading-relaxed">
            <span className="font-medium">{provenance.source_label}</span>
            {provenance.description && (
              <>
                <br />
                <span className="text-gray-300">{provenance.description}</span>
              </>
            )}
            {provenance.url && (
              <>
                <br />
                <a
                  href={provenance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-green-200 underline pointer-events-auto"
                >
                  Voir la source
                </a>
              </>
            )}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </span>
        </span>
      )}
    </span>
  );
}
