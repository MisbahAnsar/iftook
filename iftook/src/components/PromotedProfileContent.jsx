import React, { useState, useEffect } from "react";
import { getPromotedUsers } from "../utils/api";

const PromotedProfileContent = () => {
  const [promotedUsers, setPromotedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotedUsers = async () => {
      try {
        const response = await getPromotedUsers();
        if (response.success) {
          setPromotedUsers(response.data || []);
        } else {
          setError(response.message || "Failed to fetch promoted users");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotedUsers();
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
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center">
          <span className="text-2xl mr-3">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotedUsers.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex items-start relative">
            {/* Profile Image */}
            <img
              src={user?.photos?.[0] || "https://via.placeholder.com/150"}
              alt={user.name}
              className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 mr-4"
            />
            
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 flex flex-wrap gap-1 text-xs text-blue-700">
                {user.interests?.length > 0 ? (
                  user.interests.map((interest, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 border border-blue-500 rounded-md">
                      {interest}
                    </span>
                  ))
                ) : (
                  <span>No interests listed</span>
                )}
              </div>
            </div>
            
            {/* Location */}
            <p className="absolute top-2 right-3 text-sm text-gray-500">{user?.location?.city || "Unknown City"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotedProfileContent;