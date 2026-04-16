import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, PlusCircle, Clock, Heart, Sparkles, Dumbbell, BookOpen, MoreHorizontal, Smile, Meh, Frown, Flower2, Home, ClipboardCheck, BarChart2, Trophy, User, Users } from 'lucide-react';

const LogHabit = () => {
    const navigate = useNavigate();
    const [habitName, setHabitName] = useState('Exercise');
    const [duration, setDuration] = useState('10 min');
    const [feelingAfter, setFeelingAfter] = useState('Better');
    const [saveHabitFeeling, setSaveHabitFeeling] = useState('Better');
    const [isSaved, setIsSaved] = useState(false);

    const habitOptions = [
        { id: 'Exercise', icon: Dumbbell },
        { id: 'Meditation', icon: Flower2 },
        { id: 'Reading', icon: BookOpen }
    ];

    const durationOptions = ['5 min', '10 min', '20 min', '30 min', '1 hour'];
    
    const feelingOptions = [
        { id: 'Better', icon: Smile, iconColor: 'text-[#FCD34D]' },
        { id: 'Same', icon: Meh, iconColor: 'text-orange-300' },
        { id: 'Worse', icon: Frown, iconColor: 'text-red-300' },
        { id: 'More', icon: Frown, iconColor: 'text-purple-300' }
    ];

    const saveOptions = [
        { id: 'Better', icon: Smile, iconColor: 'text-[#FCD34D]' },
        { id: 'Same', icon: Meh, iconColor: 'text-orange-300' },
        { id: 'Worse', icon: Frown, iconColor: 'text-red-300' }
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('faceTexture');
        localStorage.removeItem('customAvatar');
        localStorage.removeItem('selectedGender');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-[120px]">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[10%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute top-[40%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                     <path fill="currentColor" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                
                {/* Sparkles */}
                <Sparkles className="absolute top-12 left-8 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute top-[25%] right-10 text-white opacity-60 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <Sparkles className="absolute top-1/2 left-12 text-white opacity-75 w-10 h-10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            </div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto pt-6 lg:pt-10 px-4 sm:px-10 lg:px-16 min-h-screen flex flex-col">
                
                {/* Header Area */}
                <div className="bg-white/40 backdrop-blur-xl rounded-t-[32px] sm:rounded-[32px] p-6 lg:p-8 pb-4 lg:pb-6 border border-white/50 shadow-[0_4px_30px_rgba(91,58,143,0.1)] mt-2 sm:mt-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                                <span className="text-white font-bold text-lg tracking-wider">AURA</span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                                <p className="text-[11px] text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                            </div>
                        </div>
                        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] hover:bg-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-[#EE4B2B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center border border-white">
                                2
                            </span>
                        </button>
                    </div>

                    <div className="text-left mb-2 pl-2">
                        <h1 className="text-3xl lg:text-4xl font-black text-[#4B2C82] mb-1">Log a Habit</h1>
                        <p className="text-[#6D5D8C] text-[15px] lg:text-lg font-medium">How are you feeling today?</p>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 bg-white/20 backdrop-blur-xl sm:rounded-[32px] rounded-b-[32px] px-6 lg:px-12 pb-12 pt-6 lg:pt-10 space-y-6 lg:space-y-0 border border-white/50 shadow-[0_20px_60px_rgba(91,58,143,0.2)] mt-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10 w-full">
                        {/* Section 1: Habit Name */}
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-white/50 backdrop-blur-md rounded-[28px] p-6 lg:p-8 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative z-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-full bg-[#B794F4] flex justify-center items-center">
                                    <PlusCircle className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-[#5B3A8F] font-bold text-[16px] lg:text-lg">Habit Name</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                {habitOptions.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected = habitName === option.id;
                                    return (
                                        <button 
                                            key={option.id}
                                            onClick={() => setHabitName(option.id)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-bold text-[15px] transition-all
                                                ${isSelected 
                                                    ? 'bg-[#B794F4]/30 border-[#A78BFA] text-[#5B3A8F] shadow-sm' 
                                                    : 'bg-white/60 border-white/50 text-[#6D5D8C] hover:bg-white/80'}`}
                                        >
                                            <Icon className={`w-[20px] h-[20px] ${isSelected ? 'text-[#8B5CF6]' : 'text-[#A78BFA]'}`} strokeWidth={2.5} />
                                            {option.id}
                                        </button>
                                    );
                                })}
                                <button className="flex items-center justify-center px-5 py-3 rounded-xl border border-white/50 bg-white/60 text-[#A78BFA] hover:bg-white/80 transition-all">
                                    <MoreHorizontal className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Section 2: Duration */}
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-white/50 backdrop-blur-md rounded-[28px] p-6 lg:p-8 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative z-10">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-8 h-8 rounded-full bg-[#A78BFA] flex justify-center items-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-[#5B3A8F] font-bold text-[16px] lg:text-lg">Duration</h3>
                            </div>
                            <p className="text-[#6D5D8C] text-[14px] font-medium mb-5 pl-[44px]">How long did you do it?</p>
                            
                            <div className="flex flex-wrap gap-3 pl-1">
                                {durationOptions.map((opt) => {
                                    const isSelected = duration === opt;
                                    return (
                                        <button 
                                            key={opt}
                                            onClick={() => setDuration(opt)}
                                            className={`px-5 py-2.5 rounded-[14px] font-bold text-[14px] lg:text-[15px] transition-all
                                                ${isSelected 
                                                    ? 'bg-gradient-to-r from-[#B794F4] to-[#A78BFA] text-white shadow-md border-transparent' 
                                                    : 'bg-white/60 text-[#6D5D8C] border border-white/60 hover:bg-white/80'}`}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Section 3: Feeling After */}
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-white/50 backdrop-blur-md rounded-[28px] p-6 lg:p-8 border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative z-10">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-8 h-8 rounded-full bg-[#B794F4] flex justify-center items-center">
                                    <Heart className="w-5 h-5 text-white fill-current" />
                                </div>
                                <h3 className="text-[#5B3A8F] font-bold text-[16px] lg:text-lg">Feeling After</h3>
                            </div>
                            <p className="text-[#6D5D8C] text-[14px] font-medium mb-5 pl-[44px]">How do you feel after this habit?</p>
                            
                            <div className="flex flex-wrap gap-3 pl-1">
                                {feelingOptions.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = feelingAfter === opt.id;
                                    return (
                                        <button 
                                            key={opt.id}
                                            onClick={() => setFeelingAfter(opt.id)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-bold text-[15px] transition-all
                                                ${isSelected 
                                                    ? 'bg-[#B794F4]/30 border-[#A78BFA] text-[#5B3A8F] shadow-sm' 
                                                    : 'bg-white/60 border-white/50 text-[#6D5D8C] hover:bg-white/80'}`}
                                        >
                                            <Icon className={`w-[20px] h-[20px] ${opt.iconColor}`} fill="currentColor" strokeWidth={0} />
                                            {opt.id}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Section 4: Save Habit */}
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="bg-white/40 backdrop-blur-md rounded-[28px] p-6 lg:p-8 border border-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative z-10 flex flex-col">
                            <div className="flex items-center gap-3 mb-5">
                                <Sparkles className="w-6 h-6 text-[#A78BFA]" />
                                <h3 className="text-[#5B3A8F] font-bold text-[16px] lg:text-lg">Save Habit</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 pl-1 mb-8">
                                {saveOptions.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = saveHabitFeeling === opt.id;
                                    return (
                                        <button 
                                            key={`save-${opt.id}`}
                                            onClick={() => setSaveHabitFeeling(opt.id)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-bold text-[15px] transition-all
                                                ${isSelected 
                                                    ? 'bg-[#B794F4]/30 border-[#A78BFA] text-[#5B3A8F] shadow-sm' 
                                                    : 'bg-white/60 border-white/50 text-[#6D5D8C] hover:bg-white/80'}
                                                ${opt.id === 'Worse' && !isSelected && 'opacity-60'}`}
                                        >
                                            <Icon className={`w-[20px] h-[20px] ${opt.iconColor}`} fill="currentColor" strokeWidth={0} />
                                            {opt.id}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Main Button */}
                            <button 
                                onClick={handleSave}
                                disabled={isSaved}
                                className={`w-full py-4 lg:py-5 mt-auto transition-all text-white rounded-full text-[16px] lg:text-[18px] font-bold shadow-[0_8px_20px_rgba(159,122,234,0.3)] tracking-wide relative overflow-hidden
                                    ${isSaved ? 'bg-green-500 scale-95' : 'bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 hover:scale-[1.02]'}`}
                            >
                                <AnimatePresence mode="wait">
                                    {isSaved ? (
                                        <motion.span key="saved" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                                            Saved!
                                        </motion.span>
                                    ) : (
                                        <motion.span key="save" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                                            Save Habit
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    </div>

                    {/* Footer Confrmation */}
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="bg-white/40 backdrop-blur-md rounded-[24px] p-5 lg:p-6 border border-white/50 flex items-center gap-4 mt-6 lg:mt-8 relative z-10 w-full">
                        <Sparkles className="w-8 h-8 text-[#A78BFA] flex-shrink-0 ml-2" />
                        <p className="text-[#6D5D8C] text-[14px] lg:text-[16px] font-medium leading-relaxed">
                            Thanks for checking in.<br className="lg:hidden"/>AURA will adjust your daily plan today.
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
                <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
                    <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-2 text-[#8B5CF6] transition-transform hover:scale-105">
                        <Home className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2.5} />
                        <span className="text-[12px] font-black tracking-wide">Home</span>
                    </button>
                    
                    <button onClick={() => navigate('/consultant-flow')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105 relative">
                        <Users className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Consultant</span>
                    </button>
                    
                    <button onClick={() => navigate('/trackers')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <BarChart2 className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Trackers</span>
                    </button>
                    
                    <button onClick={() => navigate('/progress')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <Trophy className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Progress</span>
                    </button>
                    
                    <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <User className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogHabit;
