import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Users, BarChart2, Trophy, User, ArrowLeft, 
    Plus, CheckCircle2, Circle, X, 
    Coffee, ShoppingBag, Car, Tag, Activity, Smile, Frown, Sparkles
} from 'lucide-react';

const Trackers = () => {
    const navigate = useNavigate();
    
    // Screens: 'dashboard' | 'habit' | 'log-habit' | 'expense' | 'add-expense' | 'mood'
    const [currentScreen, setCurrentScreen] = useState('dashboard');
    
    // Habit State
    const [habits, setHabits] = useState([
        { id: 1, name: 'Morning Meditation', streak: 5, completed: false },
        { id: 2, name: 'Read 10 Pages', streak: 12, completed: true },
        { id: 3, name: 'Drink 2L Water', streak: 2, completed: false },
    ]);
    
    // Log Habit State
    const [newHabitName, setNewHabitName] = useState('Morning Workout');
    const [newHabitDuration, setNewHabitDuration] = useState(30);
    const [newHabitFeeling, setNewHabitFeeling] = useState('Good'); // Good | Neutral | Bad
    
    // Expense State
    const [expenses, setExpenses] = useState([
        { id: 1, title: 'Starbucks Coffee', amount: 350, category: 'Food', date: 'Today, 9:00 AM' },
        { id: 2, title: 'Uber to Work', amount: 240, category: 'Travel', date: 'Today, 8:30 AM' },
        { id: 3, title: 'Grocery Run', amount: 1500, category: 'Shopping', date: 'Yesterday' },
    ]);
    
    // Add Expense State
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('Food');
    const [expenseDate, setExpenseDate] = useState('');
    
    // Mood State
    const [moodValue, setMoodValue] = useState(70);
    const [energyValue, setEnergyValue] = useState(60);
    const [moodNote, setMoodNote] = useState('');

    const toggleHabit = (id) => {
        setHabits(habits.map(h => 
            h.id === id ? { ...h, completed: !h.completed } : h
        ));
    };

    const handleSaveHabit = () => {
        if(newHabitName) {
            setHabits([...habits, { id: Date.now(), name: newHabitName, streak: 1, completed: true }]);
        }
        setCurrentScreen('habit');
    };

    const handleSaveExpense = () => {
        if(expenseName && expenseAmount) {
            setExpenses([...expenses, { 
                id: Date.now(), 
                title: expenseName, 
                amount: parseFloat(expenseAmount), 
                category: expenseCategory, 
                date: expenseDate || 'Today' 
            }]);
            setExpenseName('');
            setExpenseAmount('');
        }
        setCurrentScreen('expense');
    };

    const handleSaveMood = () => {
        setCurrentScreen('dashboard');
    };

    const renderBottomNav = () => (
        <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
            <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
                <button onClick={() => navigate('/')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <Home className="w-[28px] h-[28px]" strokeWidth={2.5} />
                    <span className="text-[12px] font-bold tracking-wide">Home</span>
                </button>
                <button onClick={() => navigate('/consultants')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <Users className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Consultants</span>
                </button>
                <button onClick={() => setCurrentScreen('dashboard')} className="flex flex-col items-center gap-2 text-[#8B5CF6] transition-transform hover:scale-105 relative">
                    <BarChart2 className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2} />
                    <span className="text-[12px] font-black tracking-wide">Trackers</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <Trophy className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Progress</span>
                </button>
                <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
                    <User className="w-[28px] h-[28px]" strokeWidth={2} />
                    <span className="text-[12px] font-bold tracking-wide">Profile</span>
                </button>
            </div>
        </div>
    );

    // SCREEN 1: DASHBOARD
    const renderDashboard = () => {
        const completedHabits = habits.filter(h => h.completed).length;
        const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        return (
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32"
            >
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-[#5B3A8F] tracking-tight">Your Daily Trackers</h1>
                    <Sparkles className="text-[#8B5CF6] w-6 h-6 animate-pulse" />
                </header>

                <div className="flex flex-col gap-5">
                    {/* Habits Card */}
                    <div 
                        onClick={() => setCurrentScreen('habit')}
                        className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-[#5B3A8F] text-xl flex items-center gap-2">
                                    <span className="text-2xl">⚡</span> Habits
                                </h3>
                                <p className="text-[#6D5D8C] text-sm font-medium mt-1">Track your daily habits</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-[#F5F3FF] rounded-2xl p-4 border border-[#EDE9FE]">
                            <p className="text-[#8B5CF6] font-black">{completedHabits} completed today</p>
                        </div>
                    </div>

                    {/* Expenses Card */}
                    <div 
                        onClick={() => setCurrentScreen('expense')}
                        className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-[#5B3A8F] text-xl flex items-center gap-2">
                                    <span className="text-2xl">💸</span> Expenses
                                </h3>
                                <p className="text-[#6D5D8C] text-sm font-medium mt-1">Log and monitor spending</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-[#FFF1F2] rounded-2xl p-4 border border-[#FFE4E6]">
                            <p className="text-[#E11D48] font-black">₹{totalSpent} spent today</p>
                        </div>
                    </div>

                    {/* Mood & Energy Card */}
                    <div 
                        onClick={() => setCurrentScreen('mood')}
                        className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-[#5B3A8F] text-xl flex items-center gap-2">
                                    <span className="text-2xl">🧘‍♀️</span> Mood & Energy
                                </h3>
                                <p className="text-[#6D5D8C] text-sm font-medium mt-1">Record your daily feelings</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-[#F0FDF4] rounded-2xl p-4 border border-[#DCFCE7]">
                            <p className="text-[#166534] font-black">🙂 Good</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // SCREEN 2: HABIT TRACKER
    const renderHabitTracker = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-md mx-auto relative z-10 pb-32 min-h-screen"
        >
            <header className="flex items-center gap-4 mb-8">
                <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-black text-[#5B3A8F]">Habit Tracker</h1>
            </header>

            <div className="flex flex-col gap-4">
                {habits.map((habit) => (
                    <div key={habit.id} className="bg-white/80 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => toggleHabit(habit.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${habit.completed ? 'bg-[#8B5CF6] text-white shadow-md' : 'border-2 border-[#C4B5FD] text-transparent'}`}
                            >
                                {habit.completed && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                            <div>
                                <h4 className={`font-bold text-lg ${habit.completed ? 'text-[#8B5CF6] line-through opacity-70' : 'text-[#4B2C82]'}`}>
                                    {habit.name}
                                </h4>
                                <p className="text-[#6D5D8C] text-xs font-semibold mt-1 flex items-center gap-1">
                                    🔥 {habit.streak} day streak
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => setCurrentScreen('log-habit')}
                className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(150,110,200,0.5)] hover:scale-105 transition-transform z-40"
            >
                <Plus className="w-8 h-8" />
            </button>
        </motion.div>
    );

    // SCREEN 3: LOG HABIT MODAL (Bottom Sheet)
    const renderLogHabitModal = () => (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#5B3A8F]/20 backdrop-blur-sm pointer-events-auto"
                onClick={() => setCurrentScreen('habit')}
            />
            
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded-t-[40px] p-8 shadow-2xl relative z-10 pointer-events-auto"
            >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                
                <h2 className="text-2xl font-black text-[#4B2C82] mb-6">Log Habit</h2>
                
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Habit Name</label>
                        <select 
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            className="w-full bg-[#F5F3FF] border-2 border-[#EDE9FE] rounded-2xl p-4 text-[#4B2C82] font-semibold outline-none focus:border-[#8B5CF6]"
                        >
                            <option value="Morning Workout">Morning Workout</option>
                            <option value="Meditation">Meditation</option>
                            <option value="Reading">Reading</option>
                            <option value="Coding">Coding</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Duration (minutes)</label>
                        <input 
                            type="number"
                            value={newHabitDuration}
                            onChange={(e) => setNewHabitDuration(e.target.value)}
                            className="w-full bg-[#F5F3FF] border-2 border-[#EDE9FE] rounded-2xl p-4 text-[#4B2C82] font-semibold outline-none focus:border-[#8B5CF6]"
                            placeholder="30"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Feeling After</label>
                        <div className="flex gap-3">
                            {['Bad', 'Neutral', 'Good'].map(feeling => (
                                <button
                                    key={feeling}
                                    onClick={() => setNewHabitFeeling(feeling)}
                                    className={`flex-1 py-3 rounded-2xl font-bold transition-colors ${newHabitFeeling === feeling ? 'bg-[#8B5CF6] text-white shadow-md' : 'bg-[#F5F3FF] text-[#6D5D8C] hover:bg-[#EDE9FE]'}`}
                                >
                                    {feeling}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button 
                        onClick={() => setCurrentScreen('habit')}
                        className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveHabit}
                        className="flex-1 py-4 bg-[#8B5CF6] text-white rounded-2xl font-bold shadow-md hover:bg-[#7C3AED]"
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </div>
    );

    // SCREEN 4: EXPENSE TRACKER
    const renderExpenseTracker = () => {
        const getCategoryIcon = (cat) => {
            switch(cat) {
                case 'Food': return <Coffee className="w-5 h-5" />;
                case 'Shopping': return <ShoppingBag className="w-5 h-5" />;
                case 'Travel': return <Car className="w-5 h-5" />;
                default: return <Tag className="w-5 h-5" />;
            }
        };

        const getCategoryColor = (cat) => {
            switch(cat) {
                case 'Food': return 'bg-orange-100 text-orange-600';
                case 'Shopping': return 'bg-pink-100 text-pink-600';
                case 'Travel': return 'bg-blue-100 text-blue-600';
                default: return 'bg-purple-100 text-purple-600';
            }
        };

        return (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto relative z-10 pb-32 min-h-screen"
            >
                <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-black text-[#5B3A8F]">Expense Tracker</h1>
                </header>

                <div className="flex flex-col gap-4">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="bg-white/80 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                                    {getCategoryIcon(expense.category)}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-lg text-[#4B2C82] leading-tight">
                                        {expense.title}
                                    </h4>
                                    <span className="text-[#6D5D8C] text-[13px] font-semibold mt-0.5">
                                        {expense.date} • {expense.category}
                                    </span>
                                </div>
                            </div>
                            <div className="font-black text-[#E11D48] text-lg">
                                -₹{expense.amount}
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => setCurrentScreen('add-expense')}
                    className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(225,29,72,0.4)] hover:scale-105 transition-transform z-40"
                >
                    <Plus className="w-8 h-8" />
                </button>
            </motion.div>
        );
    };

    // SCREEN 5: ADD EXPENSE SCREEN
    const renderAddExpense = () => (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full max-w-md mx-auto relative z-10 min-h-screen bg-white shadow-xl flex flex-col pt-10 px-6 absolute inset-0 pb-10"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}
        >
            <div className="max-w-md mx-auto w-full h-full flex flex-col">
                <header className="flex items-center justify-between mb-8">
                    <button onClick={() => setCurrentScreen('expense')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black text-[#4B2C82]">Add Expense</h1>
                    <div className="w-10"></div>
                </header>

                <div className="flex-1 overflow-y-auto pb-20 space-y-6">
                    {/* Amount Input */}
                    <div className="bg-[#FFF1F2] rounded-[32px] p-8 flex flex-col items-center justify-center border border-[#FFE4E6]">
                        <span className="text-[#E11D48] font-bold mb-2">Amount</span>
                        <div className="flex items-center">
                            <span className="text-3xl font-black text-[#E11D48]">₹</span>
                            <input 
                                type="number"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                className="bg-transparent text-5xl font-black text-[#BE123C] w-full text-center outline-none placeholder-[#FDA4AF] max-w-[200px]"
                                placeholder="0"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Expense Name</label>
                        <input 
                            type="text"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-2xl p-4 text-[#334155] font-semibold outline-none focus:border-[#E11D48]"
                            placeholder="E.g., Dinner with friends"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Category</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Food', 'Travel', 'Shopping', 'Other'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setExpenseCategory(cat)}
                                    className={`py-4 rounded-2xl font-bold flex flex-col items-center gap-2 transition-colors ${expenseCategory === cat ? 'bg-[#E11D48] text-white shadow-md' : 'bg-[#F8FAFC] border-2 border-[#E2E8F0] text-[#64748B]'}`}
                                >
                                    {cat === 'Food' && <Coffee className="w-5 h-5"/>}
                                    {cat === 'Travel' && <Car className="w-5 h-5"/>}
                                    {cat === 'Shopping' && <ShoppingBag className="w-5 h-5"/>}
                                    {cat === 'Other' && <Tag className="w-5 h-5"/>}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-[#6D5D8C] mb-2 block">Date</label>
                        <input 
                            type="date"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-2xl p-4 text-[#334155] font-semibold outline-none focus:border-[#E11D48]"
                        />
                    </div>
                </div>

                <div className="pt-4 mt-auto">
                    <button 
                        onClick={handleSaveExpense}
                        disabled={!expenseAmount || !expenseName}
                        className="w-full py-4.5 bg-[#E11D48] disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-pink-200"
                    >
                        Save Expense
                    </button>
                </div>
            </div>
        </motion.div>
    );

    // SCREEN 6: MOOD & ENERGY TRACKER
    const renderMoodTracker = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-md mx-auto relative z-10 pb-32 min-h-screen"
        >
            <header className="flex items-center gap-4 mb-8">
                <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5B3A8F] hover:bg-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-black text-[#5B3A8F]">Daily Mood Check-in</h1>
            </header>

            <div className="space-y-8">
                {/* Mood Slider */}
                <div className="bg-white/80 backdrop-blur-md rounded-[28px] p-6 shadow-sm border border-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#4B2C82] text-lg flex items-center gap-2">
                            <span className="text-2xl">✨</span> Mood
                        </h3>
                        <span className="bg-[#F5F3FF] text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold">
                            {moodValue < 30 ? 'Sad' : moodValue < 70 ? 'Okay' : 'Happy'}
                        </span>
                    </div>
                    <div className="flex justify-between text-2xl mb-4">
                        <Frown className="text-gray-400" />
                        <Smile className="text-yellow-500" />
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={moodValue}
                        onChange={(e) => setMoodValue(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                    />
                </div>

                {/* Energy Slider */}
                <div className="bg-white/80 backdrop-blur-md rounded-[28px] p-6 shadow-sm border border-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#4B2C82] text-lg flex items-center gap-2">
                            <span className="text-2xl">⚡</span> Energy
                        </h3>
                        <span className="bg-[#FFF8E1] text-[#F59E0B] px-3 py-1 rounded-full text-xs font-bold">
                            {energyValue < 30 ? 'Low' : energyValue < 70 ? 'Normal' : 'High'}
                        </span>
                    </div>
                    <div className="flex justify-between text-2xl mb-4">
                        <span className="text-gray-400">🔋</span>
                        <span className="text-green-500">🔋</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={energyValue}
                        onChange={(e) => setEnergyValue(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
                    />
                </div>

                {/* Text Field */}
                <div className="bg-white/80 backdrop-blur-md rounded-[28px] p-6 shadow-sm border border-white">
                    <label className="font-bold text-[#4B2C82] text-lg mb-4 block gap-2">
                        What affected your mood today? <span className="text-[#8B5CF6] text-xs px-2 bg-[#F5F3FF] rounded-full font-semibold align-middle ml-2">Optional</span>
                    </label>
                    <textarea 
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-2xl p-4 text-[#334155] font-medium outline-none focus:border-[#8B5CF6] h-28 resize-none"
                        placeholder="Write down your thoughts..."
                    />
                </div>
                
                <button 
                    onClick={handleSaveMood}
                    className="w-full py-4 bg-gradient-to-r from-[#9F7AEA] to-[#B794F4] text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity"
                >
                    Save Check-in
                </button>
            </div>
            <div className="h-10"></div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] text-indigo-950 font-sans relative overflow-x-hidden pt-10 px-6 sm:px-10 lg:px-16">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg className="absolute top-[18%] -left-[10%] w-[120%] h-auto opacity-40 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <AnimatePresence mode="wait">
                {currentScreen === 'dashboard' && <motion.div key="dashboard">{renderDashboard()}</motion.div>}
                {currentScreen === 'habit' && <motion.div key="habit">{renderHabitTracker()}</motion.div>}
                {currentScreen === 'expense' && <motion.div key="expense">{renderExpenseTracker()}</motion.div>}
                {currentScreen === 'mood' && <motion.div key="mood">{renderMoodTracker()}</motion.div>}
            </AnimatePresence>

            {/* Modals & Overlays */}
            <AnimatePresence>
                {currentScreen === 'log-habit' && renderLogHabitModal()}
                {currentScreen === 'add-expense' && renderAddExpense()}
            </AnimatePresence>

            {/* Render proper navigation on standard tracker screens */}
            {currentScreen !== 'add-expense' && currentScreen !== 'log-habit' && renderBottomNav()}
        </div>
    );
};

export default Trackers;
