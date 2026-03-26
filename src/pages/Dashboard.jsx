import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setUsername(user);
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
        <div className="min-h-screen relative flex flex-col items-center bg-zinc-950 overflow-hidden text-white font-sans">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full point-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full point-events-none"></div>

            {/* Header */}
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl mx-auto p-6 md:p-8 flex items-center justify-between relative z-10"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        A
                    </div>
                    <span className="font-bold tracking-widest text-lg uppercase hidden sm:block text-zinc-200">AURA</span>
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-zinc-300 font-medium">
                        Welcome back, <span className="text-indigo-400 font-bold">{username}</span>!
                    </p>
                    <button 
                        onClick={handleLogout}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all group"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 relative z-10">
                {/* 3D Viewer Area */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 w-full lg:w-2/3 h-[60vh] lg:h-auto rounded-3xl overflow-hidden relative border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 pointer-events-none"></div>
                    <AvatarViewer />
                </motion.div>

                {/* Info Cards Area */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full lg:w-1/3 flex flex-col gap-4"
                >
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <h2 className="text-xl font-bold mb-2 text-white">Neural Sync Complete</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Your facial geometry has been successfully mapped to the 3D entity. The avatar is now bound to your digital frequency.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md flex-1">
                        <div className="h-full flex flex-col">
                            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Diagnostics</h3>
                            
                            <div className="space-y-4 flex-1">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-zinc-500 text-sm">Status</span>
                                    <span className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-zinc-500 text-sm">Render Engine</span>
                                    <span className="text-zinc-300 text-sm">Three.js WebGL</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-zinc-500 text-sm">Texture Map</span>
                                    <span className="text-zinc-300 text-sm">Custom Base64</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => navigate('/avatar-setup')}
                                className="w-full mt-6 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all hover:border-indigo-500/50 text-center"
                            >
                                Recalibrate Face
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
