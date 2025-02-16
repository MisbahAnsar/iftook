import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Modal from './Modal';
import { getUserReviews } from '../utils/api'; // Import the API function

const ReviewModal = ({ isOpen, onClose, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch reviews when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await getUserReviews(userId);
          if (response.success) {
            setReviews(response.data.reviews); // Set reviews from the API response
            setAverageRating(response.data.averageRating); // Set average rating
          } else {
            setError(response.message || 'Failed to fetch reviews');
          }
        } catch (err) {
          setError('An error occurred while fetching reviews');
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [isOpen, userId]);

  // Handle review deletion (optional)
  const handleDeleteReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reviews & Ratings">
      <div className="space-y-4">
        {/* Average Rating */}
        <div className="text-center">
          <p className="text-lg font-semibold">
            Average Rating: {averageRating.toFixed(1)} ★
          </p>
        </div>

        {/* Star Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedFilter(selectedFilter === star ? null : star)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedFilter === star
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {star}★
            </button>
          ))}
        </div>

        {/* Reviews List */}
        {loading ? (
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
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="space-y-3">
            {reviews
              .filter((review) =>
                selectedFilter ? review.rating === selectedFilter : true
              )
              .map((review, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      {/* Review Rating */}
                      <p className="text-yellow-500">
                        {'★'.repeat(review.rating)}
                      </p>
                      {/* Review Comment */}
                      <p className="text-sm text-gray-800 mt-1">
                        {review.comment}
                      </p>
                      {/* Review Date */}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      {/* Reviewer Name */}
                      <p className="text-xs text-gray-500 mt-1">
                        Reviewed by: {review.user.name}
                      </p>
                    </div>
                    {/* Delete Button */}
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
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;