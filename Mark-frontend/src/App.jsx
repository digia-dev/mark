import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './shared/components/layout/MainLayout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import LeadPage from './pages/LeadPage';
import PipelinePage from './pages/PipelinePage';

const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold text-red-600">403 - Unauthorized Access</h1>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold text-gray-800">404</h1>
    <p className="text-gray-500">Halaman tidak ditemukan</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes inside MainLayout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* CRM Module */}
        <Route path="crm/customers" element={<CustomerPage />} />
        <Route path="crm/leads" element={<LeadPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="quotation" element={<div className="p-4"><h1>Quotation Module</h1><p>Coming Soon</p></div>} />
        <Route path="presentation" element={<div className="p-4"><h1>Presentation Module</h1><p>Coming Soon</p></div>} />
        <Route path="timeline" element={<div className="p-4"><h1>Timeline Module</h1><p>Coming Soon</p></div>} />
        <Route path="tickets" element={<div className="p-4"><h1>Trouble Ticket Module</h1><p>Coming Soon</p></div>} />
        <Route path="invoices" element={<div className="p-4"><h1>Invoices Module</h1><p>Coming Soon</p></div>} />
        <Route path="products" element={<ProductPage />} />
        <Route path="reports/*" element={<div className="p-4"><h1>Reports Module</h1><p>Coming Soon</p></div>} />
        <Route path="notifications" element={<div className="p-4"><h1>Notifications</h1><p>Coming Soon</p></div>} />
        <Route path="activities" element={<div className="p-4"><h1>Activity Logs</h1><p>Coming Soon</p></div>} />
        <Route path="settings/*" element={<div className="p-4"><h1>Settings</h1><p>Coming Soon</p></div>} />
        
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
