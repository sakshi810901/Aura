import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, Send, ChevronRight, MessageCircle,
  CreditCard, Wallet, CheckCircle, Home, Users, BarChart2, Trophy, User, Sparkles
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */

const CATEGORIES = [
  {
    id: 'diet',
    icon: '🥗',
    title: 'Diet & Nutrition',
    desc: 'Personalised meal plans, macro tracking & nutritional guidance',
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
  },
  {
    id: 'finance',
    icon: '💰',
    title: 'Finance & Savings',
    desc: 'Budget planning, investment basics & smart money habits',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    id: 'career',
    icon: '🎓',
    title: 'Career & Education',
    desc: 'Resume review, career roadmaps & upskilling advice',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
  },
  {
    id: 'fashion',
    icon: '👗',
    title: 'Fashion & Styling',
    desc: 'Wardrobe curation, personal style & outfit planning',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
  },
  {
    id: 'wellness',
    icon: '🧘',
    title: 'Mental Wellness',
    desc: 'Stress relief, mindfulness & emotional well-being strategies',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
  },
];

const CONSULTANTS = {
  diet: [
    { id: 1, name: 'Dr. Priya Mehta', spec: 'Clinical Nutritionist', exp: 8, rating: 4.9, reviews: 312, price: 499, skills: ['Macro Planning', 'Weight Management', 'Sports Nutrition', 'Gut Health'] },
    { id: 2, name: 'Ananya Kapoor', spec: 'Registered Dietitian', exp: 5, rating: 4.7, reviews: 178, price: 349, skills: ['Vegan Diets', 'Diabetes Nutrition', 'Meal Prep', 'Calorie Tracking'] },
    { id: 3, name: 'Rahul Bose', spec: 'Functional Nutrition Coach', exp: 6, rating: 4.8, reviews: 221, price: 399, skills: ['Intermittent Fasting', 'Gut Health', 'Anti-inflammatory Diet'] },
  ],
  finance: [
    { id: 4, name: 'CA Arjun Sharma', spec: 'Certified Financial Planner', exp: 12, rating: 4.9, reviews: 445, price: 799, skills: ['Tax Planning', 'SIP & Mutual Funds', 'Retirement Planning', 'Budgeting'] },
    { id: 5, name: 'Neha Gupta', spec: 'Investment Advisor', exp: 7, rating: 4.8, reviews: 290, price: 649, skills: ['Stock Market', 'Real Estate', 'Emergency Fund', 'Debt Management'] },
  ],
  career: [
    { id: 6, name: 'Kavita Joshi', spec: 'Career Coach & HR Expert', exp: 10, rating: 4.8, reviews: 389, price: 599, skills: ['Resume Writing', 'Interview Prep', 'LinkedIn Optimisation', 'Salary Negotiation'] },
    { id: 7, name: 'Siddharth Rao', spec: 'EdTech & Upskilling Mentor', exp: 6, rating: 4.7, reviews: 215, price: 449, skills: ['Online Courses', 'Certifications', 'Career Pivot', 'Freelancing'] },
  ],
  fashion: [
    { id: 8, name: 'Zara Malik', spec: 'Personal Stylist & Image Consultant', exp: 9, rating: 4.9, reviews: 502, price: 549, skills: ['Capsule Wardrobe', 'Body-Type Dressing', 'Colour Theory', 'Occasion Styling'] },
    { id: 9, name: 'Riya Oberoi', spec: 'Fashion Blogger & Consultant', exp: 4, rating: 4.6, reviews: 134, price: 349, skills: ['Thrift Fashion', 'Budget Styling', 'Trend Forecasting'] },
  ],
  wellness: [
    { id: 10, name: 'Dr. Aditya Rao', spec: 'Clinical Psychologist', exp: 11, rating: 4.9, reviews: 620, price: 899, skills: ['CBT', 'Stress Management', 'Anxiety Relief', 'Mindfulness'] },
    { id: 11, name: 'Meera Pillai', spec: 'Mindfulness & Yoga Coach', exp: 7, rating: 4.8, reviews: 315, price: 499, skills: ['Meditation', 'Breathwork', 'Sleep Hygiene', 'Emotional Resilience'] },
  ],
};

