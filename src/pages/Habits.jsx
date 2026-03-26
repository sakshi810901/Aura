import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Habits = () => {
  const navigate = useNavigate();
  // 0, 1, 2 values for each slider
  const [socialMedia, setSocialMedia] = useState(1);
  const [exercise, setExercise] = useState(1);
  const [junkFood1, setJunkFood1] = useState(1);
  const [junkFood2, setJunkFood2] = useState(1); // The duplicate question from the mockup

  const handleNext = () => {
    const habitsData = { socialMedia, exercise, junkFood1, junkFood2 };
    localStorage.setItem('aura_habits', JSON.stringify(habitsData));
    navigate('/spending-style');
  };

  // Stagger animation variant
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // Custom slider thumb style to match the glowing aesthetic
  const sliderThumbCSS = `
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background: #A78BFA;
      border: 3px solid white;
      box-shadow: 0 0 10px 2px rgba(167, 139, 250, 0.6), inset 0 0 4px rgba(255,255,255,0.8);
      cursor: pointer;
      margin-top: -10px;
    }
    input[type=range]::-moz-range-thumb {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background: #A78BFA;
      border: 3px solid white;
      box-shadow: 0 0 10px 2px rgba(167, 139, 250, 0.6), inset 0 0 4px rgba(255,255,255,0.8);
      cursor: pointer;
    }
  `;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-y-auto overflow-x-hidden text-[#3E325A] font-sans py-12">
      <style>{sliderThumbCSS}</style>
      
      {/* Background Anime-inspired glowing elements */}
      <div 
        className="fixed inset-0 z-0 opacity-50 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(138,180,248,0.5) 0%, transparent 60%)'
        }}
      ></div>
      
      {/* Stars/Sparkles effect */}
      <div className="fixed top-[10%] left-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,0.9)]"></div>
      <div className="fixed top-[20%] right-[10%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,1)]"></div>
      <div className="fixed bottom-[20%] left-[25%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed bottom-[40%] right-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.9)]"></div>
      <div className="fixed top-[45%] right-[5%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed bottom-[15%] right-[20%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,1)]"></div>

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center mt-4">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-[1.6rem] sm:text-3xl font-bold text-[#4A3A6B] mb-2 tracking-tight">Let's understand your habits</h1>
          <p className="text-[#6D5D8B] text-md">Move the sliders based on your current lifestyle.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full space-y-10 mb-12"
        >
          {/* Question 1 */}
          <motion.div variants={item} className="flex flex-col w-full">
            <label className="text-md font-semibold text-[#4A3A6B] mb-5 text-center sm:text-left pl-1">
              How often do you use social media?
            </label>
            <div className="relative w-full px-4">
              <input 
                type="range" 
                min="0" max="2" step="1"
                value={socialMedia}
                onChange={(e) => setSocialMedia(parseInt(e.target.value))}
                className="w-full h-1 bg-white/50 rounded-lg appearance-none relative z-10"
              />
              <div className="flex justify-between w-full text-xs font-medium text-[#8B849C] mt-3 absolute left-0 right-0 px-2 pointer-events-none">
                <span className={`transition-colors ${socialMedia === 0 ? 'text-[#8B5CF6]' : ''}`}>Rarely</span>
                <span className={`transition-colors text-center ${socialMedia === 1 ? 'text-[#8B5CF6]' : ''}`}>Sometimes</span>
                <span className={`transition-colors text-right ${socialMedia === 2 ? 'text-[#8B5CF6]' : ''}`}>Very Often</span>
              </div>
            </div>
          </motion.div>

          {/* Question 2 */}
          <motion.div variants={item} className="flex flex-col w-full pt-2">
            <label className="text-md font-semibold text-[#4A3A6B] mb-5 text-center sm:text-left pl-1">
              How often do you exercise?
            </label>
            <div className="relative w-full px-4">
              <input 
                type="range" 
                min="0" max="2" step="1"
                value={exercise}
                onChange={(e) => setExercise(parseInt(e.target.value))}
                className="w-full h-1 bg-white/50 rounded-lg appearance-none relative z-10"
              />
              <div className="flex justify-between w-full text-xs font-medium text-[#8B849C] mt-3 absolute left-0 right-0 px-2 pointer-events-none">
                <span className={`transition-colors ${exercise === 0 ? 'text-[#8B5CF6]' : ''}`}>Never</span>
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full my-auto mx-auto translate-x-1.5"></div>
                <span className={`transition-colors text-right ${exercise === 2 ? 'text-[#8B5CF6]' : ''}`}>Daily</span>
              </div>
            </div>
          </motion.div>

          {/* Question 3 */}
          <motion.div variants={item} className="flex flex-col w-full pt-2">
            <label className="text-md font-semibold text-[#4A3A6B] mb-5 text-center sm:text-left pl-1">
              How often do you eat junk food?
            </label>
            <div className="relative w-full px-4">
              <input 
                type="range" 
                min="0" max="2" step="1"
                value={junkFood1}
                onChange={(e) => setJunkFood1(parseInt(e.target.value))}
                className="w-full h-1 bg-white/50 rounded-lg appearance-none relative z-10"
              />
              <div className="flex justify-between w-full text-xs font-medium text-[#8B849C] mt-3 absolute left-0 right-0 px-2 pointer-events-none">
                <span className={`transition-colors ${junkFood1 === 0 ? 'text-[#8B5CF6]' : ''}`}>Rarely</span>
                <span className={`transition-colors text-center ${junkFood1 === 1 ? 'text-[#8B5CF6]' : ''}`}>Sometimes</span>
                <span className={`transition-colors text-right ${junkFood1 === 2 ? 'text-[#8B5CF6]' : ''}`}>Often</span>
              </div>
            </div>
          </motion.div>

          {/* Question 4 (Duplicate from mockup) */}
          <motion.div variants={item} className="flex flex-col w-full pt-2">
            <label className="text-md font-semibold text-[#4A3A6B] mb-5 text-center sm:text-left pl-1">
              How often do you eat junk food?
            </label>
            <div className="relative w-full px-4">
              <input 
                type="range" 
                min="0" max="2" step="1"
                value={junkFood2}
                onChange={(e) => setJunkFood2(parseInt(e.target.value))}
                className="w-full h-1 bg-white/50 rounded-lg appearance-none relative z-10"
              />
              <div className="flex justify-between w-full text-xs font-medium text-[#8B849C] mt-3 absolute left-0 right-0 px-2 pointer-events-none">
                <span className={`transition-colors ${junkFood2 === 0 ? 'text-[#8B5CF6]' : ''}`}>Rarely</span>
                <span className={`transition-colors text-center ${junkFood2 === 1 ? 'text-[#8B5CF6]' : ''}`}>Sometimes</span>
                <span className={`transition-colors text-right ${junkFood2 === 2 ? 'text-[#8B5CF6]' : ''}`}>Daily</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.5 }}
           className="w-full max-w-[320px] flex flex-col items-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3.5 px-6 font-medium rounded-2xl transition-all text-[1rem] tracking-wide shadow-lg bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)]"
          >
            Next
          </motion.button>

          <div className="flex items-center justify-center gap-4 w-full px-8 mt-6">
            <div className="h-[2px] w-full bg-[#8B5CF6]/40 rounded-full"></div>
            <span className="text-[#5C507C] font-semibold text-xs whitespace-nowrap">Step 3 of 8</span>
            <div className="h-[2px] w-full bg-white/50 rounded-full"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Habits;
