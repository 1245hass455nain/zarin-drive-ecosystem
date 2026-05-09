import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppStore } from "../stores/appStore";

export function ThemeToggle() {
  const { theme, setTheme } = useAppStore();

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      data-ocid="theme.toggle"
      className="rounded-full hover:bg-muted transition-smooth"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-foreground" />
      )}
    </Button>
  );
}