const REVIEWER_NAMES = ['Sneha R.', 'Aakash M.', 'Pooja S.', 'Vivek T.', 'Divya K.'];
const REVIEW_TEXTS = [
  'Absolutely life-changing session! Highly recommend.',
  'Very professional and knowledgeable. Great value.',
  'Helped me understand exactly what I needed to do.',
  'Clear, concise and actionable advice. 5 stars!',
  'Warm, empathetic and incredibly insightful.',
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📲', sub: 'Pay via any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', label: 'Wallet', icon: '👛', sub: 'Paytm, PhonePe, Amazon Pay' },
];

const AI_PLAN = {
  title: '✨ AI Generated Plan for You',
  sections: [
    { heading: 'Current Pattern', text: 'AURA detected high evening screen time, irregular meal times and low water intake over the past 7 days.' },
    { heading: 'Priority Goals', text: 'Reduce junk food intake · Improve sleep schedule · Build a 10-minute morning routine.' },
    { heading: 'Suggested First Step', text: 'Replace one evening snack with a fruit before consulting further.' },
  ],
};

/* ─────────────────────────── HELPERS ─────────────────────────── */

const getRatingStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={14}
      className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-200'}
    />
  ));

const avatarColor = (name) => {
  const colors = ['from-violet-500 to-purple-600', 'from-pink-500 to-rose-600', 'from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600'];
  return colors[name.charCodeAt(0) % colors.length];
};

/* ─────────────────────────── BOTTOM NAV ─────────────────────────── */

