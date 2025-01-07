import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function HandelLetsTalk(){
    navigate('/contact')
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-[#0F0F0F] py-4">
      <div className='contentArea'>
        <div className="container max-w-[1170px] mx-auto px-4 flex justify-between items-center">
          <div className="text-4xl font-bold text-white">Aryan</div>
          <nav>
            <ul className="flex space-x-[49px]">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-300 transition duration-300`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button 
            className={`bg-[#3C3D37] px-6 py-2 rounded-2xl transition duration-300 transform ${
              isHovered ? 'bg-white scale-105' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={HandelLetsTalk}
          >
            <span className={`${isHovered ? 'text-black' : 'text-white'}`}>
              Let's talk
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}