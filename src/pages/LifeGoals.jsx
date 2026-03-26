import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  Coins, 
  ClipboardCheck, 
  Flower2, 
  Scale, 
  HeartHandshake, 
  BookOpen, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const GOALS = [
  { id: 'health', icon: HeartPulse, label: 'Health', desc: 'Improve fitness, diet, and wellness', color: 'text-emerald-500', bg: 'bg-emerald-100/50' },
  { id: 'money', icon: Coins, label: 'Money', desc: 'Save, invest, grow wealth', color: 'text-amber-500', bg: 'bg-amber-100/50' },
  { id: 'productivity', icon: ClipboardCheck, label: 'Productivity', desc: 'Boost focus, time management', color: 'text-indigo-500', bg: 'bg-indigo-100/50' },
  { id: 'mental_peace', icon: Flower2, label: 'Mental Peace', desc: 'Reduce stress, find calm', color: 'text-purple-500', bg: 'bg-purple-100/50' },
  { id: 'balanced_life', icon: Scale, label: 'Balanced Life', desc: 'Achieve work-life harmony', color: 'text-blue-500', bg: 'bg-blue-100/50' },
  { id: 'relationships', icon: HeartHandshake, label: 'Better Relationships', desc: 'Enhance love and connections', color: 'text-rose-500', bg: 'bg-rose-100/50' },
  { id: 'learning', icon: BookOpen, label: 'Learning', desc: 'Gain new knowledge and skills', color: 'text-sky-500', bg: 'bg-sky-100/50' },
  { id: 'career_growth', icon: TrendingUp, label: 'Career Growth', desc: 'Advance professionally', color: 'text-teal-500', bg: 'bg-teal-100/50' },
];

const LifeGoals = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggleGoal = (id) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, id]);
      }
    }
  };

  const handleNext = () => {
    // Save to localStorage or state management
    localStorage.setItem('aura_life_goals', JSON.stringify(selectedGoals));
    navigate('/daily-routine');
  };

  // Stagger animation variant
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-hidden text-[#3E325A] font-sans pb-10">
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
      <div className="fixed top-[50%] left-[5%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed top-[40%] right-[30%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.9)]"></div>

      <div className="relative z-10 w-full max-w-2xl px-4 pt-10 pb-8 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#4A3A6B] mb-2">What are your top life goals?</h1>
          <p className="text-[#6D5D8B] text-lg">Select up to 3 goals.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-10"
        >
          {GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            const Icon = goal.icon;
            
            return (
              <motion.button
                key={goal.id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleGoal(goal.id)}
                className={`relative flex flex-col items-center text-center p-4 rounded-3xl transition-all duration-300 border-2 overflow-hidden ${
                  isSelected 
                    ? 'bg-white/90 border-[#8B5CF6] shadow-[0_10px_25px_-5px_rgba(139,92,246,0.4)]' 
                    : 'bg-white/60 border-transparent shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:bg-white/80'
                }`}
              >
                {/* Background glow for selected state */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent pointer-events-none"></div>
                )}
                
                {/* Checkmark icon upper right */}
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[#8B5CF6]">
                    <CheckCircle2 size={20} className="fill-[#8B5CF6] text-white" />
                  </div>
                )}

                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-3 ${goal.bg}`}>
                  <Icon size={28} className={goal.color} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-semibold text-[#4A3A6B] text-sm mb-1">{goal.label}</h3>
                <p className="text-xs text-[#8B849C] leading-snug">{goal.desc}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="w-full max-w-[320px] flex flex-col items-center"
        >
          <motion.button
            whileHover={selectedGoals.length > 0 ? { scale: 1.02 } : {}}
            whileTap={selectedGoals.length > 0 ? { scale: 0.98 } : {}}
            onClick={handleNext}
            disabled={selectedGoals.length === 0}
            className={`w-full py-3.5 px-6 font-medium rounded-2xl transition-all text-[1rem] tracking-wide shadow-lg ${
              selectedGoals.length > 0
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)]'
                : 'bg-white/50 text-[#8B849C] cursor-not-allowed shadow-none'
            }`}
          >
            Next
          </motion.button>

          <div className="flex items-center justify-center gap-4 w-full px-8 mt-6">
            <div className="h-[2px] w-full bg-[#8B5CF6]/40 rounded-full"></div>
            <span className="text-[#5C507C] font-semibold text-xs whitespace-nowrap">Step 1 of 8</span>
            <div className="h-[2px] w-full bg-white/50 rounded-full"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LifeGoals;
