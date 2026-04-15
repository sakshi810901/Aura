import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authService } from '../utils/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('username')) {
      // Check if user has a custom avatar from new flow
      if (localStorage.getItem('customAvatar')) {
        navigate('/avatar-greeting');
      } else if (localStorage.getItem('faceTexture')) {
        // Old flow - redirect to dashboard
        navigate('/dashboard');
      } else {
        // Existing user without avatar - go to welcome setup
        navigate('/welcome-setup');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      // Call the FastAPI login endpoint with OAuth2 format
      const response = await authService.login(email.trim(), password.trim());

      // Successfully logged in
      console.log('[v0] Login successful, access_token:', response.access_token ? 'received' : 'missing');

      // Role-based routing
      if (email.trim().toLowerCase() === 'consultant' || email.trim().toLowerCase() === 'consultant@aura.com') {
        localStorage.setItem('role', 'consultant');
        navigate('/consultant-flow');
      } else {
        localStorage.setItem('role', 'user');
        // Check if user has avatar setup
        if (localStorage.getItem('customAvatar')) {
          navigate('/avatar-greeting');
        } else if (localStorage.getItem('faceTexture')) {
          navigate('/dashboard');
        } else {
          navigate('/welcome-setup');
        }
      }
    } catch (err) {
      console.error('[v0] Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#E5DDF5] overflow-hidden text-zinc-800 font-sans">
      {/* Background Anime-inspired glowing elements / Wavy overlay logic if needed */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(138,180,248,0.4) 0%, transparent 40%)'
        }}
      ></div>
      
      {/* Stars/Sparkles effect (Static CSS rep for the design) */}
      <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_5px_rgba(255,255,255,0.9)]"></div>
      <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,1)]"></div>
      <div className="absolute top-[10%] right-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>
      <div className="absolute bottom-[30%] right-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-[400px] p-8 sm:p-10 mx-auto bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(100,50,200,0.15)] border border-white/40"
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
                {/* Abstract logo inner shape */}
                <div className="w-[120%] h-[120%] bg-white/20 -rotate-45 translate-y-2"></div>
              </div>
              <div className="text-left leading-tight">
                <h1 className="text-2xl font-bold tracking-tight text-[#3E325A]">
                  AURA
                </h1>
                <p className="text-[#8B849C] text-[0.65rem] uppercase tracking-wider font-semibold">Al Life Co-Pilot</p>
              </div>
            </div>
            
            <h2 className="text-[1.35rem] font-semibold text-[#2D2447] mb-1">Welcome Back</h2>
            <p className="text-[#8B849C] text-sm">Log in to AURA</p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
          
          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Mail size={18} />
            </div>
            <input
              id="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A79FC4]">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-11 pr-12 py-3.5 bg-[#F8F6FC] border border-[#EBE6F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D71F8] focus:border-transparent transition-all text-[#3E325A] placeholder-[#A79FC4] text-sm font-medium tracking-wider"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A79FC4] hover:text-[#8B5CF6] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end pt-1 pb-3">
            <a href="#" className="text-xs font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!email.trim() || !password.trim() || isLoading}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-medium rounded-xl shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm mb-3"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="w-full py-3.5 px-6 bg-white border border-[#EBE6F4] hover:bg-[#F8F6FC] text-[#3E325A] font-medium rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.71 17.59V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.59C14.73 18.25 13.48 18.63 12 18.63C9.13 18.63 6.7 16.69 5.82 14.1H2.14V16.95C3.96 20.57 7.69 23 12 23Z" fill="#34A853"/>
              <path d="M5.82 14.1C5.6 13.43 5.47 12.73 5.47 12C5.47 11.27 5.6 10.57 5.82 9.9V7.05H2.14C1.39 8.55 0.96 10.23 0.96 12C0.96 13.77 1.39 15.45 2.14 16.95L5.82 14.1Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.07 5.94 16.21 7.03L19.35 3.89C17.45 2.12 14.97 1 12 1C7.69 1 3.96 3.43 2.14 7.05L5.82 9.9C6.7 7.31 9.13 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Log in with Google
          </motion.button>
        </form>

        <div className="mt-8 mb-4 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#EBE6F4]"></div>
          </div>
          <div className="relative px-4 bg-white text-xs text-[#A79FC4]">
            or
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#8B849C] text-xs font-medium">
            Don't have an account? <span onClick={() => navigate('/signup')} className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mb-1 ml-1 cursor-pointer">Create account</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
