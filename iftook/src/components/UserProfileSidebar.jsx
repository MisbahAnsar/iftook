import React, { useState } from 'react';
import { X, Wallet, Star } from 'lucide-react';
import { users } from "../data/users"; // Ensure you have user data

const UserProfileSidebar = ({ userId }) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [reviews, setReviews] = useState(user.ratings || []);

  const [images, setImages] = useState([
    user.profileImage,
    "https://source.unsplash.com/random/200x200?portrait",
    "https://source.unsplash.com/random/200x200?person",
    "https://source.unsplash.com/random/200x200?face"
  ]);

  // Delete an image from the list
  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

   // Delete a review
   const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };
  
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg text-gray-800">
      {/* Profile Section */}
      <div className="relative text-center">
        {/* Background Overlay (Half Cover) */}
        <div className="absolute top-0 left-0 w-full h-20 bg-blue-100 rounded-b-lg"></div>

        {/* Profile Image */}
        <div className="relative pt-10 flex justify-center">
            <div className='relative'>
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full cursor-pointer border-4 border-white shadow-lg"
            onClick={() => setIsModalOpen(true)}
          />
          <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.status === "Live" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>

          </div>
        </div>

        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Uploaded Images</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            {/* Image List */}
            <div className="grid grid-cols-2 gap-4">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt="Uploaded" className="w-full h-24 object-cover rounded-md shadow" />
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No images available</p>
              )}
            </div>
          </div>
        </div>
      )}

        {/* User Info */}
        <h2 className="text-lg font-semibold mt-2 text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500 mt-2">Status: {user.status}</p>

                {/* My Wallet & Rating Review Buttons */}
                <div className="mt-4 px-4 flex gap-2">
          <button
            onClick={() => setIsWalletModalOpen(true)}
            className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <Wallet size={18} className="mr-2" /> My Wallet (${user.wallet.balance})
          </button>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <Star size={18} className="mr-2" /> Rating Review
          </button>
        </div>

        {/* Rating Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">User Reviews</h2>
                <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>

              {/* Filter by Stars */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`px-3 py-1 rounded-md ${
                      selectedFilter === star
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedFilter(selectedFilter === star ? null : star)}
                  >
                    {star}★
                  </button>
                ))}
              </div>

              {/* Review List */}
              <div className="max-h-64 overflow-y-auto space-y-3">
                {reviews
                  .filter((review) => (selectedFilter ? review.stars === selectedFilter : true))
                  .map((review, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                      <div>
                        <p className="text-sm text-gray-800 font-medium">{review.review}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                        <p className="text-yellow-500">{'★'.repeat(review.stars)}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                {reviews.filter((review) => (selectedFilter ? review.stars === selectedFilter : true)).length === 0 && (
                  <p className="text-gray-500 text-center">No reviews found.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wallet Transactions Modal */}
        {isWalletModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Wallet Transactions</h2>
                <button onClick={() => setIsWalletModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>

              {/* Wallet Balance */}
              <p className="text-lg font-semibold text-green-600">Wallet Balance: ${user.wallet.balance}</p>

              {/* Transactions List */}
              <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                {user.wallet.transactions.length > 0 ? (
                  user.wallet.transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                      <div>
                        <p className="text-sm text-gray-800 font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? `+ $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No transactions found.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="mt-10 mb-6 p-4 bg-gray-100 rounded-lg text-sm">
          <h2 className="mb-2 text-gray-700">📅 Birth Date: {user.dob}</h2>
          <h2 className="mb-2 text-gray-700">🚻 Gender: {user.gender}</h2>
          <h2 className="text-gray-700">🎯 Interests: {user.interests.join(", ")}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;