import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import MainLayout from './shared/components/layout/MainLayout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import RoleGuard from './shared/components/RoleGuard';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import LeadPage from './pages/LeadPage';
import PipelinePage from './pages/PipelinePage';
import QuotationPage from './pages/QuotationPage';
import TimelinePage from './pages/TimelinePage';
import TroubleTicketPage from './pages/TroubleTicketPage';
import InvoicePage from './pages/InvoicePage';
import PresentationPage from './pages/PresentationPage';
import ReportPage from './pages/ReportPage';
import NotificationPage from './pages/NotificationPage';
import ActivityLogPage from './pages/ActivityLogPage';
import SettingsPage from './pages/SettingsPage';

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
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes inside MainLayout */}
      <Route 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* CRM Module */}
        <Route path="crm/customers" element={<CustomerPage />} />
        <Route path="crm/leads" element={<LeadPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="quotation" element={<QuotationPage />} />
        <Route path="presentation" element={<PresentationPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="trouble-ticket" element={<TroubleTicketPage />} />
        <Route path="invoice" element={<InvoicePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route 
          path="reports/*" 
          element={
            <RoleGuard allowedRoles={['super-admin', 'admin', 'sales']}>
              <ReportPage />
            </RoleGuard>
          } 
        />
        <Route path="notifications" element={<NotificationPage />} />
        <Route 
          path="activity-logs" 
          element={
            <RoleGuard allowedRoles={['super-admin', 'admin']}>
              <ActivityLogPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="settings/*" 
          element={
            <RoleGuard allowedRoles={['super-admin', 'admin']}>
              <SettingsPage />
            </RoleGuard>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
