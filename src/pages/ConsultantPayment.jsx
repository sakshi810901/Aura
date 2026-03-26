import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Wallet, AlertCircle, Download, Eye, EyeOff, DollarSign, Calendar, Users } from 'lucide-react';

const ConsultantPayment = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  // Dummy payment data
  const [paymentData] = useState({
    totalEarnings: 48500,
    availableBalance: 12800,
    pendingBalance: 5200,
    monthlyEarnings: 8500,
    sessionPrice: 800,
    completedSessions: 60,
    upcomingSessions: 8,
    pendingPayments: [
      { id: 1, clientName: 'Alex Johnson', amount: 1600, date: '2025-03-25', sessionDate: '2025-03-24', status: 'pending', category: 'Health Improvement' },
      { id: 2, clientName: 'Priya Mehta', amount: 800, date: '2025-03-24', sessionDate: '2025-03-23', status: 'pending', category: 'Mental Health' },
      { id: 3, clientName: 'Rohan Sharma', amount: 2400, date: '2025-03-22', sessionDate: '2025-03-21', status: 'processing', category: 'Career Growth' },
      { id: 4, clientName: 'Sarah Williams', amount: 800, date: '2025-03-20', sessionDate: '2025-03-19', status: 'pending', category: 'Fashion & Style' },
    ],
    withdrawals: [
      { id: 1, amount: 5000, date: '2025-03-20', status: 'completed', method: 'Bank Transfer' },
      { id: 2, amount: 3500, date: '2025-03-13', status: 'completed', method: 'Bank Transfer' },
      { id: 3, amount: 4200, date: '2025-03-06', status: 'completed', method: 'Bank Transfer' },
      { id: 4, amount: 3800, date: '2025-02-27', status: 'completed', method: 'Bank Transfer' },
    ],
    monthlyEarningsData: [
      { month: 'Jan', earnings: 6200 },
      { month: 'Feb', earnings: 7500 },
      { month: 'Mar', earnings: 8500 },
      { month: 'Apr', earnings: 6800 },
      { month: 'May', earnings: 9200 },
      { month: 'Jun', earnings: 10500 },
    ],
    bankDetails: {
      accountHolder: 'Dr. Ananya Sharma',
      accountNumber: '****5678',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank'
    }
  });

  const maxEarnings = Math.max(...paymentData.monthlyEarningsData.map(d => d.earnings));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-6 py-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/consultant-flow')}
              className="p-2 hover:bg-white/20 rounded-full transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <span className="font-bold text-xl">Payment Management</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Top Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Total Earnings Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-semibold">Total Earnings</span>
                <DollarSign className="text-green-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-purple-600">₹{paymentData.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Lifetime earnings</p>
            </div>

            {/* Available Balance Card */}
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Available Balance</span>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all"
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <p className="text-4xl font-bold">
                {showBalance ? `₹${paymentData.availableBalance.toLocaleString()}` : '••••••'}
              </p>
              <p className="text-purple-100 mt-2 text-sm">Ready to withdraw</p>
            </div>

            {/* Pending Balance Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-semibold">Pending Balance</span>
                <AlertCircle className="text-orange-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-orange-500">₹{paymentData.pendingBalance.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Available in 5-7 days</p>
            </div>
          </motion.div>

          {/* Charts and Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Monthly Earnings Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-purple-900">Monthly Earnings</h3>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="space-y-4">
                {paymentData.monthlyEarningsData.map((data, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-12 text-sm font-semibold text-gray-600">{data.month}</span>
                    <div className="flex-1 bg-purple-100 rounded-full h-8 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.earnings / maxEarnings) * 100}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full flex items-center justify-end pr-3"
                      >
                        <span className="text-white text-xs font-bold">₹{data.earnings}</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-blue-500" size={24} />
                  <div>
                    <p className="text-gray-600 text-sm">Completed Sessions</p>
                    <p className="text-2xl font-bold text-purple-600">{paymentData.completedSessions}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-green-500" size={24} />
                  <div>
                    <p className="text-gray-600 text-sm">Upcoming Sessions</p>
                    <p className="text-2xl font-bold text-purple-600">{paymentData.upcomingSessions}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="text-yellow-300" size={24} />
                  <div>
                    <p className="text-purple-100 text-sm">Per Session</p>
                    <p className="text-2xl font-bold">₹{paymentData.sessionPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pending Payments Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100"
          >
            <h3 className="text-2xl font-bold text-purple-900 mb-6">Pending Payments</h3>
            <p className="text-gray-600 mb-6">Payments from client sessions are automatically transferred to your bank account</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Payments List */}
              <div className="lg:col-span-2 space-y-4">
                {paymentData.pendingPayments.map((payment, idx) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      payment.status === 'pending' 
                        ? 'bg-orange-50 border-orange-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{payment.clientName}</h4>
                        <p className="text-sm text-gray-600">{payment.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-600">₹{payment.amount}</p>
                        <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">Session: {new Date(payment.sessionDate).toLocaleDateString()}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'pending'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-blue-200 text-blue-800'
                      }`}>
                        {payment.status === 'pending' ? 'Pending' : 'Processing'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-purple-900">Bank Details</h4>
                <div className="bg-purple-50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Account Holder</p>
                    <p className="text-sm font-bold text-purple-900">{paymentData.bankDetails.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Account Number</p>
                    <p className="text-sm font-mono font-bold text-purple-900">{paymentData.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">IFSC Code</p>
                    <p className="text-sm font-mono font-bold text-purple-900">{paymentData.bankDetails.ifscCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Bank Name</p>
                    <p className="text-sm font-bold text-purple-900">{paymentData.bankDetails.bankName}</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-4">
                  <p className="text-xs text-blue-800"><span className="font-bold">Note:</span> Pending payments will be automatically transferred within 2-3 business days</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-purple-900">Transaction History</h3>
              <button className="p-2 hover:bg-purple-50 rounded-full transition-all">
                <Download size={20} className="text-purple-600" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-bold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-bold">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-bold">Type</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.withdrawals.map((withdrawal, idx) => (
                    <motion.tr 
                      key={withdrawal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="border-b border-purple-100 hover:bg-purple-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-700">{new Date(withdrawal.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4 font-bold text-green-600">+₹{withdrawal.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-700">Auto Transfer</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantPayment;
