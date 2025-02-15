"use client"

import { useEffect, useState } from "react"
import { getDashboardData } from "../utils/api"
import { Users, UserCheck, UserMinus, UserX, CreditCard, Clock, CheckCircle, Loader2 } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center">
          <span className="text-2xl mr-3">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg shadow-md">
          No data available.
        </div>
      </div>
    )
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
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
          { title: "Total Payments", value: dashboardData.totalPayments, icon: CreditCard, color: "purple" },
          { title: "Pending Payments", value: dashboardData.totalPendingPayments, icon: Clock, color: "yellow" },
          { title: "Successful Payments", value: dashboardData.totalSuccessfulPayments, icon: CheckCircle, color: "green" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <item.icon className={`w-6 h-6 text-${item.color}-500`} />
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className={`text-3xl font-bold text-${item.color}-600`}>{item.value}</p>
          </div>
        ))}
      </div>

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
  )
}

export default DashboardContent