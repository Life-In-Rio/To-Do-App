import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  ListTodo,
  CheckCircle2,
  Clock3,
  X,
  Trash2,
} from "lucide-react";

import TaskForm from "../Components/Taskform";
import TaskCard from "../Components/Taskcard";

function MyTasks({ tasks = [], addTask, updateTask, deleteTask, toggleTask }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && !task.completed) ||
        (filter === "Completed" && task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function handleOpenAdd() {
    setEditingTask(null);
    setShowForm(true);
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  function handleSubmit(taskData) {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }

    handleCloseForm();
  }

  function handleDelete() {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
    },
    {
      label: "Active",
      value: activeTasks,
      icon: Clock3,
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p
            className="mb-2 text-xs font-medium sm:text-sm"
            style={{ color: "var(--muted)" }}
          >
            Workspace / Tasks
          </p>

          <h1
            className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: "var(--text)" }}
          >
            My Tasks
          </h1>

          <p
            className="mt-2 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            Organize your work and keep track of your progress.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
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
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="min-w-0 rounded-2xl border p-4 sm:p-5"
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

              <p
                className="mt-4 text-2xl font-extrabold sm:mt-5 sm:text-3xl"
                style={{ color: "var(--text)" }}
              >
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Task List */}
      <section>
        <div className="mb-5 space-y-4">
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              All Tasks
            </h2>

            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: "var(--muted)" }}
            >
              Manage and organize all your activities.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div
              className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border px-4"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <Search
                size={18}
                className="shrink-0"
                style={{ color: "var(--muted)" }}
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your tasks..."
                className="h-12 w-full min-w-0 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="shrink-0"
                  style={{ color: "var(--muted)" }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter */}
            <div
              className="grid w-full shrink-0 grid-cols-3 gap-1 rounded-xl border p-1 lg:w-auto"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              {["All", "Active", "Completed"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className="rounded-lg px-2 py-2.5 text-xs font-bold transition-all sm:px-4 sm:text-sm"
                  style={{
                    background:
                      filter === item ? "var(--active-bg)" : "transparent",
                    color: filter === item ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-3 ${
              filteredTasks.length > 1 ? "xl:grid-cols-2" : ""
            }`}
          >
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onEdit={() => handleEdit(task)}
                onDelete={() => setDeletingTask(task)}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center rounded-2xl border px-5 py-12 text-center sm:px-6 sm:py-14"
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
              <ListTodo size={25} />
            </div>

            <h3
              className="mt-4 text-base font-bold"
              style={{ color: "var(--text)" }}
            >
              {search || filter !== "All"
                ? "No matching tasks"
                : "Your task list is empty"}
            </h3>

            <p
              className="mt-2 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {search || filter !== "All"
                ? "Try changing your search or filter to find your tasks."
                : "Create your first task and start organizing your day."}
            </p>

            {!search && filter === "All" && (
              <button
                onClick={handleOpenAdd}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "var(--background)",
                }}
              >
                <Plus size={17} />
                Create Task
              </button>
            )}
          </div>
        )}
      </section>

      {/* Add / Edit Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={handleCloseForm}
        >
          <div
            className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-2xl border p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-8"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
              <div className="min-w-0">
                <h2
                  className="text-lg font-extrabold sm:text-xl"
                  style={{ color: "var(--text)" }}
                >
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>

                <p
                  className="mt-1 text-xs leading-relaxed sm:text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {editingTask
                    ? "Update the details of your task."
                    : "Add a new task to your workspace."}
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                className="shrink-0 rounded-lg p-2 transition-colors hover:opacity-70"
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
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingTask && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setDeletingTask(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border p-5 shadow-2xl sm:p-6"
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
              className="mt-2 break-words text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Are you sure you want to delete{" "}
              <span className="font-bold" style={{ color: "var(--text)" }}>
                "{deletingTask.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
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

export default MyTasks;
