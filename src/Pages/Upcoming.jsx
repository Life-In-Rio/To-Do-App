
import TaskCollection from "../Components/TaskCollection";

function Upcoming({
  tasks,
  updateTask,
  deleteTask,
  toggleTask,
}) {
  return (
    <TaskCollection
      type="upcoming"
      tasks={tasks}
      updateTask={updateTask}
      deleteTask={deleteTask}
      toggleTask={toggleTask}
    />
  );
}

export default Upcoming;
