"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CtaModalContextType {
  showCta: boolean;
  openCta: () => void;
  closeCta: () => void;
}

const CtaModalContext = createContext<CtaModalContextType | undefined>(undefined);

export function CtaModalProvider({ children }: { children: ReactNode }) {
  const [showCta, setShowCta] = useState(false);

  const openCta = () => setShowCta(true);
  const closeCta = () => setShowCta(false);

  return (
    <CtaModalContext.Provider value={{ showCta, openCta, closeCta }}>
      {children}
    </CtaModalContext.Provider>
  );
}

export function useCtaModal() {
  const context = useContext(CtaModalContext);
  if (!context) throw new Error("useCtaModal must be used within a CtaModalProvider");
  return context;
}
