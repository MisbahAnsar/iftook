import React, { useState } from "react";
import { User, CreditCard, MessageSquare, Activity, Users, Megaphone, Shield } from "lucide-react";
import { users } from "../data/users";

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

const UserDetails = ({ userId, onBack }) => {
  const user = users.find((u) => u.id === userId);
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAmount, setSearchAmount] = useState("");

  if (!user) return null;

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
              <h4 className="font-semibold text-gray-800 mb-2">Talk Details</h4>
              <p className="text-gray-600">User conversation history and preferences go here.</p>
            </div>
          )}

          {activeTab === "My Activity" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">My Activity</h4>
              <p className="text-gray-600">User’s activity logs, posts, and interactions.</p>
            </div>
          )}

          
{activeTab === "Friends List" && (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="font-semibold text-gray-800 mb-2">Friends List</h4>

    {/* Total Friends */}
    <div className="mb-4">
      <h5 className="font-semibold text-gray-700 mb-2">Total Friends ({user.friends.length})</h5>
      {user.friends.length > 0 ? (
        <div className="space-y-2">
          {user.friends.map((friendId) => {
            const friend = users.find((u) => u.id === friendId);
            return friend ? (
              <div key={friend.id} className="flex items-center p-3 bg-white rounded-lg shadow-md">
                <img src={friend.profileImage} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-gray-800 font-semibold">{friend.name}</p>
                  <p className={`text-sm ${friend.status === "Live" ? "text-green-600" : "text-gray-600"}`}>
                    {friend.status}
                  </p>
                </div>
              </div>
            ) : null;
          })}
        </div>
      ) : (
        <p className="text-gray-600">No friends yet.</p>
      )}
    </div>

    {/* Total Friend Requests */}
    <div>
      <h5 className="font-semibold text-gray-700 mb-2">Total Friend Requests ({user.friendRequests.length})</h5>
      {user.friendRequests.length > 0 ? (
        <div className="space-y-2">
          {user.friendRequests.map((requestId) => {
            const requestUser = users.find((u) => u.id === requestId);
            return requestUser ? (
              <div key={requestUser.id} className="flex items-center p-3 bg-white rounded-lg shadow-md">
                <img src={requestUser.profileImage} alt={requestUser.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-gray-800 font-semibold">{requestUser.name}</p>
                  <p className="text-yellow-600 text-sm">Pending Request</p>
                </div>
              </div>
            ) : null;
          })}
        </div>
      ) : (
        <p className="text-gray-600">No pending friend requests.</p>
      )}
    </div>
  </div>
)}


          {activeTab === "Promote Profile" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Promote Profile</h4>
              <p className="text-gray-600">Options to promote user profile with ads or boosting.</p>
            </div>
          )}

          {activeTab === "Restrict User" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Restrict User</h4>
              <p className="text-gray-600">Restrict or block interactions with this user.</p>
            </div>
          )}

          {/* Interests */}
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
      </div>
    </div>
  );
};

export default UserDetails;
