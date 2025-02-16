import React, { useEffect, useState } from 'react';
import { getReviewsData } from '../utils/api'; // Import the API function
import { User, ThumbsUp, ThumbsDown, Star, Gift } from 'lucide-react';

const ReviewContent = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviewsData();
        setReviewsData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  if (!reviewsData) {
    return <div className="text-gray-600 text-center py-4">No data available.</div>;
  }

  const { mostNegativeProfile, mostPositiveProfile, allReviews } = reviewsData;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Profile with Most Negative Rating */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ThumbsDown className="w-6 h-6 text-red-600" />
          Profile with Most Negative Rating
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={mostNegativeProfile.photos[0]}
            alt={mostNegativeProfile.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{mostNegativeProfile.name}</p>
            <p className="text-sm text-gray-600">{mostNegativeProfile.location.city}, {mostNegativeProfile.location.country}</p>
            <p className="text-sm text-gray-600">Average Rating: {mostNegativeProfile.averageRating}</p>
          </div>
        </div>
      </div>

      {/* Profile with Most Positive Rating */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ThumbsUp className="w-6 h-6 text-green-600" />
          Profile with Most Positive Rating
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={mostPositiveProfile.photos[0]}
            alt={mostPositiveProfile.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{mostPositiveProfile.name}</p>
            <p className="text-sm text-gray-600">{mostPositiveProfile.location.city}, {mostPositiveProfile.location.country}</p>
            <p className="text-sm text-gray-600">Average Rating: {mostPositiveProfile.averageRating}</p>
          </div>
        </div>
      </div>

      {/* Most Tipped Profile */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6 text-purple-600" />
          Most Tipped Profile
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={mostPositiveProfile.photos[0]} // Assuming most tipped is the same as most positive
            alt={mostPositiveProfile.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{mostPositiveProfile.name}</p>
            <p className="text-sm text-gray-600">{mostPositiveProfile.location.city}, {mostPositiveProfile.location.country}</p>
            <p className="text-sm text-gray-600">Total Tips: ₹{mostPositiveProfile.walletBalance}</p>
          </div>
        </div>
      </div>

      {/* Most Liked Profile */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-600" />
          Most Liked Profile
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={mostPositiveProfile.photos[0]} // Assuming most liked is the same as most positive
            alt={mostPositiveProfile.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{mostPositiveProfile.name}</p>
            <p className="text-sm text-gray-600">{mostPositiveProfile.location.city}, {mostPositiveProfile.location.country}</p>
            <p className="text-sm text-gray-600">Total Likes: {mostPositiveProfile.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;