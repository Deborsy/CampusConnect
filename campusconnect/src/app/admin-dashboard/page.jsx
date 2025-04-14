"use client";
 import React from 'react';
 import Sidebar from './components/Sidebar';
 import { useSelector } from 'react-redux';
 import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './components/create-event/CreateEvent';
import NotificationForm from './components/notification/Notification';
 

 const DashBoard = () => {
  const activeNavItem = useSelector((state) => state.ui.activeNavItem);
  const isSidebarCollapsed = useSelector((state) => state.ui.isSidebarCollapsed);
  const userId = useSelector((state) => state.user.user?.uid);
 

  const renderContent = () => {
    switch (activeNavItem) {
        case 'Create Event':
            return <CreateEvent />;
        case 'Notification':
          return <NotificationForm />
        default:
        return null;
    }
  };
 

  return (
    <div className='dashboard '>
        <Sidebar />
        <main className='dashboard-content' style={{ position: "relative", zIndex: 1 }}>
            {renderContent()}
        </main>
    </div>
    );
 };
 

 const ProtectedDashboard = () => (
  <ProtectedRoute>
    <DashBoard />
  </ProtectedRoute>
 );
 

 export default ProtectedDashboard;