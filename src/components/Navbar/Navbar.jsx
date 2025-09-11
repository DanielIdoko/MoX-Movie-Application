import React, { useRef, useState } from "react";
import { BiHome, BiSearch, BiSolidArchive } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "../SearchInput";
import Main from "../../store/main";
import { v4 as uuid } from "uuid";
import { logo } from "../../assets";

// The navigation' data array
const navs = [
  {
    id: 0,
    title: "Home",
    path: "/",
    icon: <BiHome />,
  },
  {
    id: 1,
    title: "Saved",
    path: "/savedpage",
    icon: <BiSolidArchive />,
  },
];

function Navbar() {
  const { handleToggleSearchBar } = Main();

  return (
    <header className="md:w-full hidden md:flex md:items-center md:fixed md:z-50 md:bg-dark xl:p-1 md:h-20 md:top-0 md:rounded-none">
      <Link
        to="/"
        className="hidden md:flex p-4.5 md:pl-14 w-16 h-16 text-white"
      >
        {logo}
      </Link>

      <nav className="w-fit rounded-4xl p-3 md:p-3 xl:p-3.5 flex flex-1 justify-around md:justify-start md:gap-15 md:ml-20 lg:ml-70">
        {navs.map((navLink) => (
          <NavLink
            key={uuid()}
            to={navLink.path}
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "#f9f8ff" : "#555",
              backgroundColor: isActive ? "rgba(255,255,255,.1)" : "",
            })}
          >
            <span className="text-xl md:text-md md:hidden block">
              {navLink.icon}
            </span>
            <span className="hidden md:block">{navLink.title}</span>
          </NavLink>
        ))}
      </nav>
      {/* Search Bar */}
      <SearchInput />
    </header>
  );
}

export default Navbar;
