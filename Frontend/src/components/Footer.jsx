import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  //const [activeButton, setActiveButton] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // const handleClick = (buttonName) => {
  //   setActiveButton(buttonName);
  // };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Contact', path: '/contact' }
  ];

  //const buttons = ["HOME", "ABOUT", "WORKS", "CONTACT"];

  return (
    <footer className="bg-[#0F0F0F] text-gray-400 py-6">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex items-center justify-center flex-col space-y-4 md:flex-col md:space-y-0">
          <div className="text-2xl font-bold text-white pb-4">Aryan</div>
          <nav>
            <ul className="flex space-x-6 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    // onClick={() => handleClick(button)}
                    className={({ isActive }) =>
                      `${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-300 transition duration-300`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs">
          © All rights reserved by{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Aryan Pandey
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
