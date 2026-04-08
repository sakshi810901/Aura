import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STRESS_OPTIONS = [
  { id: 'comfort_food', emoji: '🍔', label: 'Eat comfort food' },
  { id: 'social_media', emoji: '📱', label: 'Scroll social media' },
  { id: 'sleep',        emoji: '😴', label: 'Sleep' },
  { id: 'talk',         emoji: '💬', label: 'Talk to someone' },
  { id: 'exercise',     emoji: '👟', label: 'Exercise' },
  { id: 'movies',       emoji: '🎬', label: 'Watch movies' },
];

const FREQUENCY = ['Rarely', 'Sometimes', 'Often'];

const StressHabits = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('social_media');
  const [frequency, setFrequency] = useState('Sometimes');

  const handleNext = () => {
    localStorage.setItem('aura_stress_habits', JSON.stringify({ selected, frequency }));
    navigate('/food-preferences');
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #d8caff 0%, #c3b4f7 40%, #b9b0f5 100%)' }}
    >
      {/* ── Sparkles ── */}
      {[
        { top: '8%',  left: '8%',  size: 18 },
        { top: '14%', right: '7%', size: 14 },
        { top: '40%', left: '3%',  size: 10 },
        { top: '60%', right: '4%', size: 16 },
        { bottom: '28%', left: '12%', size: 12 },
        { bottom: '12%', right: '14%', size: 18 },
        { bottom: '5%',  left: '40%',  size: 10 },
      ].map((s, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-0"
          style={{ ...s, width: s.size, height: s.size }}
        >
          <svg viewBox="0 0 24 24" fill="white" opacity="0.85">
            <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
          </svg>
        </div>
      ))}

      {/* ── Wave at bottom ── */}
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
        className="relative z-10 mx-4 w-full max-w-[400px] rounded-3xl bg-white shadow-2xl overflow-hidden"
        style={{ padding: '0 0 28px 0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
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
          <button
            onClick={() => navigate('/gender-select')}
            className="text-[#8B5CF6] font-semibold text-sm hover:text-[#6d28d9] transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Question 1 */}
        <div className="px-6 mb-4">
          <h2 className="text-[1.05rem] font-bold text-[#3E325A] leading-snug">
            When you feel stressed, what do you usually do?
          </h2>
        </div>

        {/* Option Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3 px-5 mb-6"
        >
          {STRESS_OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <motion.button
                key={opt.id}
                variants={item}
                onClick={() => setSelected(opt.id)}
                className="flex flex-col items-center justify-center rounded-2xl py-4 px-2 relative transition-all duration-200"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    : '#f5f2ff',
                  boxShadow: isSelected
                    ? '0 6px 20px rgba(124,58,237,0.35)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  border: isSelected ? 'none' : '1.5px solid #ede9fe',
                }}
              >
                {/* Checkmark */}
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.25)' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                {/* Emoji bubble */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 text-2xl"
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.18)' : '#ede9fe',
                  }}
                >
                  {opt.emoji}
                </div>
                <span
                  className="text-[11px] font-semibold text-center leading-tight"
                  style={{ color: isSelected ? 'white' : '#4A3A6B' }}
                >
                  {opt.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Question 2 */}
        <div className="px-6 mb-3">
          <h2 className="text-[1rem] font-bold text-[#3E325A]">
            How often do you feel stressed?
          </h2>
        </div>

        {/* Frequency pills */}
        <div className="flex gap-2 px-6 mb-7">
          {FREQUENCY.map((f) => {
            const isActive = frequency === f;
            return (
              <motion.button
                key={f}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFrequency(f)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    : '#f5f2ff',
                  color: isActive ? 'white' : '#6B5C99',
                  border: isActive ? 'none' : '1.5px solid #ede9fe',
                  boxShadow: isActive ? '0 4px 14px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                {f}
              </motion.button>
            );
          })}
        </div>

        {/* Next button */}
        <div className="px-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3.5 rounded-full font-semibold text-white text-base transition-all"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              boxShadow: '0 8px 24px -6px rgba(109,40,217,0.5)',
            }}
          >
            Next
          </motion.button>
        </div>
      </motion.div>

      {/* Step indicator */}
      <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-3 z-20">
        <div className="h-[2px] w-20 bg-white/40 rounded-full" />
        <span className="text-white/80 font-semibold text-xs">Step 5 of 8</span>
        <div className="h-[2px] w-20 bg-white/60 rounded-full" />
      </div>
    </div>
  );
};

export default StressHabits;
