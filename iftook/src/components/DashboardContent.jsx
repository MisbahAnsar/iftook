"use client"

import { useEffect, useState } from "react"
import { getDashboardData } from "../utils/api"
import { Users, UserCheck, UserMinus, UserX, CreditCard, Clock, CheckCircle, Loader2 } from "lucide-react"

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData()
        setDashboardData(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          {error}
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-gray-50 text-gray-600 px-4 py-3 rounded-lg">No data available.</div>
      </div>
    )
  }

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className={`relative overflow-hidden rounded-xl ${gradient} p-6 transition-transform hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon className="w-6 h-6 text-white/80" />
      </div>
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full" />
    </div>
  )

  return (
    <div className="space-y-6 p-6 bg-gray-50/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-800">Total Payments</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{dashboardData.totalPayments}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-800">Pending Payments</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{dashboardData.totalPendingPayments}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">Successful Payments</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{dashboardData.totalSuccessfulPayments}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
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
  )
}

export default DashboardContent

