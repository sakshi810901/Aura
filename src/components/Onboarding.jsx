import { useState } from 'react';
import { motion } from 'framer-motion';

function Onboarding({ onNext }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-8 max-w-md w-full text-center z-10"
    >
      <h1 className="text-4xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-emerald-400">
        Welcome to Aura
      </h1>
      <p className="text-slate-300 mb-8 font-light text-lg">
        Your gamified 3D avatar experience awaits.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your hero name..."
            className="gamified-input"
            required
            maxLength={20}
          />
        </div>
        <button 
          type="submit" 
          className="gamified-button w-full"
          disabled={!name.trim()}
        >
          Create Your Avatar
        </button>
      </form>
    </motion.div>
  );
}

export default Onboarding;
