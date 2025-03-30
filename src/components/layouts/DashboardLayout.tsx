
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
