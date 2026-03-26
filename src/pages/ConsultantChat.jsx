import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bell, LogOut, Send, Plus, MoreVertical, Smile, Check, X, Edit2, Save, FileText } from 'lucide-react';

const ConsultantChat = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [activeChat, setActiveChat] = useState(clientId || '1');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});
  const [viewMode, setViewMode] = useState('chat');
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemText, setEditingItemText] = useState('');
  const [plans, setPlans] = useState({});
  const messagesEndRef = useRef(null);

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

  const defaultPlans = {
    '1': {
      title: 'Diet Plan',
      intro: "I've created a personalized plan to help you reduce junk food in your diet. Let me know your thoughts!",
      sections: {
        diet: {
          title: 'Diet',
          items: [
            { id: 1, label: 'Breakfast', value: 'Oats + fruit', edited: false },
            { id: 2, label: 'Lunch', value: 'Dal + vegetables', edited: false },
            { id: 3, label: 'Dinner', value: 'Roti + salad', edited: false },
            { id: 4, label: 'Snacks', value: 'Fruit or nuts', edited: false }
          ]
        },
        habit: {
          title: 'Habit',
          items: [
            { id: 5, label: 'Exercise', value: '15 mins daily', edited: false },
            { id: 6, label: 'Sleep', value: 'Before 11:30 PM', edited: false },
            { id: 7, label: 'Screen time', value: 'Max 1 hour daily', edited: false }
          ]
        },
        advice: {
          title: 'Custom Advice',
          items: [
            { id: 8, label: '', value: 'Avoid junk food after 9 PM.', edited: false },
            { id: 9, label: '', value: 'Drink 2L water daily.', edited: false }
          ]
        }
      },
      attachments: [
        { id: 1, name: 'Gradual Junk Food Reduction.pdf', type: 'pdf' }
      ]
    },
    '2': {
      title: 'Stress Management Plan',
      intro: 'Here is a comprehensive stress management routine tailored for you.',
      sections: {
        routine: {
          title: 'Daily Routine',
          items: [
            { id: 1, label: 'Morning', value: 'Deep breathing for 5 mins', edited: false },
            { id: 2, label: 'Midday', value: 'Short walk or meditation', edited: false },
            { id: 3, label: 'Evening', value: 'Journaling or reflection', edited: false }
          ]
        },
        practices: {
          title: 'Recommended Practices',
          items: [
            { id: 4, label: '', value: 'Practice deep breathing exercises daily', edited: false },
            { id: 5, label: '', value: 'Schedule breaks every 2 hours', edited: false }
          ]
        }
      },
      attachments: []
    },
    '3': {
      title: 'Career Development Plan',
      intro: 'Let\'s explore your career transition options systematically.',
      sections: {
        steps: {
          title: 'Action Steps',
          items: [
            { id: 1, label: 'Step 1', value: 'Update resume and LinkedIn', edited: false },
            { id: 2, label: 'Step 2', value: 'Research target companies', edited: false },
            { id: 3, label: 'Step 3', value: 'Network with professionals', edited: false }
          ]
        }
      },
      attachments: []
    }
  };

  const defaultMessages = {
    '1': [
      { id: 1, sender: 'client', name: 'Alex Johnson', avatar: 'A', text: 'Hey Alex, how are you feeling today?', time: '10:20 AM', type: 'text' },
      { id: 2, sender: 'client', name: 'Alex Johnson', avatar: 'A', text: "I'm feeling a bit stressed today.", time: '10:21 AM', type: 'text' },
      { id: 3, sender: 'aura', name: 'AURA', avatar: 'AI', text: "I'm here for you. What's causing the stress?", time: '10:22 AM', type: 'text' }
    ],
    '2': [
      { id: 1, sender: 'client', name: 'Priya Mehta', avatar: 'P', text: 'Hi, I need help with anxiety', time: '2:15 PM', type: 'text' },
      { id: 2, sender: 'aura', name: 'AURA', avatar: 'AI', text: 'I understand. Let me help develop coping strategies.', time: '2:16 PM', type: 'text' }
    ],
    '3': [
      { id: 1, sender: 'client', name: 'Rohan Sharma', avatar: 'R', text: 'I\'m thinking about switching careers', time: '3:45 PM', type: 'text' },
      { id: 2, sender: 'aura', name: 'AURA', avatar: 'AI', text: 'Let\'s explore your options together.', time: '3:46 PM', type: 'text' }
    ]
  };

  useEffect(() => {
    setMessages(defaultMessages);
    setPlans(defaultPlans);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: (messages[activeChat]?.length || 0) + 1,
        sender: 'consultant',
        name: 'Dr. Sharma',
        avatar: 'S',
        text: messageInput,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage]
      }));
      setMessageInput('');
      
      setTimeout(() => {
        const autoReply = {
          id: (messages[activeChat]?.length || 0) + 2,
          sender: 'client',
          name: clients[activeChat]?.name || 'Client',
          avatar: clients[activeChat]?.avatar || 'C',
          text: 'Thank you for the suggestion! That sounds helpful.',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), autoReply]
        }));
      }, 1000);
    }
  };

  const handleEditItem = (itemId, currentValue) => {
    setEditingItemId(itemId);
    setEditingItemText(currentValue);
  };

  const handleSaveItem = (itemId) => {
    setPlans(prev => {
      const newPlans = { ...prev };
      const plan = newPlans[activeChat];
      
      for (const section in plan.sections) {
        const item = plan.sections[section].items.find(i => i.id === itemId);
        if (item) {
          item.value = editingItemText;
          item.edited = true;
          break;
        }
      }
      
      return newPlans;
    });
    
    setEditingItemId(null);
    setEditingItemText('');
  };

  const handleSendPlanToUser = () => {
    const plan = plans[activeChat];
    const newMessage = {
      id: (messages[activeChat]?.length || 0) + 1,
      sender: 'consultant',
      name: 'Dr. Sharma',
      avatar: 'S',
      text: `I've created a personalized plan for you: ${plan.title}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'plan',
      planData: plan
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    setShowEditPlanModal(false);
    setViewMode('chat');
  };

  const currentClient = clients[activeChat];
  const currentPlan = plans[activeChat];
  const chatMessages = messages[activeChat] || [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50">
      {/* Sidebar */}
      <motion.div className="w-80 bg-gradient-to-b from-purple-200 to-purple-100 border-r border-purple-300 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-900">AURA</h1>
            <p className="text-sm text-purple-700">AI Life Co-Pilot</p>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-purple-900 mb-4 flex items-center justify-between">
            Active Chats
            <div className="flex gap-2">
              <button className="p-2 hover:bg-purple-300 rounded-full transition">
                <Plus size={20} className="text-purple-600" />
              </button>
              <button className="p-2 hover:bg-purple-300 rounded-full transition">
                <MoreVertical size={20} className="text-purple-600" />
              </button>
            </div>
          </h2>

          <div className="space-y-3">
            {Object.values(clients).map(client => (
              <motion.button
                key={client.id}
                onClick={() => {
                  setActiveChat(client.id);
                  setViewMode('chat');
                }}
                whileHover={{ scale: 1.02 }}
                className={`w-full p-4 rounded-2xl transition-all ${
                  activeChat === client.id
                    ? 'bg-purple-300 shadow-lg'
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {client.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-purple-900">{client.name}</h3>
                    <p className="text-sm text-purple-600">{client.lastActivity}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition mb-4"
        >
          <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
            <Plus size={16} />
          </div>
          Start New Chat
        </motion.button>

        <button onClick={() => navigate('/consultant-flow')} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition">
          Back to Dashboard
        </button>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md border-b border-purple-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/consultant-flow')} className="p-2 hover:bg-purple-100 rounded-full transition">
              <ArrowLeft size={24} className="text-purple-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {currentClient?.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-purple-900">{currentClient?.name}</h2>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {currentClient?.status}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-purple-600 text-white rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
            </button>
            <button onClick={() => {
              localStorage.removeItem('role');
              navigate('/login');
            }} className="p-2 hover:bg-purple-100 rounded-full transition">
              <LogOut size={20} className="text-purple-600" />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white bg-opacity-50 px-8 py-3 flex gap-2 border-b border-purple-200">
          <motion.button
            onClick={() => setViewMode('chat')}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              viewMode === 'chat'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-600 border border-purple-200'
            }`}
          >
            Chat
          </motion.button>
          <motion.button
            onClick={() => setViewMode('plan')}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              viewMode === 'plan'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-600 border border-purple-200'
            }`}
          >
            AURA AI Plan
          </motion.button>
        </div>

        {/* Chat View */}
        {viewMode === 'chat' && (
          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {chatMessages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'consultant' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender !== 'consultant' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                    {message.avatar}
                  </div>
                )}
                
                <div className={`max-w-md ${message.sender === 'consultant' ? 'bg-purple-600 text-white' : 'bg-white text-purple-900'} rounded-2xl px-4 py-3 shadow-md`}>
                  {message.type === 'plan' ? (
                    <div className="space-y-3">
                      <p className="font-semibold">{message.text}</p>
                      <div className="bg-white bg-opacity-10 rounded-xl p-4 space-y-3">
                        <p className="text-sm">{message.planData?.intro}</p>
                        {Object.entries(message.planData?.sections || {}).map(([key, section]) => (
                          <div key={key}>
                            <h4 className="font-semibold text-sm mb-2">{section.title}</h4>
                            <div className="space-y-1 text-sm">
                              {section.items.map(item => (
                                <div key={item.id} className="flex items-center gap-2">
                                  <Check size={16} />
                                  {item.label && <span className="font-medium">{item.label}:</span>}
                                  <span>{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold mb-1">{message.name}</p>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'consultant' ? 'text-purple-100' : 'text-purple-500'}`}>
                        {message.time}
                      </p>
                    </>
                  )}
                </div>

                {message.sender === 'consultant' && (
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm ml-3 flex-shrink-0">
                    S
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Plan View */}
        {viewMode === 'plan' && currentPlan && (
          <div className="flex-1 overflow-y-auto p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-2xl mx-auto shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-purple-900">AURA AI Plan</h3>
                  <p className="text-purple-600 mt-2">{currentPlan.intro}</p>
                </div>
              </div>

              {Object.entries(currentPlan.sections).map(([key, section]) => (
                <div key={key} className="space-y-4">
                  <h4 className="text-xl font-bold text-purple-900">{section.title}</h4>
                  <div className="space-y-3">
                    {section.items.map(item => (
                      <div key={item.id} className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            {item.label && <p className="font-semibold text-purple-900 mb-1">{item.label}</p>}
                            <p className={editingItemId === item.id ? 'hidden' : 'text-purple-700'}>{item.value}</p>
                            {editingItemId === item.id && (
                              <input
                                autoFocus
                                value={editingItemText}
                                onChange={(e) => setEditingItemText(e.target.value)}
                                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-600"
                              />
                            )}
                            {item.edited && <span className="text-xs text-purple-500 mt-2 block">Edited</span>}
                          </div>
                          <div className="flex gap-2">
                            {editingItemId === item.id ? (
                              <>
                                <button
                                  onClick={() => handleSaveItem(item.id)}
                                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() => setEditingItemId(null)}
                                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEditItem(item.id, item.value)}
                                className="p-2 bg-purple-200 text-purple-600 rounded-lg hover:bg-purple-300 transition"
                              >
                                <Edit2 size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {currentPlan.attachments.length > 0 && (
                <div className="border-t border-purple-200 pt-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Attachments</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentPlan.attachments.map(attachment => (
                      <div key={attachment.id} className="flex items-center gap-3 bg-purple-50 rounded-xl px-4 py-3 border border-purple-200">
                        <FileText size={20} className="text-purple-600" />
                        <span className="text-purple-700 font-medium text-sm">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6 border-t border-purple-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowEditPlanModal(true)}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
                >
                  Edit Plan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSendPlanToUser}
                  className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition"
                >
                  Send Plan to User
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md border-t border-purple-200 px-8 py-6">
          <div className="flex gap-4 items-center">
            <button className="p-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition">
              <Plus size={20} />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Write a message..."
              className="flex-1 px-6 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600 focus:bg-white transition"
            />
            <button className="p-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition">
              <Smile size={20} />
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleSendMessage}
              className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Edit Plan Modal */}
      <AnimatePresence>
        {showEditPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-purple-200 px-8 py-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-purple-900">Edit Plan</h3>
                <button
                  onClick={() => setShowEditPlanModal(false)}
                  className="p-2 hover:bg-purple-100 rounded-full transition"
                >
                  <X size={24} className="text-purple-600" />
                </button>
              </div>

              <div className="px-8 py-6 space-y-6">
                {currentPlan && Object.entries(currentPlan.sections).map(([key, section]) => (
                  <div key={key}>
                    <h4 className="text-lg font-bold text-purple-900 mb-4">{section.title}</h4>
                    <div className="space-y-3">
                      {section.items.map(item => (
                        <div key={item.id} className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                          <div className="flex flex-col gap-2">
                            {item.label && <label className="font-semibold text-purple-900 text-sm">{item.label}</label>}
                            <input
                              type="text"
                              value={editingItemId === item.id ? editingItemText : item.value}
                              onChange={(e) => {
                                setEditingItemId(item.id);
                                setEditingItemText(e.target.value);
                              }}
                              className="px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 text-purple-900"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {currentPlan?.attachments.length > 0 && (
                  <div className="border-t border-purple-200 pt-6">
                    <h4 className="text-lg font-bold text-purple-900 mb-3">Attachments</h4>
                    <div className="flex flex-wrap gap-3">
                      {currentPlan.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center gap-3 bg-purple-50 rounded-xl px-4 py-3 border border-purple-200">
                          <FileText size={20} className="text-purple-600" />
                          <span className="text-purple-700 font-medium text-sm">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-purple-200 px-8 py-6 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowEditPlanModal(false)}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setShowEditPlanModal(false);
                    handleSendPlanToUser();
                  }}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
                >
                  Save Changes & Send Plan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultantChat;
