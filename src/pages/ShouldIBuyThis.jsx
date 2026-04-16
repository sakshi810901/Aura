import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Upload, Edit3, Image as ImageIcon, Camera, Star, ArrowRight, TrendingUp, TrendingDown, DollarSign, CheckCircle2, Home, BarChart3, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const categories = ['Clothing', 'Electronics', 'Food', 'Lifestyle', 'Other'];

const ShouldIBuyThis = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    // Screen 1 & 2 State
    const [inputMode, setInputMode] = useState(null); // 'upload' or 'manual'
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    
    // Screen 2 Upload
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Screen 2 Manual
    const [optionalNote, setOptionalNote] = useState('');

    // Analysis Results
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        return () => {
            if (uploadedImage?.url) URL.revokeObjectURL(uploadedImage.url);
        };
    }, [uploadedImage]);

    // Handlers
    const handleContinueFromScreen1 = () => {
        if (!inputMode || !itemName || !price || !category) return;
        setStep(2);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadedImage({
            file,
            url: URL.createObjectURL(file)
        });
    };

    const startAnalysis = () => {
        setStep(3);
        
        // Mock analysis tailored to the category and price
        setTimeout(() => {
            const numPrice = parseFloat(price) || 0;
            let action = 'Buy';
            let score = 85;
            let theme = 'green';
            let explanation = 'This fits comfortably in your budget and aligns with your priorities.';
            let icon = ShieldCheck;

            if (numPrice > 500) {
                action = 'Wait';
                score = 65;
                theme = 'orange';
                explanation = 'This is a significant purchase. Taking 48 hours to consider might be wise.';
                icon = Clock;
            } else if (category === 'Electronics' && numPrice > 200) {
                action = 'Avoid';
                score = 40;
                theme = 'red';
                explanation = 'Based on your recent spending, this pushes you over your electronics budget.';
                icon = AlertCircle;
            }

            setAnalysisResult({
                action,
                score,
                theme, // 'green', 'orange', 'red'
                icon,
                impactOnBudget: `-$${numPrice.toFixed(2)}`,
                explanation,
                breakdown: {
                    financialImpact: numPrice > 300 ? 'High' : (numPrice > 100 ? 'Moderate' : 'Low'),
                    needVsWant: Math.floor(Math.random() * 40) + 40, // 40-80
                    longTermValue: category === 'Electronics' ? 'Medium' : 'Variable'
                },
                simulation: {
                    ifBuy: { remainingBudget: 1500 - numPrice, savingsTrend: 'Down -2%' },
                    ifDontBuy: { savingsImprovement: `+$${numPrice.toFixed(2)}`, financialFlexibility: '+5%' }
                }
            });
            setStep(4);
        }, 3500);
    };

    const handleSaveDecision = () => {
        // Mock saving decision
        setStep(6);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
    };

    // Screens
    const renderScreen1 = () => (
        <motion.div key="screen1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-[#5B3A8F] mb-2">Should I Buy This?</h1>
                <p className="text-[#6D5D8C] font-medium">Let Aura analyze your potential purchase.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100">
                <h3 className="font-bold text-[#4B2C82] mb-4">1. How do you want to provide details?</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button 
                        onClick={() => setInputMode('upload')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                            inputMode === 'upload' ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-md' : 'bg-white border-purple-100 text-[#6D5D8C] hover:bg-purple-50'
                        }`}
                    >
                        <Camera size={24} /> <span className="font-bold text-sm">Upload Photo</span>
                    </button>
                    <button 
                        onClick={() => setInputMode('manual')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                            inputMode === 'manual' ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-md' : 'bg-white border-purple-100 text-[#6D5D8C] hover:bg-purple-50'
                        }`}
                    >
                        <Edit3 size={24} /> <span className="font-bold text-sm">Enter Manually</span>
                    </button>
                </div>

                <h3 className="font-bold text-[#4B2C82] mb-4">2. Basic Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#6D5D8C] mb-1.5">Item Name</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="w-full bg-white border border-purple-100 rounded-xl px-4 py-3 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all"
                            placeholder="e.g. Sony Headphones"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#6D5D8C] mb-1.5">Price ($)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 font-bold">$</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-white border border-purple-100 rounded-xl pl-8 pr-4 py-3 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#6D5D8C] mb-2">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                        category === cat 
                                        ? 'bg-[#8B5CF6] text-white shadow-md' 
                                        : 'bg-white text-[#6D5D8C] hover:bg-purple-50 border border-purple-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleContinueFromScreen1}
                disabled={!inputMode || !itemName || !price || !category}
                className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
            >
                Continue <ArrowRight size={20} />
            </button>
        </motion.div>
    );

    const renderScreen2 = () => (
        <motion.div key="screen2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-[#5B3A8F] mb-2">Item Details</h2>
                <p className="text-[#6D5D8C] font-medium">Verify your product information.</p>
            </div>

            {inputMode === 'upload' ? (
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 md:h-64 bg-white border-2 border-dashed border-[#B794F4] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition-all text-[#8B5CF6] group mb-6 overflow-hidden"
                    >
                        {uploadedImage?.url ? (
                            <img src={uploadedImage.url} alt="Product" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload size={28} />
                                </div>
                                <span className="font-bold">Tap to Upload Photo</span>
                            </>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#6D5D8C] mb-1.5">Item Name</label>
                            <input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                className="w-full bg-white border border-purple-100 rounded-xl px-4 py-2.5 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#6D5D8C] mb-1.5">Price ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-white border border-purple-100 rounded-xl px-4 py-2.5 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 space-y-5">
                    <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-[#4B2C82]">{itemName}</p>
                            <span className="text-xs font-bold text-[#8B5CF6] px-2 py-1 bg-purple-100 rounded-md mt-1 inline-block">{category}</span>
                        </div>
                        <span className="font-black text-xl text-[#5B3A8F]">${price}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#6D5D8C] mb-2">Why do you want this item? <span className="font-normal">(Optional)</span></label>
                        <textarea
                            value={optionalNote}
                            onChange={(e) => setOptionalNote(e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-purple-100 rounded-xl px-4 py-3 text-[#4B2C82] font-medium focus:outline-none focus:border-[#8B5CF6] transition-all resize-none"
                            placeholder="e.g. My old one broke, or I just really love the color..."
                        />
                    </div>
                </div>
            )}

            <button 
                onClick={startAnalysis}
                disabled={inputMode === 'upload' && !uploadedImage}
                className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
            >
                Analyze Purchase <Star size={20} className="fill-white" />
            </button>
        </motion.div>
    );

    const renderScreen3Loading = () => (
        <motion.div key="screen3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg mx-auto flex flex-col items-center justify-center py-10">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative mb-10">
                <div className="absolute inset-0 top-[20%] left-[10%] w-[80%] h-[70%] rounded-full bg-white/40 blur-[80px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '2s' }}></div>
                <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
            </div>
            <div className="bg-white/80 backdrop-blur-xl px-8 py-5 rounded-[24px] shadow-lg border border-white/80 flex flex-col items-center gap-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <DollarSign className="text-[#8B5CF6] animate-spin" size={32} style={{ animationDuration: '3s' }} />
                <p className="font-bold text-[#5B3A8F] text-lg md:text-xl text-center">
                    Analyzing this purchase based on your<br/>
                    <span className="text-[#8B5CF6]">spending habits, budget, and priorities...</span>
                </p>
            </div>
        </motion.div>
    );

    const renderScreen4Results = () => {
        if (!analysisResult) return null;
        const res = analysisResult;
        
        const themeColors = {
            green: 'from-emerald-400 to-teal-500 text-teal-800 bg-teal-50 border-teal-200',
            orange: 'from-orange-400 to-amber-500 text-amber-800 bg-amber-50 border-amber-200',
            red: 'from-rose-400 to-red-500 text-red-800 bg-red-50 border-red-200',
        };

        const Icon = res.icon;

        return (
            <motion.div key="screen4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-2xl mx-auto space-y-6">
                
                <div className={`bg-white rounded-[32px] p-6 lg:p-8 shadow-lg border-2 ${themeColors[res.theme].split(' ').pop()} text-center relative overflow-hidden`}>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r opacity-50"></div>
                    
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-bold text-sm mb-4">
                        Aura Recommendation
                    </span>
                    
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <Icon size={40} className={`text-${themeColors[res.theme].split(' ')[2].split('-')[1]}-500`} />
                        <h2 className={`text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${themeColors[res.theme].split(' ').slice(0, 2).join(' ')}`}>
                            {res.action}
                        </h2>
                    </div>
                    
                    <p className="text-[#6D5D8C] text-lg font-medium italic mt-4 mb-6">"{res.explanation}"</p>
                    
                    <div className="flex justify-center gap-6 pt-6 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Score</p>
                            <p className="text-2xl font-black text-[#5B3A8F]">{res.score}/100</p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Budget Impact</p>
                            <p className="text-2xl font-black text-rose-500">{res.impactOnBudget}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-purple-100">
                    <h3 className="font-bold text-[#4B2C82] mb-4">Breakdown</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-purple-50">
                            <span className="font-semibold text-[#6D5D8C]">Financial Impact</span>
                            <span className="font-bold text-[#5B3A8F]">{res.breakdown.financialImpact}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-purple-50">
                            <span className="font-semibold text-[#6D5D8C]">Need vs Want Score</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-purple-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#8B5CF6]" style={{ width: `${res.breakdown.needVsWant}%` }}></div>
                                </div>
                                <span className="font-bold text-[#5B3A8F]">{res.breakdown.needVsWant}%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-purple-50">
                            <span className="font-semibold text-[#6D5D8C]">Long-term Value</span>
                            <span className="font-bold text-[#5B3A8F]">{res.breakdown.longTermValue}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={handleSaveDecision}
                        className="w-full py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={20} /> Save Decision
                    </button>
                    <button 
                        onClick={() => setStep(5)}
                        className="w-full py-4 bg-white border-2 border-purple-200 hover:bg-purple-50 transition-colors text-[#6D5D8C] rounded-2xl text-[16px] font-bold shadow-sm flex items-center justify-center gap-2"
                    >
                        <BarChart3 size={20} /> Verify Impact
                    </button>
                </div>
            </motion.div>
        );
    };

    const renderScreen5Sim = () => {
        if (!analysisResult) return null;
        const sim = analysisResult.simulation;
        const isRecommendingBuy = analysisResult.action === 'Buy';

        return (
            <motion.div key="screen5" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-3xl mx-auto space-y-6">
                 <div className="text-center mb-4">
                     <h2 className="text-3xl font-black text-[#5B3A8F] mb-2">Purchase Impact</h2>
                     <p className="text-[#6D5D8C] font-medium">Comparing scenarios over the next month.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* If Buy Card */}
                    <div className={`bg-white rounded-3xl p-6 shadow-sm border-2 transition-all ${isRecommendingBuy ? 'border-[#8B5CF6] shadow-[0_8px_30px_rgba(139,92,246,0.15)] scale-[1.02]' : 'border-gray-200 opacity-80'}`}>
                        {isRecommendingBuy && <div className="bg-[#8B5CF6] text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full inline-block mb-3">Recommended</div>}
                        <h3 className="font-black text-[#4B2C82] text-xl mb-4">If You Buy</h3>
                        
                        <div className="space-y-5">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Remaining Budget</p>
                                <p className="text-2xl font-black text-[#5B3A8F]">${sim.ifBuy.remainingBudget.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Savings Trend</p>
                                <div className="flex items-center gap-2 text-rose-500 font-bold">
                                    <TrendingDown size={20} /> {sim.ifBuy.savingsTrend}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* If Don't Buy Card */}
                    <div className={`bg-white rounded-3xl p-6 shadow-sm border-2 transition-all ${!isRecommendingBuy ? 'border-emerald-500 shadow-[0_8px_30px_rgba(16,185,129,0.15)] scale-[1.02]' : 'border-gray-200 opacity-80'}`}>
                        {!isRecommendingBuy && <div className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full inline-block mb-3">Recommended</div>}
                        <h3 className="font-black text-[#4B2C82] text-xl mb-4">If You Avoid</h3>
                        
                        <div className="space-y-5">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Savings Improvement</p>
                                <p className="text-2xl font-black text-emerald-500">{sim.ifDontBuy.savingsImprovement}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Future Flexibility</p>
                                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                                    <TrendingUp size={20} /> {sim.ifDontBuy.financialFlexibility}
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-purple-100 flex justify-center">
                    <button 
                        onClick={handleSaveDecision}
                        className="w-full md:w-auto px-10 py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full text-[16px] font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
                    >
                        Save Decision
                    </button>
                 </div>
            </motion.div>
        );
    };

    const renderScreen6Saved = () => (
        <motion.div key="screen6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-[#5B3A8F] mb-3">Decision Saved!</h2>
            <p className="text-[#6D5D8C] font-medium text-lg mb-10">Your purchase decision tracking has been successfully updated.</p>

            <button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-white border-2 border-purple-200 hover:bg-purple-50 transition-colors text-[#5B3A8F] rounded-2xl text-[16px] font-bold shadow-sm flex items-center justify-center gap-2"
            >
                <Home size={20} /> Back to Dashboard
            </button>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden flex flex-col">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-8 lg:py-12 flex-1 flex flex-col">
                <header className="flex justify-between items-center mb-8 md:mb-12">
                     <button 
                        onClick={() => {
                            if (step === 1) navigate('/decisions');
                            else if (step === 2) setStep(1);
                            else if (step === 4 || step === 5) setStep(2);
                        }}
                        className={`w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] border border-white/50 hover:bg-white/80 transition-all font-bold ${step === 3 || step === 6 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    {(step !== 3 && step !== 6) && (
                        <div className="flex gap-1">
                            {[1, 2, 4, 5].map((idx, i) => (
                                <div 
                                    key={i} 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        step >= Math.min(idx, 5) ? 'w-8 bg-[#8B5CF6]' : 'w-2 bg-purple-200'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                     <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md">
                        <span className="text-white font-bold tracking-wider">AURA</span>
                     </div>
                </header>

                <div className="flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 1 && renderScreen1()}
                        {step === 2 && renderScreen2()}
                        {step === 3 && renderScreen3Loading()}
                        {step === 4 && renderScreen4Results()}
                        {step === 5 && renderScreen5Sim()}
                        {step === 6 && renderScreen6Saved()}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ShouldIBuyThis;
