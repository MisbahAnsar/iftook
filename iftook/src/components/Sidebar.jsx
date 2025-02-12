import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  Files
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'users', icon: <Users size={20} />, label: 'Users' },
  { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  // { id: 'documents', icon: <Files size={20} />, label: 'Documents' },
  // { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
];

const Sidebar = ({ activeItem, setActiveItem, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className={`
      fixed top-0 left-0 h-full bg-zinc-400 shadow-lg transition-transform duration-300 ease-in-out z-10
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:w-64 w-64
    `}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveItem(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`
              w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50
              ${activeItem === item.id ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
            `}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export { menuItems };
export default Sidebar;