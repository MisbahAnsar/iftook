import React from "react";
import { LayoutDashboard, Users, Menu, MessagesSquare, IndianRupee, User } from "lucide-react";

const menuItems = [
  { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { id: "users", icon: <Users size={20} />, label: "Users" },
  { id: "payments", icon: <IndianRupee size={20} />, label: "Payments" },
  { id: "chats", icon: <MessagesSquare size={20} />, label: "Chats" },
  { id: "promote", icon: <User size={20} />, label: "Promoted Profile" },
];

const Sidebar = ({ activeItem, setActiveItem, isMobileMenuOpen, setIsMobileMenuOpen }) => {

  const handleLogout = () => {
    localStorage.removeItem("token"); // No need to store response
    setUser(null);
    setError("Logged out successfully");
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-64 w-64
        `}
      >
        <div className="p-4 border-b">
          <img 
            src="https://sushistash.tushitgarg.com/api/images/BQACAgUAAxkDAANwZ68Eg62tFFWAC7oBAz6y0_gavvsAApATAALQjnhVeX-DQFHDd-M2BA"
            alt="Logo" 
            className="h-20 w-44 rounded-md mx-auto" 
          />
        </div>
        <nav className="mt-6 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200
                ${
                  activeItem === item.id 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className='text-white bg-red-500 border-2 mt-20 flex items-center justify-center rounded-md mr-10 ml-6 my-10 p-2 cursor-pointer' onClick={handleLogout}>Log Out</div>
      </div>
    </>
  );
};

export { menuItems };
export default Sidebar;