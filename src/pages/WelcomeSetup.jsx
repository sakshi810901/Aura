import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const WelcomeSetup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-hidden text-[#3E325A] font-sans">
      {/* Background Anime-inspired glowing elements / Wavy overlay logic */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(138,180,248,0.4) 0%, transparent 50%)'
        }}
      ></div>
      
      {/* Stars/Sparkles effect (Static CSS rep for the design) */}
      <div className="fixed top-[15%] left-[20%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,0.9)]"></div>
      <div className="fixed top-[25%] right-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,1)]"></div>
      <div className="fixed bottom-[15%] left-[10%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed bottom-[30%] right-[20%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,0.9)]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[100%] max-w-[400px] flex flex-col items-center justify-center p-6"
      >
        {/* Avatar Image within Glowing Circle */}
        <div className="relative mb-8 mt-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-[1.3]"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[0_10px_40px_rgba(139,92,246,0.3)] border-4 border-white/40"
          >
            <img 
              src="/aura-avatar.png" 
              alt="AURA AI Assistant" 
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center mb-8 px-2 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[1.6rem] sm:text-3xl font-bold tracking-tight text-[#4A3A6B] mb-3"
          >
            Let's Build Your Personal AURA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-[#8B849C] text-[0.95rem] leading-relaxed mx-auto max-w-[320px]"
          >
            Answer a few questions so AURA can understand your lifestyle and goals.
          </motion.p>
        </div>

        {/* Feature List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full max-w-[280px] space-y-4 mb-10 mx-auto"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#6DAF8A] fill-white/80" strokeWidth={1.5} size={22} />
            <span className="text-[#5A4B7C] font-medium text-[0.95rem]">Personalized daily plans</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#6DAF8A] fill-white/80" strokeWidth={1.5} size={22} />
            <span className="text-[#5A4B7C] font-medium text-[0.95rem]">Smarter decisions</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#6DAF8A] fill-white/80" strokeWidth={1.5} size={22} />
            <span className="text-[#5A4B7C] font-medium text-[0.95rem]">Habit improvement</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full max-w-[320px] flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/life-goals')}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-medium rounded-2xl shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)] transition-all text-[0.95rem] mb-6 tracking-wide"
          >
            Start Setup
          </motion.button>
          
          <div className="flex items-center justify-center gap-4 w-full px-8">
            <div className="h-[2px] w-full bg-[#8B5CF6]/40 rounded-full"></div>
            <span className="text-[#5C507C] font-semibold text-xs whitespace-nowrap">Welcome</span>
            <div className="h-[2px] w-full bg-white/50 rounded-full"></div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default WelcomeSetup;
