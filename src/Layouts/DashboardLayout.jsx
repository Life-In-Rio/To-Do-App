
import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

import Dashboard from "../Pages/Dashboard";
import MyTasks from "../Pages/MyTasks";
import Upcoming from "../Pages/Upcoming";
import Completed from "../Pages/Completed";

import useTasks from "../Hooks/useTasks";

function DashboardLayout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks(user);

  const themeStyles = {
    dark: {
      "--background": "#111412",
      "--sidebar": "#171B18",
      "--card": "#1C211E",
      "--text": "#F4F5F1",
      "--muted": "#929A93",
      "--border": "#2B322D",
      "--accent": "#B7F34A",
      "--active-bg": "rgba(183, 243, 74, 0.10)",
      "--color-scheme": "dark",
    },
    light: {
      "--background": "#F3F4EF",
      "--sidebar": "#FFFFFF",
      "--card": "#FFFFFF",
      "--text": "#26352B",
      "--muted": "#747C72",
      "--border": "#E5E8E0",
      "--accent": "#607B4A",
      "--active-bg": "rgba(96, 123, 74, 0.10)",
      "--color-scheme": "light",
    },
  };

  function handleToggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  const sharedTaskProps = {
    tasks,
    updateTask,
    deleteTask,
    toggleTask,
  };

  function renderPage() {
    if (activePage === "Dashboard") {
      return (
        <Dashboard
          user={user}
          tasks={tasks}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "My Tasks") {
      return (
        <MyTasks
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      );
    }

    if (activePage === "Upcoming") {
      return <Upcoming {...sharedTaskProps} />;
    }

    if (activePage === "Completed") {
      return <Completed {...sharedTaskProps} />;
    }

    return null;
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        ...themeStyles[theme],
        background: "var(--background)",
        color: "var(--text)",
        colorScheme: theme,
      }}
    >
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <Navbar
          user={user}
          activePage={activePage}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onMenuClick={() => setMobileOpen(true)}
        />

        <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
