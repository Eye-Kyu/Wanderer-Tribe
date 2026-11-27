"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

/** Values the trip planner or a trip page hands to the enquiry form. All optional. */
export interface CtaPrefill {
  travellers?: string;
  length?: string;
  details?: string;
}

interface CtaModalContextType {
  showCta: boolean;
  prefill: CtaPrefill | null;
  openCta: (prefill?: CtaPrefill) => void;
  closeCta: () => void;
}

const CtaModalContext = createContext<CtaModalContextType | undefined>(undefined);

export function CtaModalProvider({ children }: { children: ReactNode }) {
  const [showCta, setShowCta] = useState(false);
  const [prefill, setPrefill] = useState<CtaPrefill | null>(null);

  const openCta = useCallback((next?: CtaPrefill) => {
    setPrefill(next ?? null);
    setShowCta(true);
  }, []);
  const closeCta = useCallback(() => setShowCta(false), []);

  return (
    <CtaModalContext.Provider value={{ showCta, prefill, openCta, closeCta }}>
      {children}
    </CtaModalContext.Provider>
  );
}

export function useCtaModal() {
  const context = useContext(CtaModalContext);
  if (!context) throw new Error("useCtaModal must be used within a CtaModalProvider");
  return context;
}
