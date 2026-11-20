
import TaskCollection from "../Components/TaskCollection";

function Completed({
  tasks,
  updateTask,
  deleteTask,
  toggleTask,
}) {
  return (
    <TaskCollection
      type="completed"
      tasks={tasks}
      updateTask={updateTask}
      deleteTask={deleteTask}
      toggleTask={toggleTask}
    />
  );
}

export default Completed;
