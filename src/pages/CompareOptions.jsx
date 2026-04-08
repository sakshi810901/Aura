import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, ChevronDown, Check, ArrowLeft, Sparkles, Loader2, X, Heart, ShoppingBag, Smile } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const CompareOptions = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([
        { id: 'A', name: '', description: '', image: null, preview: null },
        { id: 'B', name: '', description: '', image: null, preview: null }
    ]);
    const [decisionType, setDecisionType] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Checkboxes
    const [priorityFactors, setPriorityFactors] = useState({
        health: true,
        money: false,
        convenience: false,
        spirits: false,
        mood: false,
        longTerm: true
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const fileInputRefs = useRef([]);

    const handleFactorToggle = (factorKey) => {
        setPriorityFactors(prev => ({
            ...prev,
            [factorKey]: !prev[factorKey]
        }));
    };

    const addOption = () => {
        if (options.length >= 4) return;
        const nextId = String.fromCharCode(65 + options.length);
        setOptions([...options, { id: nextId, name: '', description: '', image: null, preview: null }]);
    };

    const updateOption = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            const newOptions = [...options];
            newOptions[index].image = file;
            newOptions[index].preview = previewUrl;
            setOptions(newOptions);
        }
    };

    const removeImage = (index) => {
        const newOptions = [...options];
        newOptions[index].image = null;
        newOptions[index].preview = null;
        setOptions(newOptions);
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].value = '';
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Mock analysis process
        setTimeout(() => {
            setIsAnalyzing(false);
            const validOptions = options.filter(o => o.name.trim() !== '' || o.preview !== null);
            
            let bestOption = null;
            let otherOption = null;

            if (validOptions.length > 1) {
                bestOption = validOptions[1];
                otherOption = validOptions[0];
            } else if (validOptions.length === 1) {
                bestOption = validOptions[0];
                otherOption = { id: 'B', name: 'Alternative', preview: null };
            } else {
                bestOption = { id: 'B', name: 'Salad', preview: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop' };
                otherOption = { id: 'A', name: 'Pizza', preview: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop' };
            }

            const fallbackImageSalad = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop";
            const fallbackImagePizza = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop";

            const itemBestName = bestOption.name || "Salad";
            const itemOtherName = otherOption.name || "Pizza";
            
            setAnalysisResult({
                bestOptionId: bestOption.id,
                bestOptionName: itemBestName,
                score: "8.9 / 10",
                confidence: "92%",
                description: `This option aligns better with your health goals, contains fewer calories and improves energy levels.`,
                image: bestOption.preview || fallbackImageSalad,
                breakdown: {
                    health: 85,
                    cost: 65,
                    convenience: 75,
                    mood: 50
                },
                // For the comparison view detailed stats
                compareDetails: {
                    optA: {
                        id: otherOption.id,
                        name: itemOtherName,
                        image: otherOption.preview || fallbackImagePizza,
                        health: 4,
                        cost: 6,
                        convenience: 8,
                        happiness: 9
                    },
                    optB: {
                        id: bestOption.id,
                        name: itemBestName,
                        image: bestOption.preview || fallbackImageSalad,
                        health: 9,
                        cost: 7,
                        convenience: 6,
                        happiness: 7
                    },
                    overallBars: {
                        health: 90,
                        money: 70,
                        happiness: 75,
                        energy: 85
                    },
                    insight: `Choosing Option ${bestOption.id} regularly could improve your energy levels and reduce monthly junk food spending.`
                }
            });
        }, 2000);
    };

    const decisionTypes = [
        "What should I eat?",
        "What should I wear?",
        "Should I buy this?",
        "What should I do next?",
        "Help me make a choice"
    ];

    if (showDetails && analysisResult) {
        const details = analysisResult.compareDetails;
        
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-10">
                {/* Ambient Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <Sparkles className="absolute top-[8%] right-20 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                    <Sparkles className="absolute top-[12%] right-[10%] text-white opacity-[0.9] w-6 h-6 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                </div>

                <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 mx-auto max-w-[800px] flex flex-col">
                    
                    <button 
                        onClick={() => setShowDetails(false)} 
                        className="flex items-center gap-2 text-[#5B3A8F] hover:text-[#4B2C82] transition-colors mb-4 font-semibold w-fit"
                    >
                        <ArrowLeft size={20} />
                        Back to Recommendation
                    </button>

                    <h2 className="text-3xl font-black text-[#5B3A8F] mb-6 tracking-tight">
                        Decision Comparison
                    </h2>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-white/40 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 shadow-[0_12px_40px_rgba(150,110,200,0.15)] border border-white/60 flex flex-col relative"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-30 skew-x-12 -translate-x-[150%] animate-[shimmer_3s_infinite]" />

                        {/* Top Side-by-Side */}
                        <div className="flex relative mb-8">
                            
                            {/* VS Badge Center */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#B58CFF] to-[#9B6CF6] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(155,108,246,0.6)] z-20 border-[3px] border-white/80">
                                VS
                                <Sparkles className="absolute -top-1 -right-1 text-white opacity-80 w-3 h-3 animate-ping" />
                            </div>

                            {/* Option A */}
                            <div className="flex-1 border-r border-white/50 pr-4 lg:pr-8 flex flex-col relative">
                                <h3 className="text-center text-[#6D5D8C] font-bold text-lg mb-3">Option {details.optA.id}</h3>
                                <div className="w-full h-32 lg:h-40 rounded-2xl overflow-hidden shadow-inner mb-4 relative z-10">
                                    <img src={details.optA.image} alt={details.optA.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-center font-black text-[#5B3A8F] text-xl mb-6">{details.optA.name}</h4>
                                
                                <div className="flex flex-col gap-3">
                                    <FactorRow icon={<Heart size={16} />} label="Health" value={details.optA.health} color="text-red-400" />
                                    <FactorRow icon={<div className="w-4 h-4 rounded-full border-[1.5px] border-[#F87171] flex items-center justify-center"><span className="text-[10px] font-bold text-[#F87171]">$</span></div>} label="Cost" value={details.optA.cost} color="text-[#6D5D8C]" />
                                    <FactorRow icon={<ShoppingBag size={16} />} label="Convenience" value={details.optA.convenience} color="text-[#A78BFA]" />
                                    <FactorRow icon={<Smile size={16} />} label="Happiness" value={details.optA.happiness} color="text-[#6D5D8C]" />
                                </div>
                            </div>

                            {/* Option B */}
                            <div className="flex-1 pl-4 lg:pl-8 flex flex-col relative">
                                <h3 className="text-center text-[#6D5D8C] font-bold text-lg mb-3">Option {details.optB.id}</h3>
                                <div className="w-full h-32 lg:h-40 rounded-2xl overflow-hidden shadow-inner mb-4 relative z-10">
                                    <img src={details.optB.image} alt={details.optB.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-center font-black text-[#5B3A8F] text-xl mb-6">{details.optB.name}</h4>
                                
                                <div className="flex flex-col gap-3">
                                    <FactorRow icon={<Heart size={16} />} label="Health" value={details.optB.health} color="text-green-500" iconColor="text-green-500" />
                                    <FactorRow icon={<div className="w-4 h-4 rounded-full border-[1.5px] border-[#F87171] flex items-center justify-center"><span className="text-[10px] font-bold text-[#F87171]">$</span></div>} label="Cost" value={details.optB.cost} color="text-[#6D5D8C]" iconColor="text-[#F87171]" />
                                    <FactorRow icon={<ShoppingBag size={16} />} label="Convenience" value={details.optB.convenience} color="text-[#6D5D8C]" iconColor="text-[#A78BFA]" />
                                    <FactorRow icon={<Smile size={16} />} label="Happiness" value={details.optB.happiness} color="text-[#6D5D8C]" iconColor="text-[#F472B6]" />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] w-full bg-white/60 mb-6"></div>

                        {/* Progress Bars Section */}
                        <div className="flex flex-col gap-4 mb-8 px-2 lg:px-4">
                            <ComparisonBar label="Health Impact" percentage={details.overallBars.health} value={10} color="bg-[#86E5BB]" bgColor="bg-[#86E5BB]/30" />
                            <ComparisonBar label="Money Impact" percentage={details.overallBars.money} value={7} color="bg-[#D8B4E2]" bgColor="bg-[#FCD34D]/50" multiColor="bg-[#FCD34D]" splitPoint={45}/>
                            <ComparisonBar label="Happiness Score" percentage={details.overallBars.happiness} value={7} color="bg-[#C0A3F2]" bgColor="bg-[#D8B4E2]/50" />
                            <ComparisonBar label="Energy Level" percentage={details.overallBars.energy} value={8} color="bg-[#C0A3F2]" bgColor="bg-[#86E5BB]/30" multiColor="bg-[#86E5BB]" splitPoint={45} />
                        </div>

                        {/* AI Insight */}
                        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-sm relative z-10">
                            <h5 className="flex items-center gap-2 text-[#8B5CF6] font-bold mb-2">
                                <Heart className="fill-[#8B5CF6] text-[#8B5CF6]" size={18} />
                                AI Insight
                            </h5>
                            <p className="text-[#5B3A8F] font-medium leading-relaxed pr-4 text-[15px]">
                                {details.insight}
                            </p>
                            <Sparkles className="absolute right-4 bottom-4 text-white opacity-80 w-5 h-5 pointer-events-none" />
                        </div>

                    </motion.div>
                </div>

                <style jsx>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-150%) skewX(12deg); }
                        100% { transform: translateX(150%) skewX(12deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (analysisResult) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-10">
                {/* Ambient Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <svg className="absolute top-[45%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                         <path fill="currentColor" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                    
                    {/* Sparkles */}
                    <Sparkles className="absolute top-12 left-8 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                    <Sparkles className="absolute top-[40%] right-10 text-white opacity-60 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                    <Sparkles className="absolute bottom-[20%] left-10 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                </div>
                
                <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 mx-auto max-w-[600px] flex flex-col items-center">
                    
                    {/* Chat Bubble Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex items-start gap-3 mb-6"
                    >
                        <div className="w-16 h-16 shrink-0 rounded-full border-[3px] border-white/60 bg-[#C4A9E8] shadow-md overflow-hidden relative flex justify-center items-center">
                            <div className="absolute inset-0 scale-[1.3] translate-y-2">
                                 <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
                            </div>
                        </div>
                        <div className="flex-1 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm relative">
                            <p className="text-[#5B3A8F] font-bold leading-snug flex items-center gap-2">
                                <span className="text-[#A78BFA]">💜</span>
                                Based on your priorities, here's my recommendation!
                            </p>
                            <Sparkles className="absolute top-2 right-2 text-white opacity-80 w-4 h-4" />
                            <Sparkles className="absolute bottom-2 right-6 text-white opacity-60 w-3 h-3" />
                        </div>
                    </motion.div>

                    <h2 className="w-full text-2xl font-black text-[#4B2C82] mb-4 pl-2 tracking-tight flex items-center gap-2">
                        AURA Recommendation
                    </h2>

                    {/* Results Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full bg-white/40 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_12px_40px_rgba(150,110,200,0.2)] border border-white/60 flex flex-col mb-6 relative overflow-hidden"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-50 skew-x-12 -translate-x-[150%] animate-[shimmer_3s_infinite]" />

                        <div className="flex justify-center items-center gap-2 mb-4">
                            <div className="h-[1px] bg-purple-200 flex-1"></div>
                            <div className="flex items-center gap-1.5 px-3">
                                <span className="text-[#e2b740] text-xs">◆</span>
                                <span className="text-[#6D5D8C] font-black text-sm uppercase tracking-wide">Score: {analysisResult.score}</span>
                            </div>
                            <div className="h-[1px] bg-purple-200 flex-1"></div>
                        </div>

                        {/* Image */}
                        <div className="w-full h-[200px] rounded-[24px] overflow-hidden mb-5 shadow-inner bg-white/50 border border-white/70 relative">
                            {analysisResult.image ? (
                                <img src={analysisResult.image} alt={analysisResult.bestOptionName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#A78BFA]">
                                    <span className="text-xl font-bold">No Image Provided</span>
                                </div>
                            )}
                            <Sparkles className="absolute right-4 bottom-4 text-white opacity-80 w-6 h-6 animate-pulse" />
                        </div>

                        <h3 className="text-[22px] font-black text-[#5B3A8F] mb-3 leading-tight">
                            Option {analysisResult.bestOptionId} – {analysisResult.bestOptionName}
                        </h3>

                        <div className="flex flex-col gap-1 mb-4">
                            <div className="flex items-center gap-2 text-[15px] text-[#6D5D8C] font-semibold">
                                <span className="text-[#FBBF24]">⭐</span>
                                Score: <span className="text-[#5B3A8F] font-bold">{analysisResult.score}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[15px] text-[#6D5D8C] font-semibold">
                                <span className="text-[#A78BFA] flex items-center justify-center bg-purple-100 rounded-full w-5 h-5 font-black text-xs">⬟</span>
                                Confidence: <span className="text-[#5B3A8F] font-bold">{analysisResult.confidence}</span>
                            </div>
                        </div>

                        <div className="bg-white/50 rounded-2xl p-4 mb-6 shadow-sm border border-white/60 relative">
                            <p className="text-[#5B3A8F] font-medium leading-relaxed pr-6 text-[15px]">
                                {analysisResult.description}
                            </p>
                            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-white opacity-80 w-5 h-5" />
                        </div>

                        <h4 className="text-[#6D5D8C] font-bold text-sm uppercase tracking-wide mb-4">
                            Score Breakdown
                        </h4>

                        <div className="space-y-4 mb-8">
                            <ProgressBar label="Health Impact" percentage={analysisResult.breakdown.health} color="bg-[#86E5BB]" bgColor="bg-[#86E5BB]/30" />
                            <ProgressBar label="Cost Efficiency" percentage={analysisResult.breakdown.cost} color="bg-[#FCD34D]" bgColor="bg-[#FCD34D]/30" />
                            <ProgressBar label="Convenience" percentage={analysisResult.breakdown.convenience} color="bg-[#A78BFA]" bgColor="bg-[#A78BFA]/30" />
                            <ProgressBar label="Mood Satisfaction" percentage={analysisResult.breakdown.mood} color="bg-[#F472B6]" bgColor="bg-[#F472B6]/30" />
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex-[1.5] py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:opacity-90 transition-opacity text-white rounded-2xl text-[15px] font-bold shadow-[0_4px_15px_rgba(139,92,246,0.3)] tracking-wide">
                                Accept Recommendation
                            </button>
                            <button 
                                onClick={() => setShowDetails(true)}
                                className="flex-[1] py-3.5 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/80 transition-colors text-[#5B3A8F] rounded-2xl text-[14px] font-bold tracking-wide"
                            >
                                Compare Details
                            </button>
                        </div>
                    </motion.div>

                    <button 
                        onClick={() => { setAnalysisResult(null); setShowDetails(false); }}
                        className="py-3.5 px-8 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/80 transition-colors text-[#6D5D8C] rounded-full text-[15px] font-bold tracking-wide shadow-sm"
                    >
                        Try Another Decision
                    </button>
                    
                    <style jsx>{`
                        @keyframes shimmer {
                            0% { transform: translateX(-150%) skewX(12deg); }
                            100% { transform: translateX(150%) skewX(12deg); }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-32">
            
            {/* Ambient Background Elements form screen */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute top-[45%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                     <path fill="currentColor" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                
                {/* Sparkles */}
                <Sparkles className="absolute top-12 left-8 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute top-[15%] right-20 text-white opacity-60 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <Sparkles className="absolute top-1/2 left-12 text-white opacity-75 w-10 h-10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                <Sparkles className="absolute bottom-[30%] right-10 text-white opacity-80 w-8 h-8 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-10 mx-auto max-w-[900px]">
                
                {/* Top bar with back button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-[#5B3A8F] hover:text-[#4B2C82] transition-colors mb-6 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-[#4B2C82] mb-2 tracking-tight"
                    >
                        Compare Your Options
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#6D5D8C] text-lg lg:text-xl font-medium"
                    >
                        Add the choices you want AURA to analyze.
                    </motion.p>
                </div>

                {/* Options Layout */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {options.map((option, index) => (
                                <motion.div 
                                    key={option.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/40 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/60 flex flex-col"
                                >
                                    <h3 className="text-center font-bold text-[#5B3A8F] text-xl mb-6">
                                        Option {option.id}
                                    </h3>
                                    
                                    <div className="space-y-4 flex-1 flex flex-col">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#6D5D8C] mb-2">
                                                Option Name
                                            </label>
                                            <input 
                                                type="text"
                                                value={option.name}
                                                onChange={(e) => updateOption(index, 'name', e.target.value)}
                                                placeholder={index === 0 ? "Pizza" : ""}
                                                className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-[#5B3A8F] placeholder:text-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 shadow-inner font-bold text-lg"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-[#6D5D8C] mb-2">
                                                Optional Description
                                            </label>
                                            <textarea 
                                                value={option.description}
                                                onChange={(e) => updateOption(index, 'description', e.target.value)}
                                                placeholder="Notes about this option"
                                                rows={3}
                                                className="w-full h-full min-h-[80px] bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-[#5B3A8F] placeholder:text-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 shadow-inner resize-none font-medium"
                                            />
                                        </div>

                                        <div className="mt-2 text-center">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className="hidden" 
                                                ref={el => fileInputRefs.current[index] = el}
                                                onChange={(e) => handleImageChange(index, e)}
                                            />
                                            {option.preview ? (
                                                <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border-2 border-white/80 shadow-sm group">
                                                    <img src={option.preview} alt={`Option ${option.id} Preview`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                         <button 
                                                             onClick={() => removeImage(index)}
                                                             className="bg-white/90 text-red-500 rounded-full p-2 hover:scale-110 transition-transform shadow-md"
                                                         >
                                                             <X size={20} />
                                                         </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => fileInputRefs.current[index]?.click()}
                                                    className="w-full mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-[#A78BFA] bg-white/30 hover:bg-white/50 text-[#8B5CF6] font-bold rounded-2xl py-4 transition-colors group cursor-pointer"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Upload size={14} />
                                                    </div>
                                                    Upload Image
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {options.length < 4 && (
                        <div className="flex justify-center mt-2">
                            <button 
                                onClick={addOption}
                                className="flex items-center gap-2 px-6 py-3 bg-white/40 hover:bg-white/60 text-[#8B5CF6] border border-white/80 rounded-full font-bold shadow-sm transition-all hover:scale-105"
                            >
                                <Plus size={18} />
                                Add Another Option
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Decision Type Dropdown */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 mb-8 relative"
                >
                    <label className="block text-sm font-bold text-[#6D5D8C] mb-2 uppercase tracking-wide">
                        Decision Type
                    </label>
                    <div 
                        className="w-full bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer shadow-sm text-[#5B3A8F] font-semibold text-lg"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {decisionType || <span className="text-[#A78BFA]">What kind of decision is this?</span>}
                        <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full mt-2 w-full bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-[0_8px_32px_rgba(150,110,200,0.2)] z-20 overflow-hidden"
                            >
                                {decisionTypes.map((type, idx) => (
                                    <div 
                                        key={idx}
                                        className="px-5 py-4 hover:bg-purple-50 cursor-pointer text-[#5B3A8F] font-bold border-b border-purple-100 last:border-0"
                                        onClick={() => {
                                            setDecisionType(type);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {type}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Priority Factors Checkboxes */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <label className="block text-sm font-bold text-[#6D5D8C] mb-3 uppercase tracking-wide">
                        Priority Factors
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Box 1 */}
                        <div className="bg-white/40 backdrop-blur-md rounded-[24px] border border-white/60 p-5 space-y-4">
                            <Checkbox 
                                label="Health" 
                                checked={priorityFactors.health} 
                                onChange={() => handleFactorToggle('health')} 
                            />
                            <Checkbox 
                                label="Convenience" 
                                checked={priorityFactors.convenience} 
                                onChange={() => handleFactorToggle('convenience')} 
                            />
                            <Checkbox 
                                label="Mood" 
                                checked={priorityFactors.mood} 
                                onChange={() => handleFactorToggle('mood')} 
                            />
                        </div>

                        {/* Box 2 */}
                        <div className="bg-white/40 backdrop-blur-md rounded-[24px] border border-white/60 p-5 space-y-4">
                            <Checkbox 
                                label="Money" 
                                checked={priorityFactors.money} 
                                onChange={() => handleFactorToggle('money')} 
                            />
                            <Checkbox 
                                label="Spirits" 
                                checked={priorityFactors.spirits} 
                                onChange={() => handleFactorToggle('spirits')} 
                            />
                            <Checkbox 
                                label="Long-term benefit" 
                                checked={priorityFactors.longTerm} 
                                onChange={() => handleFactorToggle('longTerm')} 
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                         <button className="flex items-center gap-2 px-6 py-3 bg-white/30 hover:bg-white/50 text-[#8B5CF6] border border-[#B794F4]/50 rounded-full font-bold transition-all shadow-sm">
                             <Plus size={18} />
                             Add Another Factor
                         </button>
                    </div>

                </motion.div>

                {/* Analyze Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mb-10"
                >
                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-[80%] max-w-md py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:opacity-90 transition-opacity text-white rounded-full text-lg font-black shadow-[0_8px_25px_rgba(139,92,246,0.4)] tracking-wide flex items-center justify-center gap-3"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Analyzing Options...
                            </>
                        ) : (
                            "Analyze with AURA"
                        )}
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

// Sub-components 

const Checkbox = ({ label, checked, onChange }) => (
    <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onChange}
    >
        <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center transition-all ${checked ? 'bg-[#A78BFA] border-transparent shadow-sm' : 'bg-transparent border-2 border-[#B794F4]/50 group-hover:border-[#A78BFA]'}`}>
            {checked && <Check size={16} strokeWidth={4} className="text-white" />}
            {!checked && label === 'Long-term benefit' && <div className="text-[#B794F4]/50 text-xs font-bold leading-none">+</div>}
        </div>
        <span className={`font-bold text-[15px] ${checked ? 'text-[#5B3A8F]' : 'text-[#6D5D8C] group-hover:text-[#5B3A8F] transition-colors'} tracking-wide`}>
            {label}
        </span>
    </div>
);

const ProgressBar = ({ label, percentage, color, bgColor }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[110px] shrink-0">
                <span className="text-[#5B3A8F] font-bold text-[13px]">{label}</span>
            </div>
            <div className={`flex-1 h-[14px] ${bgColor} rounded-full overflow-hidden`}>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    );
};

// Detailed Comparison Factor Row
const FactorRow = ({ icon, label, value, color, iconColor }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className={`${iconColor || color} opacity-80`}>{icon}</span>
                <span className="text-[#5B3A8F] font-medium text-[15px]">{label}</span>
            </div>
            <span className={`${color} font-black text-[15px]`}>{value}</span>
        </div>
    );
};

// Comparison progress bar for the detailed view (like Health Impact, Money Impact)
const ComparisonBar = ({ label, percentage, value, color, bgColor, multiColor, splitPoint }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[110px] shrink-0">
                <span className="text-[#5B3A8F] font-bold text-[13px]">{label}</span>
            </div>
            <div className={`flex-1 h-[14px] ${bgColor} rounded-full overflow-hidden relative`}>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${color} rounded-full absolute left-0 top-0`}
                />
                {multiColor && splitPoint && (
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage - splitPoint}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${multiColor} rounded-full absolute left-[${splitPoint}%] top-0`}
                        style={{ left: `${splitPoint}%` }}
                    />
                )}
            </div>
            <span className="text-[#6D5D8C] font-bold text-[13px] w-6 text-right">{value}</span>
        </div>
    );
};

export default CompareOptions;
