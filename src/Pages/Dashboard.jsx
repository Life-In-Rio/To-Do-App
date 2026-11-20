
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  Plus,
  Sparkles,
} from "lucide-react";

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  if (!dateString) return "No deadline";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "No deadline";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Dashboard({ user, tasks = [], setActivePage }) {
  const today = getToday();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const upcomingTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.dueDate &&
      task.dueDate >= today
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 4);

  const firstName = user?.trim().split(" ")[0] || "there";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const statCards = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      description: "All your tasks",
    },
    {
      label: "In Progress",
      value: activeTasks,
      icon: Clock3,
      description: "Tasks to complete",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      description: "Tasks finished",
    },
    {
      label: "Upcoming",
      value: upcomingTasks,
      icon: CalendarDays,
      description: "Upcoming deadlines",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Welcome Section */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p
            className="mb-2 text-xs font-medium sm:text-sm"
            style={{ color: "var(--muted)" }}
          >
            {currentDate}
          </p>

          <h1
            className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Good day, {firstName}.
          </h1>

          <p
            className="mt-2 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            Here's what's happening with your tasks today.
          </p>
        </div>

        <button
          onClick={() => setActivePage("My Tasks")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:opacity-85 sm:w-auto"
          style={{
            background: "var(--accent)",
            color: "var(--background)",
          }}
        >
          <Plus size={18} />
          Add New Task
        </button>
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-4">
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--text)" }}
          >
            Overview
          </h2>

          <p
            className="mt-1 text-xs sm:text-sm"
            style={{ color: "var(--muted)" }}
          >
            A quick look at your productivity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="min-w-0 rounded-2xl border p-4 transition-all hover:-translate-y-1 sm:p-5"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </span>

                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl"
                    style={{
                      background: "var(--active-bg)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <h3
                  className="mt-4 text-2xl font-extrabold tracking-tight sm:mt-5 sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  {item.value}
                </h3>

                <p
                  className="mt-1 text-[10px] sm:text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Progress and Quick Info */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          className="min-w-0 rounded-2xl border p-5 sm:p-6 lg:col-span-2"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2
                className="text-base font-bold sm:text-lg"
                style={{ color: "var(--text)" }}
              >
                Overall Progress
              </h2>

              <p
                className="mt-1 text-xs leading-relaxed sm:text-sm"
                style={{ color: "var(--muted)" }}
              >
                Keep moving forward, one task at a time.
              </p>
            </div>

            <span
              className="shrink-0 text-xl font-extrabold sm:text-2xl"
              style={{ color: "var(--accent)" }}
            >
              {progress}%
            </span>
          </div>

          <div
            className="mt-6 h-3 overflow-hidden rounded-full sm:mt-7"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "var(--accent)",
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
            <span style={{ color: "var(--muted)" }}>
              {completedTasks} of {totalTasks} tasks completed
            </span>

            <span style={{ color: "var(--muted)" }}>
              {activeTasks} remaining
            </span>
          </div>
        </div>

        <div
          className="flex min-w-0 flex-col justify-between rounded-2xl border p-5 sm:p-6"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: "var(--active-bg)",
                color: "var(--accent)",
              }}
            >
              <Sparkles size={20} />
            </div>

            <h2
              className="mt-4 text-lg font-bold sm:mt-5"
              style={{ color: "var(--text)" }}
            >
              Stay Focused
            </h2>

            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Small steps every day lead to meaningful progress.
              Keep your priorities clear.
            </p>
          </div>

          <button
            onClick={() => setActivePage("My Tasks")}
            className="mt-5 flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Manage your tasks
            <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      {/* Recent Tasks */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text)" }}
            >
              Recent Tasks
            </h2>

            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: "var(--muted)" }}
            >
              Your latest activities.
            </p>
          </div>

          <button
            onClick={() => setActivePage("My Tasks")}
            className="flex shrink-0 items-center gap-1 text-xs font-bold transition-opacity hover:opacity-70 sm:text-sm"
            style={{ color: "var(--accent)" }}
          >
            View all
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          {recentTasks.length > 0 ? (
            recentTasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-start gap-3 px-4 py-4 sm:items-center sm:gap-4 sm:px-5"
                style={{
                  borderBottom:
                    index !== recentTasks.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:mt-0 sm:h-9 sm:w-9"
                  style={{
                    background: "var(--active-bg)",
                    color: task.completed
                      ? "var(--accent)"
                      : "var(--muted)",
                  }}
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="break-words text-sm font-bold"
                    style={{
                      color: "var(--text)",
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      opacity: task.completed ? 0.6 : 1,
                    }}
                  >
                    {task.title}
                  </p>

                  <p
                    className="mt-1 text-[11px] leading-relaxed sm:text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {task.category || "Personal"}
                    {task.dueDate
                      ? ` · Due ${formatDate(task.dueDate)}`
                      : ""}
                  </p>
                </div>

                <span
                  className="mt-0.5 shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold sm:mt-0 sm:px-3 sm:text-xs"
                  style={{
                    background: task.completed
                      ? "var(--active-bg)"
                      : "var(--background)",
                    color: task.completed
                      ? "var(--accent)"
                      : "var(--muted)",
                  }}
                >
                  {task.completed ? "Completed" : "Active"}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center px-5 py-10 text-center sm:px-6 sm:py-12">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: "var(--active-bg)",
                  color: "var(--accent)",
                }}
              >
                <ListTodo size={25} />
              </div>

              <h3
                className="mt-4 text-base font-bold"
                style={{ color: "var(--text)" }}
              >
                No tasks yet
              </h3>

              <p
                className="mt-2 max-w-xs text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Start by creating your first task and organize your day.
              </p>

              <button
                onClick={() => setActivePage("My Tasks")}
                className="mt-5 rounded-xl px-5 py-2.5 text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "var(--background)",
                }}
              >
                Create your first task
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
