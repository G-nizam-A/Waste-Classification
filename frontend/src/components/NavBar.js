import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Logo, Earth, glass, metal, paper, plastic, organic, battery, menu } from '../assets';
import { IoMenu } from "react-icons/io5";

const NavBar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Image Detection", link: "/image-detection" },
    { name: "Real Time Detection", link: "/real-time-detection" },
    // { name: "About", link: "/about" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full sticky top-0 left-0">
      <div className="md:flex items-center justify-between bg-white md:px-10 px-3">
        <div className="font-bold text-2xl cursor-pointer flex items-center  text-gray-800" >
          <img src={Logo} className="w-20" />
          Waste Classification
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden" >
          <IoMenu />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${ open ? "top-20 " : "top-[-490px]" }`} >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={link.link}  className="text-gray-800 hover:text-gray-400 duration-500" >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
