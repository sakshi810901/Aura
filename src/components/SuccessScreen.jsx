import { motion } from 'framer-motion';

function SuccessScreen({ avatar, onHome }) {
  const previewImage = avatar?.previewUrl || "https://picsum.photos/400/400";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="glass-panel p-10 max-w-sm w-full text-center z-10 flex flex-col items-center"
    >
      <h2 className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
        Your avatar is ready!
      </h2>
      
      <motion.div 
        className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500/30 mb-8 shadow-2xl shadow-emerald-500/20 bg-slate-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img 
          src={previewImage} 
          alt="Avatar Preview" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.button 
        onClick={onHome}
        className="gamified-button w-full !bg-none"
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Home
      </motion.button>
    </motion.div>
  );
}

export default SuccessScreen;
