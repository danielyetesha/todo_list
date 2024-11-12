import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

function Header() {
  return (
    <header className="p-8 flex justify-between items-center bg-gray-100 gap-x-4 shadow-lg">
      <h1 className="text-4xl font-bold text-center">Todo App</h1>

      {/* Right Section with Notifications and Calendar */}
      <ul className="flex self-end justify-around items-center gap-4">
        <IconButton icon={faBell} />
        <IconButton icon={faCalendarAlt} />

        <li>
          <FontAwesomeIcon icon={faUserCircle} className="size-8" />
          {/* <img
            src="/path-to-profile-picture.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          /> */}
        </li>
      </ul>
    </header>
  );
}

export default Header;
