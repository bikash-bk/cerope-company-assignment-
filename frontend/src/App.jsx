import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import SignupProfile from './pages/SignupProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import NavbarAuth from './components/NavbarAuth';
import NavbarMain from './components/NavbarMain';
import Footer from './components/Footer';

function AppRoutes() {
  const location = useLocation();
  const authPages = ['/login', '/signup', '/signup-profile'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      {isAuthPage ? "" : <NavbarMain />}

      <main > 
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-profile" element={<SignupProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}
