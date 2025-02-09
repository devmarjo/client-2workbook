"use client";
import { useEffect } from "react";

const PrintMiddleware = (onBeforePrint?:(e: Event) => undefined, onAfterPrint?:(e: Event) => undefined ) => {
  useEffect(() => {
    const handleBeforePrint = (e: Event) => {
      if (onBeforePrint) onBeforePrint(e); // Executa a função passada antes da impressão
    };

    const handleAfterPrint = (e: Event) => {
      if (onAfterPrint) onAfterPrint(e); // Executa a função passada depois da impressão
    };

    window.addEventListener("beforeprint", (ev) => handleBeforePrint(ev));
    window.addEventListener("afterprint", (ev) => handleAfterPrint(ev));

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [onBeforePrint, onAfterPrint]);

  return null; // Este componente não renderiza nada, apenas escuta eventos
};

export default PrintMiddleware;