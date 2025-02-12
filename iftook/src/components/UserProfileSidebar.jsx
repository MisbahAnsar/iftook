import React from "react";
import { ArrowLeft } from 'lucide-react';
import { users } from "../data/users"; // Ensure you have user data

const UserProfileSidebar = ({ userId, onBack }) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg text-gray-800">
      {/* Profile Section */}
      <div className="relative text-center">
        {/* Background Overlay (Half Cover) */}
        <div className="absolute top-0 left-0 w-full h-20 bg-blue-100 rounded-b-lg"></div>

        {/* Profile Image */}
        <div className="relative pt-10 flex justify-center">
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* User Info */}
        <h2 className="text-lg font-semibold mt-2 text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500 mt-2">Status: {user.status}</p>

        {/* Additional Details */}
        <div className="mt-10 mb-6 p-4 bg-gray-100 rounded-lg text-sm">
          <h2 className="mb-2 text-gray-700">📅 Birth Date: {user.dob}</h2>
          <h2 className="mb-2 text-gray-700">🚻 Gender: {user.gender}</h2>
          <h2 className="text-gray-700">🎯 Interests: {user.interests.join(", ")}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;