const BottomNav = ({ navigate, onConsultants }) => (
  <div className="fixed bottom-0 left-0 w-full px-6 pb-6 pt-0 z-50 pointer-events-none flex justify-center">
    <div className="w-full max-w-[800px] bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(150,110,200,0.25)] border border-white/80 p-3 pt-4 pb-4 flex justify-around items-center pointer-events-auto">
      <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
        <Home className="w-[28px] h-[28px]" strokeWidth={2} />
        <span className="text-[12px] font-bold tracking-wide">Home</span>
      </button>
      <button onClick={onConsultants} className="flex flex-col items-center gap-2 text-[#8B5CF6] transition-transform hover:scale-105">
        <Users className="w-[28px] h-[28px] fill-[#8B5CF6]" strokeWidth={2} />
        <span className="text-[12px] font-black tracking-wide">Consultants</span>
      </button>
      <button onClick={() => navigate('/trackers')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
        <BarChart2 className="w-[28px] h-[28px]" strokeWidth={2} />
        <span className="text-[12px] font-bold tracking-wide">Trackers</span>
      </button>
      <button onClick={() => navigate('/progress')} className="flex flex-col items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-all hover:scale-105">
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

/* ─────────────────────────── PAGE WRAPPER ─────────────────────────── */

const PageWrapper = ({ children, className = '' }) => (
  <motion.div
    key="page"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] pb-32 ${className}`}
  >
    {/* ambient sparkles */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <Sparkles className="absolute top-12 left-8 text-white/70 w-8 h-8 animate-pulse" style={{ animationDuration: '3s' }} />
      <Sparkles className="absolute top-[30%] right-10 text-white/50 w-6 h-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-[35%] right-8 text-white/60 w-5 h-5 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }} />
    </div>
    <div className="relative z-10">{children}</div>
  </motion.div>
);

/* ─────────────────────────── SCREEN 1: CATEGORIES ─────────────────────────── */

const CategoriesScreen = ({ onSelect, navigate }) => (
  <PageWrapper>
    {/* Header */}
    <div className="px-6 pt-10 pb-4">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[#6D28D9] font-semibold mb-6 hover:opacity-80 transition-opacity">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex items-center justify-center shadow-lg">
          <Users size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#4B2C82] leading-tight">Get Expert Guidance</h1>
          <p className="text-[#6D5D8C] text-sm font-medium">Choose a category to find your consultant</p>
        </div>
      </div>
    </div>

    {/* Category Cards */}
    <div className="px-6 mt-4 space-y-4">
      {CATEGORIES.map((cat, idx) => (
        <motion.button
          key={cat.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.08 }}
          onClick={() => onSelect(cat)}
          className="w-full flex items-center gap-5 bg-white/80 backdrop-blur-md rounded-[24px] px-6 py-5 shadow-[0_8px_24px_rgba(150,110,200,0.12)] border border-white/90 hover:shadow-[0_12px_32px_rgba(150,110,200,0.22)] hover:-translate-y-1 transition-all group text-left"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md text-3xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
            {cat.icon}
          </div>
          <div className="flex-1">
            <p className="font-black text-[#4B2C82] text-lg leading-tight">{cat.title}</p>
            <p className="text-[#6D5D8C] text-sm mt-0.5 font-medium leading-relaxed">{cat.desc}</p>
          </div>
          <ChevronRight size={22} className="text-[#9F7AEA] group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </motion.button>
      ))}
    </div>

    <BottomNav navigate={navigate} onConsultants={() => {}} />
  </PageWrapper>
);

/* ─────────────────────────── SCREEN 2: CONSULTANT LIST ─────────────────────────── */

const ConsultantListScreen = ({ category, onSelect, onBack, navigate }) => {
  const list = CONSULTANTS[category.id] || [];
  return (
    <PageWrapper>
      <div className="px-6 pt-10 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#6D28D9] font-semibold mb-6 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex items-center gap-3 mb-1">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-md`}>
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#4B2C82]">{category.title}</h1>
            <p className="text-[#6D5D8C] text-sm font-medium">{list.length} expert{list.length !== 1 ? 's' : ''} available</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-2 space-y-5">
        {list.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/85 backdrop-blur-md rounded-[24px] p-6 shadow-[0_8px_24px_rgba(150,110,200,0.12)] border border-white/90"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColor(c.name)} flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-md`}>
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#4B2C82] text-lg leading-tight">{c.name}</p>
                <p className="text-[#6D5D8C] text-sm font-semibold">{c.spec}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">{getRatingStars(c.rating)}</div>
                  <span className="text-[#6D28D9] text-sm font-bold">{c.rating}</span>
                  <span className="text-[#9D8CB5] text-xs">({c.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9D8CB5] text-xs font-semibold uppercase tracking-wide">Session Price</p>
                <p className="text-[#4B2C82] font-black text-xl">₹{c.price}<span className="text-sm font-semibold text-[#6D5D8C]">/session</span></p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelect(c)}
                className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all text-sm"
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav navigate={navigate} onConsultants={onBack} />
    </PageWrapper>
  );
};

/* ─────────────────────────── SCREEN 3: CONSULTANT PROFILE ─────────────────────────── */

