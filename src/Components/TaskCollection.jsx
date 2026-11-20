import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  X,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

import TaskCard from "./Taskcard";
import TaskForm from "./Taskform";

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
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDateLabel(dateString) {
  if (dateString === getToday()) return "Today";

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowString = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  if (dateString === tomorrowString) return "Tomorrow";

  return formatDate(dateString);
}

function TaskCollection({
  type,
  tasks = [],
  updateTask,
  deleteTask,
  toggleTask,
}) {
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const isUpcoming = type === "upcoming";
  const today = getToday();

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (isUpcoming) {
          return !task.completed && task.dueDate && task.dueDate >= today;
        }

        return task.completed;
      })
      .filter((task) => {
        const title = (task.title || "").toLowerCase();
        const description = (task.description || "").toLowerCase();
        const keyword = search.toLowerCase();

        return title.includes(keyword) || description.includes(keyword);
      })
      .sort((a, b) => {
        if (isUpcoming) {
          return a.dueDate.localeCompare(b.dueDate);
        }

        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [tasks, isUpcoming, today, search]);

  const groups = useMemo(() => {
    if (!isUpcoming) {
      return [{ label: "Completed Tasks", tasks: filteredTasks }];
    }

    const grouped = {};

    filteredTasks.forEach((task) => {
      const date = task.dueDate;

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(task);
    });

    return Object.keys(grouped)
      .sort()
      .map((date) => ({
        label: getDateLabel(date),
        date,
        tasks: grouped[date],
      }));
  }, [filteredTasks, isUpcoming]);

  const todayCount = filteredTasks.filter(
    (task) => task.dueDate === today,
  ).length;

  const totalCount = filteredTasks.length;

  function handleEdit(task) {
    setEditingTask(task);
  }

  function handleSubmit(taskData) {
    if (!editingTask) return;

    updateTask(editingTask.id, taskData);
    setEditingTask(null);
  }

  function handleDelete() {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p
          className="mb-2 text-sm font-medium"
          style={{ color: "var(--muted)" }}
        >
          Workspace / {isUpcoming ? "Upcoming" : "Completed"}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: "var(--text)" }}
            >
              {isUpcoming ? "Upcoming Tasks" : "Completed Tasks"}
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              {isUpcoming
                ? "Stay ahead of your deadlines and plan what's next."
                : "Look back at everything you've accomplished."}
            </p>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl border px-4 py-3"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                background: "var(--active-bg)",
                color: "var(--accent)",
              }}
            >
              {isUpcoming ? (
                <CalendarDays size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </div>

            <div>
              <p
                className="text-xl font-extrabold leading-none"
                style={{ color: "var(--text)" }}
              >
                {totalCount}
              </p>

              <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                {isUpcoming ? "Upcoming tasks" : "Completed tasks"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      {isUpcoming && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="rounded-2xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                Due Today
              </span>

              <Clock3 size={19} style={{ color: "var(--accent)" }} />
            </div>

            <p
              className="mt-4 text-3xl font-extrabold"
              style={{ color: "var(--text)" }}
            >
              {todayCount}
            </p>

            <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
              Tasks that need your attention today
            </p>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                Future Deadlines
              </span>

              <CalendarDays size={19} style={{ color: "var(--accent)" }} />
            </div>

            <p
              className="mt-4 text-3xl font-extrabold"
              style={{ color: "var(--text)" }}
            >
              {totalCount - todayCount}
            </p>

            <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
              Tasks scheduled for upcoming days
            </p>
          </div>
        </section>
      )}

      {/* Search */}
      <section>
        <div
          className="flex items-center gap-3 rounded-xl border px-4"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <Search size={18} style={{ color: "var(--muted)" }} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your tasks..."
            className="h-12 w-full bg-transparent text-sm outline-none"
            style={{ color: "var(--text)" }}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ color: "var(--muted)" }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </section>

      {/* Task Groups */}
      <section className="space-y-7">
        {filteredTasks.length > 0 ? (
          groups.map((group) => (
            <div key={group.label}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {group.label}
                  </h2>

                  {group.date && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--muted)" }}
                    >
                      {formatDate(group.date)}
                    </p>
                  )}
                </div>

                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: "var(--active-bg)",
                    color: "var(--accent)",
                  }}
                >
                  {group.tasks.length}{" "}
                  {group.tasks.length === 1 ? "task" : "tasks"}
                </span>
              </div>

              <div
                className={`grid grid-cols-1 gap-3 ${
                  group.tasks.length > 1 ? "xl:grid-cols-2" : ""
                }`}
              >
                {group.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => setDeletingTask(task)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div
            className="flex flex-col items-center rounded-2xl border px-6 py-14 text-center"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "var(--active-bg)",
                color: "var(--accent)",
              }}
            >
              {isUpcoming ? (
                <CalendarDays size={25} />
              ) : (
                <CheckCircle2 size={25} />
              )}
            </div>

            <h3
              className="mt-4 text-base font-bold"
              style={{ color: "var(--text)" }}
            >
              {search
                ? "No matching tasks"
                : isUpcoming
                  ? "You're all caught up"
                  : "Nothing completed yet"}
            </h3>

            <p
              className="mt-2 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {search
                ? "Try another keyword to find the task you're looking for."
                : isUpcoming
                  ? "You don't have any upcoming deadlines. Enjoy the breathing room."
                  : "Completed tasks will appear here once you finish them."}
            </p>
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editingTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setEditingTask(null)}
        >
          <div
            className="my-auto w-full max-w-xl rounded-2xl border p-6 shadow-2xl sm:p-8"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-xl font-extrabold"
                  style={{ color: "var(--text)" }}
                >
                  Edit Task
                </h2>

                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Update the details of your task.
                </p>
              </div>

              <button
                onClick={() => setEditingTask(null)}
                className="rounded-lg p-2"
                style={{
                  background: "var(--active-bg)",
                  color: "var(--muted)",
                }}
                aria-label="Close form"
              >
                <X size={19} />
              </button>
            </div>

            <TaskForm
              editingTask={editingTask}
              onSubmit={handleSubmit}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingTask && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setDeletingTask(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border p-6 shadow-2xl"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: "rgba(248, 113, 113, 0.12)",
                color: "#F87171",
              }}
            >
              <Trash2 size={22} />
            </div>

            <h3
              className="mt-5 text-lg font-extrabold"
              style={{ color: "var(--text)" }}
            >
              Delete this task?
            </h3>

            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Are you sure you want to delete{" "}
              <span className="font-bold" style={{ color: "var(--text)" }}>
                "{deletingTask.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeletingTask(null)}
                className="flex-1 rounded-xl border px-4 py-3 text-sm font-bold"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-bold"
                style={{
                  background: "#DC5555",
                  color: "#FFFFFF",
                }}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCollection;
