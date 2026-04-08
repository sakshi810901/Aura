import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Bell, Home, ClipboardCheck, BarChart2, Trophy, User, 
    Edit2, Camera, Target, BookOpen, Coffee, Flame, 
    LogOut, ChevronRight, CheckCircle2, Leaf, Activity,
    MoreHorizontal 
} from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer'; // If we want 3D avatar, but image shows 2D
// We'll use a 2D image for the profile based on the screenshot, or DiceBear if no custom image.

const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('Sophia Patel');
    const [email, setEmail] = useState('sophia@example.com');
    // For the avatar, we might use a placeholder or local storage
    const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/notionists/svg?seed=Sophia');

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('faceTexture');
        localStorage.removeItem('customAvatar');
        localStorage.removeItem('selectedGender');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pb-32">
            
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                {/* Additional SVGs could go here */}
            </div>

            <div className="relative z-10 px-6 sm:px-10 pt-8 w-full max-w-[1200px] mx-auto min-h-screen flex flex-col gap-6">
                
                {/* Header */}
                <header className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex justify-center items-center shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
                            <span className="text-white font-bold text-sm tracking-wider">AURA</span>
                        </div>
                        <h2 className="text-xl font-black text-[#5B3A8F] tracking-tight">AURA</h2>
                    </div>
                    <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex justify-center items-center shadow-sm text-[#5B3A8F] border border-white/50 relative cursor-pointer">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#dfcbf3]"></span>
                    </div>
                </header>

                {/* Breadcrumbs */}
                <div className="text-xs text-[#6D5D8C] font-semibold flex items-center gap-1 mb-2">
                    <Home className="w-3 h-3" />
                    <span>Home <ChevronRight className="w-3 h-3 inline" /> Dashboard <ChevronRight className="w-3 h-3 inline" /> Profile</span>
                </div>

                <h1 className="text-3xl font-black text-[#4B2C82] mb-2">Profile</h1>

                {/* Main Profile Info Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 rounded-full bg-indigo-100 overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-black text-[#4B2C82]">{username}</h2>
                            <p className="text-[#6D5D8C] mb-4 font-medium">{email}</p>
                            
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-purple-100 rounded-xl text-sm font-bold text-[#5B3A8F] hover:bg-white transition-colors shadow-sm flex-1 md:flex-none justify-center">
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button 
                                    onClick={() => navigate('/avatar-customization')}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#EADDFF] border border-purple-200 rounded-xl text-sm font-bold text-[#5B3A8F] hover:bg-[#DED2F9] transition-colors shadow-sm flex-1 md:flex-none justify-center"
                                >
                                    <User className="w-4 h-4" />
                                    Change Avatar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Two Column Layout for the rest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    
                    {/* Goals Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-[#5B3A8F] font-bold text-lg">Goals</h3>
                            <button className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full text-[#6D5D8C] hover:bg-white/80 transition-colors">Edit</button>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 h-[220px] flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-[#4B2C82] text-lg">Lose 5 KG</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-[#4B2C82] text-lg">Save ₹50,000</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/life-goals')}
                                className="w-full mt-4 py-3 bg-[#EADDFF] hover:bg-[#DED2F9] transition-colors text-[#5B3A8F] rounded-xl text-sm font-bold shadow-sm"
                            >
                                Update Goals
                            </button>
                        </motion.div>
                    </div>

                    {/* Lifestyle Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-[#5B3A8F] font-bold text-lg text-transparent invisible">Spacer</h3>
                            <div className="invisible text-xs font-bold px-3 py-1">Edit</div>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 h-[220px]"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                                    <Activity className="w-4 h-4" />
                                </div>
                                <h3 className="font-bold text-[#4B2C82] text-lg">Lifestyle</h3>
                            </div>
                            <div className="flex flex-col gap-4 ml-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">🏃‍♀️</span>
                                    <span className="font-semibold text-[#6D5D8C]">Morning Exercise</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">📚</span>
                                    <span className="font-semibold text-[#6D5D8C]">Daily Reading</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Food Preferences Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-[#5B3A8F] font-bold text-lg">Food Preferences</h3>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 cursor-pointer hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow"
                            onClick={() => navigate('/food-preferences')}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">🥗</span>
                                    <span className="font-semibold text-[#6D5D8C]">Vegetarian</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">🥦</span>
                                    <span className="font-semibold text-[#6D5D8C]">Low Carb</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Habits Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-[#5B3A8F] font-bold text-lg">Habits</h3>
                            <button 
                                onClick={() => navigate('/habits')}
                                className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full text-[#6D5D8C] hover:bg-white/80 transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-[#6D5D8C]">Limit Junk Food</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-[#6D5D8C]">Use Social Media Less</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Logout Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 mb-10 flex justify-center"
                >
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-8 py-3 bg-white/50 hover:bg-red-50 border border-red-100 text-red-500 font-bold rounded-2xl transition-all shadow-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </motion.div>

            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
                <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
                    <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-transform hover:scale-105">
                        <Home className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Home</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/consultants')}
                        className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105 relative">
                        <User className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Consultants</span>
                    </button>
                    
                    <button onClick={() => navigate('/trackers')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <BarChart2 className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Trackers</span>
                    </button>
                    
                    <button onClick={() => navigate('/progress')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                        <Trophy className="w-[28px] h-[28px]" strokeWidth={2} />
                        <span className="text-[12px] font-bold tracking-wide">Progress</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/profile')} 
                        className="flex flex-col items-center gap-2 text-[#8B5CF6] hover:text-[#8B5CF6] transition-all hover:scale-105"
                    >
                        <User className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2.5} />
                        <span className="text-[12px] font-black tracking-wide">Profile</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Profile;
