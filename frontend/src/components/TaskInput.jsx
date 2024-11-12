import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskInput() {
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Type Title of Task"
        className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="text"
        placeholder="Detail of Your Task"
        className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button className="px-4 bg-green-500 text-white rounded-lg shadow-md">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default TaskInput;
