
import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setCategory(editingTask.category || "Personal");
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("Personal");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate,
    });
  }

  const fieldStyle = {
    background: "var(--background)",
    borderColor: "var(--border)",
    color: "var(--text)",
  };

  const labelStyle = {
    color: "var(--text)",
  };

  const inputClass =
    "h-11 w-full rounded-xl border px-3 text-sm outline-none transition-all focus:border-[var(--accent)] sm:h-12 sm:px-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Title */}
      <div>
        <label
          className="mb-2 block text-sm font-bold"
          style={labelStyle}
        >
          Task Title <span className="text-red-400">*</span>
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          required
          className={inputClass}
          style={fieldStyle}
        />
      </div>

      {/* Description */}
      <div>
        <label
          className="mb-2 block text-sm font-bold"
          style={labelStyle}
        >
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add some details about your task..."
          rows={3}
          className="min-h-[100px] w-full resize-y rounded-xl border p-3 text-sm outline-none transition-all focus:border-[var(--accent)] sm:p-4"
          style={fieldStyle}
        />
      </div>

      {/* Category and Priority */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-bold"
            style={labelStyle}
          >
            Category
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClass}
            style={fieldStyle}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-bold"
            style={labelStyle}
          >
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className={inputClass}
            style={fieldStyle}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label
          className="mb-2 block text-sm font-bold"
          style={labelStyle}
        >
          Due Date
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className={inputClass}
          style={fieldStyle}
        />
      </div>

      {/* Actions */}
      <div
        className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end sm:pt-5"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-opacity hover:opacity-70 sm:w-auto"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <X size={17} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          style={{
            background: "var(--accent)",
            color: "var(--background)",
          }}
        >
          {editingTask ? <Save size={17} /> : <Plus size={17} />}
          {editingTask ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
