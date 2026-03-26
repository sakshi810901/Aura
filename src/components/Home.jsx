import { motion } from 'framer-motion';
import { Trophy, Flame, Sparkles, Settings } from 'lucide-react';
import AvatarViewer from './AvatarViewer';
import XPBar from './XPBar';

function Home({ username, avatar, stats, onGainXp, onEditAvatar }) {
  const modelUrl = avatar?.modelUrl || avatar?.glbUrl || avatar?.url;
  const previewUrl = avatar?.previewUrl;

  const currentHour = new Date().getHours();
  let greeting = 'Good evening';
  if (currentHour < 12) greeting = 'Good morning';
  else if (currentHour < 18) greeting = 'Good afternoon';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl flex flex-col items-center z-10 p-4 gap-8 md:flex-row h-[90vh]"
    >
      <div className="w-full md:w-1/3 flex flex-col gap-6 order-2 md:order-1 h-full justify-center">
        <motion.div 
          className="glass-panel p-6"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
            {greeting}, {username}!
          </h2>
          <p className="text-slate-300 text-sm mb-6 font-light">
            Ready to make progress today?
          </p>

          <XPBar xp={stats.xp} level={stats.level} />
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800/60 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-700/50 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Flame className="text-orange-400 mb-2 w-8 h-8 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] group-hover:scale-110 transition-transform" />
              <div className="text-xl font-bold text-white">{stats.streak} <span className="text-sm font-normal text-slate-400">days</span></div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Day Streak</div>
            </div>
            
            <div className="bg-slate-800/60 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-700/50 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Trophy className="text-yellow-400 mb-2 w-8 h-8 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] group-hover:scale-110 transition-transform" />
              <div className="text-xl font-bold text-white">Lvl {stats.level}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Current</div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={onGainXp}
          className="gamified-button w-full py-4 text-lg shadow-purple-500/30 font-bold justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          Gain XP
        </motion.button>

        <motion.button
          onClick={onEditAvatar}
          className="gamified-button w-full py-4 text-lg font-bold justify-center mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:from-emerald-500 hover:to-teal-500 hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Settings className="w-5 h-5 text-emerald-200" />
          Customize Avatar
        </motion.button>
      </div>

      <motion.div 
        className="w-full md:w-2/3 h-[50vh] md:h-full glass-panel rounded-3xl overflow-hidden relative order-1 md:order-2 border-2 border-purple-500/20 shadow-2xl shadow-purple-900/40"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <AvatarViewer url={modelUrl} fallbackUrl={previewUrl} customColors={avatar?.customColors} />
        
        <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-medium border border-white/10 flex items-center gap-2 shadow-lg z-20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          3D Live
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
