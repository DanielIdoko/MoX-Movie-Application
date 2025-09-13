import React from "react";
import { BiCollection, BiHome, BiSearch, BiSolidArchive } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Main from "../../store/main";
import { v4 as uuid4 } from "uuid";
import { LiaHomeSolid } from "react-icons/lia";
import { FiSearch } from "react-icons/fi";

// The bottom's navigation's data
const navs = [
  {
    id: 0,
    title: "Home",
    path: "/",
    icon: <LiaHomeSolid />,
  },
  {
    id: 1,
    title: "Saved",
    path: "/savedpage",
    icon: <BiCollection />,
  },
  {
    id: 2,
    title: "Search",
    path: "/search",
    icon: <FiSearch />,
  },
];

const BottomNavigation = () => {
  // const { handleToggleSearchBar, searchTerm } = Main();

  return (
    <div className="w-full h-14 p-1 fixed bottom-0 bg-dark left-0 md:hidden z-60 rounded-tl-2xl rounded-tr-2xl border-t-1 border-t-gray-700">
      <nav className="w-full h-full flex items-center justify-center gap-20">
        {navs.map((navLink) => (
          <NavLink
            key={uuid4()}
            to={navLink.path}
            onClick={() => setActiveNav(navLink.title)}
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#555",
            })}
          >
            <span className="text-xl md:text-md md:hidden block">
              {navLink.icon}
            </span>
            <span className="hidden md:block">{navLink.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
