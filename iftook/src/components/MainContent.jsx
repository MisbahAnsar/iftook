import React, { useState } from "react";
import DashboardContent from "./DashboardContent";
import UsersContent from "./UsersContent";
import UserDetails from "./UserDetails";
import UserProfileSidebar from "./UserProfileSidebar";
import { menuItems } from "./Sidebar";
import { Menu } from "lucide-react";
import ChatContent from "./ChatContent";
import PaymentsContent from "./PaymentsContent";
import PromotedProfileContent from "./PromotedProfileContent";
import ReviewContent from "./ReviewContent";

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
      case "chats":
        return <ChatContent />;
      case "payments":
        return <PaymentsContent />;
      case "promote":
        return <PromotedProfileContent />;
      case "review":
        return <ReviewContent />;
      default:
        return <DefaultContent title={activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} />;
    }
  };

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-100 relative">
      {isSidebarOpen && <UserProfileSidebar userId={selectedUserId} />}

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">
          {menuItems.find((item) => item.id === activeItem)?.label}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;
