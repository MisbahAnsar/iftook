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
        setDashboardData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white hover:bg-gray-200 shadow-xl p-6 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-8 h-8 text-gray-900 bg-gray-300 rounded-md p-2" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Users Related Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={dashboardData.totalUsers} icon={Users} />
        <StatCard title="Online Users" value={dashboardData.totalOnlineUsers} icon={UserCheck} />
        <StatCard title="Offline Users" value={dashboardData.totalOfflineUsers} icon={UserMinus} />
        <StatCard title="Blocked Users" value={dashboardData.totalBlockedUsers} icon={UserX} />
      </div>

      {/* Payments Related Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Payments" value={dashboardData.totalPayments} icon={CreditCard} />
        <StatCard title="Pending Payments" value={dashboardData.totalPendingPayments} icon={Clock} />
        <StatCard title="Successful Payments" value={dashboardData.totalSuccessfulPayments} icon={CheckCircle} />
      </div>

      {/* Activity Related Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Female Users" value={dashboardData.totalFemaleUsers} icon={Users} />
        <StatCard title="Male Users" value={dashboardData.totalMaleUsers} icon={Users} />
        <StatCard title="Total Chats" value={dashboardData.totalChats} icon={MessageCircle} />
        <StatCard title="Voice Calls" value={dashboardData.totalVoiceCalls} icon={Phone} />
      </div>

      {/* Wallet Related Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Payment Added" value={dashboardData.totalPaymentAddedToWallet} icon={Wallet} />
        <StatCard title="Payment Withdrawn" value={dashboardData.totalPaymentwithdrawnFromWallet} icon={Wallet} />
        <StatCard title="Wallet Balance" value={dashboardData.totalAmountInWallet} icon={Wallet} />
        <StatCard title="Total Earnings" value={dashboardData.totalEarningsByUsers} icon={CreditCard} />
      </div>

      {/* Promotions & Engagement */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Promoted Users" value={dashboardData.totalPromotedUsers} icon={Activity} />
        <StatCard title="Video Calls" value={dashboardData.totalVideoCalls} icon={Video} />
        <StatCard title="Live Feeds" value={dashboardData.totalLiveFeeds || 0} icon={Activity} />
        <StatCard title="Likes & Dislikes" value={dashboardData.totalLikesAndDislikes || 0} icon={ThumbsUp} />
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Payments</h3>
          <p className="text-sm text-gray-500 mt-1">Last 15 transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {dashboardData.recentPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.title}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      payment.paymentStatus === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(payment.paymentDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
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