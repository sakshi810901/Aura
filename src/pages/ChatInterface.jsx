import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const ChatInterface = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const suggestionChips = [
        "What should I do today?",
        "I feel stressed",
        "Explain my daily plan",
        "Help me decide something"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        const newUserMsg = {
            id: Date.now(),
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const lower = text.toLowerCase();
            const isActionable = lower.includes('plan') || 
                                 lower.includes('decide') ||
                                 lower.includes('do today') ||
                                 lower.includes('choice') ||
                                 lower.includes('help');
                                 
            const responseText = isActionable 
                ? "Would you like me to create a plan or help you make a decision right now?"
                : "I understand. I'm always here to listen and help you through whatever is on your mind. You're doing great!";

            const newAiMsg = {
                id: Date.now() + 1,
                text: responseText,
                isUser: false,
                isActionable,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, newAiMsg]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-hidden flex flex-col">
            {/* Header */}
            <header className="flex-shrink-0 bg-white/40 backdrop-blur-md border-b border-white/50 px-6 py-4 flex items-center justify-between z-10 relative shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/60 rounded-full flex justify-center items-center hover:bg-white text-[#5B3A8F] transition-colors shadow-sm cursor-pointer border border-white/80">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-[#4B2C82] tracking-tight">Talk to AURA</h1>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7E57C2] uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-white/50"></span>
                            Online
                        </div>
                    </div>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md border-2 border-white/80">
                    <span className="text-white font-black text-lg">A</span>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col z-10 relative">
                {messages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full pt-4 pb-12"
                    >
                        {/* Static Avatar viewer representation for Home Screen */}
                        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full border-4 border-white/80 bg-[#C4A9E8] shadow-[0_12px_30px_rgba(150,110,200,0.3)] overflow-hidden relative flex justify-center items-center mb-8">
                            <div className="absolute inset-0 scale-[1.3] translate-y-4">
                                <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
                            </div>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 lg:p-8 shadow-[0_12px_40px_rgba(150,110,200,0.2)] mb-8 text-center relative max-w-[450px]">
                            <Sparkles className="absolute -top-4 -right-2 text-[#A78BFA] w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                            <Sparkles className="absolute -bottom-2 -left-3 text-[#C084FC] w-6 h-6 animate-pulse opacity-70" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                            <h2 className="text-[26px] font-black text-[#4B2C82] mb-3 leading-tight">Hi! I'm here to help.</h2>
                            <p className="text-[#6D5D8C] text-[16px] font-bold leading-relaxed px-2">
                                Let's talk about anything — decisions, stress, plans, or just a conversation. What's on your mind?
                            </p>
                        </div>

                        <div className="w-full max-w-[500px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {suggestionChips.map((chip, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSend(chip)}
                                    className="bg-white/70 hover:bg-white/95 backdrop-blur-md border-2 border-purple-100 py-3.5 px-5 rounded-[20px] text-[14px] font-bold text-[#5B3A8F] shadow-sm transition-all text-left flex items-start gap-3 group"
                                >
                                    <span className="text-[#A78BFA] text-lg leading-none mt-0.5 group-hover:scale-125 transition-transform group-hover:text-[#8B5CF6]">✨</span>
                                    {chip}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="max-w-3xl mx-auto w-full space-y-7 pb-20">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} w-full group`}
                            >
                                {!msg.isUser && (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center text-white font-bold text-lg shadow-md mr-3 flex-shrink-0 mt-auto mb-1 border-2 border-white/80">
                                        A
                                    </div>
                                )}
                                
                                <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                                    <div 
                                        className={`px-5 py-3.5 shadow-md ${
                                            msg.isUser 
                                                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-[24px] rounded-br-[8px]' 
                                                : 'bg-white/90 backdrop-blur-md text-[#4B2C82] border border-white/80 rounded-[24px] rounded-bl-[8px]'
                                        }`}
                                    >
                                        <p className={`text-[15px] ${msg.isUser ? 'font-semibold tracking-wide' : 'font-bold tracking-wide'} leading-relaxed`}>
                                            {msg.text}
                                        </p>
                                    </div>
                                    <span className="text-[11px] text-[#8B5CF6]/90 font-bold mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                                        {msg.timestamp}
                                    </span>

                                    {/* Action Buttons for Screen 3 */}
                                    {!msg.isUser && msg.isActionable && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mt-4 flex flex-col sm:flex-row gap-2.5 w-full bg-white/40 p-2.5 rounded-[24px] border border-white/50 shadow-sm"
                                        >
                                            <button 
                                                onClick={() => navigate('/what-to-do-next')}
                                                className="bg-white hover:bg-purple-50 border-2 border-[#D8B4FE] text-[#6D28D9] px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm transition-colors flex-1 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                            >
                                                <span className="text-lg">📋</span> Create Daily Plan
                                            </button>
                                            <button 
                                                onClick={() => navigate('/decisions')}
                                                className="bg-white hover:bg-purple-50 border-2 border-[#D8B4FE] text-[#6D28D9] px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm transition-colors flex-1 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                            >
                                                <span className="text-lg">🪷</span> Open Decision Tool
                                            </button>
                                            <button 
                                                onClick={() => handleSend("Let's talk more about this.")}
                                                className="bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-[#5B3A8F] border border-purple-200 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-colors flex-[0.8] flex items-center justify-center gap-2 shadow-inner"
                                            >
                                                <span className="text-lg">💬</span> Talk More
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-white/60 backdrop-blur-xl border-t border-white/50 p-4 md:p-6 flex-shrink-0 z-20 relative shadow-[0_-10px_40px_rgba(150,110,200,0.1)]">
                <div className="max-w-3xl mx-auto relative flex items-center">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
                        placeholder="Type your message..."
                        className="w-full bg-white/90 border-2 border-[#D8B4FE]/50 text-[#4B2C82] placeholder-[#A78BFA] font-bold px-6 py-4 rounded-full focus:outline-none focus:border-[#8B5CF6] focus:ring-4 ring-purple-500/10 shadow-sm transition-all text-[15px] pr-16"
                    />
                    <button
                        onClick={() => handleSend(inputText)}
                        disabled={!inputText.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-gradient-to-tr from-[#8B5CF6] to-[#A78BFA] disabled:opacity-50 hover:from-[#7C3AED] hover:to-[#8B5CF6] text-white rounded-full flex justify-center items-center transition-all shadow-md group disabled:cursor-not-allowed"
                    >
                        <Send size={18} className={inputText.trim() ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" : ""} />
                    </button>
                </div>
            </div>
            
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/40 blur-[100px] mix-blend-overlay"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-300/30 blur-[100px] mix-blend-overlay"></div>
            </div>
        </div>
    );
};

export default ChatInterface;
