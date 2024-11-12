import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faListSquares,
  faQuestionCircle,
  faChartPie,
  faExclamation,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <aside className=" overflow-clip bg-custom-red p-8 flex flex-col justify-between rounded-tr-2xl rounded-br-2xl">
      <ul className="flex flex-col gap-4 justify-center">
        {[
          { text: "Dashboard", icon: faChartPie },
          { text: "Vital Tasks", icon: faExclamation },
          { text: "My Task", icon: faListSquares },
          { text: "Task Categories", icon: faListCheck },
          { text: "Settings", icon: faCog },
          { text: "Help", icon: faQuestionCircle },
        ].map((item) => {
          return (
            <li
              key={item}
              className={`${
                false
                  ? "bg-white text-custom-red "
                  : "bg-transparent text-white"
              } + flex   items-center px-2 py-1 gap-4 rounded-lg`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="content-center size-4"
              />
              <p>{item.text}</p>
            </li>
          );
        })}
      </ul>

      <button
        className={` "bg-transparent text-white flex items-center px-2 py-1 gap-4 rounded-lg`}
      >
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="content-center size-4"
        />
        <p>Logout</p>
      </button>
    </aside>
  );
};

export default Sidebar;
