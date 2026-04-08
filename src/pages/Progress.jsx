import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Users, BarChart2, Trophy, User, ArrowLeft, 
    Sparkles, Flame, Target, Brain, DollarSign, Activity, ChevronRight
} from 'lucide-react';

const Progress = () => {
    const navigate = useNavigate();
    
    // Screens: 'dashboard' | 'habit' | 'financial' | 'mood' | 'goal'
    const [currentScreen, setCurrentScreen] = useState('dashboard');
    
    const renderBottomNav = () => (
        <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
            <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
                <button onClick={() => navigate('/')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <Home className="w-[28px] h-[28px]" strokeWidth={2.5} />
                    <span className="text-[12px] font-bold tracking-wide">Home</span>
                </button>
                <button onClick={() => navigate('/consultants')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <Users className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Consultants</span>
                </button>
                <button onClick={() => navigate('/trackers')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <BarChart2 className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Trackers</span>
                </button>
                <button onClick={() => setCurrentScreen('dashboard')} className="flex flex-col items-center gap-2 text-[#8B5CF6] transition-transform hover:scale-105 relative">
                    <Trophy className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2} />
                    <span className="text-[12px] font-black tracking-wide">Progress</span>
                </button>
                <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <User className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Profile</span>
                </button>
            </div>
        </div>
    );

    // SCREEN 1: PROGRESS DASHBOARD
    const renderDashboard = () => (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md mx-auto relative z-10 pb-32"
        >
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-[#5B3A8F] tracking-tight leading-tight">Your Progress<br/>Overview</h1>
                <Sparkles className="text-[#8B5CF6] w-6 h-6 animate-pulse" />
            </header>

            <div className="flex flex-col gap-4">
                {/* Habit Progress Card */}
                <div 
                    onClick={() => setCurrentScreen('habit')}
                    className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex items-center gap-5 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF1F2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Flame className="w-7 h-7 text-[#E11D48]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[#4B2C82] text-xl">Habit Progress</h3>
                        <p className="text-[#6D5D8C] text-[13px] font-semibold mt-1">See your consistency over time</p>
                    </div>
                    <ChevronRight className="text-[#A78BFA] w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Financial Progress Card */}
                <div 
                    onClick={() => setCurrentScreen('financial')}
                    className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex items-center gap-5 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <DollarSign className="w-7 h-7 text-[#16A34A]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[#4B2C82] text-xl">Financial Progress</h3>
                        <p className="text-[#6D5D8C] text-[13px] font-semibold mt-1">Track your spending and savings</p>
                    </div>
                    <ChevronRight className="text-[#A78BFA] w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Mood Progress Card */}
                <div 
                    onClick={() => setCurrentScreen('mood')}
                    className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex items-center gap-5 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Activity className="w-7 h-7 text-[#2563EB]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[#4B2C82] text-xl">Mood Progress</h3>
                        <p className="text-[#6D5D8C] text-[13px] font-semibold mt-1">Understand your emotional patterns</p>
                    </div>
                    <ChevronRight className="text-[#A78BFA] w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Goal Progress Card */}
                <div 
                    onClick={() => setCurrentScreen('goal')}
                    className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex items-center gap-5 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Target className="w-7 h-7 text-[#D97706]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[#4B2C82] text-xl">Goal Progress</h3>
                        <p className="text-[#6D5D8C] text-[13px] font-semibold mt-1">Monitor your life goals</p>
                    </div>
                    <ChevronRight className="text-[#A78BFA] w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );

    // SCREEN 2: HABIT PROGRESS
    const renderHabitProgress = () => {
        // Mock data for weekly habit completions
        const weeklyData = [
            { day: 'Mon', count: 3 },
            { day: 'Tue', count: 5 },
            { day: 'Wed', count: 4 },
            { day: 'Thu', count: 6 },
            { day: 'Fri', count: 2 },
            { day: 'Sat', count: 7 },
            { day: 'Sun', count: 5 },
        ];
        const maxCount = 7;

        return (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32"
            >
                <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-black text-[#5B3A8F]">Habit Progress</h1>
                </header>

                <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 lg:p-8 shadow-sm border border-white flex flex-col items-center">
                    <h3 className="font-bold text-[#4B2C82] text-lg self-start mb-6">Weekly Completion</h3>
                    
                    {/* Bar Chart Container */}
                    <div className="flex justify-between items-end h-48 w-full px-2 mb-6">
                        {weeklyData.map((data, index) => {
                            const heightPercentage = (data.count / maxCount) * 100;
                            return (
                                <div key={index} className="flex flex-col items-center gap-2 w-8 group">
                                    <span className="text-[#8B5CF6] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        {data.count}
                                    </span>
                                    <div className="w-full h-32 bg-[#F5F3FF] rounded-t-lg rounded-b-lg relative overflow-hidden flex items-end">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${heightPercentage}%` }}
                                            transition={{ duration: 0.8, delay: index * 0.1 }}
                                            className="w-full bg-gradient-to-t from-[#8B5CF6] to-[#C084FC] rounded-t-lg rounded-b-lg"
                                        />
                                    </div>
                                    <span className="text-[#6D5D8C] text-xs font-semibold">{data.day}</span>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="w-full bg-[#FFF1F2] rounded-2xl p-5 border border-[#FFE4E6] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🔥</span>
                            <span className="font-black text-[#E11D48] text-lg">Current Streak</span>
                        </div>
                        <span className="font-black text-[#4B2C82] text-2xl">12 days</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    // SCREEN 3: FINANCIAL PROGRESS
    const renderFinancialProgress = () => {
        // Mock data
        const total = 4250;
        // segments: [percentage, color, label]
        const segments = [
            { id: 1, percent: 45, color: '#E11D48', label: 'Food', amount: 1912 },
            { id: 2, percent: 30, color: '#2563EB', label: 'Travel', amount: 1275 },
            { id: 3, percent: 15, color: '#16A34A', label: 'Shopping', amount: 638 },
            { id: 4, percent: 10, color: '#D97706', label: 'Other', amount: 425 },
        ];

        // Create conic gradient stops
        let currentPos = 0;
        const conicGradientStops = segments.map(seg => {
            const start = currentPos;
            const end = currentPos + seg.percent;
            currentPos = end;
            return `${seg.color} ${start}% ${end}%`;
        }).join(', ');

        return (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32"
            >
                <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-black text-[#5B3A8F]">Financial Progress</h1>
                </header>

                <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 lg:p-8 shadow-sm border border-white flex flex-col items-center">
                    <h3 className="font-bold text-[#4B2C82] text-lg self-start mb-6">Spending Breakdown</h3>
                    
                    {/* Pure CSS Pie Chart */}
                    <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="w-48 h-48 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.1)] mb-8 relative flex items-center justify-center"
                        style={{ background: `conic-gradient(${conicGradientStops})` }}
                    >
                        {/* Inner circle for donut hole */}
                        <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                            <span className="text-[#6D5D8C] text-xs font-bold uppercase tracking-widest mb-1">Total</span>
                            <span className="font-black text-[#4B2C82] text-[22px] leading-none">₹{total}</span>
                        </div>
                    </motion.div>

                    <div className="w-full bg-[#EFF6FF] rounded-2xl p-5 border border-[#DBEAFE] mb-6 text-center">
                        <p className="font-bold text-[#1E3A8A] text-lg">Total spent this month: <span className="font-black tracking-wide">₹{total}</span></p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                        {segments.map(seg => (
                            <div key={seg.id} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                                <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: seg.color }}></span>
                                <div>
                                    <p className="text-[#4B2C82] font-bold text-[13px]">{seg.label}</p>
                                    <p className="text-[#6D5D8C] text-xs font-semibold">₹{seg.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    // SCREEN 4: MOOD PROGRESS
    const renderMoodProgress = () => {
        // Mock data
        const data = [7, 5, 8, 6, 9, 8, 7]; // values out of 10
        const avgMood = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        
        // SVG dimensions
        const width = 300;
        const height = 150;
        const padding = 20;

        // Calculate points
        const getX = (index) => padding + (index * ((width - padding * 2) / (data.length - 1)));
        const getY = (value) => height - padding - ((value / 10) * (height - padding * 2));

        const points = data.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');

        return (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32"
            >
                <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-black text-[#5B3A8F]">Mood Trends</h1>
                </header>

                <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 lg:p-8 shadow-sm border border-white flex flex-col items-center">
                    <h3 className="font-bold text-[#4B2C82] text-lg self-start mb-6">Last 7 Days</h3>
                    
                    {/* SVG Line Chart */}
                    <div className="w-full flex justify-center mb-4 relative">
                        <svg width={width} height={height} className="overflow-visible">
                            <defs>
                                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8B5CF6" />
                                    <stop offset="100%" stopColor="#EC4899" />
                                </linearGradient>
                            </defs>
                            
                            {/* Grid lines */}
                            <line x1={padding} y1={getY(10)} x2={width-padding} y2={getY(10)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1={padding} y1={getY(5)} x2={width-padding} y2={getY(5)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1={padding} y1={getY(0)} x2={width-padding} y2={getY(0)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

                            <motion.polyline
                                initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                points={points}
                                fill="none"
                                stroke="url(#gradientLine)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            
                            {data.map((val, i) => (
                                <motion.circle 
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1 + (i * 0.1) }}
                                    cx={getX(i)} 
                                    cy={getY(val)} 
                                    r="5" 
                                    fill="white" 
                                    stroke="#EC4899" 
                                    strokeWidth="3" 
                                />
                            ))}
                        </svg>
                    </div>

                    {/* X-axis labels */}
                    <div className="w-full flex justify-between px-6 mb-8 text-[#6D5D8C] font-bold text-xs uppercase">
                        {days.map((day, i) => <span key={i}>{day}</span>)}
                    </div>
                    
                    <div className="w-full bg-gradient-to-br from-[#FDF2F8] to-[#FCE7F3] rounded-2xl p-5 border border-[#FBCFE8] text-center">
                        <p className="font-bold text-[#BE185D] text-lg">
                            Average mood this week: <span className="font-black mx-1 text-2xl">{avgMood}</span> / 10
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    };

    // SCREEN 5: GOAL PROGRESS
    const renderGoalProgress = () => {
        const goals = [
            { id: 1, name: 'Health', percent: 65, color: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50' },
            { id: 2, name: 'Finance', percent: 40, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
            { id: 3, name: 'Productivity', percent: 80, color: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50' },
            { id: 4, name: 'Mental Wellness', percent: 55, color: 'from-violet-400 to-purple-500', bg: 'bg-violet-50' },
        ];

        return (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32"
            >
                <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-black text-[#5B3A8F]">Goal Completion</h1>
                </header>

                <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 lg:p-8 shadow-sm border border-white flex flex-col gap-6">
                    {goals.map((goal, index) => (
                        <div key={goal.id} className={`${goal.bg} rounded-2xl p-5 shadow-sm`}>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-[#4B2C82] text-[15px]">{goal.name}</h3>
                                <span className="font-black text-[#4B2C82] text-lg">{goal.percent}%</span>
                            </div>
                            <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner flex">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${goal.percent}%` }}
                                    transition={{ duration: 1, delay: index * 0.2, type: "spring", stiffness: 50 }}
                                    className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pt-10 px-6 sm:px-10 lg:px-16">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <AnimatePresence mode="wait">
                {currentScreen === 'dashboard' && <motion.div key="dashboard">{renderDashboard()}</motion.div>}
                {currentScreen === 'habit' && <motion.div key="habit">{renderHabitProgress()}</motion.div>}
                {currentScreen === 'financial' && <motion.div key="financial">{renderFinancialProgress()}</motion.div>}
                {currentScreen === 'mood' && <motion.div key="mood">{renderMoodProgress()}</motion.div>}
                {currentScreen === 'goal' && <motion.div key="goal">{renderGoalProgress()}</motion.div>}
            </AnimatePresence>

            {renderBottomNav()}
        </div>
    );
};

export default Progress;
