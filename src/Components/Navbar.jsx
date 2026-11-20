
import { Bell, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  user,
  activePage,
  theme,
  onToggleTheme,
  onMenuClick,
}) {
  return (
    <header
      className="sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 sm:px-6 md:px-9"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors hover:bg-white/5 md:hidden"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <p
            className="truncate text-[10px] sm:text-xs"
            style={{ color: "var(--muted)" }}
          >
            WORKSPACE / {activePage.toUpperCase()}
          </p>

          <h2
            className="mt-1 truncate text-base font-bold sm:text-lg"
            style={{ color: "var(--text)" }}
          >
            {activePage}
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:bg-white/5 sm:h-10 sm:w-10"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--muted)",
          }}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <ThemeToggle
          theme={theme}
          onToggle={onToggleTheme}
        />

        {/* User Profile */}
        <div
          className="hidden items-center gap-3 border-l pl-3 sm:flex sm:pl-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full font-bold sm:h-10 sm:w-10"
            style={{
              background: "var(--active-bg)",
              color: "var(--accent)",
            }}
          >
            {user.charAt(0).toUpperCase()}
          </div>

          <div className="hidden lg:block">
            <p
              className="text-sm font-bold"
              style={{ color: "var(--text)" }}
            >
              {user}
            </p>

            <p
              className="text-xs"
              style={{ color: "var(--muted)" }}
            >
              Personal Workspace
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
