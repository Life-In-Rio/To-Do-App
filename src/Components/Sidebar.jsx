import {
  Activity,
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

function Sidebar({
  collapsed,
  setCollapsed,
  activePage,
  setActivePage,
  onLogout,
  mobileOpen,
  onClose,
}) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Tasks", icon: ListTodo },
    { name: "Upcoming", icon: CalendarDays },
    { name: "Completed", icon: CheckCircle2 },
  ];

  function handleNavigation(page) {
    setActivePage(page);
    onClose();
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex h-screen flex-col shrink-0
        border-r transition-all duration-300
        md:sticky md:top-0 md:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${collapsed ? "md:w-[82px]" : "md:w-[250px]"}
        w-[250px]
      `}
      style={{
        background: "var(--sidebar)",
        borderColor: "var(--border)",
      }}
    >
     {/* Header */}
      {/* Header */}
      <div
        className={`
          flex h-20 shrink-0 items-center
          ${collapsed ? "md:justify-center" : "justify-between"}
          justify-between px-3 sm:px-4
        `}
      >
        {/* Logo */}
        <button
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            }
          }}
          disabled={!collapsed}
          className={`
            flex items-center justify-center
            rounded-xl transition-all duration-200
            ${collapsed ? "cursor-pointer hover:bg-[var(--active-bg)]" : "cursor-default"}
          `}
          title={collapsed ? "Expand sidebar" : "TaskFlow"}
          aria-label={collapsed ? "Expand sidebar" : "TaskFlow"}
        >
          {collapsed ? (
            <Activity
              className="hidden md:block"
              size={27}
              style={{ color: "var(--accent)" }}
            />
          ) : (
            <h1 className="whitespace-nowrap text-xl font-extrabold tracking-tight">
              TASK<span style={{ color: "var(--accent)" }}>FLOW</span>
            </h1>
          )}

          {mobileOpen && collapsed && (
            <h1 className="ml-3 whitespace-nowrap text-xl font-extrabold tracking-tight md:hidden">
              TASK<span style={{ color: "var(--accent)" }}>FLOW</span>
            </h1>
          )}
        </button>

        {/* Desktop Collapse Button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="
              hidden h-9 w-9 shrink-0 items-center justify-center
              rounded-xl border
              transition-all duration-200
              hover:border-[var(--accent)]
              hover:bg-[var(--active-bg)]
              hover:text-[var(--accent)]
              md:flex
            "
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={19} strokeWidth={2.5} />
          </button>
        )}

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="
            rounded-lg p-2
            transition-colors
            hover:bg-white/5
            md:hidden
          "
          style={{ color: "var(--muted)" }}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>


      {/* Navigation */}
      <div className="mt-6 px-4">
        {!collapsed && (
          <p
            className="mb-4 px-2 text-[10px] font-bold tracking-[2px]"
            style={{ color: "var(--muted)" }}
          >
            WORKSPACE
          </p>
        )}

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                title={collapsed ? item.name : ""}
                className={`
                  flex h-12 w-full items-center rounded-xl px-3
                  transition-all duration-200
                  ${collapsed ? "md:justify-center" : "justify-start gap-3"}
                  justify-start gap-3
                `}
                style={{
                  background: active ? "var(--active-bg)" : "transparent",
                  color: active ? "var(--accent)" : "var(--muted)",
                }}
              >
                <Icon size={20} className="shrink-0" />

                <span
                  className={`
                    text-sm font-semibold
                    ${collapsed ? "md:hidden" : ""}
                  `}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto p-4">
        <button
          onClick={onLogout}
          title={collapsed ? "Logout" : ""}
          className={`
            flex h-12 w-full items-center rounded-xl px-3
            transition-colors
            hover:bg-red-500/10 hover:text-red-400
            ${collapsed ? "md:justify-center" : "justify-start gap-3"}
            justify-start gap-3
          `}
          style={{ color: "var(--muted)" }}
        >
          <LogOut size={20} className="shrink-0" />

          <span
            className={`text-sm font-semibold ${collapsed ? "md:hidden" : ""}`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
