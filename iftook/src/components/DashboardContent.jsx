import React from 'react';
import { users } from '../data/users'; // Assuming the data is in a separate file

const DashboardContent = () => {
  const activeUsers = users.filter(user => user.status === 'Live').length;
  const totalUsers = users.length;
  const activePercentage = (activeUsers / totalUsers) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Active Users</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray={`${activePercentage}, 100`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold text-gray-800">{activePercentage.toFixed(0)}%</span>
              <span className="block text-sm text-gray-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">User Activity</h3>
        <div className="space-y-2">
          {['Call', 'Chat', 'Video', 'InstaTalk', 'LiveFeed'].map((activity, index) => (
            <div key={activity} className="flex items-center">
              <span className="w-20 text-sm text-gray-600">{activity}</span>
              <div className="flex-grow bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-500 rounded-full h-2"
                  style={{ width: `${Math.random() * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Matches</h3>
        <div className="flex flex-wrap -mx-1">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="w-1/5 px-1 mb-2">
              <img
                src={user.profileImage || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-12 object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </div> */}
      {/* <h1 className='text-2xl text-white'>Please check the Users page</h1> */}
    </div>
  );
};

export default DashboardContent;