const ProfileScreen = ({ consultant, category, onChat, onBack, navigate }) => {
  const reviews = REVIEWER_NAMES.slice(0, 3).map((name, i) => ({
    name,
    text: REVIEW_TEXTS[i],
    rating: 5 - (i % 2 === 0 ? 0 : 0.5),
  }));

  return (
    <PageWrapper>
      <div className="px-6 pt-10 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#6D28D9] font-semibold mb-6 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Back to List
        </button>
      </div>

      {/* Hero */}
      <div className="px-6">
        <div className={`bg-gradient-to-br ${category.color} rounded-[28px] p-8 text-white shadow-xl mb-6`}>
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-4xl font-black shadow-lg border-4 border-white/40">
              {consultant.name.charAt(0)}
            </div>
            <div>
              <p className="font-black text-2xl leading-tight">{consultant.name}</p>
              <p className="text-white/90 font-semibold">{consultant.spec}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{getRatingStars(consultant.rating)}</div>
                <span className="font-bold text-sm">{consultant.rating} · {consultant.reviews} reviews</span>
              </div>
              <p className="mt-1 text-white/80 text-sm font-medium">{consultant.exp} years of experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="px-6 mb-6">
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-6 shadow-[0_8px_24px_rgba(150,110,200,0.12)] border border-white/90">
          <p className="font-black text-[#4B2C82] text-lg mb-4">Skills & Expertise</p>
          <div className="flex flex-wrap gap-2">
            {consultant.skills.map(s => (
              <span key={s} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/10 to-[#A855F7]/10 text-[#6D28D9] font-semibold text-sm border border-[#8B5CF6]/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Session Price */}
      <div className="px-6 mb-6">
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-6 shadow-[0_8px_24px_rgba(150,110,200,0.12)] border border-white/90 flex items-center justify-between">
          <div>
            <p className="text-[#9D8CB5] text-xs font-semibold uppercase tracking-wide mb-1">Session Price</p>
            <p className="font-black text-[#4B2C82] text-3xl">₹{consultant.price}<span className="text-base font-semibold text-[#6D5D8C]">/session</span></p>
          </div>
          <div className="text-4xl">{category.icon}</div>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-6 mb-8">
        <p className="font-black text-[#4B2C82] text-lg mb-4">User Reviews</p>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-[20px] p-5 shadow-sm border border-white/90">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(r.name)} flex items-center justify-center text-white font-bold text-sm`}>
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#4B2C82] text-sm">{r.name}</p>
                  <div className="flex">{getRatingStars(r.rating)}</div>
                </div>
              </div>
              <p className="text-[#6D5D8C] text-sm font-medium">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 flex gap-4">
        <button onClick={onBack} className="flex-1 py-4 rounded-[20px] border-2 border-[#8B5CF6]/30 text-[#6D28D9] font-bold bg-white/60 hover:bg-white/80 transition-all">
          Back to List
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onChat}
          className="flex-2 flex-grow py-4 px-6 rounded-[20px] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} /> Chat with Consultant
        </motion.button>
      </div>

      <BottomNav navigate={navigate} onConsultants={onBack} />
    </PageWrapper>
  );
};

/* ─────────────────────────── SCREEN 4: CONFIRMATION ─────────────────────────── */

const ConfirmationScreen = ({ consultant, category, onProceed, onCancel, navigate }) => (
  <PageWrapper>
    <div className="px-6 pt-10 pb-4">
      <button onClick={onCancel} className="flex items-center gap-2 text-[#6D28D9] font-semibold mb-6 hover:opacity-80 transition-opacity">
        <ArrowLeft size={20} /> Cancel
      </button>
    </div>

    <div className="px-6">
      {/* Icon */}
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] flex items-center justify-center shadow-xl">
          <CreditCard size={36} className="text-white" />
        </div>
      </motion.div>

      <h1 className="text-center font-black text-[#4B2C82] text-2xl mb-2">Paid Consultation</h1>
      <p className="text-center text-[#6D5D8C] font-medium mb-8">You are about to start a paid consultation. Please review the details before proceeding.</p>

      {/* Summary Card */}
      <div className="bg-white/85 backdrop-blur-md rounded-[24px] p-6 shadow-[0_8px_24px_rgba(150,110,200,0.15)] border border-white/90 mb-5 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-purple-100">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor(consultant.name)} flex items-center justify-center text-white font-black text-2xl`}>
            {consultant.name.charAt(0)}
          </div>
          <div>
            <p className="font-black text-[#4B2C82] text-lg">{consultant.name}</p>
            <p className="text-[#6D5D8C] text-sm font-semibold">{consultant.spec}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#6D5D8C] font-semibold">Consultation Topic</span>
          <span className="text-[#4B2C82] font-bold">{category.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#6D5D8C] font-semibold">Session Cost</span>
          <span className="text-[#6D28D9] font-black text-xl">₹{consultant.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#6D5D8C] font-semibold">Duration</span>
          <span className="text-[#4B2C82] font-bold">45 minutes</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-purple-100">
          <span className="text-[#6D5D8C] font-semibold">Payment Method</span>
          <span className="text-[#4B2C82] font-bold flex items-center gap-2">💳 Card ending ••4242</span>
        </div>
      </div>

      {/* Note */}
      <div className="bg-[#8B5CF6]/10 rounded-[18px] px-5 py-4 mb-8 border border-[#8B5CF6]/20">
        <p className="text-[#5B3A8F] text-sm font-medium">💡 Your AI-generated plan will be automatically shared with the consultant to help personalise their advice.</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 py-4 rounded-[20px] border-2 border-[#8B5CF6]/30 text-[#6D28D9] font-bold bg-white/60 hover:bg-white/80 transition-all">
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          className="flex-grow py-4 px-6 rounded-[20px] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-black shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          Proceed to Payment →
        </motion.button>
      </div>
    </div>

    <BottomNav navigate={navigate} onConsultants={onCancel} />
  </PageWrapper>
);

/* ─────────────────────────── SCREEN 5: PAYMENT ─────────────────────────── */

const PaymentScreen = ({ consultant, category, onSuccess, onBack, navigate }) => {
  const [selected, setSelected] = useState('upi');
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setDone(true); setTimeout(onSuccess, 1200); }, 2000);
  };

  return (
    <PageWrapper>
      <div className="px-6 pt-10 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#6D28D9] font-semibold mb-6 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="font-black text-[#4B2C82] text-2xl mb-1">Complete Payment</h1>
        <p className="text-[#6D5D8C] font-medium mb-6">₹{consultant.price} · {category.title} session</p>
      </div>

      <div className="px-6 space-y-4 mb-6">
        {PAYMENT_METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-[22px] border-2 transition-all ${selected === m.id ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 shadow-md' : 'border-white/80 bg-white/70 hover:border-[#8B5CF6]/40'}`}
          >
            <span className="text-3xl">{m.icon}</span>
            <div className="text-left flex-1">
              <p className="font-bold text-[#4B2C82]">{m.label}</p>
              <p className="text-[#6D5D8C] text-sm font-medium">{m.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === m.id ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-gray-300'}`}>
              {selected === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        ))}
      </div>

      {/* UPI input */}
      {selected === 'upi' && (
        <div className="px-6 mb-6">
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. name@upi)"
            className="w-full px-5 py-4 rounded-[18px] border-2 border-[#8B5CF6]/30 bg-white/80 focus:outline-none focus:border-[#8B5CF6] text-[#4B2C82] font-medium placeholder:text-[#9D8CB5]"
          />
        </div>
      )}

      {/* Summary */}
      <div className="px-6 mb-8">
        <div className="bg-white/80 rounded-[22px] p-5 border border-white/90 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-[#6D5D8C] font-medium">Subtotal</span>
            <span className="text-[#4B2C82] font-bold">₹{consultant.price}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-[#6D5D8C] font-medium">Platform fee</span>
            <span className="text-[#4B2C82] font-bold">₹0</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-purple-100">
            <span className="text-[#4B2C82] font-black">Total</span>
            <span className="text-[#6D28D9] font-black text-xl">₹{consultant.price}</span>
          </div>
        </div>
      </div>

      <div className="px-6">
        <motion.button
          whileHover={!paying ? { scale: 1.02 } : {}}
          whileTap={!paying ? { scale: 0.97 } : {}}
          onClick={handlePay}
          disabled={paying}
          className="w-full py-4 rounded-[22px] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-black shadow-xl text-lg flex items-center justify-center gap-3 disabled:opacity-80"
        >
          {done ? (
            <><CheckCircle size={24} className="text-green-300" /> Payment Successful!</>
          ) : paying ? (
            <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full border-2" /> Processing…</>
          ) : (
            <>Pay ₹{consultant.price}</>
          )}
        </motion.button>
      </div>

      <BottomNav navigate={navigate} onConsultants={onBack} />
    </PageWrapper>
  );
};

