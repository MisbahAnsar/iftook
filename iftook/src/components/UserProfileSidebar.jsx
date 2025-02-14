import React, { useState } from 'react';
import { X, Wallet, Star } from 'lucide-react';
import Modal from './Modal';
import { users } from "../data/users";

const UserProfileSidebar = ({ userId, onClose }) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  return (
    <div className=''>
      {/* Overlay for mobile */}
      {/* <div 
        className="md::fixed inset-0 bg-black bg-opacity-100 md:hidden"
        onClick={onClose}
      /> */}

      {/* Main Profile Sidebar */}
      <div className="lg:fixed sm:top-0 sm:w-full sm:h-80 sm:flex lg:block lg:top-0 lg:left-0 lg:h-full lg:w-64 bg-white shadow-lg text-gray-800 z-[50] overflow-y-auto">
        <div className="sticky top-0 z-[2] bg-white pb-4">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-32 md:bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl"></div>

            <div className="relative pt-16 flex justify-center">
              <div className="relative">
                <img
                  src={user.profileImage || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full cursor-pointer border-4 border-white shadow-lg object-cover"
                  onClick={() => setIsImageModalOpen(true)}
                />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "Live" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 mt-2">Status: {user.status}</p>
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
              <span>Birth Date: {user.dob}</span>
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
                  <UserProfileSidebar />

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
      </Modal>

      {/* Wallet Modal */}
      <Modal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        title="My Wallet"
      >
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Current Balance</p>
            <p className="text-2xl font-bold text-green-700">${user.wallet.balance}</p>
          </div>
          
          <div className="space-y-3">
            {user.wallet.transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <p className={`text-sm font-semibold ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
                </p>
              </div>
            ))}
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