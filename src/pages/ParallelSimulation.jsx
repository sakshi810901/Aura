import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Activity, DollarSign, Smile, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const ParallelSimulation = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0); // 0: Select, 1: Input, 2: Processing, 3: Results
    
    // Scenario State
    const [scenario, setScenario] = useState({
        optionA: '',
        optionB: '',
        timeRange: '1 year'
    });
    
    // Results State
    const [timelineStep, setTimelineStep] = useState(0); // 0: 1 Month, 1: 6 Months, 2: 1 Year
    
    const templates = [
        { title: "Diet & Health", a: "Quit junk food", b: "Continue eating junk" },
        { title: "Physical Activity", a: "Start exercising", b: "Stay inactive" },
        { title: "Financial", a: "Save money", b: "Spend freely" }
    ];

    const timeRanges = ["1 month", "6 months", "1 year", "5 years"];

    const handleSelectTemplate = (template) => {
        setScenario({
            optionA: template.a,
            optionB: template.b,
            timeRange: '1 year'
        });
        setStep(2); // Skip input, go straight to processing
    };

    const handleCustomSubmit = () => {
        if (!scenario.optionA || !scenario.optionB) return;
        setStep(2);
    };

    // Processing phase progression
    useEffect(() => {
        if (step === 2) {
            const timer = setTimeout(() => {
                setStep(3); // Result
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Mock data generator based on timeline step
    const getMetrics = (isOptionA) => {
        // Option A is always the "positive" choice in these examples logic
        const progression = [
            { health: isOptionA ? 75 : 65, savings: isOptionA ? 500 : -100, happiness: isOptionA ? 70 : 60 }, // 1 Month
            { health: isOptionA ? 85 : 55, savings: isOptionA ? 3000 : -800, happiness: isOptionA ? 85 : 45 }, // 6 Months
            { health: isOptionA ? 95 : 40, savings: isOptionA ? 7500 : -2000, happiness: isOptionA ? 95 : 30 }  // 1 Year/5 Years
        ];
        return progression[timelineStep];
    };

    // Calculate max values for progress bars
    const maxSavings = 8000;
    
    // SVG Line Chart Component
    const MiniTrendChart = ({ isPositive }) => (
        <svg viewBox="0 0 100 40" className={`w-full h-10 mt-3 opacity-80 drop-shadow-sm ${isPositive ? 'stroke-green-400' : 'stroke-red-400'}`}>
            <path 
                d={isPositive ? "M 0 35 Q 20 30, 40 25 T 80 15 T 100 5" : "M 0 5 Q 20 10, 40 20 T 80 30 T 100 35"} 
                fill="none" 
                strokeWidth="3.5" 
                strokeLinecap="round"
            />
            {/* Subtle glow underneath */}
            <path 
                d={isPositive ? "M 0 35 Q 20 30, 40 25 T 80 15 T 100 5 L 100 40 L 0 40 Z" : "M 0 5 Q 20 10, 40 20 T 80 30 T 100 35 L 100 40 L 0 40 Z"} 
                fill={isPositive ? "rgba(74, 222, 128, 0.1)" : "rgba(248, 113, 113, 0.1)"} 
                stroke="none" 
            />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative flex flex-col pt-8 pb-32">
            
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white/40 blur-[100px] mix-blend-overlay"></div>
                <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[100px] mix-blend-overlay"></div>
                <Sparkles className="absolute top-20 right-10 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute top-[40%] left-10 text-white opacity-60 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 px-6 max-w-5xl mx-auto w-full mb-10">
                 <button onClick={() => step === 0 ? navigate('/dashboard') : setStep(0)} className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center hover:bg-white text-[#5B3A8F] transition-all shadow-sm border border-white/50 group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 0: Selection */}
                    {step === 0 && (
                        <motion.div 
                            key="step0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full h-full flex flex-col"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center p-4 bg-white/60 rounded-full shadow-[0_4px_20px_rgba(150,110,200,0.15)] backdrop-blur-md border border-white/70 mb-6 relative hover:scale-105 transition-transform duration-500">
                                    <Sparkles className="absolute -top-1 -right-1 text-purple-600 w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                                    <span className="text-4xl">🔮</span>
                                </div>
                                <h1 className="text-4xl md:text-[54px] font-black text-[#4B2C82] leading-tight tracking-tight mb-4">
                                    Simulate Your Future
                                </h1>
                                <p className="text-[#6D5D8C] text-lg lg:text-xl font-medium max-w-xl mx-auto">
                                    What decision would you like to simulate today?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
                                {templates.map((temp, idx) => (
                                    <motion.div 
                                        key={idx}
                                        onClick={() => handleSelectTemplate(temp)}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-white/60 hover:bg-white/90 backdrop-blur-xl rounded-[28px] p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 cursor-pointer transition-all flex flex-col h-full group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 group-hover:to-purple-500/10 transition-colors"></div>
                                        <h3 className="text-sm font-bold text-[#A78BFA] uppercase tracking-wider mb-4">{temp.title}</h3>
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-3 bg-green-50/80 p-3.5 rounded-2xl border border-green-100">
                                                <span className="text-green-500 font-bold">A</span>
                                                <p className="text-[#4B2C82] font-semibold text-[15px]">{temp.a}</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-red-50/80 p-3.5 rounded-2xl border border-red-100">
                                                <span className="text-red-500 font-bold">B</span>
                                                <p className="text-[#4B2C82] font-semibold text-[15px]">{temp.b}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="flex justify-center mt-auto">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStep(1)}
                                    className="bg-gradient-to-r from-white to-purple-50 text-[#5B3A8F] px-10 py-4.5 rounded-full font-black text-[17px] shadow-[0_8px_25px_rgba(150,110,200,0.2)] border-2 border-white flex items-center gap-3 hover:shadow-[0_12px_35px_rgba(150,110,200,0.3)] transition-all"
                                >
                                    <TrendingUp size={20} />
                                    Build Custom Scenario
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: Custom Input */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full max-w-xl mx-auto"
                        >
                            <h2 className="text-3xl lg:text-4xl font-black text-[#4B2C82] text-center mb-8">Define Your Options</h2>
                            
                            <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_12px_40px_rgba(150,110,200,0.2)] border border-white/80 space-y-8">
                                
                                {/* Option A */}
                                <div className="space-y-3">
                                    <label className="text-[14px] font-bold text-[#6D5D8C] uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black text-xs">A</span>
                                        Option A (Recommended)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={scenario.optionA}
                                        onChange={(e) => setScenario({...scenario, optionA: e.target.value})}
                                        placeholder="e.g., Start full-time business"
                                        className="w-full bg-white/90 border-2 border-purple-100 placeholder-purple-300 font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-[#A78BFA] focus:ring-4 ring-purple-500/10 text-[#4B2C82] text-[16px] transition-all"
                                    />
                                </div>

                                {/* Option B */}
                                <div className="space-y-3">
                                    <label className="text-[14px] font-bold text-[#6D5D8C] uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs">B</span>
                                        Option B (Alternative)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={scenario.optionB}
                                        onChange={(e) => setScenario({...scenario, optionB: e.target.value})}
                                        placeholder="e.g., Stay at current job"
                                        className="w-full bg-white/90 border-2 border-purple-100 placeholder-purple-300 font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-[#A78BFA] focus:ring-4 ring-purple-500/10 text-[#4B2C82] text-[16px] transition-all"
                                    />
                                </div>

                                {/* Time Range */}
                                <div className="space-y-4 pt-4 border-t border-purple-100/50">
                                    <label className="text-[14px] font-bold text-[#6D5D8C] font-bold tracking-wide">Simulation Timeframe</label>
                                    <div className="flex flex-wrap gap-3">
                                        {timeRanges.map(tr => (
                                            <button 
                                                key={tr}
                                                onClick={() => setScenario({...scenario, timeRange: tr})}
                                                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
                                                    scenario.timeRange === tr 
                                                    ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-md scale-105' 
                                                    : 'bg-white/50 border-purple-200 text-[#5B3A8F] hover:bg-white hover:border-[#D8B4FE]'
                                                }`}
                                            >
                                                {tr}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button 
                                    disabled={!scenario.optionA || !scenario.optionB}
                                    onClick={handleCustomSubmit}
                                    className="w-full py-4.5 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-white rounded-2xl font-black text-[17px] shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 mt-4"
                                >
                                    <Zap size={20} className={(!scenario.optionA || !scenario.optionB) ? "" : "animate-pulse"} />
                                    Run Simulation
                                </button>
                                
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Processing */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="flex flex-col items-center justify-center h-[50vh] text-center"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white bg-[#C4A9E8] shadow-[0_0_50px_rgba(167,139,250,0.6)] overflow-hidden relative flex justify-center items-center mb-10 animate-pulse" style={{ animationDuration: '2s' }}>
                                <div className="absolute inset-0 scale-[1.4] translate-y-4">
                                    <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
                                </div>
                                {/* Scanning line effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/60 blur-[2px] z-10 animate-[scan_2s_linear_infinite]"></div>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black text-[#4B2C82] mb-4">Simulating Futures...</h2>
                            <p className="text-[#6D5D8C] text-[17px] font-semibold max-w-sm mx-auto leading-relaxed animate-pulse">
                                Analyzing probabilities based on your habits, health, and financial data...
                            </p>
                        </motion.div>
                    )}

                    {/* STEP 3: Results (Screens 4, 5, 6) */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full flex-1 flex flex-col"
                        >
                            <h2 className="text-3xl lg:text-4xl font-black text-[#4B2C82] text-center mb-8 drop-shadow-sm">Simulation Results</h2>
                            
                            {/* Side-by-Side Comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-12">
                                
                                {/* Option A Card (Recommended) */}
                                <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] p-6 lg:p-8 shadow-[0_12px_40px_rgba(150,110,200,0.2)] border-2 border-green-200 relative transform transition-transform hover:scale-[1.02]">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-500 text-white px-5 py-1.5 rounded-full font-bold text-sm shadow-md flex items-center gap-2 border-2 border-white">
                                        <Sparkles size={16} /> Recommended Path
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-[#2e5d3c] mb-8 text-center mt-3 break-words">{scenario.optionA}</h3>
                                    
                                    <div className="space-y-8">
                                        {/* Health Metric */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><Activity size={18} className="text-pink-500" /> Health Score</span>
                                                <span className="font-black text-[22px] text-pink-500">{getMetrics(true).health}%</span>
                                            </div>
                                            <div className="h-3.5 w-full bg-pink-100 rounded-full overflow-hidden shadow-inner">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
                                                    animate={{ width: `${getMetrics(true).health}%` }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                            <MiniTrendChart isPositive={getMetrics(true).health > 50} />
                                        </div>
                                        
                                        {/* Financial Metric */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><DollarSign size={18} className="text-emerald-500" /> Projected Savings</span>
                                                <span className="font-black text-[22px] text-emerald-500">${getMetrics(true).savings}</span>
                                            </div>
                                            <div className="h-3.5 w-full bg-emerald-100 rounded-full overflow-hidden relative shadow-inner">
                                                {/* Center line for 0 base */}
                                                {(getMetrics(true).savings < 0 || getMetrics(false).savings < 0) && <div className="absolute left-[20%] top-0 bottom-0 w-0.5 bg-white z-10"></div>}
                                                <motion.div 
                                                    className={`h-full bg-gradient-to-r ${getMetrics(true).savings >= 0 ? 'from-emerald-400 to-green-500 rounded-r-full' : 'from-red-500 to-red-400 rounded-l-full'}`}
                                                    animate={{ 
                                                        width: `${Math.min(Math.abs(getMetrics(true).savings) / maxSavings * 100, 100)}%`,
                                                        marginLeft: getMetrics(true).savings < 0 ? 'auto' : '0'
                                                    }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Happiness Metric */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><Smile size={18} className="text-yellow-500" /> Happiness</span>
                                                <span className="font-black text-[22px] text-yellow-500">{getMetrics(true).happiness}%</span>
                                            </div>
                                            <div className="h-3.5 w-full bg-yellow-100 rounded-full overflow-hidden shadow-inner">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                                    animate={{ width: `${getMetrics(true).happiness}%` }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Option B Card (Alternative) */}
                                <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-6 lg:p-8 shadow-sm border border-white/60 relative transform transition-transform hover:scale-[1.02] opacity-90">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-700 border-2 border-white px-5 py-1.5 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
                                        Alternative Path
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-[#5B3A8F] mb-8 text-center mt-3 break-words">{scenario.optionB}</h3>
                                    
                                    <div className="space-y-8">
                                         {/* Health Metric */}
                                         <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><Activity size={18} className="text-pink-400" /></span>
                                                <span className="font-bold text-xl text-pink-400">{getMetrics(false).health}%</span>
                                            </div>
                                            <div className="h-3 w-full bg-pink-50 rounded-full overflow-hidden shadow-inner opacity-70">
                                                <motion.div 
                                                    className="h-full bg-pink-400 rounded-full"
                                                    animate={{ width: `${getMetrics(false).health}%` }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                            <MiniTrendChart isPositive={getMetrics(false).health > 50} />
                                        </div>
                                        
                                        {/* Financial Metric */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><DollarSign size={18} className="text-emerald-400" /></span>
                                                <span className="font-bold text-xl text-emerald-400">
                                                    {getMetrics(false).savings < 0 ? '-' : ''}${Math.abs(getMetrics(false).savings)}
                                                </span>
                                            </div>
                                            <div className="h-3 w-full bg-emerald-50 rounded-full overflow-hidden relative shadow-inner opacity-70">
                                                <motion.div 
                                                    className={`h-full ${getMetrics(false).savings >= 0 ? 'bg-emerald-400 rounded-r-full' : 'bg-red-400 rounded-l-full'}`}
                                                    animate={{ 
                                                        width: `${Math.min(Math.abs(getMetrics(false).savings) / maxSavings * 100, 100)}%`,
                                                        marginLeft: getMetrics(false).savings < 0 ? 'auto' : '0'
                                                    }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Happiness Metric */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="flex items-center gap-2 text-[15px] font-bold text-[#6D5D8C]"><Smile size={18} className="text-yellow-400" /></span>
                                                <span className="font-bold text-xl text-yellow-400">{getMetrics(false).happiness}%</span>
                                            </div>
                                            <div className="h-3 w-full bg-yellow-50 rounded-full overflow-hidden shadow-inner opacity-70">
                                                <motion.div 
                                                    className="h-full bg-yellow-400 rounded-full"
                                                    animate={{ width: `${getMetrics(false).happiness}%` }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            {/* Timeline Slider (Screen 5) */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-[24px] p-6 lg:p-8 shadow-sm border border-white/80 mb-8 max-w-4xl mx-auto w-full">
                                <h4 className="text-[15px] font-black uppercase tracking-wider text-[#4B2C82] mb-6 text-center">Timeline Projection</h4>
                                <div className="relative px-4">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="2" 
                                        step="1"
                                        value={timelineStep}
                                        onChange={(e) => setTimelineStep(parseInt(e.target.value))}
                                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                                    />
                                    <div className="flex justify-between mt-4 text-[13px] font-bold text-[#6D5D8C]">
                                        <span className={timelineStep === 0 ? "text-[#8B5CF6] scale-110 transition-all" : ""}>1 Month</span>
                                        <span className={timelineStep === 1 ? "text-[#8B5CF6] scale-110 transition-all" : ""}>6 Months</span>
                                        <span className={timelineStep === 2 ? "text-[#8B5CF6] scale-110 transition-all" : ""}>
                                            {scenario.timeRange === '1 month' ? '1 Year' : scenario.timeRange}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Reflection & Action (Screen 6) */}
                            <div className="bg-gradient-to-r from-[#5B3A8F] to-[#4B2C82] rounded-[32px] p-8 shadow-xl text-white text-center max-w-3xl mx-auto w-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]"></div>
                                
                                <h3 className="text-2xl font-black mb-3">Decision Summary</h3>
                                <p className="text-purple-100 text-[16px] leading-relaxed mb-6 font-medium px-4">
                                    If you choose <strong className="text-white">"{scenario.optionA}"</strong>, you are likely to see significant improvements in health and savings over time. We have a <strong className="text-green-300">92% confidence level</strong> in this projection.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                    <button 
                                        className="bg-white text-[#5B3A8F] hover:bg-purple-50 px-8 py-3.5 rounded-xl font-black text-[15px] shadow-lg transition-transform hover:-translate-y-1"
                                    >
                                        Save Simulation
                                    </button>
                                    <button 
                                        onClick={() => setStep(0)}
                                        className="bg-transparent border-2 border-purple-300 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-[15px] transition-colors"
                                    >
                                        Try Another Scenario
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Custom Keyframes for Animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default ParallelSimulation;
