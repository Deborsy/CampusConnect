"use client"

import { toggleSidebar, setActiveNavItem } from '@/lib/features/uiSlice';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { TiMessageTyping } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";
import { logout } from '@/lib/features/authSlice';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/app/Firebase/firebase'; 


const navigationItems = [
  
  {
    label: 'Create Event',
    icon: <CiCirclePlus size={20} />,
  },
  {
    label: 'Notification',
    icon: <TiMessageTyping size={20} />,
  }
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.ui.sidebarExpanded);
  const activeNavItem = useSelector((state) => state.ui.activeNavItem);

  const handleToggleSidebar = () => {
      dispatch(toggleSidebar());
  };

  const handleNavItemClicked = (itemName) => {
      dispatch(setActiveNavItem(itemName));
  };

  const handleLogout = async () => {
      const auth = getAuth(app);
      try {
          await signOut(auth);
          dispatch(logout()); // Dispatch logout action
      } catch (error) {
          console.error('Logout Error:', error);
      }
  };

  useEffect(() => {
      if (isExpanded) {
          document.body.classList.remove('sidebar-collapsed');
      } else {
          document.body.classList.add('sidebar-collapsed');
      }
  }, [isExpanded]);

  return (
      <aside
          className={`fixed top-0 left-0 h-screen bg-[#22272e] shadow-md p-4 z-10 flex items-center flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-64 translate-x-0' : 'w-20'}`}
          style={{ color: '#d4d4d4' }}
      >
          <div className="flex items-center justify-between mb-12">
              {isExpanded && <Image src="/YCT CODEPLAY-logo 1.png" alt="wawu-logo" width={100} height={100} />}
              <button
                  className="hamburger absolute top-4 right-5 p-2 mb-8 text-gray-400 focus:outline-none"
                  onClick={handleToggleSidebar}
              >
                  <GiHamburgerMenu size={20} />
              </button>
          </div>
          <nav className="flex-1">
              <ul className="space-y-2">
                  {navigationItems.map((item) => (
                      <li
                          key={item.label}
                          className={`p-3 rounded-md cursor-pointer flex items-center transition-colors duration-300 ease-in-out ${activeNavItem === item.label ? 'bg-[#FFD700] text-black' : 'hover:bg-[#393e46]'} ${isExpanded ? '' : 'mt-2'}`}
                          onClick={() => handleNavItemClicked(item.label)}
                      >
                          <span className="mr-2" style={{ color: activeNavItem === item.label ? 'black' : '#d4d4d4' }}>
                              {item.icon}
                          </span>
                          <span className={`transition-opacity duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                              {isExpanded && item.label}
                          </span>
                      </li>
                  ))}
              </ul>
          </nav>
          <div className="p-3 rounded-md cursor-pointer flex items-center transition-colors duration-300 ease-in-out" onClick={handleLogout}>
              <span className="mr-2">
                  <TbLogout size={20} />
              </span>
              <span className={`transition-opacity duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {isExpanded && 'Logout'}
              </span>
          </div>
      </aside>
  );
};

export default Sidebar;