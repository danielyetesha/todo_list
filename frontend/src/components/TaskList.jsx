import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCard from "./TaskCard";
import { faTriangleCircleSquare } from "@fortawesome/free-solid-svg-icons";

function TaskList() {
  const tasks = [
    {
      title: "Learn Javascript",
      description: "Master the language basics",
      startDate: "07-07-2023",
    },
    {
      title: "Learn Javascript",
      description: "Master the language basics",
      startDate: "07-07-2023",
    },
    {
      title: "Learn Javascript",
      description: "Master the language basics",
      startDate: "07-07-2023",
    },
    {
      title: "Learn Javascript",
      description: "Master the language basics",
      startDate: "07-07-2023",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="flex items-center gap-2 bg-custom-red p-1 rounded-md self-start w-fit">
          <span>By Category</span>
          <FontAwesomeIcon icon={faTriangleCircleSquare} />
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
      <button className="self-center my-4 px-4 py-2 border rounded-lg shadow-md text-yellow-500">
        Load more
      </button>
    </div>
  );
}

export default TaskList;
