import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, Phone, MoreHorizontal, Coffee, Utensils, ShoppingBag, Bus } from 'lucide-react';

const LogExpense = () => {
    const navigate = useNavigate();
    const [expenseName, setExpenseName] = useState('Food');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('Late night snack');
    const [isSaved, setIsSaved] = useState(false);

    const expenseOptions = [
        { id: 'Coffee', icon: Coffee },
        { id: 'Food', icon: Utensils },
        { id: 'Shopping', icon: ShoppingBag },
        { id: 'Transport', icon: Bus }
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden flex flex-col items-center">
            {/* Ambient Background Elements matching Dashboard */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute top-[45%] -left-[20%] w-[140%] h-auto opacity-[0.35] text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                {/* Foreground Wave Pattern overlay */}
                <svg className="absolute bottom-[0%] left-[0%] w-[100%] h-auto opacity-60 text-white z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="absolute bottom-[10%] -left-[5%] w-[110%] h-auto opacity-40 text-white z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,224C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                
                {/* Sparkles */}
                <div className="absolute top-[10%] right-[15%] w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute top-[25%] left-[10%] w-2 h-2 bg-white rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[45%] right-[25%] w-2.5 h-2.5 bg-white rounded-full blur-[1.5px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-[35%] left-[20%] w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="relative z-20 w-full max-w-md mx-auto pt-6 px-6 min-h-screen flex flex-col">
                
                {/* Header Area */}
                <div className="bg-white/40 backdrop-blur-xl rounded-[24px] p-5 pb-4 border border-white/50 shadow-sm mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <span className="text-white font-bold text-sm tracking-wider">AURA</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-black text-[#5B3A8F] tracking-tight leading-none">AURA</h2>
                            <p className="text-[10px] text-[#7E57C2] font-semibold tracking-wide uppercase">AI Life Co-Pilot</p>
                        </div>
                    </div>
                    <button className="w-9 h-9 bg-white/60 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] hover:bg-white transition-colors relative">
                        <Bell className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 bg-[#EE4B2B] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex justify-center items-center border border-white">
                            2
                        </span>
                    </button>
                </div>

                {/* Page Title */}
                <div className="mt-8 mb-6">
                    <h1 className="text-[28px] font-bold text-[#4B2C82]">Log an Expense</h1>
                </div>

                {/* Main Card */}
                <motion.div 
                    initial={{opacity: 0, y: 20}} 
                    animate={{opacity: 1, y: 0}} 
                    className="bg-white/50 backdrop-blur-xl rounded-[28px] p-6 border border-white/60 shadow-[0_8px_32px_rgba(150,110,200,0.15)] mb-10 w-full relative z-30"
                >
                    {/* Expense Name */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-full bg-[#A78BFA] flex justify-center items-center">
                                <Phone className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h3 className="text-[#5B3A8F] font-semibold text-[15px]">Expense Name</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {expenseOptions.map((option) => {
                                const Icon = option.icon;
                                const isSelected = expenseName === option.id;
                                return (
                                    <button 
                                        key={option.id}
                                        onClick={() => setExpenseName(option.id)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[13px] font-medium transition-all shadow-sm
                                            ${isSelected 
                                                ? 'bg-white border-[#A78BFA] text-[#8B5CF6]' 
                                                : 'bg-white/80 border-white/50 text-[#6D5D8C] hover:bg-white'}`}
                                    >
                                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#8B5CF6]' : 'text-[#A78BFA]'}`} strokeWidth={2} />
                                        {option.id}
                                    </button>
                                );
                            })}
                            <button className="flex items-center justify-center px-3 py-2 rounded-xl border border-white/50 bg-white/80 text-[#A78BFA] hover:bg-white transition-all shadow-sm">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <div className="relative bg-white/80 rounded-[14px] shadow-sm border border-white/60 flex items-center p-3 h-12">
                            <span className="text-[#8B5CF6] font-semibold text-lg ml-2 mr-2">₹</span>
                            <div className="w-[1px] h-6 bg-purple-200 mx-2"></div>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-transparent border-none outline-none w-full text-gray-700 font-medium text-base ml-1"
                                placeholder=""
                            />
                        </div>
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2 pl-1">
                            <div className="w-6 h-6 rounded-full bg-[#B794F4] flex justify-center items-center">
                                <ChevronDown className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-[#5B3A8F] font-semibold text-[15px]">Category</h3>
                        </div>
                        <div className="bg-white/90 rounded-[14px] p-3.5 flex justify-between items-center shadow-sm border border-white/60 cursor-pointer">
                            <span className="text-gray-700 font-medium text-[15px] ml-2">{category}</span>
                            <ChevronDown className="w-5 h-5 text-[#A78BFA]" />
                        </div>
                    </div>

                    {/* Optional Note */}
                    <div className="mb-0">
                        <div className="flex items-center gap-2 mb-3 pl-1">
                            <div className="w-6 h-6 rounded-full bg-[#B794F4] flex justify-center items-center">
                                <ChevronDown className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-[#5B3A8F] font-semibold text-[15px]">Optional Note</h3>
                        </div>
                        <div className="bg-[#f0e6f9] rounded-[20px] p-4 border border-white/60 shadow-inner">
                            <p className="text-[#6D5D8C] text-[13px] font-medium mb-2 ml-1">Why did you spend this?</p>
                            <input 
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full bg-white/50 backdrop-blur-sm border border-white/80 rounded-xl p-3 text-gray-700 font-medium text-[14px] outline-none shadow-sm placeholder-gray-400"
                                placeholder="Add a note..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 -mb-10 relative z-40">
                        <button 
                            onClick={handleSave}
                            disabled={isSaved}
                            className={`w-10/12 py-3.5 transition-all text-white rounded-full text-[15px] font-bold shadow-md tracking-wide
                                ${isSaved ? 'bg-green-500 scale-95' : 'bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] hover:opacity-90 hover:scale-[1.02]'}`}
                        >
                            <AnimatePresence mode="wait">
                                {isSaved ? (
                                    <motion.span key="saved" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                                        Saved!
                                    </motion.span>
                                ) : (
                                    <motion.span key="save" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                                        Save Expense
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LogExpense;
