import React from "react";
import { ArrowLeft } from "lucide-react";
import { users } from "../data/users"; // Ensure you have user data

const UserProfileSidebar = ({ userId, onBack }) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-zinc-400 shadow-lg p-6">
      <div className="text-center">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-700">{user.email}</p>
        <p className="text-xs text-gray-600 mt-2">Status: {user.status}</p>
        <div className="mt-40 mb-10">
            <h2>Birth Date: {user.dob}</h2>
            <h2>Gender: {user.gender}</h2>
            <h2>Interests: {user.interests.join(', ')}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
