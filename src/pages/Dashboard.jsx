import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Home, ClipboardCheck, BarChart2, Trophy, User, Sparkles, Target, Users } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';
import DailyUpdateModal from '../components/DailyUpdateModal';
import DailyUpdateWidget from '../components/DailyUpdateWidget';
import ViewPlanModal from '../components/ViewPlanModal';

const Dashboard = () => {
    const [username, setUsername] = useState('Alex');
    const [isDailyUpdateOpen, setIsDailyUpdateOpen] = useState(false);
    const [isViewPlanOpen, setIsViewPlanOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setUsername(user);
        }

        // Show daily update popup on first visit of the day
        const lastUpdateDate = localStorage.getItem('dailyUpdateDate');
        const today = new Date().toDateString();
        if (lastUpdateDate !== today) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsDailyUpdateOpen(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('faceTexture');
        localStorage.removeItem('customAvatar');
        localStorage.removeItem('selectedGender');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-32">
            
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute top-[45%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                     <path fill="currentColor" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                <svg className="absolute bottom-[0%] -left-[5%] w-[110%] h-auto opacity-50 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                     <path fill="currentColor" d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,224C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                
                {/* Sparkles */}
                <Sparkles className="absolute top-12 left-8 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute top-[25%] right-10 text-white opacity-60 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <Sparkles className="absolute top-1/2 left-12 text-white opacity-75 w-10 h-10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                <Sparkles className="absolute bottom-[30%] right-8 text-white opacity-80 w-6 h-6 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-10 w-full max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-16">
                
                {/* LEFT CONTENT AREA */}
                <div className="flex-1 flex flex-col w-full lg:w-1/2 xl:w-5/12">
                    {/* Header */}
                    <motion.header 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-center mb-8 lg:mb-12"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
                                <span className="text-white font-bold text-lg tracking-wider">AURA</span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                                <p className="text-xs text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                            </div>
                        </div>
                        <div 
                            className="relative cursor-pointer group"
                            onClick={() => setIsDailyUpdateOpen(true)}
                            title="Daily Check-In"
                        >
                            <div className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] border border-white/50 group-hover:bg-white/80 group-hover:scale-105 transition-all">
                                <Target className="w-6 h-6" />
                            </div>
                            <span className="absolute -top-1 -right-1 bg-[#EE4B2B] text-white text-[11px] font-bold w-4 h-4 rounded-full flex justify-center items-center border-2 border-[#dfcbf3] animate-pulse">
                            </span>
                        </div>
                    </motion.header>

                    {/* Greeting Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 lg:mb-10 w-full"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4B2C82] leading-tight mb-3 break-words overflow-hidden">
                            Good Morning, <br className="hidden xl:block"/>
                            <span className="text-[#6D28D9]">{username}</span>
                        </h1>
                        <p className="text-[#6D5D8C] text-lg sm:text-xl font-medium">Ready to make smart choices today?</p>
                    </motion.div>

                    {/* Mobile Avatar (Visible only on small screens) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="block lg:hidden w-full h-[400px] mb-8 relative mt-4"
                    >
                        <div className="absolute inset-0 top-[10%] left-[10%] w-[80%] h-[80%] rounded-full bg-white/30 blur-3xl -z-10"></div>
                        <div className="absolute inset-0 pointer-events-auto">
                            <AvatarViewer readOnlyMode={true} playWave={false} />
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none z-10">
                            <span className="bg-white/80 backdrop-blur-md border border-white/50 px-5 py-2.5 rounded-full text-sm text-[#5B3A8F] font-bold shadow-md">
                                ✨ Let's crush today's goals! ✨
                            </span>
                        </div>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mb-10 lg:mb-12">
                        {/* Today's Plan */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col h-full hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📋</span>
                                <h3 className="font-bold text-[#5B3A8F] text-xl">Today's Plan</h3>
                            </div>
                            <p className="text-[#6D5D8C] text-sm lg:text-[15px] leading-relaxed flex-1 font-medium mb-6">
                                You have 6 planned activities today. Keep up the great work!
                            </p>
                            <button 
                                onClick={() => setIsViewPlanOpen(true)}
                                className="w-full py-3.5 lg:py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 transition-opacity text-white rounded-2xl text-[15px] font-bold shadow-md whitespace-nowrap tracking-wide"
                            >
                                View Plan
                            </button>
                        </motion.div>

                        {/* Habit Streak */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col h-full hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">🔥</span>
                                <h3 className="font-bold text-[#5B3A8F] text-xl">Habit Streak</h3>
                            </div>
                            <div className="flex-1 mb-6">
                                <p className="text-[#6D5D8C] text-sm lg:text-[15px] leading-snug font-medium mb-1">
                                    Exercise Streak
                                </p>
                                <p className="text-[#4B2C82] font-black text-2xl">
                                    5 Days 🔥
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate('/log-habit')}
                                className="w-full py-3.5 lg:py-4 bg-white border-2 border-purple-100 hover:bg-purple-50 transition-colors text-[#6D5D8C] rounded-2xl text-[15px] font-bold shadow-sm whitespace-nowrap tracking-wide"
                            >
                                Log Habit
                            </button>
                        </motion.div>

                        {/* Parallel Simulation */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col h-full hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-3xl group-hover:scale-110 transition-transform">🔮</div>
                                <h3 className="font-bold text-[#5B3A8F] text-xl">Parallel Simulation</h3>
                            </div>
                            <p className="text-[#6D5D8C] text-sm lg:text-[15px] flex-1 font-medium mb-6 leading-relaxed">
                                Explore your future paths <br/> <span className="font-black text-[#4B2C82] text-xl">Simulate Now ✨</span>
                            </p>
                            <button 
                                onClick={() => navigate('/parallel-simulation')}
                                className="w-full py-3.5 lg:py-4 bg-white border-2 border-purple-100 hover:bg-purple-50 transition-colors text-[#6D5D8C] rounded-2xl text-[15px] font-bold shadow-sm whitespace-nowrap tracking-wide">
                                Run Simulation
                            </button>
                        </motion.div>

                        {/* Decisions Pending */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col h-full hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">☑️</span>
                                <h3 className="font-bold text-[#5B3A8F] text-xl">Decisions Pending</h3>
                            </div>
                            <p className="text-[#6D5D8C] text-sm lg:text-[15px] flex-1 font-medium mb-6">
                                <span className="font-black text-[#4B2C82] text-xl text-[#EE4B2B]">2 decisions</span> waiting
                            </p>
                            <button 
                                onClick={() => navigate('/decisions')}
                                className="w-full py-3.5 lg:py-4 bg-white border-2 border-purple-100 hover:bg-purple-50 transition-colors text-[#6D5D8C] rounded-2xl text-[15px] font-bold shadow-sm whitespace-nowrap tracking-wide">
                                View Decisions
                            </button>
                        </motion.div>
                    </div>

                    
                    {/* Mobile Quick Actions (Visible only on small screens) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="block lg:hidden mb-10"
                    >
                        <h3 className="text-[#5B3A8F] font-extrabold mb-5 tracking-wide text-xl">Quick Actions</h3>
                        <div className="flex justify-between gap-3">
                            <div 
                                onClick={() => navigate('/compare-options')}
                                className="flex flex-col items-center gap-3 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-transparent flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform p-3">
                                    <span className="text-4xl">🥗</span>
                                </div>
                                <span className="text-[12px] text-[#5B3A8F] font-bold leading-tight text-center">What should<br/> I eat</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/cost-analysis')}
                                className="flex flex-col items-center gap-3 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-transparent flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform p-3">
                                    <span className="text-4xl">📉</span>
                                </div>
                                <span className="text-[12px] text-[#5B3A8F] font-bold leading-tight text-center">Cost Analysis</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/log-expense')}
                                className="flex flex-col items-center gap-3 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-transparent flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform p-3">
                                    <span className="text-4xl">🗂️</span>
                                </div>
                                <span className="text-[12px] text-[#5B3A8F] font-bold leading-tight text-center">Log expense</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/chat')}
                                className="flex flex-col items-center gap-3 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-transparent flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform p-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-[#9b6cf6] to-[#C084FC] flex justify-center items-center">
                                        <span className="text-white font-black text-2xl">A</span>
                                    </div>
                                </div>
                                <span className="text-[12px] text-[#5B3A8F] font-bold leading-tight text-center">Ask AURA</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT CONTENT AREA: Desktop Avatar & Quick Actions */}
                <div className="hidden lg:flex flex-col w-full lg:w-1/2 xl:w-7/12 items-center xl:pl-8">
                    
                    {/* ENLARGED AVATAR */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full h-[650px] xl:h-[750px] relative flex flex-col items-center justify-center mb-0 mt-0"
                    >
                        {/* Dramatic lighting behind avatar */}
                        <div className="absolute inset-0 top-[20%] left-[10%] w-[80%] h-[70%] rounded-full bg-white/40 blur-[100px] -z-10 pointer-events-none"></div>
                        
                        <div className="absolute inset-0 pointer-events-auto">
                            <AvatarViewer readOnlyMode={true} playWave={false} />
                        </div>

                        <motion.div 
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1, type: "spring", stiffness: 100 }}
                            className="absolute top-[35%] right-0 lg:-right-4 xl:-right-10 z-20 bg-white/90 backdrop-blur-xl px-7 py-4 rounded-[28px] shadow-[0_12px_40px_rgba(150,110,200,0.2)] border border-white/80 text-center pointer-events-none"
                        >
                            <p className="text-[#4B2C82] font-black text-[22px] mb-1">Lookin' good! ✨</p>
                            <p className="text-[#6D28D9] font-semibold text-[15px]">Let's crush today's goals.</p>
                        </motion.div>
                    </motion.div>

                    {/* DESKTOP QUICK ACTIONS */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="w-full xl:px-4 mb-20 -mt-16 xl:-mt-24 relative z-30"
                    >
                        <h3 className="text-[#5B3A8F] font-extrabold mb-6 tracking-wide text-[22px]">Quick Actions</h3>
                        
                        {/* Styled exact match to screenshot */}
                        <div className="flex justify-between gap-5 xl:gap-8">
                            
                            <div 
                                onClick={() => navigate('/compare-options')}
                                className="flex flex-col items-center gap-4 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-[32px] shadow-[0_4px_20px_rgba(150,110,200,0.1)] flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <span className="text-[56px] xl:text-[64px]">🥗</span>
                                </div>
                                <span className="text-[14px] xl:text-[16px] text-[#5B3A8F] font-bold leading-[1.3] text-center">What should<br/> I eat</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/cost-analysis')}
                                className="flex flex-col items-center gap-4 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-[32px] shadow-[0_4px_20px_rgba(150,110,200,0.1)] flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <span className="text-[56px] xl:text-[64px]">📉</span>
                                </div>
                                <span className="text-[14px] xl:text-[16px] text-[#5B3A8F] font-bold leading-[1.3] text-center">Cost Analysis</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/log-expense')}
                                className="flex flex-col items-center gap-4 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-[32px] shadow-[0_4px_20px_rgba(150,110,200,0.1)] flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <span className="text-[56px] xl:text-[64px]">🗂️</span>
                                </div>
                                <span className="text-[14px] xl:text-[16px] text-[#5B3A8F] font-bold leading-[1.3] text-center mt-2 xl:mt-3">Log expense</span>
                            </div>
                            
                            <div 
                                onClick={() => navigate('/chat')}
                                className="flex flex-col items-center gap-4 cursor-pointer group flex-1"
                            >
                                <div className="w-full aspect-square bg-white rounded-[32px] shadow-[0_4px_20px_rgba(150,110,200,0.1)] flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-[85px] h-[85px] xl:w-[100px] xl:h-[100px] rounded-full bg-[#A76DF8] flex justify-center items-center shadow-inner">
                                        <span className="text-white font-black text-[32px] xl:text-[40px]">A</span>
                                    </div>
                                </div>
                                <span className="text-[14px] xl:text-[16px] text-[#5B3A8F] font-bold leading-[1.3] text-center mt-2 xl:mt-3">Ask AURA</span>
                            </div>

                        </div>
                    </motion.div>
                </div>
                
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
                <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
                    <button className="flex flex-col items-center gap-2 text-[#8B5CF6] transition-transform hover:scale-105">
                        <Home className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2.5} />
                        <span className="text-[12px] font-black tracking-wide">Home</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/consultants')}
                        className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105 relative">
                        <Users className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Consultants</span>
                    </button>
                    
                    <button onClick={() => navigate('/trackers')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <BarChart2 className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Trackers</span>
                    </button>
                    
                    <button onClick={() => navigate('/progress')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <Trophy className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Progress</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/profile')} 
                        className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105"
                    >
                        <User className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Profile</span>
                    </button>
                </div>
            </div>

            <DailyUpdateModal isOpen={isDailyUpdateOpen} onClose={() => setIsDailyUpdateOpen(false)} />
            <ViewPlanModal isOpen={isViewPlanOpen} onClose={() => setIsViewPlanOpen(false)} />

        </div>
    );
};

export default Dashboard;
