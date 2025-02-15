import React, { useState, useEffect } from 'react';
import { X, Wallet, Star } from 'lucide-react';
import Modal from './Modal';
import { getAllUsers, getWalletData, addMoneyToWallet, updateOnlineStatus } from '../utils/api'; // Import new function
import { useNavigate } from 'react-router-dom';

const UserProfileSidebar = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);

  const [walletData, setWalletData] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState('');
  const [amountToAdd, setAmountToAdd] = useState('');

  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login'); 
    return;
  }
    const fetchUser = async () => {
      const response = await getAllUsers();
      if (response.success) {
        const foundUser = response.users.find((u) => u._id === userId);
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found');
        }
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);
  // Fetch wallet data when the wallet modal is opened
  useEffect(() => {
    if (isWalletModalOpen) {
      const fetchWalletData = async () => {
        setWalletLoading(true);
        const response = await getWalletData(userId);
        if (response.success) {
          setWalletData(response.data);
        } else {
          setWalletError(response.message);
        }
        setWalletLoading(false);
      };

      fetchWalletData();
    }
  }, [isWalletModalOpen, userId]);

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleAddMoney = async () => {
  if (!amountToAdd || isNaN(amountToAdd)) {
    setWalletError("Please enter a valid amount.");
    return;
  }

    const response = await addMoneyToWallet(userId, Number(amountToAdd));
    if (response.success) {
      // Update wallet data after adding money
      const updatedWalletData = await getWalletData(userId);
      if (updatedWalletData.success) {
        setWalletData(updatedWalletData.data);
      }
      setAmountToAdd(''); // Clear the input field
      setWalletError('');
    } else {
      setWalletError(response.message);
    }
  };

  // Handle profile image click to update online status
  const handleProfileImageClick = async () => {
    // const response = await updateOnlineStatus(userId);
    // if (response.success) {
    //   setUser(response.user); // Update the user's online status
    // } else {
    //   setError(response.message);
    // }
    setIsImageModalOpen(true); // Open the image modal
  };

  const handleStatusUpdate = async (status) => {
    const response = await updateOnlineStatus(userId, status);
    if (response.success) {
      setUser(response.user); // Update the user's online status
    } else {
      setError(response.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // No need to store response
    setUser(null);
    setError("Logged out successfully");
    window.location.reload(); // Refresh the page
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
    <div className=''>
      {/* Overlay for mobile */}
      {/* <div 
        className="md::fixed inset-0 bg-black bg-opacity-100 md:hidden"
        onClick={onClose}
      /> */}

      {/* Main Profile Sidebar */}
      <div className="lg:fixed sm:top-0 sm:w-64 sm:h-full lg:block lg:top-0 lg:left-0 lg:h-full lg:w-64 bg-white shadow-lg text-gray-800 z-[50] overflow-y-auto">
        <div className="sticky top-0 z-[2] bg-white pb-4">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-32 md:bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl"></div>

            <div className="relative pt-16 flex justify-center">
              <div className="relative">
                <img
                  src={user.photos?.[0] || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full cursor-pointer border-4 border-white shadow-lg object-cover"
                  onClick={handleProfileImageClick} // Updated click handler
                />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 mt-2">Status: {user.isOnline ? "Online" : "Offline"}</p>
            </div>

            <div className="mt-6 px-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center justify-center bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition"
              >
                <Wallet size={18} className="mr-2" /> Wallet
              </button>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center justify-center bg-purple-50 text-purple-600 px-4 py-2.5 rounded-lg hover:bg-purple-100 transition"
              >
                <Star size={18} className="mr-2" /> Reviews
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">📅</span>
              <span>Birth Date: {new Date(user.dob).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">👤</span>
              <span>Gender: {user.gender}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🎯</span>
              <span>Interests: {user.interests.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='text-white bg-red-500 border-2 flex items-center justify-center rounded-md mx-10 my-10 p-3 cursor-pointer' onClick={handleLogout}>Log Out</div>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Profile Images"
      >
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img 
                src={img} 
                alt="Profile" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Update Online Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  user.isOnline ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => handleStatusUpdate(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !user.isOnline ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Offline
              </button>
            </div>
          </div>
      </Modal>

      {/* Wallet Modal */}
      <Modal
  isOpen={isWalletModalOpen}
  onClose={() => setIsWalletModalOpen(false)}
  title="My Wallet"
>
  <div className="space-y-4 p-4 sm:p-6">
    {/* Current Balance Section */}
    <div className='flex sm:block'>
    <div className="bg-green-50 p-4 rounded-lg">
      <p className="text-sm text-green-600">Current Balance</p>
      <p className="text-2xl font-bold text-green-700">
        ₹{walletData?.balance || 0}
      </p>
    </div>

    {/* Add Money Section */}
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-blue-600 mb-2">
        Add Money to Wallet
      </h4>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Enter amount"
          className="p-2 border rounded-lg w-full"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
        />
        <button
          onClick={handleAddMoney}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
        >
          Add
        </button>
      </div>
      {walletError && <p className="text-red-500 text-sm mt-2">{walletError}</p>}
    </div>
    </div>
    {/* Transactions Section */}
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-gray-800">Transactions</h4>
      <div className="max-h-[300px] min-h-[150px] overflow-y-auto border rounded-lg p-2 bg-gray-50">
        {walletData?.transactions?.length > 0 ? (
          walletData.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white rounded-lg shadow-sm mb-2 gap-2"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {transaction.amount > 0 ? "Money Added" : "Money Withdrawn"}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.notes || "No additional notes"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.paymentDate).toLocaleString()}
                </p>
              </div>
              <p
                className={`text-sm sm:text-base font-semibold ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount > 0
                  ? `+₹${transaction.amount}`
                  : `-₹${Math.abs(transaction.amount)}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm py-4">
            No transactions yet.
          </p>
        )}
      </div>
    </div>
  </div>
</Modal>

      {/* Reviews Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Reviews & Ratings"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedFilter(selectedFilter === star ? null : star)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedFilter === star
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {star}★
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {reviews
              .filter((review) => (selectedFilter ? review.stars === selectedFilter : true))
              .map((review, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-yellow-500">{'★'.repeat(review.stars)}</p>
                      <p className="text-sm text-gray-800 mt-1">{review.review}</p>
                      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfileSidebar;