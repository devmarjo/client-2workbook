"use client"
import { useEffect } from "react";

const usePageVisibility = (onVisible?: () => void, onHidden?: () => void) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if(onVisible) onVisible();
      } else {
        if(onHidden) onHidden();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onVisible, onHidden]);
};

export default usePageVisibility;