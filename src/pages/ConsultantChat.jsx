import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bell, LogOut, Send, Plus, MoreVertical, Smile, Check, X, Edit2, Save } from 'lucide-react';

const ConsultantChat = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [activeChat, setActiveChat] = useState(clientId || '1');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});
  const [viewMode, setViewMode] = useState('chat'); // 'chat' or 'plan'
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedPlanText, setEditedPlanText] = useState('');
  const [plans, setPlans] = useState({});
  const messagesEndRef = useRef(null);

  // Dummy client data
  const clients = {
    '1': {
      id: '1',
      name: 'Alex Johnson',
      status: 'online',
      avatar: 'A',
      lastActivity: '10:20 AM',
      specialty: 'Health Improvement',
      category: 'diet'
    },
    '2': {
      id: '2',
      name: 'Priya Mehta',
      status: 'away',
      avatar: 'P',
      lastActivity: '1 hr ago',
      specialty: 'Stress Management',
      category: 'mentalhealth'
    },
    '3': {
      id: '3',
      name: 'Rohan Sharma',
      status: 'away',
      avatar: 'R',
      lastActivity: 'Active 2h ago',
      specialty: 'Career Growth',
      category: 'career'
    }
  };

  // Dummy AURA AI Plans
  const defaultPlans = {
    '1': {
      title: 'AURA AI Plan',
      mainGoal: "Let's adjust your diet gradually.",
      intro: 'Here are some tips to help:',
      items: [
        {
          id: 1,
          text: 'Start by substituting snacks with fruits or nuts.',
          checked: false,
          edited: false
        },
        {
          id: 2,
          text: 'Choose healthier meals when dining out.',
          checked: false,
          edited: false
        },
        {
          id: 3,
          text: 'Drink more water to stay full.',
          checked: false,
          edited: false
        }
      ],
      attachments: [
        { id: 1, name: 'Gradual Junk Food Reduction.pdf', type: 'pdf' }
      ]
    },
    '2': {
      title: 'AURA AI Plan',
      mainGoal: 'Build a stress management routine.',
      intro: 'Here are recommended practices:',
      items: [
        {
          id: 1,
          text: 'Practice deep breathing exercises for 5 minutes daily.',
          checked: false,
          edited: false
        },
        {
          id: 2,
          text: 'Schedule breaks every 2 hours during work.',
          checked: false,
          edited: false
        },
        {
          id: 3,
          text: 'Try meditation or mindfulness apps.',
          checked: false,
          edited: false
        }
      ],
      attachments: []
    },
    '3': {
      title: 'AURA AI Plan',
      mainGoal: 'Explore career transition options.',
      intro: 'Consider these steps:',
      items: [
        {
          id: 1,
          text: 'Update your resume and LinkedIn profile.',
          checked: false,
          edited: false
        },
        {
          id: 2,
          text: 'Research companies in your target industry.',
          checked: false,
          edited: false
        },
        {
          id: 3,
          text: 'Network with professionals in your field.',
          checked: false,
          edited: false
        }
      ],
      attachments: []
    }
  };

  // Dummy chat messages
  const defaultMessages = {
    '1': [
      {
        id: 1,
        sender: 'client',
        name: 'Alex Johnson',
        avatar: 'A',
        text: 'Hey Alex, how are you feeling today?',
        time: '10:20 AM',
        type: 'text'
      },
      {
        id: 2,
        sender: 'client',
        name: 'Alex Johnson',
        avatar: 'A',
        text: "I'm feeling a bit stressed today.",
        time: '10:21 AM',
        type: 'text'
      },
      {
        id: 3,
        sender: 'aura',
        name: 'AURA',
        avatar: 'AI',
        text: "I'm here for you, Alex. What's causing the stress?",
        time: '10:22 AM',
        type: 'text'
      }
    ],
    '2': [
      {
        id: 1,
        sender: 'client',
        name: 'Priya Mehta',
        avatar: 'P',
        text: 'Hi, I need help with managing my anxiety',
        time: '2:15 PM',
        type: 'text'
      },
      {
        id: 2,
        sender: 'aura',
        name: 'AURA',
        avatar: 'AI',
        text: 'I understand. Let me help you develop some coping strategies.',
        time: '2:16 PM',
        type: 'text'
      }
    ],
    '3': [
      {
        id: 1,
        sender: 'client',
        name: 'Rohan Sharma',
        avatar: 'R',
        text: 'I\'m thinking about switching careers',
        time: '3:45 PM',
        type: 'text'
      },
      {
        id: 2,
        sender: 'aura',
        name: 'AURA',
        avatar: 'AI',
        text: 'That\'s an important decision. Let\'s explore your options together.',
        time: '3:46 PM',
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    // Initialize messages and plans from dummy data
    setMessages(defaultMessages);
    setPlans(defaultPlans);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentClient = clients[activeChat];
  const currentMessages = messages[activeChat] || [];
  const currentPlan = plans[activeChat];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        sender: 'consultant',
        name: 'Dr. Sharma',
        avatar: 'D',
        text: messageInput,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };

      setMessages({
        ...messages,
        [activeChat]: [...currentMessages, newMessage]
      });
      setMessageInput('');

      // Auto-reply after a delay
      setTimeout(() => {
        const autoReply = {
          id: currentMessages.length + 2,
          sender: 'client',
          name: currentClient.name,
          avatar: currentClient.avatar,
          text: 'Thanks for your guidance! This is really helpful.',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...prev[activeChat], autoReply]
        }));
      }, 1000);
    }
  };

  const handleEditPlan = (itemId, currentText) => {
    setEditingPlanId(itemId);
    setEditedPlanText(currentText);
  };

  const handleSavePlanEdit = (itemId) => {
    setPlans({
      ...plans,
      [activeChat]: {
        ...currentPlan,
        items: currentPlan.items.map(item =>
          item.id === itemId
            ? { ...item, text: editedPlanText, edited: true }
            : item
        )
      }
    });
    setEditingPlanId(null);
    setEditedPlanText('');
  };

  const handleTogglePlanCheckbox = (itemId) => {
    setPlans({
      ...plans,
      [activeChat]: {
        ...currentPlan,
        items: currentPlan.items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const getAvatarColor = (letter) => {
    const colors = {
      'A': 'from-pink-400 to-purple-500',
      'P': 'from-blue-400 to-purple-500',
      'R': 'from-green-400 to-teal-500',
      'D': 'from-purple-400 to-pink-500',
      'AI': 'from-purple-500 to-blue-500'
    };
    return colors[letter] || 'from-purple-400 to-pink-500';
  };

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

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-6 py-5 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg">
              A
            </div>
            <div>
              <div className="font-bold text-xl tracking-wide">AURA</div>
              <div className="text-xs text-white/80">AI Life Co-Pilot</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">2</span>
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </motion.header>

        {/* Main Chat Area */}
        <div className="flex-1 flex overflow-hidden gap-4 p-4">
          {/* Sidebar - Active Chats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-80 bg-white rounded-2xl shadow-lg p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-purple-900">Active Chats</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                  <Plus size={20} className="text-purple-600" />
                </button>
                <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                  <MoreVertical size={20} className="text-purple-600" />
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 space-y-3 overflow-y-auto mb-4">
              {Object.values(clients).map((client) => (
                <motion.button
                  key={client.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveChat(client.id);
                    setViewMode('chat');
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeChat === client.id
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                      : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(client.avatar)} flex items-center justify-center text-white font-bold flex-shrink-0 border-2 ${
                      activeChat === client.id ? 'border-white' : 'border-purple-300'
                    }`}>
                      {client.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold truncate">{client.name}</h3>
                        {client.status === 'online' && (
                          <span className={`w-2 h-2 rounded-full ${activeChat === client.id ? 'bg-white' : 'bg-green-500'}`}></span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${activeChat === client.id ? 'text-white/80' : 'text-purple-600'}`}>
                        {client.lastActivity}
                      </p>
                    </div>
                  </div>
                  {activeChat === client.id && (
                    <button className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors">
                      Open Chat
                    </button>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Start New Chat Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Start New Chat
            </motion.button>
          </motion.div>

          {/* Chat Window */}
          {currentClient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
            >
              {/* Chat Header with Tabs */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/consultant-flow')}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={24} className="text-purple-600" />
                  </motion.button>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(currentClient.avatar)} flex items-center justify-center text-white font-bold border-2 border-purple-300`}>
                    {currentClient.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-purple-900">{currentClient.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${currentClient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className={`text-sm font-semibold ${currentClient.status === 'online' ? 'text-green-600' : 'text-gray-600'}`}>
                        {currentClient.status === 'online' ? 'Online' : 'Away'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-purple-600" />
                </button>
              </div>

              {/* View Mode Tabs */}
              <div className="flex border-b border-purple-200 bg-white">
                <button
                  onClick={() => setViewMode('chat')}
                  className={`flex-1 py-3 text-center font-semibold transition-colors ${
                    viewMode === 'chat'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setViewMode('plan')}
                  className={`flex-1 py-3 text-center font-semibold transition-colors ${
                    viewMode === 'plan'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  AURA AI Plan
                </button>
              </div>

              {/* Messages Area or Plan Area */}
              {viewMode === 'chat' ? (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-purple-50/30">
                    <AnimatePresence>
                      {currentMessages.map((msg, idx) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex gap-3 ${msg.sender === 'consultant' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.sender !== 'consultant' && (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.avatar)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                              {msg.avatar}
                            </div>
                          )}
                          <div className={`flex flex-col ${msg.sender === 'consultant' ? 'items-end' : 'items-start'}`}>
                            {msg.sender !== 'consultant' && (
                              <span className="text-xs font-semibold text-purple-900 mb-1">{msg.name}</span>
                            )}
                            <div className={`px-4 py-3 rounded-2xl max-w-xs ${
                              msg.sender === 'consultant'
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                                : msg.sender === 'aura'
                                ? 'bg-purple-100 text-purple-900'
                                : 'bg-purple-50 text-purple-900 border border-purple-200'
                            }`}>
                              <p className="text-sm">{msg.text}</p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
                          </div>
                          {msg.sender === 'consultant' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              D
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="bg-white border-t border-purple-200 p-4">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-3 hover:bg-purple-50 rounded-full transition-colors text-purple-600"
                      >
                        <Plus size={20} />
                      </motion.button>
                      <div className="flex-1 flex items-center bg-purple-50 rounded-full px-4 gap-2 border border-purple-200">
                        <input
                          type="text"
                          placeholder="Write a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 bg-transparent py-3 text-purple-900 placeholder-purple-400 outline-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          <Smile size={20} />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                // Plan View
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-purple-50/30">
                  {currentPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl"
                    >
                      {/* Plan Header */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-purple-900 mb-4">{currentPlan.title}</h3>
                        <div className="bg-purple-100 rounded-xl p-4 mb-4">
                          <p className="text-purple-900 font-semibold text-lg">{currentPlan.mainGoal}</p>
                        </div>
                        <p className="text-purple-700 font-medium mb-4">{currentPlan.intro}</p>
                      </div>

                      {/* Plan Items */}
                      <div className="space-y-3 mb-6">
                        {currentPlan.items.map((item) => (
                          <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white border border-purple-200 rounded-xl p-4 flex items-start gap-3"
                          >
                            <button
                              onClick={() => handleTogglePlanCheckbox(item.id)}
                              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-1 transition-all ${
                                item.checked
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-purple-300 hover:border-purple-500'
                              }`}
                            >
                              {item.checked && <Check size={16} className="text-white" />}
                            </button>

                            <div className="flex-1">
                              {editingPlanId === item.id ? (
                                <div className="flex gap-2">
                                  <input
                                    autoFocus
                                    type="text"
                                    value={editedPlanText}
                                    onChange={(e) => setEditedPlanText(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-purple-300 rounded-lg text-purple-900 outline-none focus:border-purple-500"
                                  />
                                  <button
                                    onClick={() => handleSavePlanEdit(item.id)}
                                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    <Save size={16} />
                                  </button>
                                  <button
                                    onClick={() => setEditingPlanId(null)}
                                    className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <p className={`text-purple-900 ${item.checked ? 'line-through text-gray-500' : ''} ${item.edited ? 'italic' : ''}`}>
                                    {item.text}
                                  </p>
                                  {item.edited && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Edited</span>
                                  )}
                                  <button
                                    onClick={() => handleEditPlan(item.id, item.text)}
                                    className="p-1.5 ml-auto hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
                                    title="Edit plan item"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Attachments */}
                      {currentPlan.attachments.length > 0 && (
                        <div className="border-t border-purple-200 pt-6">
                          <h4 className="font-semibold text-purple-900 mb-3">Attachments</h4>
                          <div className="space-y-2">
                            {currentPlan.attachments.map((attachment) => (
                              <motion.div
                                key={attachment.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-100 transition-colors"
                              >
                                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                                  {attachment.type.toUpperCase()}
                                </div>
                                <span className="text-purple-900 font-medium flex-1">{attachment.name}</span>
                                <span className="text-purple-600 text-sm">Download</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultantChat;
