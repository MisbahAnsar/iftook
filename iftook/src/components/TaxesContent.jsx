import React, { useState } from "react";

const TaxesContent = () => {
  // State for GST and company share rates
  const [gstRate, setGstRate] = useState(0);
  const [companyShareRate, setCompanyShareRate] = useState(0);

  // Example payment data
  const [payments, setPayments] = useState([
    {
      _id: "67b15977e4c672b8458640c9",
      sender: {
        _id: "67ae6603c77e95ed3639f3da",
        name: "Raihan Khan",
        email: "raihan@gmail.com",
      },
      receiver: null,
      amount: 250,
      paymentStatus: "pending",
      paymentType: "earning",
      title: "Refund for canceled service",
      notes: "Customer requested a refund",
      paymentDate: "2025-02-16T03:20:23.510Z",
      __v: 0,
    },
    // Add more payment objects as needed
  ]);

  // Function to calculate deductions
  const calculateDeductions = (amount) => {
    const gstAmount = (amount * gstRate) / 100;
    const companyShareAmount = (amount * companyShareRate) / 100;
    const totalDeductions = gstAmount + companyShareAmount;
    const netAmount = amount - totalDeductions;
    return { gstAmount, companyShareAmount, totalDeductions, netAmount };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Tax Settings Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">GST Rate (%)</label>
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Share Rate (%)</label>
            <input
              type="number"
              value={companyShareRate}
              onChange={(e) => setCompanyShareRate(parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payments Table Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payments</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {["Sender", "Amount", "GST", "Company Share", "Total Deductions", "Net Amount"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {payments.length > 0 ? (
                payments.map((payment) => {
                  const { gstAmount, companyShareAmount, totalDeductions, netAmount } =
                    calculateDeductions(payment.amount);
                  return (
                    <tr key={payment._id} className="hover:bg-gray-100 transition">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700">{payment.sender.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">₹{payment.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">₹{gstAmount.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          ${companyShareAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          ₹{totalDeductions.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">₹{netAmount.toFixed(2)}</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-600">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaxesContent;