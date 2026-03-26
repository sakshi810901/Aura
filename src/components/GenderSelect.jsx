import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const GenderSelect = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    localStorage.setItem('selectedGender', gender);
    navigate('/avatar-customization');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-zinc-950 overflow-hidden text-white font-sans">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full point-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full point-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl p-8 sm:p-10 mx-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)]"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-4">
              Create Your Avatar
            </h1>
            <p className="text-zinc-400 text-lg tracking-wide font-semibold">
              Select your avatar gender to get started
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Male Option */}
          <motion.button
            onClick={() => handleGenderSelect('male')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group p-8 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col items-center justify-center space-y-4">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-shadow"
              >
                <User className="w-12 h-12 text-white" strokeWidth={1.5} />
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Male</h2>
                <p className="text-zinc-400 text-sm">Create a male avatar</p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="mt-4 px-6 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm font-medium text-blue-300"
              >
                Select
              </motion.div>
            </div>
          </motion.button>

          {/* Female Option */}
          <motion.button
            onClick={() => handleGenderSelect('female')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group p-8 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col items-center justify-center space-y-4">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transition-shadow"
              >
                <User className="w-12 h-12 text-white" strokeWidth={1.5} />
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Female</h2>
                <p className="text-zinc-400 text-sm">Create a female avatar</p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="mt-4 px-6 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-sm font-medium text-pink-300"
              >
                Select
              </motion.div>
            </div>
          </motion.button>
        </div>

        <p className="text-center text-zinc-500 text-xs mt-8 uppercase tracking-widest">
          Choose your avatar's gender
        </p>
      </motion.div>
    </div>
  );
};

export default GenderSelect;
