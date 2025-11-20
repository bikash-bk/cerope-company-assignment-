import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getMe } from '../api/auth';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false); setOk(false); return;
      }
      try {
        await getMe();
        setOk(true);
      } catch (err) {
        localStorage.removeItem('token');
        setOk(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}
