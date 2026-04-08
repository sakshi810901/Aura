import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PiggyBank, 
  Scale, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';

const SPENDING_STYLES = [
  { 
    id: 'saver', 
    icon: PiggyBank, 
    label: 'Saver', 
    desc: 'I prefer saving and planning expenses.', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-100/50' 
  },
  { 
    id: 'balanced', 
    icon: Scale, 
    label: 'Balanced Spender', 
    desc: 'I spend carefully but enjoy occasionally.', 
    color: 'text-amber-500', 
    bg: 'bg-amber-100/50' 
  },
  { 
    id: 'impulsive', 
    icon: ShoppingBag, 
    label: 'Impulsive Spender', 
    desc: 'I sometimes buy things without planning.', 
    color: 'text-purple-500', 
    bg: 'bg-purple-100/50' 
  },
];

const SpendingStyle = () => {
  const navigate = useNavigate();
  const [styleId, setStyleId] = useState('balanced');
  const [dailySpend, setDailySpend] = useState('');

  const handleNext = () => {
    const spendingData = { style: styleId, dailySpend };
    localStorage.setItem('aura_spending_style', JSON.stringify(spendingData));
    navigate('/stress-habits');
  };

  // Stagger animation variant
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-y-auto overflow-x-hidden text-[#3E325A] font-sans py-12">
      {/* Background Anime-inspired glowing elements */}
      <div 
        className="fixed inset-0 z-0 opacity-50 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(138,180,248,0.5) 0%, transparent 60%)'
        }}
      ></div>
      
      {/* Stars/Sparkles effect */}
      <div className="fixed top-[10%] left-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,0.9)]"></div>
      <div className="fixed top-[20%] right-[10%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,1)]"></div>
      <div className="fixed bottom-[20%] left-[25%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed bottom-[40%] right-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.9)]"></div>

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center mt-4">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-[1.6rem] sm:text-3xl font-bold text-[#4A3A6B] mb-2 tracking-tight">What is your spending style?</h1>
          <p className="text-[#6D5D8B] text-md">Move the sliders based on your current lifestyle.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10 w-full max-w-3xl mx-auto">
            {SPENDING_STYLES.map((style) => {
              const isSelected = styleId === style.id;
              const Icon = style.icon;
              
              return (
                <motion.button
                  variants={item}
                  key={style.id}
                  onClick={() => setStyleId(style.id)}
                  className={`relative flex flex-col items-center text-center p-6 rounded-3xl transition-all duration-300 border-2 h-full ${
                    isSelected 
                      ? 'bg-white/90 border-[#8B5CF6] shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)]' 
                      : 'bg-white/50 border-transparent shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:bg-white/70'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-[#8B5CF6]">
                      <CheckCircle2 size={20} className="fill-[#8B5CF6] text-white" />
                    </div>
                  )}
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-4 ${style.bg}`}>
                    <Icon size={32} className={style.color} />
                  </div>
                  <h3 className="font-bold text-[#4A3A6B] text-md mb-2 leading-tight">{style.label}</h3>
                  <p className="text-xs text-[#8B849C] leading-snug">{style.desc}</p>
                </motion.button>
              );
            })}
          </div>

          <motion.div variants={item} className="flex flex-col w-full max-w-md mx-auto pt-2">
            <h4 className="text-sm font-semibold text-[#8B5CF6] mb-1 pl-1">Extra question</h4>
            <label className="text-sm font-medium text-[#4A3A6B] mb-3 pl-1">
              How much do you spend daily on average?
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3A6B] font-semibold text-lg">
                ₹
              </div>
              <input 
                type="number" 
                value={dailySpend}
                onChange={(e) => setDailySpend(e.target.value)}
                placeholder="0"
                className="w-full bg-white/70 border-2 border-transparent hover:border-white focus:border-[#8B5CF6] focus:bg-white text-[#4A3A6B] font-medium rounded-xl py-3.5 pl-10 pr-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] outline-none transition-all placeholder:text-[#8B849C]/50"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.5 }}
           className="w-full max-w-[320px] flex flex-col items-center mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3.5 px-6 font-medium rounded-2xl transition-all text-[1rem] tracking-wide shadow-lg bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)]"
          >
            Next
          </motion.button>

          <div className="flex items-center justify-center gap-4 w-full px-8 mt-6">
            <div className="h-[2px] w-full bg-[#8B5CF6]/40 rounded-full"></div>
            <span className="text-[#5C507C] font-semibold text-xs whitespace-nowrap">Step 4 of 8</span>
            <div className="h-[2px] w-full bg-white/50 rounded-full"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SpendingStyle;
