import React, { useState, useEffect } from 'react';
import { Target, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DailyUpdateWidget = ({ onOpenModal }) => {
    const [task, setTask] = useState('');

    useEffect(() => {
        // Read from localStorage on mount and when modal closes
        const updateWidget = () => {
            setTask(localStorage.getItem('dailyTask') || '');
        };

        updateWidget();
        
        // Listen to storage events just in case (though normally React state/callbacks manage this better, 
        // since we open modal via Dashboard, we can just grab from localStorage on render)
        window.addEventListener('storage', updateWidget);
        return () => window.removeEventListener('storage', updateWidget);
    }, []);

    // We also want to re-evaluate localstorage whenever this component renders, 
    // to catch updates made from the modal in the same React tree
    useEffect(() => {
        setTask(localStorage.getItem('dailyTask') || '');
    });


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(150,110,200,0.15)] border border-white/80 flex flex-col h-full hover:shadow-[0_12px_40px_rgba(150,110,200,0.2)] transition-shadow relative overflow-hidden group"
        >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-[#8B5CF6]/20 to-[#C084FC]/20 rounded-full blur-2xl group-hover:bg-[#8B5CF6]/30 transition-colors"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    <h3 className="font-bold text-[#5B3A8F] text-xl">Today's Focus</h3>
                </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center mb-6 relative z-10">
                {task ? (
                    <div className="bg-white/60 p-4 rounded-2xl border border-white shrink-0 mb-2">
                        <p className="text-[#4B2C82] font-extrabold text-lg leading-snug break-words">
                            {task}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white/40 border border-dashed border-[#C084FC]/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center py-6 h-full mb-2">
                        <AlertCircle className="w-6 h-6 text-[#A78BFA] mb-2" />
                        <p className="text-[#6D5D8C] text-sm font-medium">No priority task set for today.</p>
                    </div>
                )}
            </div>

            <button 
                onClick={onOpenModal}
                className="relative z-10 w-full py-3.5 lg:py-4 bg-white border-2 border-purple-100 hover:bg-purple-50 transition-colors text-[#6D5D8C] hover:text-[#5B3A8F] rounded-2xl text-[15px] font-bold shadow-sm whitespace-nowrap tracking-wide flex items-center justify-center gap-2"
            >
                {task ? 'Update Focus' : 'Set Focus'}
            </button>
        </motion.div>
    );
};

export default DailyUpdateWidget;
