import React, { useState } from "react";
import DashboardContent from "./DashboardContent";
import UsersContent from "./UsersContent";
import UserDetails from "./UserDetails";
import UserProfileSidebar from "./UserProfileSidebar";
import { menuItems } from "./Sidebar";
import { Menu } from "lucide-react";

const DefaultContent = ({ title }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-700">Content for {title.toLowerCase()} goes here.</p>
  </div>
);

const MainContent = ({ activeItem, selectedUserId, setSelectedUserId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Show the button only if:
  // - User is on the "dashboard" page
  // - User is on the "users" page **and** viewing details (selectedUserId is not null)
  const showButton = activeItem === "" || (activeItem === "users" && selectedUserId);

  const renderContent = () => {
    if (activeItem === "users" && selectedUserId) {
      return <UserDetails userId={selectedUserId} onBack={() => setSelectedUserId(null)} />;
    }

    switch (activeItem) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UsersContent onUserClick={setSelectedUserId} />;
      default:
        return <DefaultContent title={activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} />;
    }
  };

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-100 relative">
      {/* Conditional Button to Open Sidebar */}
      {showButton && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed lg:hidden top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      {isSidebarOpen && <UserProfileSidebar userId={selectedUserId} />}

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {menuItems.find((item) => item.id === activeItem)?.label}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;
