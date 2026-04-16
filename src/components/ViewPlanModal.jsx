import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Sun, Dumbbell, Moon, Check } from 'lucide-react';

const ViewPlanModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="plan-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-[2px]"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-lg bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/50 shadow-[0_20px_60px_rgba(91,58,143,0.2)] h-[85vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Area */}
                        <div className="p-6 pb-4 relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md">
                                        <span className="text-white font-bold text-lg tracking-wider">AURA</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                                        <p className="text-[11px] text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] hover:bg-white transition-colors relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 bg-[#EE4B2B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center border border-white">
                                        2
                                    </span>
                                </button>
                            </div>

                            <div className="text-center mb-2">
                                <h1 className="text-2xl font-black text-[#4B2C82] mb-1">Your Smart Daily Plan</h1>
                                <p className="text-[#6D5D8C] text-sm font-medium">AI-optimized schedule based on your goals.</p>
                            </div>
                        </div>

                        {/* Scrollable Timeline */}
                        <div className="flex-1 overflow-y-auto px-6 pb-12 pt-4 relative no-scrollbar">
                            {/* Vertical line behind icons */}
                            <div className="absolute left-[38px] top-8 bottom-12 w-[2px] bg-white/40"></div>
                            
                            {/* Morning Section */}
                            <div className="relative mb-6">
                                {/* Section Badge */}
                                <div className="ml-16 mb-2">
                                    <span className="bg-[#C4A4F8] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm inline-block">
                                        Morning
                                    </span>
                                </div>
                                
                                <div className="flex">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center border border-white/60 shadow-sm z-10 mr-4 flex-shrink-0 mt-2">
                                        <Clock className="w-6 h-6 text-[#8B5CF6]" />
                                    </div>

                                    {/* Cards container */}
                                    <div className="flex-1 space-y-3">
                                        {/* Wake Up */}
                                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">7:30 AM</span>
                                                <span className="text-[#4B2C82] font-semibold text-[15px]">Wake Up</span>
                                            </div>
                                            <button className="bg-[#B794F4]/30 text-[#8B5CF6] font-bold text-[13px] px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px]" /> Done
                                            </button>
                                        </div>

                                        {/* Breakfast */}
                                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">8:00 AM</span>
                                                <span className="text-[#4B2C82] font-semibold text-[15px]">Healthy Breakfast</span>
                                            </div>
                                            <button className="bg-[#B794F4]/30 text-[#8B5CF6] font-bold text-[13px] px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px]" /> Done
                                            </button>
                                        </div>

                                        {/* Exercise */}
                                        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex justify-between items-center opacity-80">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">8:30 AM</span>
                                                <span className="text-[#6D5D8C] font-semibold text-[15px]">15 min Exercise</span>
                                            </div>
                                            <button className="bg-white/40 text-[#6D5D8C] font-bold text-[13px] px-4 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px] opacity-40" /> Skip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Afternoon Section */}
                            <div className="relative mb-6">
                                {/* Section Badge */}
                                <div className="ml-16 mb-2">
                                    <span className="bg-[#C4A4F8] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm inline-block">
                                        Afternoon
                                    </span>
                                </div>
                                
                                <div className="flex">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center border border-white/60 shadow-sm z-10 mr-4 flex-shrink-0 mt-2">
                                        <Sun className="w-6 h-6 text-amber-400" fill="currentColor" />
                                    </div>

                                    {/* Cards container */}
                                    <div className="flex-1 space-y-3">
                                        {/* Lunch */}
                                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">1:00 PM</span>
                                                <span className="text-[#4B2C82] font-semibold text-[15px]">Lunch</span>
                                            </div>
                                            <button className="bg-[#B794F4]/30 text-[#8B5CF6] font-bold text-[13px] px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px]" /> Done
                                            </button>
                                        </div>

                                        {/* Work Session */}
                                        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex justify-between items-center opacity-80">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">3:00 PM</span>
                                                <span className="text-[#6D5D8C] font-semibold text-[15px]">Focus Work Session</span>
                                            </div>
                                            <button className="bg-white/40 text-[#6D5D8C] font-bold text-[13px] px-4 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px] opacity-40" /> Skip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Evening Section */}
                            <div className="relative mb-6">
                                {/* Section Badge */}
                                <div className="ml-16 mb-2">
                                    <span className="bg-[#C4A4F8] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm inline-block">
                                        Evening
                                    </span>
                                </div>
                                
                                <div className="flex">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center border border-white/60 shadow-sm z-10 mr-4 flex-shrink-0 mt-2">
                                        <Dumbbell className="w-5 h-5 text-[#A78BFA]" fill="currentColor" />
                                    </div>

                                    {/* Cards container */}
                                    <div className="flex-1 space-y-3">
                                        {/* Walk */}
                                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex flex-col items-stretch">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">6:00 PM</span>
                                                    <span className="text-[#4B2C82] font-semibold text-[15px]">Walk</span>
                                                </div>
                                                <button className="bg-[#8B5CF6] text-white font-bold text-[13px] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                                                    <Check className="w-[14px] h-[14px]" /> Done
                                                </button>
                                            </div>
                                            
                                            {/* Subcard */}
                                            <div className="bg-white/40 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                                                <p className="text-[#6D5D8C] text-[13px] font-medium flex-1 leading-relaxed">
                                                    This short walk helps improve mood and energy levels.
                                                </p>
                                                <button className="bg-white text-[#6D5D8C] font-bold text-[13px] px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                                                    OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Night Section */}
                            <div className="relative mb-2">
                                {/* Section Badge */}
                                <div className="ml-16 mb-2">
                                    <span className="bg-[#C4A4F8] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm inline-block">
                                        Night
                                    </span>
                                </div>
                                
                                <div className="flex">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center border border-white/60 shadow-sm z-10 mr-4 flex-shrink-0 mt-2">
                                        <Moon className="w-5 h-5 text-[#FCD34D]" fill="currentColor" />
                                    </div>

                                    {/* Cards container */}
                                    <div className="flex-1 space-y-3">
                                        {/* Detox */}
                                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">10:30 PM</span>
                                                <span className="text-[#4B2C82] font-semibold text-[15px]">Digital Detox</span>
                                            </div>
                                            <button className="bg-[#B794F4]/30 text-[#8B5CF6] font-bold text-[13px] px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px]" /> Done
                                            </button>
                                        </div>

                                        {/* Sleep */}
                                        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex justify-between items-center opacity-80">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#8B5CF6] font-semibold text-sm w-[60px]">11:30 PM</span>
                                                <span className="text-[#6D5D8C] font-semibold text-[15px]">Sleep</span>
                                            </div>
                                            <button className="bg-white/40 text-[#6D5D8C] font-bold text-[13px] px-4 py-1.5 rounded-full flex items-center gap-1">
                                                <Check className="w-[14px] h-[14px] opacity-40" /> Skip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ViewPlanModal;
