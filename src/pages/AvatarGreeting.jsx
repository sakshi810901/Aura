import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

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

    // Restore the avatar configuration to localStorage for AvatarViewer
    if (parsedAvatar.avatarConfig) {
      localStorage.setItem('avatarConfig', parsedAvatar.avatarConfig);
    }

    // Show greeting after a short delay
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
    <div className="min-h-screen relative flex items-center justify-center bg-zinc-950 overflow-hidden text-white font-sans">
      {/* Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full point-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full point-events-none"></div>

      <div className="w-full max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Avatar Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden relative border-2 border-purple-500/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-gradient-to-b from-slate-900 to-slate-950"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none" />
            
            {avatar && (
              <AvatarViewer readOnlyMode={true} playWave={showGreeting} />
            )}
            
            <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-medium border border-white/10 flex items-center gap-2 shadow-lg z-20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Avatar Ready
            </div>
          </motion.div>

          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl lg:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-4">
                {username}
              </h1>
              <p className="text-zinc-400 text-lg">Your avatar is ready!</p>
            </motion.div>

            {showGreeting && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="p-8 rounded-2xl border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative space-y-4">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ rotate: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex-shrink-0"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,230,138,0.6)]" />
                    </motion.div>
                    <p className="text-2xl font-bold text-white leading-relaxed">
                      {randomGreeting}
                    </p>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed pl-9">
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
              className="space-y-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Enter Dashboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  localStorage.removeItem('customAvatar');
                  localStorage.removeItem('selectedGender');
                  navigate('/gender-select');
                }}
                className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all text-sm"
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
