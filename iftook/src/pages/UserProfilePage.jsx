// UserProfilePage.js
import React from "react";
import { useParams } from "react-router-dom";
import UserProfileSidebar from "../components/UserProfileSidebar"; // Import the sidebar component
import UserDetails from "../components/UserDetails"; // Import the user details component

const UserProfilePage = () => {
    const { userId } = useParams();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <UserProfileSidebar userId={userId} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <UserDetails userId={userId} />
      </div>
    </div>
  );
};

export default UserProfilePage;