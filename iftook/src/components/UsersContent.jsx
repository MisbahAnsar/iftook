import React, { useEffect } from "react";
import { Eye } from "lucide-react";
import { users } from "../data/users";

const UsersContent = ({ onUserClick }) => {
  
  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log("token", token);
      if (!token) {
        console.log("Not authorized - No token provided");
        return;
      }

      const response = await fetch("https://iftook-backend.vercel.app/api/users/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch users:", data.message || "Unknown error");
        return;
      }

      console.log("Fetched users:", data.users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const demoUser = users.find((user) => user.id === 1);

  if (!demoUser) {
    return <p className="text-gray-600 text-center py-4">Demo user not found.</p>;
  }

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
            <tr key={demoUser.id} className="hover:bg-gray-100 transition">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full border border-gray-400"
                    src={demoUser.profileImage}
                    alt="Profile"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {demoUser.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {demoUser.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700">{demoUser.email}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-md ${
                    demoUser.status === "Live"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {demoUser.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => onUserClick(demoUser.id)}
                  className="flex items-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersContent;
