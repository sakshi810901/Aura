import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const Decisions = () => {
    const navigate = useNavigate();

    const decisionOptions = [
        {
            title: "Food",
            subtitle: "What should I eat?",
            icon: "🍎🍗🍇",
            path: "/compare-options"
        },
        {
            title: "Fashion",
            subtitle: "What should I wear?",
            icon: "👗👔",
            path: "/what-should-i-wear"
        },
        {
            title: "Spending",
            subtitle: "Should I buy this?",
            icon: "🛍️₹",
            path: "/should-i-buy-this"
        },
        {
            title: "Productivity",
            subtitle: "What should I do next?",
            icon: "📋⏳",
            path: "/what-to-do-next"
        },
        {
            title: "Lifestyle",
            subtitle: "Talk to AURA",
            icon: "🪷",
            path: "/chat"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden flex flex-col items-center">
            
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
                <div className="absolute top-20 right-10 text-white opacity-80 animate-pulse text-2xl" style={{ animationDuration: '3s' }}>✨</div>
                <div className="absolute top-[30%] left-8 text-white opacity-60 animate-pulse text-xl" style={{ animationDuration: '4s', animationDelay: '1s' }}>✨</div>
                <div className="absolute top-1/2 right-12 text-white opacity-75 animate-pulse text-3xl" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>✨</div>
                <div className="absolute bottom-[20%] left-10 text-white opacity-80 animate-pulse text-xl" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>✨</div>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-32 min-h-screen flex flex-col justify-start">
                
                {/* Header */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-10 lg:mb-16 bg-white/40 backdrop-blur-md rounded-[32px] p-3 pr-5 shadow-sm border border-white/50 w-full max-w-[600px] mx-auto"
                >
                    <div 
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => navigate('/dashboard')}
                    >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
                            <span className="text-white font-bold text-xl tracking-wider">AURA</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                            <p className="text-[12px] text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                        </div>
                    </div>
                    <div className="relative group cursor-pointer">
                        <div className="w-12 h-12 bg-white/50 rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] group-hover:bg-white/80 transition-all">
                            <Bell className="w-6 h-6" />
                        </div>
                        <span className="absolute -top-1 -right-1 bg-[#EE4B2B] text-white text-[12px] font-bold w-5 h-5 rounded-full flex justify-center items-center border-2 border-[#dfcbf3]">
                            2
                        </span>
                    </div>
                </motion.header>

                {/* Subtitle / Title */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-10 lg:mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#4B2C82] leading-tight">
                        What decision can AURA help with?
                    </h1>
                </motion.div>

                {/* Grid of Options */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full flex-1 max-w-[1200px] mx-auto"
                >
                    {decisionOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            onClick={() => option.path ? navigate(option.path) : null}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (index * 0.05) }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 lg:p-10 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/60 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/70 hover:shadow-[0_12px_40px_rgba(150,110,200,0.25)] transition-all group"
                        >
                            <div className="text-5xl lg:text-6xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                                {option.icon}
                            </div>
                            <h3 className="font-extrabold text-[#4B2C82] text-xl lg:text-2xl mb-2 leading-tight">
                                {option.title}
                            </h3>
                            <p className="text-[#6D5D8C] text-[15px] lg:text-[17px] font-medium leading-relaxed px-2">
                                {option.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
                
            </div>

            {/* Bottom Avatar Chat Box - Responsive */}
            <div className="fixed bottom-0 left-0 w-full px-4 sm:px-10 pb-8 pt-12 z-50 pointer-events-none flex justify-center bg-gradient-to-t from-[#cdaff0] via-[#cdaff0]/90 to-transparent">
                <div className="w-full max-w-[900px] flex items-end gap-4 lg:gap-6 pointer-events-auto">
                    {/* Avatar Circle */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] shrink-0 rounded-full border-[4px] border-white/60 bg-[#C4A9E8] shadow-[0_12px_30px_rgba(150,110,200,0.3)] overflow-hidden relative flex justify-center items-center"
                    >
                        <div className="absolute inset-0 scale-[1.3] translate-y-3 lg:translate-y-4">
                             <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
                        </div>
                    </motion.div>

                    {/* Chat Bubble */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex-1 bg-white/60 backdrop-blur-xl rounded-[32px] rounded-bl-sm p-6 lg:p-8 relative border border-white/80 shadow-[0_12px_40px_rgba(150,110,200,0.25)]"
                    >
                        <div className="flex gap-3 lg:gap-4 items-center">
                             <span className="text-[#A78BFA] text-2xl lg:text-3xl leading-none shrink-0 animate-pulse">💜</span>
                             <p className="text-[#5B3A8F] text-[16px] lg:text-[20px] font-black leading-snug tracking-wide">
                                 Tell me your options and I'll help you choose the best one.
                             </p>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default Decisions;
