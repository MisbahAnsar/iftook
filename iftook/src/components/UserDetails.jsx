import React, { useState, useEffect } from "react";
import { User, CreditCard, MessageSquare, Activity, Users, Megaphone, Shield } from "lucide-react";
import { getAllUsers, getUserMeetings, getFriendRequests, getFriendList, getPaymentTransactions, createPayment, blockUser, unblockUser } from "../utils/api"; // Import new functions
import "react-calendar";
import { Toaster, toast } from "react-hot-toast";
import { Video, Phone } from 'lucide-react';
import { users as dummyUsers } from "../data/users";
const VideoIcon = Video;
const PhoneIcon = Phone;

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

const UserDetails = ({ userId, uid }) => {
  const [user, setUser] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // Store all users for profile photos
  const [friendRequests, setFriendRequests] = useState([]); // Store friend requests
  const [friendList, setFriendList] = useState([]); // Store friend list
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [paymentTransactions, setPaymentTransactions] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [isBlocked, setIsBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [restrictError, setRestrictError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Filter transactions based on search query (notes) and selected date
  const filteredTransactions = paymentTransactions.filter((transaction) => {
    const matchesSearch = transaction.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate
      ? new Date(transaction.paymentDate).toISOString().split("T")[0] === selectedDate
      : true;
    return matchesSearch && matchesDate;
  });
  

  const [newPayment, setNewPayment] = useState({
    sender: userId,
    receiver: "",
    amount: "",
    paymentType: "",
    title: "",
    notes: "",
  });

  const dumUser = dummyUsers.find((u) => u.id === 1);

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
            setIsBlocked(foundUser.isBlocked); // Set isBlocked based on the fetched data
            setBlockReason(foundUser.blockReason || ""); // Set blockReason if available
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

  // Handle Block User
  const handleBlockUser = async () => {
    if (blockReason) {
      setRestrictError('User Blocked Successfully');
      return;
    }

    try {
      const response = await blockUser(userId, blockReason);

      if (response.success) {
        setIsBlocked(true); // Update the isBlocked state
        setBlockReason(''); // Clear the block reason input
        setRestrictError(''); // Clear any previous errors
        toast.success("This is a success notification! 🎉");
      } else {
        setRestrictError(response.message);
      }
    } catch (error) {
      setRestrictError(error.message);
    }
  };

  // Handle Unblock User
  const handleUnblockUser = async () => {
    try {
      const response = await unblockUser(userId);

      if (response.success) {
        setIsBlocked(false); // Update the isBlocked state
        setRestrictError(''); // Clear any previous errors
      } else {
        setRestrictError(response.message);
      }
    } catch (error) {
      setRestrictError(error.message);
    }
  };

  useEffect(() => {
    if (activeTab === "Payment") {
      const fetchPayments = async () => {
        setPaymentLoading(true);
        const response = await getPaymentTransactions(userId);
        if (response.success) {
          setPaymentTransactions(response.transactions);
        } else {
          setPaymentError(response.message);
        }
        setPaymentLoading(false);
      };

      fetchPayments();
    }
  }, [activeTab, userId]);

  // Handle creating a new payment
  const handleCreatePayment = async () => {
    if (!newPayment.amount || !newPayment.paymentType || !newPayment.title) {
      setPaymentError("Please fill in all required fields.");
      return;
    }

    const response = await createPayment(newPayment);
    if (response.success) {
      // Refresh payment transactions after creating a new payment
      const updatedPayments = await getPaymentTransactions(userId);
      if (updatedPayments.success) {
        setPaymentTransactions(updatedPayments.transactions);
      }
      setNewPayment({
        sender: userId,
        receiver: "",
        amount: "",
        paymentType: "",
        title: "",
        notes: "",
      });
      setPaymentError("");
    } else {
      setPaymentError(response.message);
    }
  };

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
                      <p className="font-semibold text-lg text-[#1e40af]">₹{value} <span className="text-md">/15mins</span></p>
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

    {/* Ongoing Meetings */}
    {meetings.some((meeting) => meeting.status === "ongoing") && (
      <div className="space-y-4">
        <h5 className="font-semibold text-xl text-[#047857]">Ongoing Meetings</h5>
        {meetings
          .filter((meeting) => meeting.status === "ongoing")
          .map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
              </div>
              <div className="flex items-center gap-4 mt-3">
                <img
                  src={getUserPhoto(meeting.participant._id)}
                  alt={meeting.participant.name}
                  className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
                />
                <div>
                  <p className="text-[#2a2e5b] font-medium">{meeting.participant.name}</p>
                  <div className={`p-2 rounded-full flex gap-2 ${
                            meeting.type === "video" ? "bg-blue-100" : "bg-purple-100"
                          }`}
                    >
                          {meeting.type === "video" ? (
                            <VideoIcon className="w-5 h-5 text-blue-600" />
                          ) : (
                            <PhoneIcon className="w-5 h-5 text-purple-600" />
                          )}
                            <p className="text-[#64748b] text-sm">{meeting.type}</p>
                    </div>
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

    {/* Upcoming Meetings */}
    {meetings.some((meeting) => meeting.status === "waiting") && (
      <div className="space-y-4">
        <h5 className="font-semibold text-xl text-[#d97706]">Upcoming Meetings</h5>
        {meetings
          .filter((meeting) => meeting.status === "waiting")
          .map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
              </div>
              <div className="flex items-center gap-4 mt-3">
                <img
                  src={getUserPhoto(meeting.participant._id)}
                  alt={meeting.participant.name}
                  className="w-14 h-14 rounded-full border-2 border-[#c7d2fe] shadow-md"
                />
                <div>
                  <p className="text-[#2a2e5b] font-medium">{meeting.participant.name}</p>
                    <div className={`p-2 rounded-full flex gap-2 ${
                            meeting.type === "video" ? "bg-blue-100" : "bg-purple-100"
                          }`}
                    >
                          {meeting.type === "video" ? (
                            <VideoIcon className="w-5 h-5 text-blue-600" />
                          ) : (
                            <PhoneIcon className="w-5 h-5 text-purple-600" />
                          )}
                          <p className="text-[#64748b] text-sm">{meeting.type}</p>
                    </div>
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

    {/* Previous Meetings */}
    {meetings.some((meeting) => meeting.status === "completed") && (
      <div className="space-y-4">
        <h5 className="font-semibold text-xl text-[#b91c1c]">Previous Meetings</h5>
        {meetings
          .filter((meeting) => meeting.status === "completed")
          .map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-[#b91c1c] font-semibold text-lg">Previous Meeting</h5>
                <div
                  className={`p-2 rounded-full ${
                    meeting.type === "video" ? "bg-blue-100" : "bg-purple-100"
                  }`}
                >
                  {meeting.type === "video" ? (
                    <VideoIcon className="w-5 h-5 text-blue-600" />
                  ) : (
                    <PhoneIcon className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <img
                  src={getUserPhoto(meeting.participant._id)}
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
  </div>
)}

{activeTab === "Promote Profile" && dumUser && (
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    {/* Promote Profile Section */}
    <div>
      <h4 className="font-semibold text-2xl text-[#2a2e5b]">Promote Profile</h4>
      <div className="p-4 bg-white/60 backdrop-blur-lg border border-[#c7d2fe] rounded-lg shadow-lg mt-4">
        <p className="text-lg text-[#475569] font-medium">
          Package:{" "}
          <span className="font-semibold text-[#1e40af]">
            {dumUser.promoteProfile.package}
          </span>
        </p>
        <p className="text-sm text-[#475569] mt-2">
          Duration:{" "}
          <span className="font-semibold text-[#1e40af]">
            {dumUser.promoteProfile.startDate} - {dumUser.promoteProfile.endDate}
          </span>
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-center">
            <p className="text-sm text-[#475569]">Views</p>
            <p className="text-lg font-semibold text-[#1e40af]">
              {dumUser.promoteProfile.views}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#475569]">Clicks</p>
            <p className="text-lg font-semibold text-[#1e40af]">
              {dumUser.promoteProfile.clicks}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* //Friends List Tab */}
{activeTab === "Friends List" && (
  <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
    {loading ? (
      // Skeleton Loader for Friends List Tab
      <div className="animate-pulse space-y-6">
        {/* Skeleton for Friend List Header */}
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
        </div>

        {/* Skeleton for Friend List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton for Friend Requests Header */}
        <div className="mt-6">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
        </div>

        {/* Skeleton for Friend Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2].map((_, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="h-8 bg-gray-300 rounded w-16"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      // Friends List Content
      <>
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
      </>
    )}
  </div>
)}


{/* //Payment Tab */}
<div className="space-y-6">
      {activeTab === "Payment" && (
        <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
          {paymentLoading ? (
            // Skeleton Loader for Payment Tab
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : paymentError ? (
            <p className="text-red-600 text-center py-4">{paymentError}</p>
          ) : (
            <>
              {/* Payment Transactions */}
              <div>
                <h4 className="font-semibold text-2xl text-[#2a2e5b]">Payment Transactions</h4>

                {/* Search & Filter Section */}
                <div className="flex gap-4 mt-4">
                  {/* Search by Notes */}
                  <input
                    type="text"
                    placeholder="Search by notes..."
                    className="w-full p-2 border border-[#c7d2fe] rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Filter by Date */}
                  <input
                    type="date"
                    className="p-2 border border-[#c7d2fe] rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                {/* Transactions List */}
                <div className="space-y-3 mt-4">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="bg-white/70 backdrop-blur-lg border border-[#c7d2fe] p-4 rounded-lg shadow-lg"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-[#2a2e5b]">{transaction.title}</p>
                            <p className="text-xs text-[#64748b]">{transaction.notes}</p>
                            <p className="text-xs text-[#64748b]">
                              {new Date(transaction.paymentDate).toLocaleString()}
                            </p>
                          </div>
                          <p
                            className={`text-sm font-semibold ${
                              transaction.amount > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-4">No transactions found.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>

{/* // Restrict User Tab */}
<div className="space-y-6">
          {activeTab === "Restrict User" && (
            <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
              {/* Block/Unblock Section */}
              <div>
                <h4 className="font-semibold text-2xl text-[#2a2e5b]">Restrict User</h4>
                <p className="text-[#4a5568] text-sm">
                  {isBlocked
                    ? "This user is currently blocked."
                    : "This user is not blocked."}
                </p>
              </div>

              {/* Show Block Reason if User is Blocked */}
              {isBlocked && (
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Block Reason:</span> {blockReason}
                  </p>
                </div>
              )}

              {/* Block Reason Input (Only for Unblocked Users) */}
              {!isBlocked && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Blocking (optional)
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg text-gray-900 resize-none"
                    placeholder="Enter reason for blocking..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                  />
                </div>
              )}

              {/* Single Button for Block/Unblock */}
              <button
                onClick={isBlocked ? handleUnblockUser : handleBlockUser}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  isBlocked
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isBlocked ? "Unblock User" : "Block User"}
              </button>

              {/* Error Message */}
              {restrictError && (
                <p className="text-red-500 text-sm mt-2">{restrictError}</p>
              )}
            </div>
          )}
        </div>



        </div>
      </div>
    </div>
  );
};

export default UserDetails;