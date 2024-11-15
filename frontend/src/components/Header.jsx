import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import medanit from '../assets/medanit.png';


function Header() {
  return (
    <header className="p-4 md:p-8 flex justify-between items-center bg-gray-200 gap-x-4 shadow-lg">
      {/* Left Section with Image */}
      
      <img src={medanit} alt="Logo" className="h-20 w-auto" />

      {/* Title with responsive font size */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full">
        Todo App
      </h1>

    </header>
  );
}

export default Header;