/* ─────────────────────────── SCREEN 6: CHAT ─────────────────────────── */

const ChatScreen = ({ consultant, category, onEnd, navigate }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'consultant', text: `Hi! I'm ${consultant.name}. I've reviewed your AI plan. Let's get started! 👋`, time: 'now' },
    { id: 2, from: 'consultant', text: 'Your AURA AI plan has been shared with me. I can see your current patterns and goals.', time: 'now' },
  ]);
  const [showPlan, setShowPlan] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, from: 'user', text: input, time: 'now' };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setTimeout(() => {
      const replies = [
        "That's great to hear! Let me tailor the plan further for you.",
        "Based on your AI analysis, I'd suggest starting with these small steps.",
        "Excellent question! Here's what I recommend based on your profile.",
        "I've updated the plan. Let me know if this feels achievable for you!",
      ];
      setMessages(p => [...p, { id: p.length + 1, from: 'consultant', text: replies[Math.floor(Math.random() * replies.length)], time: 'now' }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eadefa] via-[#e5d0f6] to-[#dfcbf3] flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-purple-100 px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onEnd} className="p-2 rounded-full hover:bg-purple-100 transition-colors">
          <ArrowLeft size={22} className="text-[#6D28D9]" />
        </button>
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColor(consultant.name)} flex items-center justify-center text-white font-black text-xl shadow-md`}>
          {consultant.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-black text-[#4B2C82] text-lg leading-tight">{consultant.name}</p>
          <p className="text-green-500 text-xs font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> Online · {consultant.spec}
          </p>
        </div>
        <button
          onClick={() => setShowPlan(p => !p)}
          className="px-3 py-1.5 rounded-full bg-[#8B5CF6]/15 text-[#6D28D9] font-bold text-xs border border-[#8B5CF6]/25 hover:bg-[#8B5CF6]/25 transition-colors"
        >
          ✨ AI Plan
        </button>
      </div>

      {/* AI Plan Banner */}
      <AnimatePresence>
        {showPlan && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-4 my-3 bg-gradient-to-r from-[#8B5CF6]/15 to-[#A855F7]/10 rounded-[20px] p-5 border border-[#8B5CF6]/25 shadow-sm">
              <p className="font-black text-[#4B2C82] text-base mb-3">{AI_PLAN.title}</p>
              {AI_PLAN.sections.map((s, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-[#6D28D9] text-sm">{s.heading}</p>
                  <p className="text-[#6D5D8C] text-sm font-medium">{s.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(msg => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
          >
            {msg.from === 'consultant' && (
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(consultant.name)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
                {consultant.name.charAt(0)}
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-[18px] ${msg.from === 'user'
              ? 'bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] text-white rounded-br-md shadow-md'
              : 'bg-white/90 text-[#4B2C82] rounded-bl-md shadow-sm border border-white/80'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
            </div>
            {msg.from === 'user' && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C084FC] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                U
              </div>
            )}
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-purple-100 px-4 py-3 flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="flex-1 px-5 py-3.5 rounded-full bg-purple-50 border border-purple-200 focus:outline-none focus:border-[#8B5CF6] text-[#4B2C82] font-medium placeholder:text-[#9D8CB5]"
        />
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={send}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] flex items-center justify-center shadow-lg"
        >
          <Send size={18} className="text-white" />
        </motion.button>
      </div>

      {/* End Session */}
      <div className="bg-white/90 px-4 pb-4 flex justify-center">
        <button onClick={onEnd} className="text-[#6D28D9] font-bold text-sm underline underline-offset-2 hover:opacity-70 transition-opacity">
          End Consultation Session
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────── SCREEN 7: SUMMARY ─────────────────────────── */

const SummaryScreen = ({ consultant, navigate }) => {
  const date = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <PageWrapper>
      <div className="px-6 pt-16 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] flex items-center justify-center shadow-2xl mb-6"
        >
          <CheckCircle size={48} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-black text-[#4B2C82] text-3xl text-center mb-2"
        >
          Consultation Complete! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-[#6D5D8C] font-medium text-center mb-10"
        >
          Your consultation has been saved and added to your history.
        </motion.p>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="w-full bg-white/85 backdrop-blur-md rounded-[24px] p-6 shadow-[0_8px_24px_rgba(150,110,200,0.15)] border border-white/90 mb-6 space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColor(consultant.name)} flex items-center justify-center text-white font-black text-2xl shadow-md`}>
              {consultant.name.charAt(0)}
            </div>
            <div>
              <p className="font-black text-[#4B2C82] text-lg">{consultant.name}</p>
              <p className="text-[#6D5D8C] font-semibold text-sm">{consultant.spec}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-purple-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-[#6D5D8C] font-medium">Session Date</span>
              <span className="text-[#4B2C82] font-bold text-sm">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6D5D8C] font-medium">Status</span>
              <span className="text-green-600 font-bold text-sm flex items-center gap-1"><CheckCircle size={14} /> Completed</span>
            </div>
          </div>
        </motion.div>

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="w-full bg-white/80 rounded-[22px] p-5 border border-white/90 mb-8 text-center"
        >
          <p className="text-[#4B2C82] font-bold mb-3">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={32} className="text-amber-400 fill-amber-400 cursor-pointer hover:scale-110 transition-transform" />
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="w-full space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-[22px] bg-[#8B5CF6]/10 text-[#6D28D9] font-black border-2 border-[#8B5CF6]/25 hover:bg-[#8B5CF6]/20 transition-all"
          >
            📋 View Conversation History
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 rounded-[22px] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-black shadow-lg hover:shadow-xl transition-all"
          >
            🏠 Back to Dashboard
          </motion.button>
        </div>
      </div>

      <BottomNav navigate={navigate} onConsultants={() => navigate('/consultants')} />
    </PageWrapper>
  );
};

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

