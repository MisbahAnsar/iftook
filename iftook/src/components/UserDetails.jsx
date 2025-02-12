import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { users } from '../data/users';

const TabButton = ({ active, children, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 ${
      active 
        ? 'text-blue-600 border-b-2 border-blue-600' 
        : 'text-gray-600 hover:text-gray-800'
    }`}
  >
    {Icon && <Icon size={18} className="mr-2" />}
    {children}
  </button>
);

const UserDetails = ({ userId, onBack }) => {
  const user = users.find(u => u.id === userId);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

  if (!user) return null;

  const filterTransactions = (transactions) => {
    return transactions.filter(transaction =>
      (!searchQuery || transaction.date.includes(searchQuery)) &&
      (!searchAmount || transaction.amount.toString().includes(searchAmount))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-2xl text-gray-800 mb-2">About me</h4>
            <p className="text-gray-600">Professional profile with extensive experience...</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Earning Charges</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(user.earnings).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 capitalize">{key}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details Section */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Payment Details</h4>
            <p className="text-gray-600 text-sm mb-2">All transactions through bank will be shown here.</p>
            <div className="mb-4 flex gap-2">
              <input 
                type="text" 
                placeholder="Search by date (YYYY-MM-DD)" 
                className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Search by amount" 
                className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
                value={searchAmount} 
                onChange={(e) => setSearchAmount(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Added to Wallet */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="text-gray-800 font-semibold mb-2">Added to Wallet</h5>
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {user.paymentDetails.transactions
                    .filter(transaction => transaction.type === 'payment')
                    .map((transaction, index) => (
                      <div key={index} className="flex justify-between p-3 bg-white rounded-lg shadow">
                        <div>
                          <p className="font-medium text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <p className="text-green-600">+{transaction.amount}</p>
                      </div>
                    ))}
                </div>
              </div>
              {/* Withdrawal to Bank */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="text-gray-800 font-semibold mb-2">Withdrawal to Bank</h5>
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {user.paymentDetails.transactions
                    .filter(transaction => transaction.type === 'withdrawal')
                    .map((transaction, index) => (
                      <div key={index} className="flex justify-between p-3 bg-white rounded-lg shadow">
                        <div>
                          <p className="font-medium text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <p className="text-red-600">-{transaction.amount}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Transactions */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">My Wallet</h4>
            <p className="text-gray-600 text-sm mb-2">All transactions through wallet will be shown here.</p>
            <div className="mb-4 flex gap-2">
              <input 
                type="text" 
                placeholder="Search by date (YYYY-MM-DD)" 
                className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Search by amount" 
                className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-400 w-1/2"
                value={searchAmount} 
                onChange={(e) => setSearchAmount(e.target.value)}
              />
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto p-4 bg-gray-100 rounded-lg">
              {filterTransactions(user.wallet.transactions).map((transaction, index) => (
                <div key={index} className="flex justify-between p-3 bg-white rounded-lg shadow">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <p className={`${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;