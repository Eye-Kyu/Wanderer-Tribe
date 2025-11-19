"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If everything is already loaded (e.g., browser cache)
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

    // Wait until EVERYTHING is fully loaded
    const handlePageLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handlePageLoad);

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
