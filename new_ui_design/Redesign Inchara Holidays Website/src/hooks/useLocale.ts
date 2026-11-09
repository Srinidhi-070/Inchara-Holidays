import { useEffect, useState } from "react";
import type { Locale } from "../types";

const STORAGE_KEY = "inchara-locale";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "kn" ? "kn" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Storage can be blocked in private contexts; the in-memory choice still works.
    }
  }, [locale]);

  return { locale, setLocale };
}
