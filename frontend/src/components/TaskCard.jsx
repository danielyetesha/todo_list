import {
  faCheckCircle,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskCard({ task }) {
  return (
    <div className="p-4 bg-custom-red rounded-lg shadow-lg flex justify-between gap-6">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span>
            status: <span>{task.status}</span>
          </span>
          <span className="text-sm">created on: {task.startDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-gray-500">
        {[{ icon: faCheckCircle }, { icon: faPencil }, { icon: faTrash }].map(
          ({ icon }, index) => (
            <button key={index}>
              <FontAwesomeIcon icon={icon} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default TaskCard;
