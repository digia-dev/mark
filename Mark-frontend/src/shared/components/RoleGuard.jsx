import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../features/auth/store/auth-store';

const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika tidak ada role user, kembalikan ke login
  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  // Jika array allowedRoles kosong, berarti semua yang login boleh akses
  if (allowedRoles.length === 0) {
    return children;
  }

  // Periksa apakah role user ada di allowedRoles
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    // Return unauthorized UI or redirect
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Akses Ditolak</h2>
        <p className="text-gray-500 max-w-md mb-8 font-medium">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini membutuhkan hak akses khusus.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Kembali
        </button>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