const SCREENS = {
  CATEGORIES: 'categories',
  LIST: 'list',
  PROFILE: 'profile',
  CONFIRMATION: 'confirmation',
  PAYMENT: 'payment',
  CHAT: 'chat',
  SUMMARY: 'summary',
};

const UserConsultants = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(SCREENS.CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const goTo = (s) => setScreen(s);

  return (
    <AnimatePresence mode="wait">
      {screen === SCREENS.CATEGORIES && (
        <motion.div key="cat">
          <CategoriesScreen
            onSelect={cat => { setSelectedCategory(cat); goTo(SCREENS.LIST); }}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.LIST && selectedCategory && (
        <motion.div key="list">
          <ConsultantListScreen
            category={selectedCategory}
            onSelect={c => { setSelectedConsultant(c); goTo(SCREENS.PROFILE); }}
            onBack={() => goTo(SCREENS.CATEGORIES)}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.PROFILE && selectedConsultant && (
        <motion.div key="profile">
          <ProfileScreen
            consultant={selectedConsultant}
            category={selectedCategory}
            onChat={() => goTo(SCREENS.CONFIRMATION)}
            onBack={() => goTo(SCREENS.LIST)}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.CONFIRMATION && selectedConsultant && (
        <motion.div key="confirm">
          <ConfirmationScreen
            consultant={selectedConsultant}
            category={selectedCategory}
            onProceed={() => goTo(SCREENS.PAYMENT)}
            onCancel={() => goTo(SCREENS.PROFILE)}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.PAYMENT && selectedConsultant && (
        <motion.div key="pay">
          <PaymentScreen
            consultant={selectedConsultant}
            category={selectedCategory}
            onSuccess={() => goTo(SCREENS.CHAT)}
            onBack={() => goTo(SCREENS.CONFIRMATION)}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.CHAT && selectedConsultant && (
        <motion.div key="chat">
          <ChatScreen
            consultant={selectedConsultant}
            category={selectedCategory}
            onEnd={() => goTo(SCREENS.SUMMARY)}
            navigate={navigate}
          />
        </motion.div>
      )}
      {screen === SCREENS.SUMMARY && selectedConsultant && (
        <motion.div key="summary">
          <SummaryScreen
            consultant={selectedConsultant}
            navigate={navigate}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserConsultants;
