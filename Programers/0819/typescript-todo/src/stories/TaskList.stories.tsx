import TaskList from "../components/TaskList";
import TaskProvider from "../contexts/TaskProvider";

export default {
  title: "Component/TaskList",
  component: TaskList,
};

export const Default = () => {
  const tasks = [
    {
      id: "01",
      content: "Todo",
      complete: false,
    },
    {
      id: "02",
      content: "Hello",
      complete: false,
    },
    {
      id: "03",
      content: "There",
      complete: true,
    },
  ];

  return (
    <TaskProvider initialTasks={tasks}>
      <TaskList />
    </TaskProvider>
  );
};
