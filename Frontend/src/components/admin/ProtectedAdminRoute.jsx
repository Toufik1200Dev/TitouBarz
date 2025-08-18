import React, { useEffect } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';

export default function ProtectedAdminRoute({ children }) {
  const { isAdminAuthenticated, checkAuth } = useAdminAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return children;
}
