import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SPARKLES = [
  { top: '5%',   left: '6%',   size: 18 },
  { top: '12%',  right: '5%',  size: 14 },
  { top: '38%',  left: '2%',   size: 10 },
  { top: '55%',  right: '3%',  size: 16 },
  { bottom: '30%', left: '8%', size: 12 },
  { bottom: '10%', right: '10%', size: 18 },
  { bottom: '3%',  left: '42%', size: 10 },
  { top: '70%',  left: '90%',  size: 13 },
];

const GenderSelect = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    localStorage.setItem('selectedGender', gender);
    navigate('/avatar-customization');
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #d8caff 0%, #c3b4f7 40%, #b9b0f5 100%)' }}
    >
      {/* ── Sparkles ── */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-0"
          style={{ ...s, width: s.size, height: s.size }}
        >
          <svg viewBox="0 0 24 24" fill="white" opacity="0.8">
            <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
          </svg>
        </div>
      ))}

      {/* ── Wave ── */}
      <div
        className="fixed bottom-0 left-0 right-0 h-52 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(180,160,240,0.55) 100%)',
          borderRadius: '80% 80% 0 0 / 40px 40px 0 0',
        }}
      />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-4 my-8 w-full max-w-[560px] rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        {/* ── Card header with progress bar ── */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}
              >
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <div className="font-bold text-[#3E325A] text-sm leading-none">AURA</div>
                <div className="text-[10px] text-[#9b8cb5] leading-none mt-0.5">AI Life Co-Pilot</div>
              </div>
            </div>
            <span className="text-[#6B5C99] font-semibold text-xs">Step 7 of 8</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#ede9fe] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: '87.5%',
                background: 'linear-gradient(90deg, #8B5CF6, #6D28D9)',
              }}
            />
          </div>
        </div>

        {/* ── Title ── */}
        <div className="px-6 mb-8 text-center mt-2">
          <h1 className="text-[1.25rem] sm:text-2xl font-bold text-[#3E325A] leading-snug mb-2">
            Create Your Avatar
          </h1>
          <p className="text-[13px] sm:text-sm text-[#7c6da8]">Select your avatar gender to get started</p>
        </div>

        {/* ── Options ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 px-6 mb-10"
        >
          {/* Male Button */}
          <motion.button
            variants={item}
            onClick={() => handleGenderSelect('male')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-8 rounded-2xl relative transition-all duration-300 group"
            style={{
              background: '#f5f2ff',
              border: '2px solid #ede9fe',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #2563EB)',
                boxShadow: '0 8px 24px -6px rgba(37,99,235,0.4)',
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 ideological-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#3E325A] mb-1">Male</h2>
            <p className="text-xs text-[#8B849C]">Create a male avatar</p>
          </motion.button>

          {/* Female Button */}
          <motion.button
            variants={item}
            onClick={() => handleGenderSelect('female')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-8 rounded-2xl relative transition-all duration-300 group"
            style={{
              background: '#f5f2ff',
              border: '2px solid #ede9fe',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #F472B6, #DB2777)',
                boxShadow: '0 8px 24px -6px rgba(219,39,119,0.4)',
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#3E325A] mb-1">Female</h2>
            <p className="text-xs text-[#8B849C]">Create a female avatar</p>
          </motion.button>
        </motion.div>

        {/* ── UX Note ── */}
        <div
          className="mx-5 mb-5 rounded-2xl px-4 py-3.5"
          style={{ background: '#f5f2ff', border: '1.5px solid #ede9fe' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">💡</span>
            <div>
              <p className="text-[12px] font-semibold text-[#4A3A6B] mb-1.5">
                <span className="font-bold">Pro Tip</span>
              </p>
              <p className="text-[11px] text-[#6B5C99] leading-relaxed">
                Your avatar will represent you in the app. You can customize the look and feel in the next step.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenderSelect;
