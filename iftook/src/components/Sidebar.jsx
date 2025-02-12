import React from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { id: "users", icon: <Users size={20} />, label: "Users" },
  { id: "analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
];

const Sidebar = ({ activeItem, setActiveItem, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-10
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:w-64 w-64
      `}
    >
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveItem(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`
              w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
              ${activeItem === item.id ? "bg-blue-100 text-blue-600 border-r-4 border-blue-600" : ""}
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
