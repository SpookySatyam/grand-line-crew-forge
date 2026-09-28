import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Recruitment from './pages/Recruitment';
import Dashboard from './pages/Dashboard';
import CrewFormation from './pages/CrewFormation';
import ChallengeAssignment from './pages/ChallengeAssignment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  useEffect(() => {
    useAuthStore.getState().fetchMe();
  }, []);

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#2B1810', // darkBrown
            color: '#F4E4BC', // parchment
            border: '1px solid #D4AF37', // gold
          }
        }} 
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />

          {/* Protected routes */}
          <Route path="recruit" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="formation" element={<ProtectedRoute><CrewFormation /></ProtectedRoute>} />
          <Route path="challenge" element={<ProtectedRoute><ChallengeAssignment /></ProtectedRoute>} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
