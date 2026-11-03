'use client';

import React, { createContext, useContext, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { AdminUserSession } from '@/lib/auth';

interface AdminSidebarContextType {
  openSidebar: () => void;
  closeSidebar: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType>({
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const useAdminSidebar = () => useContext(AdminSidebarContext);

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: AdminUserSession | null;
  isLoginPage: boolean;
}

export default function AdminLayoutClient({
  children,
  user,
  isLoginPage,
}: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminSidebarContext.Provider
      value={{
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
      }}
    >
      <div className="min-h-screen bg-[#141210] text-[#FFF8ED] flex">
        {/* Sidebar */}
        <AdminSidebar
          user={user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {children}
        </div>
      </div>
    </AdminSidebarContext.Provider>
  );
}
