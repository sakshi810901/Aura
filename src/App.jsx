import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WelcomeSetup from './pages/WelcomeSetup';
import LifeGoals from './pages/LifeGoals';
import DailyRoutine from './pages/DailyRoutine';
import Habits from './pages/Habits';
import SpendingStyle from './pages/SpendingStyle';
import StressHabits from './pages/StressHabits';
import FoodPreferences from './pages/FoodPreferences';
import AvatarSetup from './pages/AvatarSetup';
import Dashboard from './pages/Dashboard';
import GenderSelect from './components/GenderSelect';
import AvatarCustomization from './pages/AvatarCustomization';
import AvatarGreeting from './pages/AvatarGreeting';
import ProtectedRoute from './components/ProtectedRoute';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ConsultantChat from './pages/ConsultantChat';
import ConsultantProfile from './pages/ConsultantProfile';
import ConsultantPayment from './pages/ConsultantPayment';
import LogHabit from './pages/LogHabit';
import LogExpense from './pages/LogExpense';
import CostAnalysis from './pages/CostAnalysis';
import Decisions from './pages/Decisions';
import CompareOptions from './pages/CompareOptions';
import WhatShouldIWear from './pages/WhatShouldIWear';
import ShouldIBuyThis from './pages/ShouldIBuyThis';
import WhatShouldIDoNext from './pages/WhatShouldIDoNext';
import ChatInterface from './pages/ChatInterface';
import ParallelSimulation from './pages/ParallelSimulation';
import UserConsultants from './pages/UserConsultants';
import Trackers from './pages/Trackers';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome-setup" element={<WelcomeSetup />} />
        
        {/* New Avatar Creation Flow */}
        <Route path="/life-goals" element={<LifeGoals />} />
        <Route path="/daily-routine" element={<DailyRoutine />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/spending-style" element={<SpendingStyle />} />
        <Route path="/stress-habits" element={<StressHabits />} />
        <Route path="/food-preferences" element={<FoodPreferences />} />
        <Route path="/gender-select" element={<GenderSelect />} />
        <Route path="/avatar-customization" element={<AvatarCustomization />} />
        <Route path="/avatar-greeting" element={<AvatarGreeting />} />
        
        {/* User-Facing Consultant Flow */}
        <Route path="/consultants" element={<UserConsultants />} />

        {/* Consultant (Dr. Sharma) Dashboard Flow */}
        <Route path="/consultant-flow" element={<ConsultantDashboard />} />
        <Route path="/consultant-chat/:clientId" element={<ConsultantChat />} />
        <Route path="/consultant-chat" element={<ConsultantChat />} />
        <Route path="/consultant-profile" element={<ConsultantProfile />} />
        <Route path="/consultant-payment" element={<ConsultantPayment />} />
        
        {/* Existing Flow */}
        <Route element={<ProtectedRoute requireTexture={false} />}>
            <Route path="/avatar-setup" element={<AvatarSetup />} />
        </Route>
        
        <Route element={<ProtectedRoute requireTexture={true} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/log-habit" element={<LogHabit />} />
            <Route path="/log-expense" element={<LogExpense />} />
            <Route path="/cost-analysis" element={<CostAnalysis />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/compare-options" element={<CompareOptions />} />
            <Route path="/what-should-i-wear" element={<WhatShouldIWear />} />
            <Route path="/should-i-buy-this" element={<ShouldIBuyThis />} />
            <Route path="/what-to-do-next" element={<WhatShouldIDoNext />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/parallel-simulation" element={<ParallelSimulation />} />
            <Route path="/trackers" element={<Trackers />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
