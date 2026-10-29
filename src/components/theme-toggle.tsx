import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "group relative flex items-center rounded-full border border-border bg-card/70 p-1 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:border-primary/50",
        compact ? "h-9 gap-1" : "h-9 gap-1.5",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all duration-300",
          isDark
            ? "bg-primary text-primary-foreground shadow-sm font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="size-3.5 transition-transform duration-300 group-hover:-rotate-12" />
        {!compact && <span className="text-[10px] tracking-wider uppercase">Dark</span>}
      </span>
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all duration-300",
          !isDark
            ? "bg-primary text-primary-foreground shadow-sm font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
        {!compact && <span className="text-[10px] tracking-wider uppercase">Light</span>}
      </span>
    </button>
  );
}
