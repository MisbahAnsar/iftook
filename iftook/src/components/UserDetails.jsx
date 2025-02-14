import React, { useState, useEffect } from "react";
import { User, CreditCard, MessageSquare, Activity, Users, Megaphone, Shield } from "lucide-react";
import { getAllUsers, getUserMeetings, getFriendRequests, getFriendList } from "../utils/api"; // Import new functions
import "react-calendar";

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
  const [user, setUser] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // Store all users for profile photos
  const [friendRequests, setFriendRequests] = useState([]); // Store friend requests
  const [friendList, setFriendList] = useState([]); // Store friend list
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch all users
        const usersResponse = await getAllUsers();
        if (usersResponse.success) {
          setAllUsers(usersResponse.users); // Store all users for profile photos
          const foundUser = usersResponse.users.find((u) => u._id === userId);
          if (foundUser) {
            setUser(foundUser);
          } else {
            setError("User not found");
          }
        } else {
          setError(usersResponse.message);
        }

        // Fetch user meetings
        const meetingsResponse = await getUserMeetings(userId);
        if (meetingsResponse.success) {
          setMeetings(meetingsResponse.meetings);
        } else {
          setError(meetingsResponse.message);
        }

        // Fetch friend requests
        const friendRequestsResponse = await getFriendRequests(userId);
        if (friendRequestsResponse.success) {
          setFriendRequests(friendRequestsResponse.requests);
        } else {
          setError(friendRequestsResponse.message);
        }

        // Fetch friend list
        const friendListResponse = await getFriendList(userId);
        if (friendListResponse.success) {
          setFriendList(friendListResponse.friends);
        } else {
          setError(friendListResponse.message);
        }
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Helper function to get user's profile photo
  const getUserPhoto = (userId) => {
    const user = allUsers.find((u) => u._id === userId);
    return user?.photos?.[0] || "https://via.placeholder.com/40"; // Use the first photo or a placeholder
  };

  // Handle accepting a friend request
  const handleAcceptRequest = async (requestId) => {
    // Implement logic to accept the friend request
    console.log("Accepting friend request:", requestId);
    // You can call an API to update the request status here
  };

  // Handle rejecting a friend request
  const handleRejectRequest = async (requestId) => {
    // Implement logic to reject the friend request
    console.log("Rejecting friend request:", requestId);
    // You can call an API to update the request status here
  };

  if (loading) return <p className="text-gray-600 text-center py-4">Loading user details...</p>;
  if (error) return <p className="text-red-600 text-center py-4">{error}</p>;
  if (!user) return <p className="text-gray-600 text-center py-4">User not found.</p>;

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
                <p className="text-[#4a5568] leading-relaxed">{user.about}</p>
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

          {activeTab === "Talk Details" && (
            <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
              {/* Section Header */}
              <div>
                <h4 className="font-semibold text-2xl text-[#2a2e5b]">Talk Details</h4>
              </div>

              {/* Upcoming Meetings */}
              {meetings
                .filter((meeting) => meeting.status === "waiting" || meeting.status === "ongoing")
                .map((meeting) => (
                  <div key={meeting._id} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
                    <h5 className="text-[#047857] font-semibold text-lg">Upcoming Meeting</h5>
                    <div className="flex items-center gap-4 mt-3">
                      <img
                        src={getUserPhoto(meeting.participant._id)} // Use participant's profile photo
                        alt={meeting.participant.name}
                        className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
                      />
                      <div>
                        <p className="text-[#2a2e5b] font-medium">{meeting.participant.name}</p>
                        <p className="text-[#64748b] text-sm">{meeting.type}</p>
                      </div>
                      <span className="ml-auto text-[#475569] text-sm">
                        {new Date(meeting.scheduledTime).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[#2563eb] text-sm mt-2 font-semibold">
                      ₹{meeting.amount}
                    </p>
                  </div>
                ))}

              {/* Previous Meetings */}
              {meetings
                .filter((meeting) => meeting.status === "completed")
                .map((meeting) => (
                  <div key={meeting._id} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg">
                    <h5 className="text-[#b91c1c] font-semibold text-lg">Previous Meeting</h5>
                    <div className="flex items-center gap-4 mt-3">
                      <img
                        src={getUserPhoto(meeting.participant._id)} // Use participant's profile photo
                        alt={meeting.participant.name}
                        className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
                      />
                      <div>
                        <p className="text-[#2a2e5b] font-medium">{meeting.participant.name}</p>
                        <p className="text-[#64748b] text-sm">{meeting.type}</p>
                      </div>
                      <span className="ml-auto text-[#475569] text-sm">
                        {new Date(meeting.scheduledTime).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[#2563eb] text-sm mt-2 font-semibold">
                      ₹{meeting.amount}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "Friends List" && (
            <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
              {/* Friend List */}
              <div>
                <h4 className="font-semibold text-2xl text-[#2a2e5b]">Friends List</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {friendList.map((friend) => (
                    <div key={friend._id} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg">
                      <img
                        src={getUserPhoto(friend._id)} // Use friend's profile photo
                        alt={friend.name}
                        className="w-12 h-12 rounded-full mb-2"
                      />
                      <p className="text-[#2a2e5b] font-medium">{friend.name}</p>
                      <p className="text-sm text-[#64748b]">{friend.location.city}, {friend.location.country}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Friend Requests */}
              <div>
                <h4 className="font-semibold text-2xl text-[#2a2e5b] mt-6">Friend Requests</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {friendRequests.map((request) => (
                    <div key={request._id} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg">
                      <img
                        src={getUserPhoto(request.requester._id)} // Use requester's profile photo
                        alt={request.requester.name}
                        className="w-12 h-12 rounded-full mb-2"
                      />
                      <p className="text-[#2a2e5b] font-medium">{request.requester.name}</p>
                      <p className="text-sm text-[#64748b]">{request.requester.location.city}, {request.requester.location.country}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleAcceptRequest(request._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs (unchanged) */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;