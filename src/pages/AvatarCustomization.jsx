import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import AvatarViewer from '../components/AvatarViewer';

const AvatarCustomization = () => {
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleSave = () => {
        setIsSaving(true);

        // Get the current avatar config from localStorage (saved by AvatarViewer)
        const avatarConfig = localStorage.getItem('avatarConfig');
        const gender = localStorage.getItem('selectedGender') || 'custom';

        const customAvatarData = {
            avatarConfig: avatarConfig,
            gender: gender,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('customAvatar', JSON.stringify(customAvatarData));
        setIsSaving(false);
        navigate('/avatar-greeting');
    };

    const handleBack = () => {
        navigate('/gender-select');
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center bg-zinc-950 overflow-hidden text-white font-sans">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 blur-[120px] rounded-full point-events-none"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/15 blur-[120px] rounded-full point-events-none"></div>

            {/* Header with Back and Save buttons */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-7xl mx-auto p-6 relative z-10 flex items-center justify-between"
            >
                <button
                    onClick={handleBack}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all group"
                    title="Go back"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Customize Your Avatar
                </h1>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
                >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save Avatar'}
                </button>
            </motion.div>

            {/* Avatar Customization Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 w-full max-w-7xl mx-auto px-6 pb-8 relative z-10"
            >
                <div className="w-full h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] bg-zinc-900/50 backdrop-blur-sm">
                    <AvatarViewer />
                </div>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-300 text-sm font-medium flex items-center gap-2 shadow-lg z-20"
            >
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Avatar ready to save
            </motion.div>
        </div>
    );
};

export default AvatarCustomization;
