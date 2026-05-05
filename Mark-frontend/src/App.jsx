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
import QuotationPage from './pages/QuotationPage';
import TimelinePage from './pages/TimelinePage';
import TicketPage from './pages/TicketPage';
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
        <Route path="quotation" element={<QuotationPage />} />
        <Route path="presentation" element={<PresentationPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="tickets" element={<TicketPage />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="reports/*" element={<ReportPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="activities" element={<ActivityLogPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
