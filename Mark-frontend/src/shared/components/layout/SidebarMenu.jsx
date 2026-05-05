import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarMenu = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  const toggleSubMenu = () => setIsOpen(!isOpen);

  if (!hasSubMenu) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group ${
            isActive
              ? 'bg-blue-900 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
          }`
        }
      >
        <item.icon size={18} className="shrink-0" />
        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
      </NavLink>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={toggleSubMenu}
        className={`flex items-center justify-between w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-blue-900 rounded-md transition-all duration-200 group ${
          isOpen ? 'bg-gray-50/50' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon size={18} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
        </div>
        {!isCollapsed && (
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={16} />
          </div>
        )}
      </button>

      {isOpen && !isCollapsed && (
        <div className="pl-10 space-y-1 mt-1 border-l border-gray-100 ml-5">
          {item.subMenu.map((sub, index) => (
            <NavLink
              key={index}
              to={sub.path}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-900 font-semibold'
                    : 'text-gray-500 hover:text-blue-900'
                }`
              }
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
