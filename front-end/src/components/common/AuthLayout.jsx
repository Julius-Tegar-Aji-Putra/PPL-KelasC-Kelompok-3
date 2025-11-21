import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Outlet />
    </div>
  );
}

export default AuthLayout;