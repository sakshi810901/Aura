import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CostAnalysis = () => {
    const navigate = useNavigate();

    // Staggered animation for list items
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-10">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[5%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute top-[35%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
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

            <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-10 w-full mx-auto min-h-screen flex flex-col gap-6">
                
                {/* Header */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-6"
                >
                    <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate('/dashboard')}
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
                        >
                            <span className="text-white font-bold text-lg tracking-wider">AURA</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                            <p className="text-xs text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                        </div>
                    </div>
                    <div className="relative group cursor-pointer">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] border border-white/50"
                        >
                            <Bell className="w-6 h-6" />
                        </motion.div>
                        <span className="absolute -top-1 -right-1 bg-[#ee7380] text-white text-[12px] font-bold w-5 h-5 rounded-full flex justify-center items-center border-2 border-[#dfcbf3]">
                            2
                        </span>
                    </div>
                </motion.header>

                {/* Title */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-2"
                >
                    <h1 className="text-3xl lg:text-5xl font-black text-[#4B2C82] leading-tight mb-2">
                        Real Cost of Your Habits
                    </h1>
                    <p className="text-[#6D5D8C] text-lg lg:text-xl font-medium">See how small choices impact your life dynamically.</p>
                </motion.div>

                {/* Cards Grid Container - Full Width dynamically adjusts */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
                >
                    {/* Money Wasted Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/60 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.1)] border border-white/70 flex flex-col lg:col-span-2 relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-all"
                    >
                        <h3 className="text-[#4B2C82] text-xl lg:text-2xl font-bold mb-1">Money Wasted</h3>
                        <p className="text-[#6D5D8C] text-md lg:text-lg font-medium mb-4">Junk food this month</p>
                        
                        <div className="bg-white/50 rounded-2xl p-6 flex flex-col relative overflow-hidden min-h-[160px] lg:min-h-[200px] border border-white/50 shadow-inner">
                            <motion.h2 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="text-4xl lg:text-5xl font-black text-[#4B2C82] z-10"
                            >
                                ₹ 3200
                            </motion.h2>

                            {/* Animated Visual chart */}
                            <div className="absolute right-0 bottom-0 w-[85%] h-full pointer-events-none z-0">
                                <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" className="translate-y-2">
                                    <motion.path 
                                        d="M0,80 L20,75 L40,85 L60,65 L80,70 L100,50 L120,60 L140,40 L160,45 L180,20 L200,10 L200,100 L0,100 Z" 
                                        fill="url(#purpleGradient)"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                                    />
                                    <motion.path 
                                        d="M0,80 L20,75 L40,85 L60,65 L80,70 L100,50 L120,60 L140,40 L160,45 L180,20 L200,10" 
                                        fill="none" 
                                        stroke="#8B5CF6" 
                                        strokeWidth="3.5"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                    />
                                    {[
                                        {cx: 0, cy: 80}, {cx: 20, cy: 75}, {cx: 40, cy: 85}, 
                                        {cx: 60, cy: 65}, {cx: 80, cy: 70}, {cx: 100, cy: 50}, 
                                        {cx: 120, cy: 60}, {cx: 140, cy: 40}, {cx: 160, cy: 45}, 
                                        {cx: 180, cy: 20}, {cx: 200, cy: 10}
                                    ].map((pt, i) => (
                                        <motion.circle 
                                            key={i}
                                            cx={pt.cx} cy={pt.cy} r="4" fill="#6D28D9"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.8 + (i * 0.1), type: "spring", stiffness: 200 }}
                                        />
                                    ))}
                                    <defs>
                                        <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8"/>
                                            <stop offset="100%" stopColor="#9F7AEA" stopOpacity="0.05"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute left-6 bottom-4 text-3xl z-10 flex gap-2"
                            >
                                <motion.span whileHover={{ y: -5, scale: 1.2, rotate: -10 }}>🍔</motion.span>
                                <motion.span whileHover={{ y: -5, scale: 1.2, rotate: 10 }}>🍟</motion.span>
                                <motion.span whileHover={{ y: -5, scale: 1.2 }}>🥤</motion.span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Time Lost Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/60 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.1)] border border-white/70 relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-all lg:col-span-1"
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <motion.div 
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#A78BFA] p-1.5 rounded-full text-white"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </motion.div>
                            <h3 className="text-[#4B2C82] text-xl lg:text-2xl font-bold">Time Lost</h3>
                        </div>
                        <p className="text-[#6D5D8C] text-md lg:text-lg font-medium mb-4">Social media scrolling</p>
                        
                        <div className="bg-white/50 rounded-2xl p-6 flex flex-col justify-center relative border border-white/50 z-10 min-h-[140px]">
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-4xl lg:text-5xl font-black text-[#5B3A8F]"
                            >
                                38h 
                                <span className="text-xl lg:text-2xl text-[#6D5D8C] font-semibold block mt-1">hours this month</span>
                            </motion.h2>
                        </div>
                        
                        {/* Animated Circle Chart */}
                        <div className="absolute right-6 bottom-10 lg:bottom-16 w-32 h-32 lg:w-40 lg:h-40 z-20">
                            <div className="w-full h-full rounded-full border-[20px] lg:border-[24px] border-[#ede9fe] relative flex items-center justify-center shadow-inner overflow-hidden">
                                
                                <motion.div 
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 15, opacity: 1 }}
                                    transition={{ duration: 1.5, type: 'spring', delay: 0.6 }}
                                    className="absolute inset-0 rounded-full border-[20px] lg:border-[24px] border-[#A78BFA] border-t-transparent border-l-transparent transform rotate-45 backdrop-blur-md"
                                ></motion.div>
                                
                                <motion.div 
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: -15, opacity: 0.8 }}
                                    transition={{ duration: 1.2, delay: 0.8 }}
                                    className="absolute inset-0 rounded-full border-[20px] lg:border-[24px] border-[#C084FC] border-b-transparent border-r-transparent transform -rotate-[15deg]"
                                ></motion.div>
                                
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 1.2 }}
                                    className="bg-white rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center shadow-md z-30 font-black text-[#5B3A8F] text-xl lg:text-2xl"
                                >
                                    38h
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Energy Drain Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/60 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.1)] border border-white/70 relative overflow-hidden lg:col-span-1"
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <motion.div 
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-[#8B5CF6] p-1.5 rounded-full text-white"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </motion.div>
                            <h3 className="text-[#4B2C82] text-xl lg:text-2xl font-bold">Energy Drain</h3>
                        </div>
                        <p className="text-[#6D5D8C] text-md lg:text-lg font-medium mb-12 lg:mb-16 pr-24">Late nights reduced your energy by <span className="font-bold text-[#4B2C82]">22%</span></p>

                        {/* Animated Gauge Chart */}
                        <div className="absolute right-6 bottom-4 w-40 h-20 lg:w-48 lg:h-24 z-20 overflow-hidden group-hover:scale-105 transition-transform">
                            {/* Gauge Background */}
                            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-[16px] xl:border-[20px] border-[#fdeadb]/80 border-b-transparent border-l-transparent transform rotate-45 relative flex flex-col justify-start items-center">
                                {/* Gauge Fill Animate */}
                                <motion.div 
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 10, opacity: 1 }} // partially filled relative to rotate-45
                                    transition={{ duration: 1.5, type: 'spring', delay: 0.7 }}
                                    className="absolute -inset-[16px] xl:-inset-[20px] rounded-full border-[16px] xl:border-[20px] border-[#C084FC] border-b-transparent border-l-transparent border-r-transparent rotate-0"
                                    style={{ transformOrigin: 'center' }}
                                ></motion.div>
                            </div>
                            
                            {/* Value Display */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-t-full w-24 h-12 flex items-end justify-center pb-1 font-black text-[#5B3A8F] text-2xl lg:text-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.08)] z-10"
                            >
                                -22%
                            </motion.div>
                            
                            {/* Animated Needle */}
                            <motion.div 
                                initial={{ rotate: -90 }}
                                animate={{ rotate: -15 }}
                                transition={{ duration: 1.5, type: 'spring', bounce: 0.5, delay: 0.9 }}
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[3px] h-10 lg:h-12 bg-[#8B5CF6] origin-bottom rounded-full shadow-md z-20"
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* AI Insight Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.1)] border border-white/80 lg:col-span-2 flex items-center"
                    >
                        <div className="flex items-start lg:items-center gap-5 lg:gap-6">
                            <motion.div 
                                animate={{ boxShadow: ['0 4px 15px rgba(139,92,246,0.3)', '0 4px 25px rgba(139,92,246,0.6)', '0 4px 15px rgba(139,92,246,0.3)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-gradient-to-tr from-[#9b6cf6] to-[#C084FC] p-4 lg:p-5 rounded-2xl lg:rounded-3xl text-white flex-shrink-0 mt-1 lg:mt-0"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </motion.div>
                            <div>
                                <h3 className="text-[#5B3A8F] text-xl lg:text-2xl font-bold mb-2">AI Insight</h3>
                                <p className="text-[#6D5D8C] text-md lg:text-lg font-medium leading-relaxed">
                                    Reducing junk food by <span className="font-bold text-[#4B2C82] bg-purple-100 px-2 py-0.5 rounded-md mx-1">50%</span> could save <span className="font-bold text-[#4B2C82] bg-purple-100 px-2 py-0.5 rounded-md mx-1">₹1500</span> per month and immediately boost your physical energy levels.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Button Full Width */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-3 mt-4 lg:mt-6 mb-16"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 lg:py-6 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 transition-opacity text-white rounded-[24px] text-[20px] lg:text-[22px] font-black shadow-[0_8px_25px_rgba(159,122,234,0.4)] tracking-wide flex justify-center items-center gap-3 group"
                        >
                            Improve My Habits
                            <motion.span 
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="group-hover:translate-x-2 transition-transform"
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CostAnalysis;
