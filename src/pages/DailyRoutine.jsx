import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MoonStar, 
  BookOpen, 
  Briefcase, 
  Laptop, 
  Lightbulb,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const WORK_TYPES = [
  { id: 'student', icon: BookOpen, label: 'Student', desc: '', color: 'text-sky-500', bg: 'bg-sky-100/50' },
  { id: 'professional', icon: Briefcase, label: 'Working', desc: 'Professional', color: 'text-indigo-500', bg: 'bg-indigo-100/50' },
  { id: 'freelancer', icon: Laptop, label: 'Freelancer', desc: '', color: 'text-purple-500', bg: 'bg-purple-100/50' },
  { id: 'entrepreneur', icon: Lightbulb, label: 'Entrepreneur', desc: 'Independent', color: 'text-amber-500', bg: 'bg-amber-100/50' },
];

const TIME_OPTIONS = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j += 30) {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    const minute = j === 0 ? '00' : '30';
    TIME_OPTIONS.push({ value: `${i}:${minute}`, label: `${hour}:${minute} ${ampm}` });
  }
}

const DailyRoutine = () => {
  const navigate = useNavigate();
  const [wakeTime, setWakeTime] = useState('7:00');
  const [sleepTime, setSleepTime] = useState('23:00');
  const [workType, setWorkType] = useState('professional');
  const [workHours, setWorkHours] = useState(8);

  const handleNext = () => {
    const routineData = { wakeTime, sleepTime, workType, workHours };
    localStorage.setItem('aura_daily_routine', JSON.stringify(routineData));
    navigate('/habits');
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

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-y-auto overflow-x-hidden text-[#3E325A] font-sans py-12">
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

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-[1.6rem] sm:text-3xl font-bold text-[#4A3A6B] mb-2 tracking-tight">Tell AURA about your daily routine</h1>
          <p className="text-[#6D5D8B] text-md">Help AURA understand your lifestyle.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full space-y-6 mb-10"
        >
          {/* Wake Time */}
          <motion.div variants={item} className="flex flex-col">
            <label className="text-sm font-semibold text-[#4A3A6B] mb-2 pl-1">Wake Time</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7DA0]">
                <Clock size={20} />
              </div>
              <select 
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full appearance-none bg-white/70 border-2 border-transparent hover:border-white focus:border-[#8B5CF6] focus:bg-white text-[#4A3A6B] font-medium rounded-2xl py-3.5 pl-12 pr-10 shadow-[0_4px_15px_rgba(0,0,0,0.03)] outline-none transition-all"
              >
                {TIME_OPTIONS.map(opt => <option key={`w-${opt.value}`} value={opt.value}>{opt.label}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C7DA0] pointer-events-none">
                <ChevronDown size={20} />
              </div>
            </div>
            <p className="text-xs text-[#8B849C] mt-2 pl-1">When do you usually wake up?</p>
          </motion.div>

          {/* Sleep Time */}
          <motion.div variants={item} className="flex flex-col">
            <label className="text-sm font-semibold text-[#4A3A6B] mb-2 pl-1">Sleep Time</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7DA0]">
                <MoonStar size={20} />
              </div>
              <select 
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="w-full appearance-none bg-white/70 border-2 border-transparent hover:border-white focus:border-[#8B5CF6] focus:bg-white text-[#4A3A6B] font-medium rounded-2xl py-3.5 pl-12 pr-10 shadow-[0_4px_15px_rgba(0,0,0,0.03)] outline-none transition-all"
              >
                {TIME_OPTIONS.map(opt => <option key={`s-${opt.value}`} value={opt.value}>{opt.label}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C7DA0] pointer-events-none">
                <ChevronDown size={20} />
              </div>
            </div>
            <p className="text-xs text-[#8B849C] mt-2 pl-1">When do you usually go to bed?</p>
          </motion.div>

          {/* Work Type */}
          <motion.div variants={item} className="flex flex-col pt-2">
            <label className="text-sm font-semibold text-[#4A3A6B] mb-1 pl-1">Work Type</label>
            <p className="text-xs text-[#8B849C] mb-3 pl-1">What describes you best?</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WORK_TYPES.map((type) => {
                const isSelected = workType === type.id;
                const Icon = type.icon;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setWorkType(type.id)}
                    className={`relative flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-[1.25rem] transition-all duration-300 border-2 ${
                      isSelected 
                        ? 'bg-white/90 border-[#8B5CF6] shadow-[0_8px_20px_-5px_rgba(139,92,246,0.3)]' 
                        : 'bg-white/50 border-transparent shadow-[0_4px_10px_rgba(0,0,0,0.02)] hover:bg-white/70'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-[#8B5CF6]">
                        <CheckCircle2 size={16} className="fill-[#8B5CF6] text-white" />
                      </div>
                    )}
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-2 ${type.bg}`}>
                      <Icon size={24} className={type.color} />
                    </div>
                    <span className="font-semibold text-[#4A3A6B] text-[0.8rem] leading-tight max-w-[80%]">{type.label}</span>
                    {type.desc && <span className="text-[0.7rem] text-[#8B849C] mt-0.5">{type.desc}</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Work Hours Slider */}
          <motion.div variants={item} className="flex flex-col pt-4 items-center">
            <p className="text-sm text-[#8B849C] mb-2 text-center">How many hours do you work daily?</p>
            <div className="font-bold text-[#4A3A6B] text-xl mb-4">{workHours} <span className="text-sm font-medium text-[#8B849C]">hours</span></div>
            
            <div className="w-full flex items-center gap-4 px-2">
              <span className="text-[#8B849C] font-medium text-sm">4</span>
              <input 
                type="range" 
                min="4" 
                max="12" 
                step="1"
                value={workHours}
                onChange={(e) => setWorkHours(parseInt(e.target.value))}
                className="flex-1 h-1.5 bg-white/60 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
              />
              <span className="text-[#8B849C] font-medium text-sm">12</span>
            </div>
            {/* Custom slider thumb styling conceptually added via accent color above, 
                for exact visual match we might need custom CSS if accent-color isn't enough */}
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.5 }}
           className="w-full max-w-[320px] flex flex-col items-center mt-2"
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
            <span className="text-[#5C507C] font-semibold text-xs whitespace-nowrap">Step 2 of 8</span>
            <div className="h-[2px] w-full bg-white/50 rounded-full"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DailyRoutine;
