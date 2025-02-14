import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getAllUsers } from "../utils/api"; // Assuming getAllUsers is in api/auth.js
import { users as dummyUsers } from "../data/users"; // Importing dummy data

const UsersContent = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
          {/* Skeleton for Header */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
  
          {/* Skeleton for Block Reason Input */}
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
  
          {/* Skeleton for Buttons */}
          <div className="flex gap-2 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-24"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }
    if (error) return <p className="text-red-600 text-center py-4">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users Management</h2>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["User", "Email", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {users.length > 0 ? (
              users.map((user, index) => {
                // Use a dummy user for the details (cycling through them if necessary)
                const demoUser = dummyUsers[index % dummyUsers.length];

                return (
                  <tr key={user._id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full border border-gray-400"
                          src={user.photos?.[0] || "https://via.placeholder.com/40"}
                          alt="Profile"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">ID: {user._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-md ${
                          user.isOnline ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onUserClick(user._id)} // Always pass dummy user ID
                        className="flex items-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersContent;
