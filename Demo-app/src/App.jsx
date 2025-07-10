import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import Patients from './pages/Patients';
import HomeSection from './pages/HomeSection';
import { AuthProtected, FullPageRoute } from './routes/authProtected.jsx';
import { MAIN_PATHS } from './libs/utility/constant';

// Main App Layout with Sidebar
const MainApp = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="h-full bg-white border-r w-64 flex flex-col">
        <div className="p-6 border-b">
          <span className="text-xl font-bold text-blue-600">Health First</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/dashboard" className={`block px-4 py-2 rounded hover:bg-blue-50 ${location.pathname === '/dashboard' ? 'bg-blue-100 font-semibold' : ''}`}>Dashboard</Link>
          <Link to="/patients" className={`block px-4 py-2 rounded hover:bg-blue-50 ${location.pathname.startsWith('/patients') ? 'bg-blue-100 font-semibold' : ''}`}>Patients</Link>
        </nav>
        {isAuthenticated && (
          <div className="p-4 border-t flex flex-col gap-2">
            <span className="text-xs text-gray-500">Signed in as</span>
            <span className="text-sm font-medium text-gray-800">{user?.email}</span>
            <button
              className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <main className="flex-1 min-h-screen">
        <Routes>
          <Route path="/dashboard" element={<HomeSection />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/" element={<Navigate to="/patients" replace />} />
        </Routes>
      </main>
    </div>
  );
};

// Login Page Component
const LoginPage = () => {
  const [showRegister, setShowRegister] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showRegister ? (
        <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login/*" element={
        <FullPageRoute>
          <LoginPage />
        </FullPageRoute>
      } />
      <Route path="/*" element={
        <AuthProtected>
          <MainApp />
        </AuthProtected>
      } />
    </Routes>
  );
};

export default App;
