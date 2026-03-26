import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Home, MessageCircle, User as UserIcon, Settings, Bell, Search, CheckCircle, X } from 'lucide-react';

const ConsultantDashboard = () => {
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [consultationRequests, setConsultationRequests] = useState([
    {
      id: 1,
      clientName: 'Alex Johnson',
      clientImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VLyhejvSTqdcWBtgneguG3aylLGjSl.png',
      specialty: 'Health Improvement',
      concern: 'Junk food habit',
      requestedHelp: 'Diet advice',
      aiInsight: 'AURA detected high junk food consumption.',
      goals: ['Health Improvement', 'Junk food habit'],
      status: 'pending',
      category: 'diet'
    },
    {
      id: 2,
      clientName: 'Sarah Williams',
      clientImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VLyhejvSTqdcWBtgneguG3aylLGjSl.png',
      specialty: 'Career Growth',
      concern: 'Job transition planning',
      requestedHelp: 'Career counseling',
      aiInsight: 'AURA identified potential career path opportunities.',
      goals: ['Career Advancement', 'Professional Development'],
      status: 'pending',
      category: 'career'
    },
    {
      id: 3,
      clientName: 'Mike Chen',
      clientImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VLyhejvSTqdcWBtgneguG3aylLGjSl.png',
      specialty: 'Mental Health',
      concern: 'Stress management',
      requestedHelp: 'Meditation guidance',
      aiInsight: 'AURA detected elevated stress levels requiring intervention.',
      goals: ['Mental Wellness', 'Stress Reduction'],
      status: 'pending',
      category: 'mentalhealth'
    },
    {
      id: 4,
      clientName: 'Emma Davis',
      clientImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VLyhejvSTqdcWBtgneguG3aylLGjSl.png',
      specialty: 'Fashion & Style',
      concern: 'Wardrobe optimization',
      requestedHelp: 'Personal styling advice',
      aiInsight: 'AURA analyzed fashion preferences and lifestyle patterns.',
      goals: ['Style Enhancement', 'Confidence Building'],
      status: 'pending',
      category: 'fashion'
    }
  ]);

  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAcceptRequest = (id) => {
    const accepted = consultationRequests.find(req => req.id === id);
    if (accepted) {
      setAcceptedRequests([...acceptedRequests, accepted]);
      setConsultationRequests(consultationRequests.filter(req => req.id !== id));
    }
  };

  const handleDeclineRequest = (id) => {
    setConsultationRequests(consultationRequests.filter(req => req.id !== id));
  };

  const handleViewChat = (id) => {
    // Placeholder for chat view functionality
    console.log('View chat for request:', id);
  };

  const filteredRequests = selectedCategory === 'all' 
    ? consultationRequests 
    : consultationRequests.filter(req => req.category === selectedCategory);

  const categories = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'diet', label: 'Diet', icon: null },
    { id: 'finance', label: 'Finance', icon: null },
    { id: 'career', label: 'Career', icon: null },
    { id: 'fashion', label: 'Fashion', icon: null },
    { id: 'mentalhealth', label: 'Mental Health', icon: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full shadow-lg"></div>
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full shadow-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-6 py-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="font-bold text-xl tracking-wide">AURA</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all">
              <Bell size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </motion.header>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-6 py-4 text-purple-600 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <Home size={16} />
            Home <span className="text-purple-400 mx-2">&gt;</span> Dashboard
          </span>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 mb-8"
        >
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Welcome Dr. Sharma</h1>
          <p className="text-purple-700">You have {filteredRequests.length} consultation requests.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 px-6 pb-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full lg:w-64 flex flex-col gap-4"
          >
            {/* Category Tabs - Horizontal for mobile, vertical for desktop */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (cat.id !== 'dashboard') {
                      setSelectedCategory(cat.id);
                    }
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all flex items-center gap-2 ${
                    (cat.id === 'dashboard' && activeTab === 'dashboard') || selectedCategory === cat.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-white text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {cat.icon && <cat.icon size={18} />}
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Sidebar Navigation - Desktop only */}
            <nav className="hidden lg:flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-500 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Home size={20} />
                Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-purple-600 font-semibold transition-all hover:bg-purple-50"
              >
                <MessageCircle size={20} />
                Active Chats
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-purple-600 font-semibold transition-all hover:bg-purple-50"
              >
                <UserIcon size={20} />
                Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-purple-600 font-semibold transition-all hover:bg-purple-50"
              >
                <Settings size={20} />
                Settings
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-red-600 font-semibold transition-all hover:bg-red-50 mt-4"
              >
                <LogOut size={20} />
                Logout
              </motion.button>
            </nav>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {/* Category Navigation and Search */}
            <div className="hidden lg:flex items-center gap-4 mb-8 pb-6 border-b border-purple-200">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (cat.id !== 'dashboard') {
                      setSelectedCategory(cat.id);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                    (cat.id === 'dashboard' && activeTab === 'dashboard') || selectedCategory === cat.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-200'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="ml-auto p-2.5 rounded-full bg-white border border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Search size={20} />
              </motion.button>
            </div>

            {/* Consultation Requests Cards */}
            <div className="space-y-6">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request, idx) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-purple-100"
                  >
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-300 to-pink-200 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-purple-300">
                          <span className="text-2xl font-bold text-white">
                            {request.clientName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-purple-900 mb-1">{request.clientName}</h3>
                          <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {request.specialty}
                          </div>
                          <p className="text-sm text-purple-700 mt-1">Concern: {request.concern}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-purple-600 hover:text-purple-900 transition-colors p-2"
                      >
                        <span className="text-lg font-semibold">Edit</span>
                      </motion.button>
                    </div>

                    {/* Requested Help Section */}
                    <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200">
                      <h4 className="text-sm font-semibold text-purple-700 mb-3">Requested help</h4>
                      <div className="flex items-center gap-3 text-purple-700 font-semibold">
                        <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white text-sm">
                          💊
                        </div>
                        {request.requestedHelp}
                      </div>
                    </div>

                    {/* AI Insight */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200 flex gap-3">
                      <div className="text-2xl">🧠</div>
                      <p className="text-blue-800 text-sm">{request.aiInsight}</p>
                    </div>

                    {/* Goals Section */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-purple-900 mb-3">Goals</h4>
                      <div className="space-y-2">
                        {request.goals.map((goal, i) => (
                          <div key={i} className="flex items-center gap-3 text-purple-800">
                            <span className="text-lg">✓</span>
                            <span className="font-semibold">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-purple-100">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleViewChat(request.id)}
                        className="flex-1 px-4 py-3 bg-white border-2 border-purple-300 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all"
                      >
                        View Chat
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Accept Request
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDeclineRequest(request.id)}
                        className="px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Decline
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 text-center shadow-lg border border-purple-100"
                >
                  <p className="text-xl font-semibold text-purple-700 mb-2">No consultation requests</p>
                  <p className="text-purple-600">All requests have been processed or no requests are available in this category.</p>
                </motion.div>
              )}
            </div>

            {/* Accepted Requests Section */}
            {acceptedRequests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t-2 border-purple-200"
              >
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Accepted Consultations</h2>
                <div className="space-y-6">
                  {acceptedRequests.map((request, idx) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-green-900">{request.clientName}</h3>
                          <p className="text-sm text-green-700">{request.specialty}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex-1 px-4 py-2 bg-white border border-green-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all"
                        >
                          View Chat
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="px-4 py-2 bg-white border border-red-300 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-all"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
