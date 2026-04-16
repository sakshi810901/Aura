import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, Zap, Target, CheckCircle2, Sparkles, Loader2, ListTodo, Brain, Coffee, BookOpen, Dumbbell, User } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const WhatShouldIDoNext = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [currentTime, setCurrentTime] = useState('');
    
    // User context state
    const [context, setContext] = useState({
        energy: '',
        time: '',
        priority: ''
    });

    const [selectedTask, setSelectedTask] = useState(null);

    // Options
    const energyOptions = [
        { id: 'Low', icon: <Coffee className="w-5 h-5" />, color: 'from-blue-400 to-indigo-500' },
        { id: 'Medium', icon: <Brain className="w-5 h-5" />, color: 'from-purple-400 to-violet-500' },
        { id: 'High', icon: <Zap className="w-5 h-5" />, color: 'from-orange-400 to-red-500' }
    ];

    const timeOptions = ['15 min', '30 min', '1 hr', '2+ hrs'];

    const priorityOptions = [
        { id: 'Work', icon: <Target className="w-4 h-4" /> },
        { id: 'Study', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'Health', icon: <Dumbbell className="w-4 h-4" /> },
        { id: 'Relax', icon: <Coffee className="w-4 h-4" /> },
        { id: 'Social', icon: <User className="w-4 h-4" /> }
    ];

    // Generated Suggestions (mocked based on context context)
    const suggestions = {
        primary: {
            title: "Focused Study Session",
            reason: "Aligns with your chosen priority and available time block perfectly.",
            duration: "20 min",
            benefit: "Productivity",
            icon: "🧠"
        },
        alternatives: [
            {
                title: "Quick Review Walk",
                reason: "Combine physical movement with light mental recall.",
                duration: "15 min",
                benefit: "Health & Review",
                icon: "🚶"
            },
            {
                title: "Organize Workspace",
                reason: "Clear your desk to reduce cognitive load for your next big task.",
                duration: "10 min",
                benefit: "Organization",
                icon: "✨"
            }
        ]
    };

    useEffect(() => {
        // Update current time
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (step === 2) {
            // Simulate AI Analysis
            const timer = setTimeout(() => {
                setStep(3);
                setSelectedTask(suggestions.primary);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Handle Option Selection
    const handleContextSelect = (category, value) => {
        setContext(prev => ({ ...prev, [category]: value }));
    };

    const isContextComplete = context.energy && context.time && context.priority;

    const handleStartAnalysis = () => {
        if (isContextComplete) setStep(2);
    };

    const handleConfirmTask = (task) => {
        setSelectedTask(task);
        setStep(5);
    };

    // Calculate time block for Step 5
    const getEndTime = (durationStr) => {
        const now = new Date();
        let addMinutes = 30; // default
        if (durationStr.includes('15')) addMinutes = 15;
        if (durationStr.includes('20')) addMinutes = 20;
        if (durationStr.includes('10')) addMinutes = 10;
        if (durationStr.includes('1 hr')) addMinutes = 60;
        if (durationStr.includes('2+')) addMinutes = 120;
        
        now.setMinutes(now.getMinutes() + addMinutes);
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Screens
    const renderScreen1 = () => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8"
        >
            <div className="text-center w-full">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full text-[#5B3A8F] font-bold shadow-sm mb-6 border border-white/60">
                    <Clock className="w-4 h-4" />
                    <span>Current Time: {currentTime}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[#4B2C82] mb-3 leading-tight">
                    What should <br/>I do next?
                </h1>
                <p className="text-[#6D5D8C] text-lg font-medium">
                    Let AURA find the perfect next step for you.
                </p>
            </div>

            <div className="w-full bg-white/60 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col gap-8">
                {/* Energy */}
                <div>
                    <h3 className="text-[#5B3A8F] font-bold text-lg mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" /> My energy level is...
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {energyOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => handleContextSelect('energy', opt.id)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                    context.energy === opt.id 
                                    ? `border-transparent bg-gradient-to-br ${opt.color} text-white shadow-md transform scale-105` 
                                    : 'border-white/50 bg-white/40 text-[#6D5D8C] hover:bg-white/60'
                                }`}
                            >
                                <span className={context.energy === opt.id ? 'text-white' : 'text-[#8B5CF6]'}>
                                    {opt.icon}
                                </span>
                                <span className={`font-bold ${context.energy === opt.id ? 'text-white' : 'text-[#4B2C82]'}`}>
                                    {opt.id}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time */}
                <div>
                    <h3 className="text-[#5B3A8F] font-bold text-lg mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" /> I have time for...
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {timeOptions.map(time => (
                            <button
                                key={time}
                                onClick={() => handleContextSelect('time', time)}
                                className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                                    context.time === time
                                    ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-md transform scale-105'
                                    : 'border-white/50 bg-white/40 text-[#6D5D8C] hover:bg-white/60'
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Priority */}
                <div>
                    <h3 className="text-[#5B3A8F] font-bold text-lg mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-400" /> I want to focus on...
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {priorityOptions.map(p => (
                            <button
                                key={p.id}
                                onClick={() => handleContextSelect('priority', p.id)}
                                className={`flex items-center gap-2 py-2.5 px-5 rounded-full border-2 font-bold transition-all ${
                                    context.priority === p.id
                                    ? 'border-[#C084FC] bg-[#C084FC] text-white shadow-md transform scale-105'
                                    : 'border-white/50 bg-white/40 text-[#6D5D8C] hover:bg-white/60'
                                }`}
                            >
                                {p.icon}
                                {p.id}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleStartAnalysis}
                disabled={!isContextComplete}
                className={`w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg transition-all ${
                    isContextComplete 
                    ? 'bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 hover:-translate-y-1' 
                    : 'bg-gray-300 cursor-not-allowed hidden'
                }`}
            >
                Get Suggestion
            </button>
        </motion.div>
    );

    const renderScreen2 = () => (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="w-full max-w-lg mx-auto flex flex-col items-center justify-center h-[60vh] gap-8"
        >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full z-0 animate-pulse"></div>
                <div className="absolute inset-0 z-10 pointer-events-none scale-125">
                     <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
                </div>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg mt-8 relative">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5B3A8F] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin"/> Processing
                 </div>
                 <h2 className="text-2xl font-black text-[#4B2C82] mb-2 leading-tight flex items-center justify-center gap-2">
                    Analyzing context <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse"/>
                 </h2>
                 <p className="text-[#6D5D8C] font-medium">Checking your schedule, habits, and priorities...</p>
                 
                 <div className="w-full bg-purple-100 rounded-full h-2 mt-6 overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="bg-gradient-to-r from-[#9F7AEA] to-[#C084FC] h-full rounded-full"
                     />
                 </div>
            </div>
        </motion.div>
    );

    const renderScreen3 = () => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto flex flex-col items-center"
        >
            <div className="w-full text-center mb-6">
                <span className="inline-block bg-[#8B5CF6]/10 text-[#6D28D9] font-black tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-3 border border-[#8B5CF6]/20">
                    Aura Recommends
                </span>
                <h2 className="text-3xl font-black text-[#4B2C82] leading-tight">I found the perfect next step.</h2>
            </div>

            <div className="w-full bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_12px_40px_rgba(150,110,200,0.2)] border-2 border-white mb-8 relative overflow-hidden group hover:shadow-[0_15px_50px_rgba(150,110,200,0.3)] transition-all">
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300 blur-3xl opacity-50 rounded-full pointer-events-none group-hover:bg-purple-400 transition-colors"></div>
                
                <div className="text-6xl mb-4 text-center">{suggestions.primary.icon}</div>
                <h3 className="text-2xl font-black text-[#5B3A8F] mb-6 text-center">{suggestions.primary.title}</h3>
                
                <div className="bg-white/50 rounded-2xl p-4 mb-6 border border-white/60">
                    <p className="text-[#6D5D8C] text-sm font-medium italic text-center leading-relaxed">
                        "{suggestions.primary.reason}"
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <div className="bg-white py-2 px-4 rounded-xl border border-purple-100 shadow-sm flex flex-col items-center">
                        <span className="text-[10px] text-[#A78BFA] font-bold uppercase tracking-wider mb-0.5">Duration</span>
                        <span className="text-[#5B3A8F] font-black flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/>{suggestions.primary.duration}</span>
                    </div>
                    <div className="bg-white py-2 px-4 rounded-xl border border-purple-100 shadow-sm flex flex-col items-center">
                        <span className="text-[10px] text-[#A78BFA] font-bold uppercase tracking-wider mb-0.5">Benefit</span>
                        <span className="text-[#5B3A8F] font-black flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-yellow-500"/>{suggestions.primary.benefit}</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <button 
                    onClick={() => handleConfirmTask(suggestions.primary)}
                    className="w-full py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:opacity-90 transition-opacity text-white rounded-2xl font-black text-lg shadow-lg flex justify-center items-center gap-2 group"
                >
                    Start This Task <ChevronLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={() => setStep(4)}
                    className="w-full py-4 bg-white/50 hover:bg-white border-2 border-white/80 transition-colors text-[#5B3A8F] rounded-2xl font-bold shadow-sm"
                >
                    See Other Suggestions
                </button>
            </div>
        </motion.div>
    );

    const renderScreen4 = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => setStep(3)}
                    className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center text-[#5B3A8F] border border-white/60 hover:bg-white transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-black text-[#4B2C82]">Alternative Options</h2>
            </div>

            <div className="flex flex-col gap-4">
                {/* Primary Again */}
                <div 
                    onClick={() => handleConfirmTask(suggestions.primary)}
                    className="w-full bg-gradient-to-r from-purple-100/80 to-indigo-100/80 backdrop-blur-md rounded-3xl p-5 border-2 border-[#8B5CF6] shadow-md cursor-pointer hover:shadow-lg transition-all flex items-center gap-5 relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-5 bg-[#8B5CF6] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-b-lg">
                        Recommended
                    </div>
                    
                    <div className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-purple-100/50">
                        {suggestions.primary.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-[#5B3A8F]">{suggestions.primary.title}</h3>
                        <p className="text-[#6D5D8C] text-sm font-medium mt-1 pr-12 line-clamp-1">{suggestions.primary.reason}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs font-bold text-[#8B5CF6] flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-md"><Clock className="w-3 h-3"/> {suggestions.primary.duration}</span>
                            <span className="text-xs font-bold text-[#8B5CF6] flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-md"><Sparkles className="w-3 h-3"/> {suggestions.primary.benefit}</span>
                        </div>
                    </div>
                </div>

                {/* Alternatives */}
                {suggestions.alternatives.map((alt, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (idx + 1) }}
                        key={idx}
                        onClick={() => handleConfirmTask(alt)}
                        className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/80 shadow-sm cursor-pointer hover:bg-white/80 transition-all flex items-center gap-5 group"
                    >
                        <div className="text-4xl bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white shrink-0 group-hover:scale-105 transition-transform">
                            {alt.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#5B3A8F] group-hover:text-[#6D28D9] transition-colors">{alt.title}</h3>
                            <p className="text-[#6D5D8C] text-sm font-medium mt-1 line-clamp-1 group-hover:text-[#5B3A8F]">{alt.reason}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs font-bold text-[#6D5D8C] flex items-center gap-1 bg-white/40 px-2 py-0.5 rounded-md"><Clock className="w-3 h-3"/> {alt.duration}</span>
                                <span className="text-xs font-bold text-[#6D5D8C] flex items-center gap-1 bg-white/40 px-2 py-0.5 rounded-md"><Target className="w-3 h-3"/> {alt.benefit}</span>
                            </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-[#A78BFA] rotate-180 opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    const renderScreen5 = () => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm mx-auto flex flex-col items-center text-center mt-10"
        >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                 >
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                 </motion.div>
                 {/* Decorative sparks */}
                 <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute -top-2 -right-2 text-green-400 w-6 h-6 animate-pulse" />
                    <Sparkles className="absolute bottom-2 -left-3 text-green-400 w-4 h-4 animate-pulse delay-75" />
                 </div>
            </div>

            <h2 className="text-3xl font-black text-[#4B2C82] mb-2">Awesome choice!</h2>
            <p className="text-[#6D5D8C] font-medium mb-8">Task added to your daily plan.</p>

            <div className="w-full bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-md border border-white mb-8 border-l-4 border-l-[#8B5CF6] text-left">
                <div className="flex items-center gap-3 mb-4">
                     <span className="text-3xl bg-purple-50 p-2 rounded-xl">{selectedTask?.icon}</span>
                     <div>
                         <h3 className="font-bold text-[#5B3A8F] leading-tight text-lg">{selectedTask?.title}</h3>
                         <span className="text-xs font-bold text-[#8B5CF6] uppercase">{selectedTask?.benefit}</span>
                     </div>
                </div>
                
                <div className="flex items-center gap-2 text-[#4B2C82] font-black bg-purple-50 px-4 py-2.5 rounded-xl border border-purple-100 justify-center shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span>{currentTime} - {getEndTime(selectedTask?.duration || '30')}</span>
                </div>
            </div>

            <button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:opacity-90 transition-opacity text-white rounded-2xl font-black text-lg shadow-lg flex justify-center items-center gap-2 group"
            >
                Back to Dashboard
            </button>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pt-12 pb-32 px-6">
            
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Header with Back Button (except on confirmation) */}
            {step < 5 && (
                <div className="relative z-10 max-w-[1400px] mx-auto w-full mb-8 flex justify-between items-center">
                    {step === 1 ? (
                        <button 
                            onClick={() => navigate('/decisions')}
                            className="bg-white/50 backdrop-blur-md p-3 rounded-full shadow-sm text-[#5B3A8F] hover:bg-white transition-all border border-white/60 flex items-center gap-2 group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold pr-2 hidden sm:block">Decisions</span>
                        </button>
                    ) : (
                       <div className="w-12 h-12"></div> // spacer
                    )}
                </div>
            )}

            <div className="relative z-10 w-full flex justify-center pb-20 mt-4 md:mt-10">
                <AnimatePresence mode="wait">
                    {step === 1 && <motion.div key="step1" className="w-full">{renderScreen1()}</motion.div>}
                    {step === 2 && <motion.div key="step2" className="w-full">{renderScreen2()}</motion.div>}
                    {step === 3 && <motion.div key="step3" className="w-full">{renderScreen3()}</motion.div>}
                    {step === 4 && <motion.div key="step4" className="w-full">{renderScreen4()}</motion.div>}
                    {step === 5 && <motion.div key="step5" className="w-full">{renderScreen5()}</motion.div>}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WhatShouldIDoNext;
