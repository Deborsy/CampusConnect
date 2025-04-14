"use client"

// components/DashboardLayout.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className={styles.dashboardContent}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;