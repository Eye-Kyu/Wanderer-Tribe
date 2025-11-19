"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // initial load
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // route change loader
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity .6s ease" }}>
        {children}
      </div>
    </>
  );
}
