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
  const [availability, setAvailability] = useState(Array(30).fill(true)); // true = available, false = unavailable

  if (!user) return null;

  const handleAcceptRequest = (requestId) => {
    setFriends([...friends, requestId]); // Add to friends list
    setFriendRequests(friendRequests.filter((id) => id !== requestId)); // Remove from friend requests
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests(friendRequests.filter((id) => id !== requestId)); // Just remove from friend requests
  };

  const adminUser = users.find((user) => user.id === 1);

  const toggleAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability[index] = !newAvailability[index];
    setAvailability(newAvailability);
  };

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
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    {/* About Me */}
    <div>
      <h4 className="font-semibold text-2xl text-[#2a2e5b]">About Me</h4>
      <p className="text-[#4a5568] leading-relaxed">
        Professional profile with extensive experience...
      </p>
    </div>

    {/* Interests */}
    <div>
      <h4 className="font-semibold text-xl text-[#2a2e5b]">Interests</h4>
      <div className="flex flex-wrap gap-3 mt-2">
        {user.interests.map((interest, index) => (
          <span 
            key={index} 
            className="px-4 py-2 bg-[#e0e7ff] text-[#3730a3] rounded-full text-sm font-medium"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>

    {/* Earning Charges */}
    <div>
      <h4 className="font-semibold text-xl text-[#2a2e5b]">Earning Charges</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-2">
        {Object.entries(user.earnings).map(([key, value]) => (
          <div 
            key={key} 
            className="p-4 bg-white/60 backdrop-blur-lg border border-[#c7d2fe] rounded-lg shadow-lg"
          >
            <p className="text-sm text-[#475569] capitalize">{key}</p>
            <p className="font-semibold text-lg text-[#1e40af]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


{activeTab === "Payment" && (
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    {/* Payment Details Header */}
    <div>
      <h4 className="font-semibold text-2xl text-[#2a2e5b]">Payment Details</h4>
      <p className="text-[#4a5568] text-sm">All transactions through the bank will be shown here.</p>
    </div>

    {/* Search Inputs */}
    <div className="mb-4 flex flex-col md:flex-row gap-3">
      <input 
        type="text" 
        placeholder="Search by date (YYYY-MM-DD)" 
        className="p-3 rounded-lg border border-[#c7d2fe] bg-white/60 backdrop-blur-lg text-[#2a2e5b] placeholder-[#64748b] w-full md:w-1/2"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Search by amount" 
        className="p-3 rounded-lg border border-[#c7d2fe] bg-white/60 backdrop-blur-lg text-[#2a2e5b] placeholder-[#64748b] w-full md:w-1/2"
        value={searchAmount} 
        onChange={(e) => setSearchAmount(e.target.value)}
      />
    </div>

    {/* Transactions Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Added to Wallet Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
        <h5 className="text-[#2a2e5b] font-semibold text-lg">Added to Wallet</h5>
        <div className="max-h-[300px] overflow-y-auto space-y-3 mt-3">
          {user.paymentDetails.transactions
            .filter(transaction => 
              transaction.type === 'payment' &&
              (!searchQuery || transaction.date.includes(searchQuery)) &&
              (!searchAmount || transaction.amount.toString().includes(searchAmount))
            )
            .map((transaction, index) => (
              <div key={index} className="flex justify-between p-4 bg-[#e0e7ff] rounded-lg shadow">
                <div>
                  <p className="font-medium text-[#2a2e5b]">{transaction.description}</p>
                  <p className="text-sm text-[#64748b]">{transaction.date}</p>
                </div>
                <p className="text-[#047857] font-semibold">+{transaction.amount}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Withdrawal to Bank Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
        <h5 className="text-[#2a2e5b] font-semibold text-lg">Withdrawal to Bank</h5>
        <div className="max-h-[300px] overflow-y-auto space-y-3 mt-3">
          {user.paymentDetails.transactions
            .filter(transaction => 
              transaction.type === 'withdrawal' &&
              (!searchQuery || transaction.date.includes(searchQuery)) &&
              (!searchAmount || transaction.amount.toString().includes(searchAmount))
            )
            .map((transaction, index) => (
              <div key={index} className="flex justify-between p-4 bg-[#fef2f2] rounded-lg shadow">
                <div>
                  <p className="font-medium text-[#2a2e5b]">{transaction.description}</p>
                  <p className="text-sm text-[#64748b]">{transaction.date}</p>
                </div>
                <p className="text-[#b91c1c] font-semibold">-{transaction.amount}</p>
              </div>
            ))}
        </div>
      </div>

    </div>
  </div>
)}


{activeTab === "Talk Details" && (
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    {/* Section Header */}
    <div>
      <h4 className="font-semibold text-2xl text-[#2a2e5b]">Talk Details</h4>
    </div>

    {/* Upcoming Meeting */}
    {user?.meetings?.upcoming?.length > 0 && (
      <div className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
        <h5 className="text-[#047857] font-semibold text-lg">Upcoming Meeting</h5>
        <div className="flex items-center gap-4 mt-3">
          <img 
            src="https://randomuser.me/api/portraits/women/2.jpg" 
            alt={user.meetings.upcoming[0].name} 
            className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
          />
          <div>
            <p className="text-[#2a2e5b] font-medium">{user.meetings.upcoming[0].name}</p>
            <p className="text-[#64748b] text-sm">{user.meetings.upcoming[0].type}</p>
          </div>
          <span className="ml-auto text-[#475569] text-sm">{user.meetings.upcoming[0].time}</span>
        </div>
        <p className="text-[#2563eb] text-sm mt-2 font-semibold">
          ₹{user.meetings.upcoming[0].amount}
        </p>
      </div>
    )}

    {/* Previous Meeting */}
    {user?.meetings?.previous?.length > 0 && (
      <div className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
        <h5 className="text-[#b91c1c] font-semibold text-lg">Previous Meeting</h5>
        <div className="flex items-center gap-4 mt-3">
          <img 
            src="https://randomuser.me/api/portraits/men/3.jpg" 
            alt={user.meetings.previous[0].name} 
            className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
          />
          <div>
            <p className="text-[#2a2e5b] font-medium">{user.meetings.previous[0].name}</p>
            <p className="text-[#64748b] text-sm">{user.meetings.previous[0].type}</p>
          </div>
          <span className="ml-auto text-[#475569] text-sm">{user.meetings.previous[0].time}</span>
        </div>
        <p className="text-[#2563eb] text-sm mt-2 font-semibold">
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
            <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-4 rounded-lg">
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
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    
    {/* Section Header */}
    <h4 className="text-xl font-semibold text-[#2a2e5b] flex items-center gap-2">
      🚀 Promotion Package
    </h4>

    {user.promoteProfile ? (
      <div className="bg-white/90 backdrop-blur-lg border border-[#c7d2fe] p-6 rounded-2xl shadow-lg space-y-4">
        
        {/* Package Name */}
        <h5 className="text-2xl font-bold text-[#2a2e5b]">{user.promoteProfile.package}</h5>

        {/* Promotion Details */}
        <div className="grid grid-cols-2 gap-6 text-sm text-[#374151]">
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

        {/* Progress Bar for Engagement */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(user.promoteProfile.clicks / user.promoteProfile.views) * 100}%` }}
          />
        </div>

        {/* Boosting Message */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-[#2a2e5b]">💰 Boosting Your Profile!</span>
        </div>
      </div>
    ) : (
      <p className="text-gray-500 text-sm">This user has no active promotion package.</p>
    )}
  </div>
)}



{activeTab === "Restrict User" && (
      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg w-full max-w-3xl mx-auto shadow-md">
        <h4 className="font-semibold text-gray-800 text-lg sm:text-xl mb-4">Restrict User</h4>
        <p className="text-gray-600 text-sm sm:text-base mb-4">Restrict or block interactions with this user.</p>

        {/* Block Reason Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Blocking (optional)</label>
          <textarea
            className="w-full p-2 border rounded-md text-gray-900 resize-none"
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
              isBlocked ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-500 text-white hover:bg-green-600"
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

        {/* User Availability Calendar */}
        <div className="bg-white p-3 rounded-md shadow">
  <div className="flex justify-between items-center mb-2">
    <h5 className="font-semibold text-gray-800 text-base">User Availability</h5>

    <div className="flex gap-3">
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        <h5 className="text-gray-700 text-xs">Available</h5>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 bg-yellow-700 rounded-full"></span>
        <h5 className="text-gray-700 text-xs">Unavailable</h5>
      </div>
    </div>
  </div>

  {/* Calendar Grid */}
  <div className="grid grid-cols-7 gap-1 text-center text-gray-700 text-xs">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className="p-1 bg-gray-300 font-semibold rounded-md">{day}</div>
    ))}
    {Array.from({ length: 30 }).map((_, index) => (
      <div
        key={index}
        className={`p-2 rounded-md cursor-pointer transition text-xs ${
          availability[index] ? "bg-green-200 hover:bg-green-300" : "bg-red-300 hover:bg-red-400 text-white"
        }`}
        onClick={() => toggleAvailability(index)}
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
