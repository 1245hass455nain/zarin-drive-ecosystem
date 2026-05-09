import { useAppStore } from "../stores/appStore";
import enStrings from "./en.json";
import urStrings from "./ur.json";

type Strings = typeof enStrings;

export function useTranslation() {
  const language = useAppStore((s) => s.language);
  const strings: Strings =
    language === "ur" ? (urStrings as Strings) : enStrings;

  function t(path: string): string {
    const keys = path.split(".");
    let result: unknown = strings as Record<string, unknown>;
    for (const key of keys) {
      if (typeof result === "object" && result !== null) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof result === "string" ? result : path;
  }

  return { t, language };
}
