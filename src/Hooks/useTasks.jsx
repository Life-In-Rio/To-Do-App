
import { useEffect, useState } from "react";

function useTasks(user) {
  const storageKey = `taskflow_tasks_${encodeURIComponent(
    user.trim().toLowerCase()
  )}`;

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(storageKey);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function updateTask(id, updatedData) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}

export default useTasks;
