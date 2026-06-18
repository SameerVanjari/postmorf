import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme();

  function cycle() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  const label =
    theme === "system"
      ? "Auto"
      : resolved === "dark"
        ? "Dark"
        : "Light";

  const ariaLabel =
    theme === "system"
      ? "Theme: auto (system). Click to switch to light."
      : `Theme: ${resolved}. Click to switch.`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {label}
    </button>
  );
}
