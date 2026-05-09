import { Button } from "@/components/ui/button";
import { useAppStore } from "../stores/appStore";

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  function toggle() {
    setLanguage(language === "en" ? "ur" : "en");
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      data-ocid="language.toggle"
      className="rounded-full font-mono text-xs hover:bg-muted transition-smooth px-3"
      aria-label="Toggle language"
    >
      {language === "en" ? (
        <span className="flex items-center gap-1">
          <span>اردو</span>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <span>EN</span>
        </span>
      )}
    </Button>
  );
}
