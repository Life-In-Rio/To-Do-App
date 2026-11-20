
import {
  CalendarDays,
  Check,
  Circle,
  Pencil,
  Trash2,
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

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priorityColors = {
    High: "#F87171",
    Medium: "#FBBF24",
    Low: "#60A5FA",
  };

  const priorityColor =
    priorityColors[task.priority] || "#929A93";

  const isOverdue =
    task.dueDate &&
    task.dueDate < getToday() &&
    !task.completed;

  return (
    <article
      className="group rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Complete Button */}
        <button
          onClick={onToggle}
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110"
          style={{
            background: task.completed
              ? "var(--accent)"
              : "transparent",
            border: task.completed
              ? "none"
              : "1.5px solid var(--muted)",
            color: "var(--background)",
          }}
          aria-label={
            task.completed
              ? "Mark as active"
              : "Mark as completed"
          }
        >
          {task.completed ? (
            <Check size={15} strokeWidth={3} />
          ) : (
            <Circle size={8} className="opacity-0" />
          )}
        </button>

        {/* Task Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className="break-words text-sm font-bold sm:text-base"
              style={{
                color: "var(--text)",
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                opacity: task.completed ? 0.55 : 1,
              }}
            >
              {task.title}
            </h3>

            {task.completed && (
              <span
                className="shrink-0 rounded-full px-2 py-1 text-[10px] font-bold"
                style={{
                  background: "var(--active-bg)",
                  color: "var(--accent)",
                }}
              >
                Done
              </span>
            )}
          </div>

          {task.description && (
            <p
              className="mt-2 line-clamp-2 break-words text-sm leading-relaxed"
              style={{
                color: "var(--muted)",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-4 sm:gap-x-4">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--muted)" }}
            >
              {task.category || "Personal"}
            </span>

            <span
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{
                color: isOverdue
                  ? "#F87171"
                  : "var(--muted)",
              }}
            >
              <CalendarDays size={13} />

              {isOverdue
                ? "Overdue"
                : formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        {/* Priority */}
        <span
          className="shrink-0 rounded-full px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:text-xs"
          style={{
            background: `${priorityColor}18`,
            color: priorityColor,
          }}
        >
          {task.priority || "Medium"}
        </span>
      </div>

      {/* Card Footer */}
      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 sm:mt-5"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="text-[11px] font-medium sm:text-xs"
          style={{ color: "var(--muted)" }}
        >
          {task.completed ? "Task completed" : "Task in progress"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:opacity-70"
            style={{
              background: "var(--active-bg)",
              color: "var(--muted)",
            }}
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:opacity-70"
            style={{
              background: "rgba(248, 113, 113, 0.10)",
              color: "#F87171",
            }}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
