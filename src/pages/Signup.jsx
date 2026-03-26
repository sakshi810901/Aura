import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Check, Users } from 'lucide-react';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && password.trim() && password === confirmPassword && agree) {
      // Simulate signup with dummy data
      localStorage.setItem('username', email.trim());
      localStorage.setItem('role', role);

      // Route based on role
      if (role === 'consultant') {
        navigate('/consultant-flow');
      } else {
        // Normal user goes to welcome setup flow
        navigate('/welcome-setup');
      }
    }
  };

  const isPasswordValid = password.length >= 8;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-hidden text-zinc-800 font-sans py-12">
      {/* Background Anime-inspired glowing elements / Wavy overlay logic */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(138,180,248,0.4) 0%, transparent 40%)'
        }}
      ></div>
      
      {/* Stars/Sparkles effect (Static CSS rep for the design) */}
      <div className="fixed top-[20%] left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed top-[35%] right-[25%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,0.9)]"></div>
      <div className="fixed bottom-[20%] left-[30%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,1)]"></div>
      <div className="fixed top-[10%] right-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="fixed bottom-[30%] right-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-[420px] p-8 sm:p-10 mx-auto bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(100,50,200,0.15)] border border-white/40"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#C084FC] shadow-inner flex items-center justify-center overflow-hidden">
                <div className="w-[120%] h-[120%] bg-white/20 -rotate-45 translate-y-2"></div>
              </div>
              <div className="text-left leading-tight">
                <h1 className="text-2xl font-bold tracking-tight text-[#3E325A]">
                  AURA
                </h1>
                <p className="text-[#8B849C] text-[0.65rem] uppercase tracking-wider font-semibold">Al Life Co-Pilot</p>
              </div>
            </div>
            
            <h2 className="text-[1.35rem] font-semibold text-[#2D2447] mb-1">Create Your AURA Account</h2>
            <p className="text-[#8B849C] text-[0.8rem]">Start building your AI life assistant.</p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <User size={18} />
            </div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm"
            />
          </div>

          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm"
            />
          </div>

          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-11 pr-12 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm font-medium tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A79FC4] hover:text-[#8B5CF6] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <div className="flex items-center gap-2 pl-1 mb-1">
            <Check size={14} className={isPasswordValid ? "text-green-500" : "text-[#A79FC4]"} />
            <span className={`text-xs ${isPasswordValid ? "text-green-600" : "text-[#A79FC4]"}`}>
              Must contain 8+ characters
            </span>
          </div>

          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Lock size={18} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full pl-11 pr-12 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm font-medium tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A79FC4] hover:text-[#8B5CF6] transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <div className="space-y-1 relative group mt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Users size={18} />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] text-sm appearance-none cursor-pointer"
            >
              <option value="user">User</option>
              <option value="consultant">Consultant</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#A79FC4]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 mb-2">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#C0B8D4] checked:border-[#8B5CF6] checked:bg-[#8B5CF6] transition-all"
              />
              <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <label htmlFor="terms" className="text-[0.8rem] text-[#8B849C] cursor-pointer cursor-default">
              I agree to the <a href="#" className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">Terms</a> and <a href="#" className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">Privacy Policy</a>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!fullName.trim() || !email.trim() || !password.trim() || password !== confirmPassword || !isPasswordValid || !agree}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-medium rounded-xl shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm mt-2"
          >
            Create Account
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[#8B849C] text-[0.8rem] font-medium">
            Already have an account? <span onClick={() => { localStorage.clear(); navigate('/login'); }} className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors cursor-pointer ml-1 font-semibold">Log in</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
