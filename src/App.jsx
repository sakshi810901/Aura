import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WelcomeSetup from './pages/WelcomeSetup';
import LifeGoals from './pages/LifeGoals';
import DailyRoutine from './pages/DailyRoutine';
import Habits from './pages/Habits';
import SpendingStyle from './pages/SpendingStyle';
import AvatarSetup from './pages/AvatarSetup';
import Dashboard from './pages/Dashboard';
import GenderSelect from './components/GenderSelect';
import AvatarCustomization from './pages/AvatarCustomization';
import AvatarGreeting from './pages/AvatarGreeting';
import ProtectedRoute from './components/ProtectedRoute';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ConsultantChat from './pages/ConsultantChat';

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
        <Route path="/gender-select" element={<GenderSelect />} />
        <Route path="/avatar-customization" element={<AvatarCustomization />} />
        <Route path="/avatar-greeting" element={<AvatarGreeting />} />
        
        {/* Consultant Flow */}
        <Route path="/consultant-flow" element={<ConsultantDashboard />} />
        <Route path="/consultant-chat/:clientId" element={<ConsultantChat />} />
        <Route path="/consultant-chat" element={<ConsultantChat />} />
        
        {/* Existing Flow */}
        <Route element={<ProtectedRoute requireTexture={false} />}>
            <Route path="/avatar-setup" element={<AvatarSetup />} />
        </Route>
        
        <Route element={<ProtectedRoute requireTexture={true} />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
