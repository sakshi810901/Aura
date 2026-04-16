import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
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

const AvatarGreeting = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    const customAvatarData = localStorage.getItem('customAvatar');

    if (!user || !customAvatarData) {
      navigate('/login');
      return;
    }

    setUsername(user);
    const parsedAvatar = JSON.parse(customAvatarData);
    setAvatar(parsedAvatar);

    if (parsedAvatar.avatarConfig) {
      localStorage.setItem('avatarConfig', parsedAvatar.avatarConfig);
    }

    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  const greetings = [
    `Welcome, ${username}! I'm your new digital companion!`,
    `Hey ${username}! Ready to explore this digital realm?`,
    `Greetings, ${username}! Let's make some progress together!`,
    `Hey there, ${username}! I'm excited to be here!`
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans py-12"
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

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* ── Avatar Display ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden relative bg-white shadow-2xl border-4 border-white"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f2ff] to-[#e4e0f5]" />
            
            {avatar && (
              <AvatarViewer readOnlyMode={true} playWave={showGreeting} />
            )}
            
            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold text-[#6D28D9] border border-[#ede9fe] flex items-center gap-2 shadow-lg z-20">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              Avatar Ready
            </div>
          </motion.div>

          {/* ── Greeting Section ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}>
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <div className="font-bold text-[#3E325A] leading-tight">AURA</div>
                  <div className="text-xs text-[#8B849C] leading-tight">AI Life Co-Pilot</div>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#3E325A] mb-2 truncate max-w-full" title={username}>
                {username}
              </h1>
              <p className="text-[#6B5C99] font-medium text-lg">Your avatar is ready!</p>
            </motion.div>

            {/* Greeting Box */}
            {showGreeting && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="p-6 rounded-2xl border-2 border-[#ede9fe] bg-[#f5f2ff]"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                    </motion.div>
                    <p className="text-xl font-bold text-[#4A3A6B] leading-snug">
                      {randomGreeting}
                    </p>
                  </div>
                  <p className="text-[#6B5C99] text-sm leading-relaxed pl-9">
                    Your avatar has been created with care and is ready to join you on your digital journey. Time to make your mark in the digital world!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 px-6 text-white font-bold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                  boxShadow: '0 8px 24px -6px rgba(109,40,217,0.5)',
                }}
              >
                <Star className="w-5 h-5 fill-white/20" />
                ENTER DASHBOARD
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  localStorage.removeItem('customAvatar');
                  localStorage.removeItem('selectedGender');
                  navigate('/gender-select');
                }}
                className="w-full py-3.5 px-6 bg-white hover:bg-[#faf8ff] border-2 border-[#ede9fe] rounded-2xl text-[#6B5C99] font-bold transition-all text-sm"
              >
                Create Another Avatar
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AvatarGreeting;
