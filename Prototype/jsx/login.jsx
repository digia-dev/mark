import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

// Komponen SVG untuk Ilustrasi Dashboard di sebelah kiri
const DashboardIllustration = () => (
  <svg viewBox="0 0 800 600" className="w-full h-auto max-w-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" floodColor="#000000" floodOpacity="0.08" />
      </filter>
      <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.05" />
      </filter>
      <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>

    {/* Background Blobs */}
    <path d="M100 150 C 200 50, 400 100, 500 200 C 600 300, 550 450, 450 500 C 300 550, 150 450, 100 350 Z" fill="#e0e7ff" opacity="0.4" />
    <path d="M700 450 C 800 400, 750 250, 650 200 C 550 150, 400 200, 350 300 C 300 400, 450 550, 550 550 Z" fill="#ffedd5" opacity="0.5" />

    {/* Main Dashboard Card */}
    <g filter="url(#shadow)">
      <rect x="100" y="120" width="600" height="380" rx="20" fill="white" />

      {/* Sidebar */}
      <rect x="100" y="120" width="120" height="380" rx="20" fill="#f8fafc" />
      {/* Sidebar Logo area */}
      <rect x="120" y="140" width="80" height="30" rx="8" fill="#e2e8f0" />
      {/* Sidebar Items */}
      <rect x="115" y="190" width="90" height="24" rx="6" fill="#0f172a" />
      <rect x="115" y="230" width="90" height="24" rx="6" fill="#e2e8f0" opacity="0.5" />
      <rect x="115" y="270" width="90" height="24" rx="6" fill="#e2e8f0" opacity="0.5" />
      <rect x="115" y="310" width="90" height="24" rx="6" fill="#e2e8f0" opacity="0.5" />
      <rect x="115" y="350" width="90" height="24" rx="6" fill="#e2e8f0" opacity="0.5" />

      {/* Top Stat Cards */}
      <g transform="translate(240, 140)">
        <rect x="0" y="0" width="100" height="60" rx="10" fill="#f8fafc" />
        <circle cx="20" cy="30" r="12" fill="#dbeafe" />
        <rect x="40" y="20" width="40" height="8" rx="4" fill="#cbd5e1" />
        <rect x="40" y="36" width="30" height="6" rx="3" fill="#94a3b8" />

        <rect x="115" y="0" width="100" height="60" rx="10" fill="#f8fafc" />
        <circle cx="135" cy="30" r="12" fill="#ffedd5" />
        <rect x="155" y="20" width="50" height="8" rx="4" fill="#cbd5e1" />
        <rect x="155" y="36" width="35" height="6" rx="3" fill="#94a3b8" />

        <rect x="230" y="0" width="100" height="60" rx="10" fill="#f8fafc" />
        <circle cx="250" cy="30" r="12" fill="#dcfce7" />
        <rect x="270" y="20" width="35" height="8" rx="4" fill="#cbd5e1" />
        <rect x="270" y="36" width="25" height="6" rx="3" fill="#94a3b8" />

        <rect x="345" y="0" width="100" height="60" rx="10" fill="#f8fafc" />
        <circle cx="365" cy="30" r="12" fill="#f3e8ff" />
        <rect x="385" y="20" width="40" height="8" rx="4" fill="#cbd5e1" />
        <rect x="385" y="36" width="30" height="6" rx="3" fill="#94a3b8" />
      </g>

      {/* Line Chart Area */}
      <g transform="translate(240, 220)">
        <rect x="0" y="0" width="215" height="180" rx="10" fill="#f8fafc" />
        <text x="15" y="25" fill="#64748b" fontSize="12" fontWeight="bold">Grafik Revenue</text>
        {/* Grid lines */}
        <line x1="15" y1="50" x2="200" y2="50" stroke="#e2e8f0" strokeDasharray="4 4" />
        <line x1="15" y1="90" x2="200" y2="90" stroke="#e2e8f0" strokeDasharray="4 4" />
        <line x1="15" y1="130" x2="200" y2="130" stroke="#e2e8f0" strokeDasharray="4 4" />
        <line x1="15" y1="170" x2="200" y2="170" stroke="#e2e8f0" />

        {/* Lines */}
        <path d="M 20 150 Q 60 120, 100 130 T 180 80" stroke="#3b82f6" strokeWidth="3" fill="none" />
        <circle cx="20" cy="150" r="4" fill="#3b82f6" />
        <circle cx="100" cy="130" r="4" fill="#3b82f6" />
        <circle cx="180" cy="80" r="4" fill="#3b82f6" />

        <path d="M 20 130 Q 60 100, 100 80 T 180 40" stroke="#f97316" strokeWidth="3" fill="none" strokeDasharray="4 4" />
        <circle cx="20" cy="130" r="4" fill="#f97316" />
        <circle cx="100" cy="80" r="4" fill="#f97316" />
        <circle cx="180" cy="40" r="4" fill="#f97316" />
      </g>

      {/* Funnel Chart Area */}
      <g transform="translate(470, 220)">
        <rect x="0" y="0" width="210" height="250" rx="10" fill="#f8fafc" />
        <text x="15" y="25" fill="#64748b" fontSize="12" fontWeight="bold">Pipeline Funnel</text>

        {/* Funnel Shapes */}
        <polygon points="50,50 160,50 150,80 60,80" fill="#0f172a" />
        <text x="105" y="70" fill="white" fontSize="10" textAnchor="middle">214</text>

        <polygon points="60,85 150,85 140,115 70,115" fill="#3b82f6" />
        <text x="105" y="105" fill="white" fontSize="10" textAnchor="middle">86</text>

        <polygon points="70,120 140,120 130,150 80,150" fill="#f97316" />
        <text x="105" y="140" fill="white" fontSize="10" textAnchor="middle">54</text>

        <polygon points="80,155 130,155 120,185 90,185" fill="#22c55e" />
        <text x="105" y="175" fill="white" fontSize="10" textAnchor="middle">32</text>

        <polygon points="90,190 120,190 115,220 95,220" fill="#ef4444" />
        <text x="105" y="210" fill="white" fontSize="10" textAnchor="middle">18</text>
      </g>
    </g>

    {/* Floating Element: Top Right Pie Chart */}
    <g transform="translate(560, 60)" filter="url(#soft-shadow)">
      <rect width="60" height="60" rx="16" fill="#e0e7ff" />
      <path d="M30 15 A 15 15 0 0 1 45 30 L 30 30 Z" fill="#6366f1" />
      <path d="M45 30 A 15 15 0 1 1 30 15 L 30 30 Z" fill="#a5b4fc" />
    </g>

    {/* Floating Element: Bottom Left Users */}
    <g transform="translate(40, 430)" filter="url(#soft-shadow)">
      <rect width="70" height="70" rx="16" fill="#dcfce7" />
      <circle cx="35" cy="25" r="8" fill="#22c55e" />
      <path d="M 20 50 C 20 40, 50 40, 50 50" fill="#22c55e" />
      <circle cx="50" cy="30" r="6" fill="#86efac" />
      <path d="M 40 50 C 40 43, 60 43, 60 50" fill="#86efac" />
    </g>

    {/* Floating Element: Bottom Right Chart Arrow */}
    <g transform="translate(580, 480)" filter="url(#soft-shadow)">
      <rect width="60" height="60" rx="16" fill="#ffedd5" />
      <path d="M15 45 L 25 30 L 35 35 L 45 15" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 15 L 45 15 L 45 25" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Floating Element: Top Left Bar Chart */}
    <g transform="translate(50, 180)" filter="url(#soft-shadow)">
      <rect width="60" height="60" rx="16" fill="#ffedd5" />
      <rect x="15" y="30" width="8" height="15" rx="2" fill="#fdba74" />
      <rect x="26" y="20" width="8" height="25" rx="2" fill="#f97316" />
      <rect x="37" y="10" width="8" height="35" rx="2" fill="#ea580c" />
    </g>

  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-4 lg:p-8 font-sans text-slate-800">
      <div className="max-w-[1300px] w-full flex flex-col xl:flex-row items-center gap-12 xl:gap-20">

        {/* --- Bagian Kiri: Teks & Ilustrasi --- */}
        <div className="flex-1 w-full max-w-2xl xl:max-w-none relative z-10 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6 xl:mb-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 24L12 8L16 18L20 8L26 24" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear" x1="6" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">mark</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-bold leading-[1.15] text-[#0f172a] mb-4 xl:mb-6">
            Kelola Penjualan.<br />
            Pantau Pipeline.<br />
            Dapat <span className="text-[#f97316]">Lebih Banyak Deal.</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[480px] mb-8">
            Mark membantu tim sales dan manajemen untuk mengelola prospek, pipeline, aktivitas, hingga laporan dalam satu sistem yang mudah digunakan.
          </p>

          {/* Ilustrasi SVG */}
          <div className="relative w-full max-w-[500px] xl:max-w-[600px] -ml-4 md:-ml-8 pointer-events-none mt-auto">
            <DashboardIllustration />
          </div>
        </div>

        {/* --- Bagian Kanan: Form Login --- */}
        <div className="w-full max-w-[520px] shrink-0 relative z-20">
          <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">

            {/* Header Form */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">
              Selamat Datang Kembali! <span className="inline-block origin-bottom-right animate-wave">👋</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mb-8">
              Silakan masuk untuk melanjutkan ke akun Anda
            </p>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

              {/* Input Email/Username */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0f172a] block">
                  Email atau Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                    placeholder="Masukkan email atau username"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0f172a] block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500/20 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                  Lupa password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0B1B3D] hover:bg-[#152a55] text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <LogIn className="h-5 w-5" />
                Masuk
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative px-4 bg-white text-sm text-slate-400">
                atau masuk dengan
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022" />
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00" />
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF" />
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Microsoft</span>
              </button>
            </div>

            {/* Footer Form */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Belum punya akun? <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">Daftar sekarang</a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}