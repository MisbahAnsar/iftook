import { useEffect, useState } from "react";
import { getDashboardData } from "../utils/api";
import { Users, UserCheck, UserMinus, UserX, CreditCard, Clock, CheckCircle, Loader2, MessageCircle, Phone, Video, Wallet, ThumbsUp, ThumbsDown, Activity } from 'lucide-react';

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        console.log(data.data);
        setDashboardData(data.data); // Access the `data` property from the API response
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center">
          <span className="text-2xl mr-3">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg shadow-md">
          No data available.
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className={`relative overflow-hidden rounded-2xl ${gradient} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/90 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-white/80" />
      </div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* First Row: Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Users"
          value={dashboardData.totalUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Online Users"
          value={dashboardData.totalOnlineUsers}
          icon={UserCheck}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Offline Users"
          value={dashboardData.totalOfflineUsers}
          icon={UserMinus}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          title="Blocked Users"
          value={dashboardData.totalBlockedUsers}
          icon={UserX}
          gradient="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      {/* Second Row: Payment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Payments"
          value={dashboardData.totalPayments}
          icon={CreditCard}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Pending Payments"
          value={dashboardData.totalPendingPayments}
          icon={Clock}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Successful Payments"
          value={dashboardData.totalSuccessfulPayments}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Third Row: Additional Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Female Users"
          value={dashboardData.totalFemaleUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-pink-500 to-pink-600"
        />
        <StatCard
          title="Total Male Users"
          value={dashboardData.totalMaleUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Chats"
          value={dashboardData.totalChats}
          icon={MessageCircle}
          gradient="bg-gradient-to-br from-pink-500 to-pink-600"
        />
        <StatCard
          title="Total Calls"
          value={dashboardData.totalVoiceCalls}
          icon={Phone}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
      </div>

      {/* Fourth Row: Wallet and Earnings */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Payment Added"
          value={dashboardData.totalPaymentAddedToWallet}
          icon={Wallet}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Total Payment Withdrawn"
          value={dashboardData.totalPaymentwithdrawnFromWallet}
          icon={Wallet}
          gradient="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          title="Total Wallet Balance"
          value={dashboardData.totalAmountInWallet}
          icon={Wallet}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Total Earnings"
          value={dashboardData.totalEarningsByUsers}
          icon={CreditCard}
          gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
      </div>

      {/* Fifth Row: Promotions and Activity */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Promoted Users"
          value={dashboardData.totalPromotedUsers}
          icon={Activity}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Video Calls"
          value={dashboardData.totalVideoCalls}
          icon={Video}
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Total Live Feeds"
          value={dashboardData.totalLiveFeeds || 0} // Add this field to the API response if missing
          icon={Activity}
          gradient="bg-gradient-to-br from-pink-500 to-pink-600"
        />
        <StatCard
          title="Total Likes & Dislikes"
          value={dashboardData.totalLikesAndDislikes || 0} // Add this field to the API response if missing
          icon={ThumbsUp}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-lg">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{payment.title}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">₹{payment.amount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{new Date(payment.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
