import React, { useRef, useState } from "react";
import { BiHome, BiSearch, BiSolidArchive } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "../SearchInput";
import Main from "../../store/main";
import { v4 as uuid } from "uuid";
import { logo } from "../../assets/index";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

// The navigation' data array
const navs = [
  {
    id: 0,
    title: "Movies",
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
    <header className="md:w-full hidden md:flex md:items-center md:justify-center md:fixed md:z-50 md:bg-dark xl:p-1 md:h-20 md:top-0 md:rounded-none md:px-3">
      <Link to="/" className="hidden md:flex w-fit h-fit rounded-full mx-5">
        <img
          src={logo}
          alt="Mox logo image"
          className="w-15 h-15 rounded-full"
        />
      </Link>

      <nav className="w-fit rounded-4xl p-3 md:p-3 xl:p-3.5 flex flex-1 justify-around md:justify-start md:gap-15 lg:ml-70">
        {navs.map((navLink) => (
          <NavLink
            key={uuid()}
            to={navLink.path}
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "#4750ff" : "#555",
            })}
          >
            <span className="text-xl md:text-md md:hidden block">
              {navLink.icon}
            </span>
            <span className="hidden md:block">{navLink.title}</span>
          </NavLink>
        ))}
      </nav>
      <div className="hidden w-fit h-full md:mx-40 md:flex md:items-center md:justify-center">
        <Link to="/search" className="text-medium text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-600/50 hover:text-gray-300">
          <FiSearch />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
