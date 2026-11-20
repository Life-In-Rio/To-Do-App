
import { Moon, Sun } from "lucide-react";

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}

export default ThemeToggle;
