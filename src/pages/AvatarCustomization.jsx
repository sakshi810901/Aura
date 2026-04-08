import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

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

const AvatarCustomization = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setIsSaving(true);
    const avatarConfig = localStorage.getItem('avatarConfig');
    const gender = localStorage.getItem('selectedGender') || 'custom';
    const customAvatarData = {
      avatarConfig: avatarConfig,
      gender: gender,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('customAvatar', JSON.stringify(customAvatarData));
    setIsSaving(false);
    navigate('/avatar-greeting');
  };

  const handleBack = () => {
    navigate('/gender-select');
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden font-sans"
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

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto p-4 sm:p-6 relative z-10 flex items-center justify-between"
      >
        <button
          onClick={handleBack}
          className="p-2.5 rounded-full bg-white/70 hover:bg-white text-[#6B5C99] hover:text-[#4A3A6B] transition-all shadow-sm border border-transparent"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#3E325A]">
          Customize Your Avatar
        </h1>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
            boxShadow: '0 8px 20px -6px rgba(109,40,217,0.4)',
          }}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Avatar'}</span>
        </button>
      </motion.div>

      {/* ── Avatar Viewer Container ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-6 relative z-10 flex flex-col"
      >
        <div 
          className="flex-1 w-full rounded-3xl overflow-hidden bg-white shadow-2xl relative"
          style={{ height: 'calc(100vh - 160px)' }}
        >
          <AvatarViewer />
        </div>
      </motion.div>

      {/* ── Status Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-[#6D28D9] text-sm font-semibold flex items-center gap-2 shadow-lg z-20 bg-white/90 backdrop-blur-md border border-[#ede9fe]"
      >
        <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
        Avatar ready to edit
      </motion.div>
    </div>
  );
};

export default AvatarCustomization;
