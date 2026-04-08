import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Upload, Edit3, Image as ImageIcon, Plus, Trash2, Camera, Star, ArrowRight, CheckCircle2, SlidersHorizontal, X } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const occasions = ['Casual', 'Office', 'Party', 'Wedding', 'Gym', 'Travel', 'Other'];
const outfitTypes = ['casual', 'formal', 'sporty'];

const WhatShouldIWear = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    // Screen 1 State
    const [inputMode, setInputMode] = useState(null); // 'upload' or 'manual'
    const [occasion, setOccasion] = useState('');

    // Screen 2 State (Upload)
    const [uploadedOutfits, setUploadedOutfits] = useState([]); // { id, file, url, name }
    const fileInputRef = useRef(null);

    // Screen 3 State (Manual)
    const [manualOutfits, setManualOutfits] = useState([{ id: 1, name: '', type: 'casual', comfort: 50 }]);

    // Screen 5 State (Results - mocked)
    const [analysisResult, setAnalysisResult] = useState(null);

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            uploadedOutfits.forEach(outfit => {
                if (outfit.url) URL.revokeObjectURL(outfit.url);
            });
        };
    }, []);

    const handleContinueFromScreen1 = () => {
        if (!inputMode || !occasion) return;
        if (inputMode === 'upload') setStep(2);
        else setStep(3);
    };

    // Upload handlers
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        const newOutfits = files.map((file, index) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            url: URL.createObjectURL(file),
            name: `Outfit ${uploadedOutfits.length + index + 1}`
        }));
        setUploadedOutfits([...uploadedOutfits, ...newOutfits]);
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemoveUpload = (id) => {
        const outfit = uploadedOutfits.find(o => o.id === id);
        if (outfit && outfit.url) URL.revokeObjectURL(outfit.url);
        setUploadedOutfits(uploadedOutfits.filter(o => o.id !== id));
    };

    const handleUploadNameChange = (id, newName) => {
        setUploadedOutfits(uploadedOutfits.map(o => o.id === id ? { ...o, name: newName } : o));
    };

    // Manual handlers
    const handleAddManualOutfit = () => {
        setManualOutfits([...manualOutfits, { id: Math.random().toString(36).substr(2, 9), name: '', type: 'casual', comfort: 50 }]);
    };

    const handleUpdateManualOutfit = (id, field, value) => {
        setManualOutfits(manualOutfits.map(o => o.id === id ? { ...o, [field]: value } : o));
    };

    const handleRemoveManualOutfit = (id) => {
        if (manualOutfits.length > 1) {
            setManualOutfits(manualOutfits.filter(o => o.id !== id));
        }
    };

    // Analyze Process
    const startAnalysis = () => {
        setStep(4);
        
        // Mock analysis
        setTimeout(() => {
            const outfits = inputMode === 'upload' ? uploadedOutfits : manualOutfits;
            // Generate some default if empty
            const resolvedOutfits = outfits.length > 0 ? outfits : [{ id: 'default', name: 'My Favorite Outfit', url: null, type: 'casual' }];
            
            const top = resolvedOutfits[0];
            const others = resolvedOutfits.slice(1);
            
            setAnalysisResult({
                topMatch: {
                    ...top,
                    score: 95,
                    explanation: `This is perfect for a ${occasion.toLowerCase()} occasion! It balances comfort and style excellently, making sure you look great without feeling restricted.`,
                    metrics: { style: 92, comfort: 98, occasionMatch: 96, weather: 90 }
                },
                otherOptions: others.map((o, idx) => ({
                    ...o,
                    score: 85 - (idx * 8), // decreasing scores
                    explanation: `A good secondary option, though slightly less optimal for a ${occasion.toLowerCase()} setting.`,
                    metrics: { style: 80 - idx * 2, comfort: 85 - idx * 5, occasionMatch: 75 - idx * 5, weather: 80 }
                }))
            });
            setStep(5);
        }, 3500);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
    };

    // Components for Screens
    const renderScreen1 = () => (
        <motion.div key="screen1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black text-[#5B3A8F] mb-2 text-center">Outfit Assistant</h1>
            <p className="text-[#6D5D8C] text-center mb-10 font-medium">How would you like AURA to help you decide?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                <div 
                    onClick={() => setInputMode('upload')}
                    className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                        inputMode === 'upload' 
                        ? 'bg-white border-[#8B5CF6] shadow-[0_8px_25px_rgba(139,92,246,0.25)] scale-[1.02]' 
                        : 'bg-white/50 border-white/50 hover:bg-white/80 hover:scale-[1.01]'
                    }`}
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${inputMode === 'upload' ? 'bg-[#8B5CF6] text-white' : 'bg-[#E9D5FF] text-[#8B5CF6]'}`}>
                        <Camera size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-[#4B2C82]">Upload Photos</h3>
                        <p className="text-sm text-[#6D5D8C] mt-1">Upload pictures of your outfit options</p>
                    </div>
                </div>

                <div 
                    onClick={() => setInputMode('manual')}
                    className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                        inputMode === 'manual' 
                        ? 'bg-white border-[#8B5CF6] shadow-[0_8px_25px_rgba(139,92,246,0.25)] scale-[1.02]' 
                        : 'bg-white/50 border-white/50 hover:bg-white/80 hover:scale-[1.01]'
                    }`}
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${inputMode === 'manual' ? 'bg-[#8B5CF6] text-white' : 'bg-[#E9D5FF] text-[#8B5CF6]'}`}>
                        <Edit3 size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-[#4B2C82]">Enter Details</h3>
                        <p className="text-sm text-[#6D5D8C] mt-1">Manually describe your outfit choices</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-white/80 mb-10">
                <h3 className="font-bold text-[#4B2C82] mb-4 text-lg">What's the occasion?</h3>
                <div className="flex flex-wrap gap-3">
                    {occasions.map(occ => (
                        <button
                            key={occ}
                            onClick={() => setOccasion(occ)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                                occasion === occ 
                                ? 'bg-[#8B5CF6] text-white shadow-md' 
                                : 'bg-white text-[#6D5D8C] hover:bg-purple-50'
                            }`}
                        >
                            {occ}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleContinueFromScreen1}
                disabled={!inputMode || !occasion}
                className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
            >
                Continue <ArrowRight size={20} />
            </button>
        </motion.div>
    );

    const renderScreen2Upload = () => (
        <motion.div key="screen2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-[#5B3A8F] mb-2 text-center">Upload Outfits</h2>
            <p className="text-[#6D5D8C] text-center mb-8 font-medium">Add photos of the outfits you're considering for the {occasion}.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {uploadedOutfits.map((outfit) => (
                    <div key={outfit.id} className="bg-white rounded-3xl p-4 shadow-sm border border-purple-100 flex flex-col group relative">
                        <button 
                            onClick={() => handleRemoveUpload(outfit.id)}
                            className="absolute top-6 right-6 bg-white/80 backdrop-blur text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors z-10 opacity-0 group-hover:opacity-100"
                        >
                            <X size={16} />
                        </button>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
                            {outfit.url ? (
                                <img src={outfit.url} alt="Outfit preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={outfit.name}
                            onChange={(e) => handleUploadNameChange(outfit.id, e.target.value)}
                            className="w-full bg-purple-50/50 border border-purple-100 rounded-xl px-4 py-2.5 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                            placeholder="Name this outfit"
                        />
                    </div>
                ))}

                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square sm:aspect-auto sm:h-full min-h-[250px] bg-white/50 border-2 border-dashed border-[#B794F4] rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/80 transition-all text-[#8B5CF6] group"
                >
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={28} />
                    </div>
                    <span className="font-bold">Add Photo</span>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>
            </div>

            <button 
                onClick={startAnalysis}
                disabled={uploadedOutfits.length === 0}
                className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
            >
                Analyze Outfits <Star size={20} className="fill-white" />
            </button>
        </motion.div>
    );

    const renderScreen3Manual = () => (
        <motion.div key="screen3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-[#5B3A8F] mb-2 text-center">Describe Outfits</h2>
            <p className="text-[#6D5D8C] text-center mb-8 font-medium">Add details for the outfits you're considering for the {occasion}.</p>

            <div className="space-y-6 mb-8">
                {manualOutfits.map((outfit, index) => (
                    <div key={outfit.id} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-purple-100 relative">
                        {manualOutfits.length > 1 && (
                            <button 
                                onClick={() => handleRemoveManualOutfit(outfit.id)}
                                className="absolute top-6 right-6 text-red-400 hover:text-red-500 p-1 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                        <h4 className="font-black text-[#5B3A8F] mb-4">Option {index + 1}</h4>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#6D5D8C] mb-2">Outfit Name/Description</label>
                                <input
                                    type="text"
                                    value={outfit.name}
                                    onChange={(e) => handleUpdateManualOutfit(outfit.id, 'name', e.target.value)}
                                    className="w-full bg-white border border-purple-100 rounded-xl px-4 py-3 text-[#4B2C82] font-semibold focus:outline-none focus:border-[#8B5CF6] transition-all shadow-sm"
                                    placeholder="e.g. Blue jeans and black tee"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#6D5D8C] mb-2">Style Type</label>
                                <div className="flex gap-2">
                                    {outfitTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleUpdateManualOutfit(outfit.id, 'type', type)}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${
                                                outfit.type === type 
                                                ? 'bg-[#8B5CF6] text-white' 
                                                : 'bg-purple-50 text-[#6D5D8C] hover:bg-purple-100'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-sm font-bold text-[#6D5D8C]">Comfort Level</label>
                                    <span className="text-sm font-bold text-[#8B5CF6]">{outfit.comfort}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={outfit.comfort}
                                    onChange={(e) => handleUpdateManualOutfit(outfit.id, 'comfort', parseInt(e.target.value))}
                                    className="w-full accent-[#8B5CF6] h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-1 text-xs text-purple-300 font-semibold">
                                    <span>Not comfortable</span>
                                    <span>Extremely comfortable</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleAddManualOutfit}
                className="w-full py-4 mb-4 bg-white border-2 border-[#E9D5FF] text-[#8B5CF6] hover:bg-purple-50 transition-colors rounded-2xl text-[15px] font-bold flex items-center justify-center gap-2"
            >
                <Plus size={20} /> Add Another Outfit
            </button>

            <button 
                onClick={startAnalysis}
                disabled={manualOutfits.some(o => !o.name.trim())}
                className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
            >
                Get AI Recommendation <Star size={20} className="fill-white" />
            </button>
        </motion.div>
    );

    const renderScreen4Loading = () => (
        <motion.div key="screen4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg mx-auto flex flex-col items-center justify-center py-10">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative mb-10">
                <div className="absolute inset-0 top-[20%] left-[10%] w-[80%] h-[70%] rounded-full bg-white/40 blur-[80px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '2s' }}></div>
                <AvatarViewer readOnlyMode={true} playWave={false} hideUI={true}/>
            </div>
            <div className="bg-white/80 backdrop-blur-xl px-8 py-5 rounded-3xl shadow-lg border border-white/80 flex flex-col items-center gap-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <Star className="text-[#8B5CF6] animate-spin" size={32} style={{ animationDuration: '3s' }} />
                <p className="font-bold text-[#5B3A8F] text-lg md:text-xl text-center">
                    Analyzing outfits based on<br/>
                    <span className="text-[#8B5CF6]">occasion, comfort, and style...</span>
                </p>
            </div>
        </motion.div>
    );

    const renderScreen5Results = () => {
        if (!analysisResult) return null;
        const top = analysisResult.topMatch;
    
        return (
            <motion.div key="screen5" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-[#8B5CF6] font-bold text-sm mb-4">
                        <Star size={16} className="fill-current" /> Top Recommendation
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-black text-[#5B3A8F] leading-tight">We found your perfect match!</h2>
                </div>
    
                {/* Top Match Card */}
                <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-[0_12px_40px_rgba(150,110,200,0.15)] border-2 border-[#D8B4FE] mb-10 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-100 rounded-full blur-2xl opacity-50"></div>
                    
                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                         {inputMode === 'upload' && top.url && (
                             <div className="w-full md:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                                 <img src={top.url} alt={top.name} className="w-full h-full object-cover" />
                             </div>
                         )}
                         <div className={`flex flex-col justify-center ${inputMode === 'upload' && top.url ? 'md:w-1/2' : 'w-full text-center items-center'}`}>
                             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 text-white font-black text-2xl shadow-lg mb-4">
                                {top.score}%
                             </div>
                             <h3 className="font-black text-2xl text-[#4B2C82] mb-3">{top.name}</h3>
                             <p className="text-[#6D5D8C] text-lg leading-relaxed mb-6 bg-purple-50 p-4 rounded-2xl italic">"{top.explanation}"</p>
                             
                             <div className="grid grid-cols-2 gap-4 w-full">
                                {['Style', 'Comfort'].map((metric) => (
                                    <div key={metric} className="bg-white border border-purple-50 p-3 rounded-xl shadow-sm text-center">
                                        <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">{metric}</p>
                                        <p className="font-extrabold text-[#5B3A8F] text-lg">{top.metrics[metric.toLowerCase()]}%</p>
                                    </div>
                                ))}
                             </div>
                         </div>
                    </div>
                </div>
    
                {/* Other Options (if any) */}
                {analysisResult.otherOptions.length > 0 && (
                    <div className="mb-10">
                        <h4 className="font-bold text-[#6D5D8C] mb-4 pl-2 text-lg">Other Options</h4>
                        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                            {analysisResult.otherOptions.map((opt, idx) => (
                                <div key={idx} className="min-w-[280px] bg-white/70 backdrop-blur rounded-2xl p-5 shadow-sm border border-white snap-center flex items-center gap-4">
                                    {inputMode === 'upload' && opt.url ? (
                                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                            <img src={opt.url} alt={opt.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center text-[#8B5CF6] font-bold text-lg shrink-0">
                                            {opt.score}%
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h5 className="font-bold text-[#5B3A8F]">{opt.name}</h5>
                                        {opt.url && <p className="text-sm font-semibold text-[#8B5CF6]">{opt.score}% Match</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
    
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 transition-opacity text-white rounded-2xl text-[16px] font-bold shadow-md flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={20} /> Wear This!
                    </button>
                    <button 
                        onClick={() => setStep(6)}
                        className="w-full py-4 bg-white border-2 border-purple-200 hover:bg-purple-50 transition-colors text-[#6D5D8C] rounded-2xl text-[16px] font-bold shadow-sm flex items-center justify-center gap-2"
                    >
                        <SlidersHorizontal size={20} /> Compare In Detail
                    </button>
                </div>
            </motion.div>
        );
    };

    const renderScreen6Comparison = () => {
        if (!analysisResult) return null;
        
        // Prepare items to compare (top + others)
        const allItems = [analysisResult.topMatch, ...analysisResult.otherOptions].slice(0, 3); // Max 3 for comparison

        return (
            <motion.div key="screen6" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-[1200px] mx-auto overflow-hidden">
                <div className="text-center mb-8">
                     <h2 className="text-3xl lg:text-4xl font-black text-[#5B3A8F] mb-3">Detailed Comparison</h2>
                     <p className="text-[#6D5D8C] font-medium">See how your choices stack up based on key metrics.</p>
                </div>

                <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-8 snap-x p-2">
                     {allItems.map((item, index) => {
                         const isWinner = index === 0;
                         return (
                             <div key={index} className={`min-w-[300px] w-full max-w-[400px] mx-auto bg-white rounded-[32px] p-6 shadow-md border-2 relative snap-center flex flex-col ${isWinner ? 'border-[#D8B4FE] shadow-[0_8px_30px_rgba(216,180,254,0.4)]' : 'border-transparent'}`}>
                                 {isWinner && (
                                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] text-white text-xs font-bold rounded-full shadow-md z-10 whitespace-nowrap flex items-center gap-1">
                                         <Star size={12} className="fill-white" /> Top Choice
                                     </div>
                                 )}
                                 
                                 {inputMode === 'upload' && item.url && (
                                     <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                                         <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                     </div>
                                 )}
                                 
                                 <div className="flex items-center justify-between mb-5">
                                     <h3 className="font-extrabold text-[#4B2C82] text-xl truncate pr-3">{item.name}</h3>
                                     <span className={`text-lg font-black ${isWinner ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>{item.score}%</span>
                                 </div>

                                 <div className="space-y-4 flex-1">
                                     {[ 
                                         { label: 'Style Match', key: 'style', icon: '✨' },
                                         { label: 'Comfort', key: 'comfort', icon: '😌' },
                                         { label: 'Occasion', key: 'occasionMatch', icon: '🎯' },
                                         { label: 'Weather', key: 'weather', icon: '🌤️' }
                                     ].map((metric) => (
                                         <div key={metric.key}>
                                             <div className="flex justify-between text-[13px] font-bold text-[#6D5D8C] mb-1.5">
                                                 <span className="flex items-center gap-1.5">{metric.icon} {metric.label}</span>
                                                 <span>{item.metrics[metric.key]}%</span>
                                             </div>
                                             <div className="w-full h-2.5 bg-purple-100 rounded-full overflow-hidden">
                                                 <motion.div 
                                                     initial={{ width: 0 }}
                                                     animate={{ width: `${item.metrics[metric.key]}%` }}
                                                     transition={{ duration: 1, delay: 0.2 }}
                                                     className={`h-full rounded-full ${isWinner ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]' : 'bg-[#C4B5FD]'}`}
                                                 />
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                                 
                                 <div className="mt-8">
                                     <button 
                                        onClick={() => navigate('/dashboard')}
                                        className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all ${
                                            isWinner 
                                            ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-md' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Choose This Outfit
                                    </button>
                                 </div>
                             </div>
                         );
                     })}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden flex flex-col">
            
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                {/* Sparkles */}
                <div className="absolute top-20 right-10 text-white opacity-80 animate-pulse text-2xl" style={{ animationDuration: '3s' }}>✨</div>
                <div className="absolute top-[30%] left-8 text-white opacity-60 animate-pulse text-xl" style={{ animationDuration: '4s', animationDelay: '1s' }}>✨</div>
                <div className="absolute bottom-[20%] right-20 text-white opacity-75 animate-pulse text-3xl" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>✨</div>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-8 lg:py-12 flex-1 flex flex-col">
                
                {/* Header */}
                <header className="flex justify-between items-center mb-8 md:mb-12">
                     <button 
                        onClick={() => {
                            if (step === 1) navigate('/decisions');
                            else if (step === 2 || step === 3) setStep(1);
                            else if (step === 5) setStep(1); // or dashboard
                            else if (step === 6) setStep(5);
                        }}
                        className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] border border-white/50 hover:bg-white/80 transition-all font-bold"
                    >
                        {step === 4 ? null : <ChevronLeft className="w-6 h-6" />}
                    </button>
                    {(step !== 4) && (
                        <div className="flex gap-1">
                            {[1, 2, 4, 5].map((idx, i) => (
                                <div 
                                    key={i} 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        step >= Math.min(idx, 6) ? 'w-8 bg-[#8B5CF6]' : 'w-2 bg-purple-200'
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
                        {step === 2 && renderScreen2Upload()}
                        {step === 3 && renderScreen3Manual()}
                        {step === 4 && renderScreen4Loading()}
                        {step === 5 && renderScreen5Results()}
                        {step === 6 && renderScreen6Comparison()}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default WhatShouldIWear;
