import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Heart, Brain, Briefcase, Wallet, Users, CheckCircle, Moon, Zap, Target, Sparkles } from 'lucide-react';

const DailyUpdateModal = ({ isOpen, onClose }) => {
    const [mood, setMood] = useState(2); // 0: Bad, 1: Okay, 2: Good, 3: Amazing
    const [sleepHours, setSleepHours] = useState('7.5');
    const [energyLevel, setEnergyLevel] = useState(2); // 0: Low, 1: Medium, 2: High
    const [mainConcern, setMainConcern] = useState(null);
    const [task, setTask] = useState('');

    useEffect(() => {
        if (isOpen) {
            const savedTask = localStorage.getItem('dailyTask') || '';
            setTask(savedTask);
        }
    }, [isOpen]);

    const concerns = [
        { id: 'stress', label: 'Stress', icon: Brain, color: 'text-red-400' },
        { id: 'workload', label: 'Workload', icon: Briefcase, color: 'text-blue-400' },
        { id: 'health', label: 'Health', icon: Heart, color: 'text-red-500' },
        { id: 'money', label: 'Money', icon: Wallet, color: 'text-amber-600' },
        { id: 'relationships', label: 'Relationships', icon: Users, color: 'text-pink-500' },
        { id: 'none', label: 'No concerns', icon: CheckCircle, color: 'text-purple-500' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save the daily priority task
        if (task.trim()) {
            localStorage.setItem('dailyTask', task);
            // Time is removed based on new design, so maybe clear it or leave it
            localStorage.removeItem('dailyTaskTime');
        }

        // Technically we can save the other states like mood, sleep, etc..
        // But for UI purpose, we just need to ensure the task is saved for the widget.
        localStorage.setItem('dailyUpdateDate', new Date().toDateString());
        
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-indigo-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-b from-[#eadefa] to-[#dfcbf3] w-full max-w-lg rounded-[32px] shadow-[0_20px_60px_rgba(91,58,143,0.3)] border border-white/60 relative my-8"
                        >
                            {/* Decorative Sparkles */}
                            <div className="absolute top-8 right-16 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] animate-pulse"></div>
                            <div className="absolute top-16 right-48 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                            {/* Header */}
                            <div className="p-8 pb-4 relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md">
                                            <span className="text-white font-bold text-sm tracking-widest">AURA</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                                            <p className="text-[10px] text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                                        </div>
                                    </div>
                                    <button onClick={onClose} className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] hover:bg-white transition-colors relative">
                                        <Bell className="w-5 h-5" />
                                        <span className="absolute -top-1 -right-1 bg-[#EE4B2B] w-3.5 h-3.5 rounded-full border-2 border-[#dfcbf3]"></span>
                                    </button>
                                </div>

                                <h1 className="text-3xl font-black text-[#4B2C82] mb-1">Daily Check-In</h1>
                                <p className="text-[#6D5D8C] text-lg font-medium">How are you feeling today?</p>
                            </div>

                            <div className="px-6 space-y-4">
                                {/* 1. Mood */}
                                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-black text-xs">1</div>
                                        <h3 className="font-bold text-[#5B3A8F]">Mood</h3>
                                    </div>
                                    <div className="relative pt-6 pb-2">
                                        <input 
                                            type="range" 
                                            min="0" max="3" 
                                            value={mood} 
                                            onChange={(e) => setMood(parseInt(e.target.value))}
                                            className="w-full h-1 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                                        />
                                        <div className="flex justify-between w-full absolute top-0 -mt-2 pointer-events-none px-1">
                                            <span className="text-3xl filter drop-shadow-sm transition-transform hover:scale-110">😠</span>
                                            <span className="text-3xl filter drop-shadow-sm transition-transform hover:scale-110">😐</span>
                                            <span className="text-3xl filter drop-shadow-sm transition-transform hover:scale-110">🙂</span>
                                            <span className="text-3xl filter drop-shadow-sm transition-transform hover:scale-110">😍</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-semibold text-[#6D5D8C] mt-2">
                                            <span>Bad</span>
                                            <span className="ml-2">Okay</span>
                                            <span className="mr-1">Good</span>
                                            <span>Amazing</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* 2. Sleep Hours */}
                                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Moon className="w-5 h-5 text-[#8B5CF6]" />
                                            <h3 className="font-bold text-[#5B3A8F] text-sm">Sleep Hours</h3>
                                        </div>
                                        <p className="text-[#6D5D8C] text-xs font-medium mb-3">How many hours did you sleep last night?</p>
                                        <div className="bg-white rounded-xl p-2 flex items-center shadow-sm">
                                            <input 
                                                type="number" 
                                                step="0.5"
                                                value={sleepHours}
                                                onChange={(e) => setSleepHours(e.target.value)}
                                                className="w-16 bg-transparent text-[#4B2C82] font-black text-lg outline-none pl-2"
                                            />
                                            <span className="text-[#A78BFA] text-sm font-semibold border-l border-purple-100 pl-3">hours</span>
                                        </div>
                                    </div>

                                    {/* 3. Energy Level */}
                                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-5 h-5 text-amber-500" />
                                            <h3 className="font-bold text-[#5B3A8F] text-sm">Energy Level</h3>
                                        </div>
                                        <div className="mt-auto pb-2">
                                            <input 
                                                type="range" 
                                                min="0" max="2" 
                                                value={energyLevel} 
                                                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                                                className="w-full h-1.5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 rounded-lg appearance-none cursor-pointer accent-white drop-shadow-sm"
                                                style={{
                                                     WebkitAppearance: 'none',
                                                }}
                                            />
                                            {/* Custom thumbnail styles would typically go into a css file, but tailwind accent works mostly well. */}
                                            <div className="flex justify-between text-[11px] font-semibold text-[#6D5D8C] mt-3">
                                                <span>Low</span>
                                                <span>Medium</span>
                                                <span>High</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Main Concern Today */}
                                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Heart className="w-5 h-5 text-[#8B5CF6]" />
                                        <h3 className="font-bold text-[#5B3A8F] text-sm">Main Concern Today</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                        {concerns.slice(0, 4).map((c) => {
                                            const IconComp = c.icon;
                                            return (
                                                <button 
                                                    key={c.id}
                                                    onClick={() => setMainConcern(c.id)}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${mainConcern === c.id ? 'bg-white border-[#8B5CF6] shadow-sm' : 'bg-white/50 border-transparent hover:bg-white/70'}`}
                                                >
                                                    <IconComp className={`w-6 h-6 mb-1 ${c.color}`} />
                                                    <span className="text-[11px] font-bold text-[#6D5D8C]">{c.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                                        {concerns.slice(4).map((c) => {
                                            const IconComp = c.icon;
                                            return (
                                                <button 
                                                    key={c.id}
                                                    onClick={() => setMainConcern(c.id)}
                                                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all ${mainConcern === c.id ? 'bg-white border-[#8B5CF6] shadow-sm' : 'bg-white/50 border-transparent hover:bg-white/70'}`}
                                                >
                                                    <IconComp className={`w-5 h-5 ${c.color}`} />
                                                    <span className="text-[12px] font-bold text-[#6D5D8C]">{c.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 5. Priority Task (User explicitly asked to include this here) */}
                                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80 mb-2">
                                     <div className="flex items-center gap-2 mb-3">
                                        <Target className="w-5 h-5 text-[#8B5CF6]" />
                                        <h3 className="font-bold text-[#5B3A8F] text-sm">Priority Task for the Day</h3>
                                    </div>
                                    <input
                                        type="text"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        placeholder="e.g. I have a meeting at 5 pm"
                                        className="w-full bg-white border border-purple-100 text-[#4B2C82] text-[14px] font-semibold py-3.5 px-4 rounded-2xl focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all placeholder:text-[#A78BFA] shadow-inner"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pb-6 pt-2">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 transition-all text-white rounded-2xl text-[16px] font-bold shadow-md tracking-wide"
                                    >
                                        Submit Check-In
                                    </button>
                                    
                                    <div className="flex items-center justify-center gap-3 mt-4 text-[#8B5CF6] opacity-80">
                                        <Sparkles className="w-5 h-5" />
                                        <p className="text-xs font-semibold text-center">
                                            Thanks for checking in.<br/>AURA will adjust your daily plan today.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DailyUpdateModal;
