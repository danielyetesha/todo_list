import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="p-4 md:p-8 flex justify-between items-center bg-gray-200 gap-x-4 shadow-lg">
      {/* Title with responsive font size */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full">
        Todo App
      </h1>

      {/* Right Section with Notifications and Calendar */}
      <ul className="flex items-center gap-4 text-lg sm:text-xl md:text-2xl">
        <FontAwesomeIcon
          icon={faBell}
          className="bg-custom-red text-white p-2 rounded-full cursor-pointer hover:bg-custom-red-dark transition duration-300"
        />
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="bg-custom-red text-white p-2 rounded-full cursor-pointer hover:bg-custom-red-dark transition duration-300"
        />

        <li>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-2xl sm:text-3xl md:text-4xl cursor-pointer"
          />
          {/* Optionally, you can use an image for the profile icon */}
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
