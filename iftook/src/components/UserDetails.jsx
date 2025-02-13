import React, { useState } from "react";
import { User, CreditCard, MessageSquare, Activity, Users, Megaphone, Shield } from "lucide-react";
import { users } from "../data/users";
import "react-calendar"

const tabs = [
  { label: "Personal Details", icon: User },
  { label: "Payment", icon: CreditCard },
  { label: "Talk Details", icon: MessageSquare },
  { label: "My Activity", icon: Activity },
  { label: "Friends List", icon: Users },
  { label: "Promote Profile", icon: Megaphone },
  { label: "Restrict User", icon: Shield }
];

const TabButton = ({ active, children, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
      active ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-200"
    }`}
  >
    {Icon && <Icon size={18} className="mr-2" />}
    {children}
  </button>
);

const UserDetails = ({ userId }) => {
  const user = users.find((u) => u.id === userId);
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [friends, setFriends] = useState(user.friends);
  const [friendRequests, setFriendRequests] = useState(user.friendRequests);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  if (!user) return null;

  const handleAcceptRequest = (requestId) => {
    setFriends([...friends, requestId]); // Add to friends list
    setFriendRequests(friendRequests.filter((id) => id !== requestId)); // Remove from friend requests
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests(friendRequests.filter((id) => id !== requestId)); // Just remove from friend requests
  };

  const adminUser = users.find((user) => user.id === 1);


  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        {/* Tabs Section */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.label}
              icon={tab.icon}
              active={activeTab === tab.label}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        {/* Content Section Based on Active Tab */}
        <div className="space-y-6">
          {activeTab === "Personal Details" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-2xl text-gray-800 mb-2">About Me</h4>
              <p className="text-gray-600">Professional profile with extensive experience...</p>
              <div>
            <h4 className="font-semibold text-gray-800 mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Earning Charges */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Earning Charges</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(user.earnings).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 capitalize">{key}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
            </div>
          )}

{activeTab === "Payment" && (
  <div>
    <h4 className="font-semibold text-gray-800 mb-2">Payment Details</h4>
    <p className="text-gray-600 text-sm mb-2">All transactions through bank will be shown here.</p>

    {/* Search Inputs */}
    <div className="mb-4 flex gap-2">
      <input 
        type="text" 
        placeholder="Search by date (YYYY-MM-DD)" 
        className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Search by amount" 
        className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
        value={searchAmount} 
        onChange={(e) => setSearchAmount(e.target.value)}
      />
    </div>

    {/* Transactions Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Added to Wallet Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h5 className="text-gray-800 font-semibold mb-2">Added to Wallet</h5>
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {user.paymentDetails.transactions
            .filter(transaction => 
              transaction.type === 'payment' &&
              (!searchQuery || transaction.date.includes(searchQuery)) &&
              (!searchAmount || transaction.amount.toString().includes(searchAmount))
            )
            .map((transaction, index) => (
              <div key={index} className="flex justify-between p-3 bg-white rounded-lg shadow">
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <p className="text-green-600">+{transaction.amount}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Withdrawal to Bank Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h5 className="text-gray-800 font-semibold mb-2">Withdrawal to Bank</h5>
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {user.paymentDetails.transactions
            .filter(transaction => 
              transaction.type === 'withdrawal' &&
              (!searchQuery || transaction.date.includes(searchQuery)) &&
              (!searchAmount || transaction.amount.toString().includes(searchAmount))
            )
            .map((transaction, index) => (
              <div key={index} className="flex justify-between p-3 bg-white rounded-lg shadow">
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <p className="text-red-600">-{transaction.amount}</p>
              </div>
            ))}
        </div>
      </div>

    </div>
  </div>
)}


{activeTab === "Talk Details" && (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="font-semibold text-gray-800 mb-4">Talk Details</h4>

    {/* Upcoming Meeting */}
    {user?.meetings?.upcoming?.length > 0 && (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h5 className="text-green-600 font-semibold mb-2">Upcoming Meeting</h5>
        <div className="flex items-center gap-3">
          <img 
            src="https://randomuser.me/api/portraits/women/2.jpg" 
            alt={user.meetings.upcoming[0].name} 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-medium">{user.meetings.upcoming[0].name}</p>
            <p className="text-gray-500 text-sm">{user.meetings.upcoming[0].type}</p>
          </div>
          <span className="ml-auto text-gray-600 text-sm">{user.meetings.upcoming[0].time}</span>
        </div>
        <p className="text-blue-600 text-sm mt-2 font-medium">
          ₹{user.meetings.upcoming[0].amount}
        </p>
      </div>
    )}

    {/* Previous Meeting */}
    {user?.meetings?.previous?.length > 0 && (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h5 className="text-red-600 font-semibold mb-2">Previous Meeting</h5>
        <div className="flex items-center gap-3">
          <img 
            src="https://randomuser.me/api/portraits/men/3.jpg" 
            alt={user.meetings.previous[0].name} 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-medium">{user.meetings.previous[0].name}</p>
            <p className="text-gray-500 text-sm">{user.meetings.previous[0].type}</p>
          </div>
          <span className="ml-auto text-gray-600 text-sm">{user.meetings.previous[0].time}</span>
        </div>
        <p className="text-blue-600 text-sm mt-2 font-medium">
          ₹{user.meetings.previous[0].amount}
        </p>
      </div>
    )}
  </div>
)}


          {activeTab === "My Activity" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">My Activity</h4>
              <p className="text-gray-600">User's activity logs, posts, and interactions.</p>
            </div>
          )}


<div className="space-y-6">
          {activeTab === "Friends List" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Friends List</h4>

              {/* Total Friends */}
              <div>
                <h5 className="text-gray-700 font-semibold mb-2">Total Friends ({friends.length})</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friends.map((friendId) => {
                    const friend = users.find((u) => u.id === friendId);
                    return friend ? (
                      <div key={friend.id} className="flex items-center bg-white p-3 rounded-lg shadow">
                        <img src={friend.profileImage} alt={friend.name} className="w-12 h-12 rounded-full mr-3" />
                        <p className="text-gray-800 font-medium">{friend.name}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Friend Requests */}
              <div className="mt-4">
                <h5 className="text-gray-700 font-semibold mb-2">Friend Requests ({friendRequests.length})</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friendRequests.map((requestId) => {
                    const requestUser = users.find((u) => u.id === requestId);
                    return requestUser ? (
                      <div key={requestUser.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
                        <div className="flex items-center">
                          <img src={requestUser.profileImage} alt={requestUser.name} className="w-12 h-12 rounded-full mr-3" />
                          <p className="text-gray-800 font-medium">{requestUser.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAcceptRequest(requestUser.id)} 
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleRejectRequest(requestUser.id)} 
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>



        {activeTab === "Promote Profile" && (
  <div className="bg-gray-100 p-6 rounded-lg">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">🚀 Promotion Package</h4>

    {user.promoteProfile ? (
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 rounded-lg shadow-md text-white">
        <h5 className="text-xl font-bold mb-3">{user.promoteProfile.package}</h5>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p className="flex items-center gap-2">
            📅 <span>Start Date:</span> 
            <span className="font-medium">{user.promoteProfile.startDate}</span>
          </p>
          <p className="flex items-center gap-2">
            ⏳ <span>End Date:</span> 
            <span className="font-medium">{user.promoteProfile.endDate}</span>
          </p>
          <p className="flex items-center gap-2">
            👀 <span>Views:</span> 
            <span className="font-medium">{user.promoteProfile.views.toLocaleString()}</span>
          </p>
          <p className="flex items-center gap-2">
            🔥 <span>Clicks:</span> 
            <span className="font-medium">{user.promoteProfile.clicks.toLocaleString()}</span>
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">💰 Boosting Your Profile!</span>
        </div>
      </div>
    ) : (
      <p className="text-gray-500 text-sm">This user has no active promotion package.</p>
    )}
  </div>
)}


{activeTab === "Restrict User" && (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="font-semibold text-gray-800 mb-4">Restrict User</h4>
    <p className="text-gray-600 mb-4">Restrict or block interactions with this user.</p>

    {/* Block Reason Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Reason for Blocking (optional)
      </label>
      <textarea
        className="w-full p-2 border rounded-md text-gray-900"
        placeholder="Enter reason for blocking..."
        value={blockReason}
        onChange={(e) => setBlockReason(e.target.value)}
      />
    </div>

    {/* Block/Unblock Toggle */}
    <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-md shadow">
      <span className="text-gray-800 font-medium">User Status:</span>
      <button
        onClick={() => setIsBlocked(!isBlocked)}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          isBlocked ? "bg-red-600 text-white" : "bg-green-500 text-white"
        }`}
      >
        {isBlocked ? "Unblock User" : "Block User"}
      </button>
    </div>

    {/* Payout Status */}
    {isBlocked && (
      <div className="bg-yellow-100 text-yellow-700 p-3 rounded-md mb-4">
        <strong>Note:</strong> User is blocked. Payout is currently on hold.
      </div>
    )}

    {/* User Availability Calendar (Basic Mock) */}
    <div className="bg-white p-4 rounded-md shadow">
      <h5 className="font-semibold text-gray-800 mb-3">User Availability</h5>
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 bg-gray-200 rounded-md">{day}</div>
        ))}
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              isBlocked ? "bg-gray-300 text-gray-500" : "bg-green-100"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default UserDetails;
