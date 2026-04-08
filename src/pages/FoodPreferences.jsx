import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DIET_TYPES = [
  {
    id: 'vegetarian',
    emoji: '🥗',
    label: 'Vegetarian',
    desc: 'Plant-based diet without meat or fish.',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  {
    id: 'non_veg',
    emoji: '🥩',
    label: 'Non-Vegetarian',
    desc: 'Includes meat, fish and eggs.',
    bg: '#fdf4ff',
    border: '#e9d5ff',
  },
  {
    id: 'vegan',
    emoji: '🫛',
    label: 'Vegan',
    desc: 'No animal products.',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
];

const ALLERGIES = [
  { id: 'peanuts', emoji: '🥜', label: 'Peanuts' },
  { id: 'dairy', emoji: '🧀', label: 'Dairy' },
  { id: 'gluten', emoji: '🌾', label: 'Gluten' },
  { id: 'seafood', emoji: '🦐', label: 'Seafood' },
  { id: 'soy', emoji: '🫘', label: 'Soy' },
  { id: 'eggs', emoji: '🥚', label: 'Eggs' },
];

const FOOD_GOALS = [
  { id: 'healthier', emoji: '🍎', label: 'Eat healthier' },
  { id: 'junk', emoji: '🍟', label: 'Reduce junk food' },
  { id: 'lose', emoji: '🏃', label: 'Lose weight' },
  { id: 'muscle', emoji: '💪', label: 'Gain muscle' },
  { id: 'balanced', emoji: '🥘', label: 'Eat more balanced meals' },
];

const SPARKLES = [
  { top: '5%', left: '6%', size: 18 },
  { top: '12%', right: '5%', size: 14 },
  { top: '38%', left: '2%', size: 10 },
  { top: '55%', right: '3%', size: 16 },
  { bottom: '30%', left: '8%', size: 12 },
  { bottom: '10%', right: '10%', size: 18 },
  { bottom: '3%', left: '42%', size: 10 },
  { top: '70%', left: '90%', size: 13 },
];

const FoodPreferences = () => {
  const navigate = useNavigate();
  const [diet, setDiet] = useState('non_veg');
  const [allergies, setAllergies] = useState(['dairy']);
  const [otherAllergy, setOtherAllergy] = useState('');
  const [goals, setGoals] = useState([]);

  const toggleAllergy = (id) =>
    setAllergies((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );

  const toggleGoal = (id) =>
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const handleNext = () => {
    localStorage.setItem(
      'aura_food_preferences',
      JSON.stringify({ diet, allergies, otherAllergy, goals })
    );
    navigate('/gender-select');
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #d8caff 0%, #c3b4f7 40%, #b9b0f5 100%)' }}
    >
      {/* Sparkles */}
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

      {/* Wave */}
      <div
        className="fixed bottom-0 left-0 right-0 h-52 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(180,160,240,0.55) 100%)',
          borderRadius: '80% 80% 0 0 / 40px 40px 0 0',
        }}
      />

      {/* Scrollable card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-4 my-8 w-full max-w-[860px] rounded-3xl bg-white shadow-2xl overflow-hidden"
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
            <span className="text-[#6B5C99] font-semibold text-xs">Step 6 of 8</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#ede9fe] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: '75%',
                background: 'linear-gradient(90deg, #8B5CF6, #6D28D9)',
              }}
            />
          </div>
        </div>

        {/* ── Title ── */}
        <div className="px-6 mb-5 text-center">
          <h1 className="text-[1.15rem] font-bold text-[#3E325A] leading-snug mb-1">
            Tell AURA about your food preferences
          </h1>
          <p className="text-[13px] text-[#7c6da8]">This helps us recommend healthier meals.</p>
        </div>

        {/* ── Diet Type ── */}
        <div className="px-5 mb-5">
          <h3 className="font-bold text-[#3E325A] text-[0.9rem] mb-3">Diet Type</h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-2.5"
          >
            {DIET_TYPES.map((d) => {
              const isSelected = diet === d.id;
              return (
                <motion.button
                  key={d.id}
                  variants={item}
                  onClick={() => setDiet(d.id)}
                  className="relative flex flex-col items-center text-center rounded-2xl py-4 px-2 transition-all duration-200"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                      : '#f5f2ff',
                    boxShadow: isSelected
                      ? '0 6px 18px rgba(124,58,237,0.32)'
                      : '0 2px 6px rgba(0,0,0,0.04)',
                    border: isSelected ? 'none' : '1.5px solid #ede9fe',
                  }}
                >
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
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2"
                    style={{ background: isSelected ? 'rgba(255,255,255,0.18)' : '#ede9fe' }}
                  >
                    {d.emoji}
                  </div>
                  <span
                    className="text-[11px] font-bold leading-tight mb-1"
                    style={{ color: isSelected ? 'white' : '#3E325A' }}
                  >
                    {d.label}
                  </span>
                  <span
                    className="text-[10px] leading-tight"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : '#8B849C' }}
                  >
                    {d.desc}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Allergies ── */}
        <div className="px-5 mb-5">
          <div className="flex items-baseline gap-1.5 mb-1">
            <h3 className="font-bold text-[#3E325A] text-[0.9rem]">Allergies</h3>
            <span className="text-[#9b8cb5] text-xs">(Optional)</span>
          </div>
          <p className="text-[12px] text-[#6B5C99] font-medium mb-3">Do you have any food allergies?</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {ALLERGIES.map((a) => {
              const checked = allergies.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggleAllergy(a.id)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                  style={{
                    background: checked ? '#ede9fe' : '#faf8ff',
                    border: checked ? '1.5px solid #8B5CF6' : '1.5px solid #e4e0f5',
                    color: checked ? '#6D28D9' : '#6B5C99',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: checked ? '#8B5CF6' : 'white',
                      border: checked ? 'none' : '1.5px solid #d4d0e8',
                    }}
                  >
                    {checked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="truncate">{a.label}</span>
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={otherAllergy}
            onChange={(e) => setOtherAllergy(e.target.value)}
            placeholder="Other allergies (optional)"
            className="w-full rounded-xl px-4 py-2.5 text-sm text-[#4A3A6B] outline-none transition-all"
            style={{
              background: '#faf8ff',
              border: '1.5px solid #e4e0f5',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
            onBlur={(e) => (e.target.style.borderColor = '#e4e0f5')}
          />
        </div>

        {/* ── Food Goals ── */}
        <div className="px-5 mb-5">
          <div className="flex items-baseline gap-1.5 mb-1">
            <h3 className="font-bold text-[#3E325A] text-[0.9rem]">Food Goals</h3>
            <span className="text-[#9b8cb5] text-xs">(Optional)</span>
          </div>
          <p className="text-[12px] text-[#6B5C99] font-medium mb-3">
            What would you like to improve about your eating habits?
          </p>
          <div className="flex flex-wrap gap-2">
            {FOOD_GOALS.map((g) => {
              const active = goals.includes(g.id);
              return (
                <motion.button
                  key={g.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleGoal(g.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-150"
                  style={{
                    background: active ? '#ede9fe' : '#faf8ff',
                    border: active ? '1.5px solid #8B5CF6' : '1.5px solid #e4e0f5',
                    color: active ? '#6D28D9' : '#6B5C99',
                    boxShadow: active ? '0 2px 8px rgba(139,92,246,0.2)' : 'none',
                  }}
                >
                  <span>{g.emoji}</span>
                  <span>{g.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Next ── */}
        <div className="px-5 mb-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3.5 rounded-full font-semibold text-white text-base transition-all"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              boxShadow: '0 8px 24px -6px rgba(109,40,217,0.45)',
            }}
          >
            Next
          </motion.button>
        </div>

        {/* ── UX Note ── */}
        <div
          className="mx-5 mb-5 rounded-2xl px-4 py-3.5"
          style={{ background: '#f5f2ff', border: '1.5px solid #ede9fe' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">💡</span>
            <div>
              <p className="text-[12px] font-semibold text-[#4A3A6B] mb-1.5">
                <span className="font-bold">UX Note</span> helps AURA:
              </p>
              <ul className="space-y-1">
                {['suggest meals', 'simulate food decisions', 'track junk food habits'].map((note) => (
                  <li key={note} className="flex items-center gap-1.5 text-[11px] text-[#6B5C99]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodPreferences;
