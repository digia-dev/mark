import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  Users, 
  Monitor, 
  Calendar, 
  BarChart2, 
  Shield, 
  Smile, 
  Users2, 
  Layers, 
  Star, 
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// --- KOMPONEN SVG KUSTOM ---

const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 24L12 8L16 18L20 8L26 24" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
    </defs>
  </svg>
);

const LaptopIllustration = () => (
  <svg viewBox="0 0 1000 650" className="w-full h-auto drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="laptop-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" floodColor="#000000" floodOpacity="0.15" />
      </filter>
      <filter id="inner-shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="#000000" floodOpacity="0.05" />
      </filter>
    </defs>

    {/* Backdrop Blob */}
    <path d="M200 100 C 500 -50, 800 100, 900 300 C 1000 500, 700 600, 500 600 C 200 600, 0 500, 50 300 Z" fill="#e0e7ff" opacity="0.3" className="animate-pulse duration-3000" />

    <g filter="url(#laptop-shadow)">
      {/* Laptop Lid (Bezel) */}
      <rect x="100" y="50" width="800" height="500" rx="20" fill="#1e293b" />
      
      {/* Laptop Screen */}
      <rect x="115" y="65" width="770" height="465" rx="8" fill="#ffffff" />
      
      {/* Camera */}
      <circle cx="500" cy="57" r="3" fill="#0f172a" />

      {/* --- DASHBOARD UI INSIDE SCREEN --- */}
      <g transform="translate(115, 65)">
        {/* Sidebar */}
        <rect x="0" y="0" width="140" height="465" rx="8" fill="#f8fafc" />
        <path d="M 0 8 L 140 8 L 140 465 L 0 465 Z" fill="#f8fafc" />
        
        {/* Sidebar Logo */}
        <rect x="20" y="20" width="80" height="24" rx="4" fill="#e2e8f0" />
        
        {/* Sidebar Menu Items */}
        <rect x="15" y="70" width="110" height="28" rx="6" fill="#0f172a" />
        <rect x="15" y="110" width="90" height="20" rx="4" fill="#e2e8f0" />
        <rect x="15" y="140" width="100" height="20" rx="4" fill="#e2e8f0" />
        <rect x="15" y="170" width="85" height="20" rx="4" fill="#e2e8f0" />
        <rect x="15" y="200" width="95" height="20" rx="4" fill="#e2e8f0" />
        <rect x="15" y="230" width="80" height="20" rx="4" fill="#e2e8f0" />

        {/* Top Navbar */}
        <rect x="140" y="0" width="630" height="50" fill="#ffffff" />
        <line x1="140" y1="50" x2="770" y2="50" stroke="#f1f5f9" strokeWidth="2" />
        <rect x="160" y="15" width="300" height="20" rx="10" fill="#f1f5f9" />
        <circle cx="700" cy="25" r="12" fill="#e2e8f0" />

        {/* Dashboard Content */}
        <g transform="translate(160, 70)">
          <text x="0" y="15" fill="#0f172a" fontSize="18" fontWeight="bold" fontFamily="sans-serif">Dashboard</text>
          
          {/* Stat Cards */}
          <g transform="translate(0, 40)">
            <rect x="0" y="0" width="140" height="70" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <circle cx="25" cy="35" r="12" fill="#dbeafe" />
            <rect x="45" y="20" width="50" height="10" rx="4" fill="#94a3b8" />
            <rect x="45" y="40" width="70" height="8" rx="4" fill="#cbd5e1" />

            <rect x="155" y="0" width="140" height="70" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <circle cx="180" cy="35" r="12" fill="#ffedd5" />
            <rect x="200" y="20" width="60" height="10" rx="4" fill="#94a3b8" />
            <rect x="200" y="40" width="50" height="8" rx="4" fill="#cbd5e1" />

            <rect x="310" y="0" width="140" height="70" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <circle cx="335" cy="35" r="12" fill="#dcfce7" />
            <rect x="355" y="20" width="40" height="10" rx="4" fill="#94a3b8" />
            <rect x="355" y="40" width="80" height="8" rx="4" fill="#cbd5e1" />

            <rect x="465" y="0" width="125" height="70" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <circle cx="490" cy="35" r="12" fill="#f3e8ff" />
            <rect x="510" y="20" width="55" height="10" rx="4" fill="#94a3b8" />
            <rect x="510" y="40" width="40" height="8" rx="4" fill="#cbd5e1" />
          </g>

          {/* Charts Area */}
          <g transform="translate(0, 130)">
            <rect x="0" y="0" width="280" height="180" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <text x="15" y="25" fill="#64748b" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Grafik Revenue</text>
            <path d="M 20 150 Q 100 130, 150 100 T 260 50" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <path d="M 20 120 Q 100 90, 150 70 T 260 30" stroke="#f97316" strokeWidth="3" fill="none" strokeDasharray="4 4" />
            
            <rect x="295" y="0" width="295" height="180" rx="8" fill="#ffffff" filter="url(#inner-shadow)" />
            <text x="310" y="25" fill="#64748b" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Pipeline Funnel</text>
            <polygon points="360,50 530,50 510,75 380,75" fill="#0f172a" />
            <polygon points="380,80 510,80 490,105 400,105" fill="#3b82f6" />
            <polygon points="400,110 490,110 470,135 420,135" fill="#f97316" />
            <polygon points="420,140 470,140 455,165 435,165" fill="#22c55e" />
          </g>
        </g>
      </g>
      
      <path d="M40 550 L 960 550 L 990 575 C 995 580, 990 585, 980 585 L 20 585 C 10 585, 5 580, 10 575 Z" fill="#cbd5e1" />
      <path d="M450 550 L 550 550 L 555 555 L 445 555 Z" fill="#94a3b8" />
      <path d="M20 585 L 980 585 C 985 585, 985 590, 980 590 L 20 590 C 15 590, 15 585, 20 585 Z" fill="#94a3b8" />
    </g>
  </svg>
);

const CompanyLogos = () => (
  <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg><span className="font-bold text-xl tracking-tight">sinergi</span></div>
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg><span className="font-bold text-xl tracking-tight">Cahaya</span></div>
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg><span className="font-bold text-xl tracking-tight uppercase">Maju Jaya</span></div>
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg><span className="font-bold text-xl tracking-tight uppercase">Nusantara</span></div>
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3zM21 3l-18 18M3 3l18 18"/></svg><span className="font-bold text-xl tracking-tight uppercase">Prima</span></div>
    <div className="flex items-center gap-2 hover:scale-105 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/></svg><span className="font-bold text-xl tracking-widest uppercase">Inovasi</span></div>
  </div>
);

const AvatarMale1 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#e2e8f0"/>
    <circle cx="24" cy="18" r="8" fill="#94a3b8"/>
    <path d="M10 40C10 32.268 16.268 26 24 26C31.732 26 38 32.268 38 40V48H10V40Z" fill="#94a3b8"/>
  </svg>
);

const AvatarFemale = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#ffedd5"/>
    <circle cx="24" cy="18" r="7" fill="#fdba74"/>
    <path d="M12 40C12 33.3726 17.3726 28 24 28C30.6274 28 36 33.3726 36 40V48H12V40Z" fill="#fdba74"/>
  </svg>
);

const CTAGraphic = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full max-w-[300px] overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="260" height="160" rx="16" fill="white" className="drop-shadow-xl" />
    <circle cx="240" cy="50" r="15" fill="#f97316" />
    <rect x="40" y="40" width="100" height="12" rx="6" fill="#e2e8f0" />
    <rect x="40" y="60" width="60" height="8" rx="4" fill="#cbd5e1" />
    <path d="M 40 140 Q 90 100, 140 120 T 260 80" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="260" cy="80" r="6" fill="#3b82f6" className="drop-shadow-md" />
    
    <g>
      <animateTransform attributeName="transform" type="translate" values="-10,80; -10,65; -10,80" dur="3s" repeatCount="indefinite" />
      <circle cx="20" cy="20" r="25" fill="#ffedd5" className="drop-shadow-lg" />
      <path d="M20 5 A 15 15 0 0 1 35 20 L 20 20 Z" fill="#f97316" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="230,120; 230,105; 230,120" dur="4s" repeatCount="indefinite" />
      <circle cx="20" cy="20" r="25" fill="#e0e7ff" className="drop-shadow-lg" />
      <path d="M20 5 A 15 15 0 1 1 5 20 L 20 20 Z" fill="#3b82f6" />
    </g>
    <g>
       <animateTransform attributeName="transform" type="translate" values="50,150; 50,135; 50,150" dur="3.5s" repeatCount="indefinite" />
       <rect width="40" height="40" rx="10" fill="#dcfce7" className="drop-shadow-lg" />
       <rect x="10" y="20" width="6" height="10" rx="2" fill="#22c55e" />
       <rect x="24" y="10" width="6" height="20" rx="2" fill="#22c55e" />
    </g>
  </svg>
);

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1' : 'bg-white/80 backdrop-blur-md py-3 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <LogoMark />
              <span className="text-2xl font-bold text-slate-900 tracking-tight">mark</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors">Produk <ChevronRight className="w-4 h-4 rotate-90"/></a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Fitur</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Harga</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Tentang Kami</a>
            </div>

            {/* Buttons & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 border border-slate-200 rounded-lg hover:border-blue-600 transition-colors">
                  Masuk
                </Link>
                <Link to="/login" className="text-sm font-semibold text-white bg-[#0B1B3D] hover:bg-[#152a55] px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                  Coba Gratis
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col px-4 py-6 space-y-4">
              <a href="#" className="text-base font-semibold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Produk</a>
              <a href="#" className="text-base font-semibold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Fitur</a>
              <a href="#" className="text-base font-semibold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Harga</a>
              <a href="#" className="text-base font-semibold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Tentang Kami</a>
              <div className="h-px bg-slate-100 my-2"></div>
              <Link to="/login" className="w-full text-center text-base font-semibold text-slate-700 px-4 py-3 border border-slate-200 rounded-xl hover:border-blue-600 transition-colors">
                Masuk
              </Link>
              <Link to="/login" className="w-full text-center text-base font-semibold text-white bg-[#0B1B3D] hover:bg-[#152a55] px-4 py-3 rounded-xl shadow-md transition-colors">
                Coba Gratis
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 min-h-[90vh] flex items-center overflow-hidden relative">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-linear-to-b from-blue-50/50 to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* Hero Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-blue-700 text-sm font-bold mb-6 border border-blue-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Satu platform untuk seluruh proses penjualan
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight">
                Kelola Penjualan.<br />
                Pantau Pipeline.<br />
                Dapat <span className="text-[#f97316] relative inline-block">
                  Lebih Banyak Deal.
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Mark membantu tim sales dan manajemen untuk mengelola prospek, pipeline, aktivitas, hingga laporan dalam satu sistem yang mudah digunakan.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0B1B3D] hover:bg-[#152a55] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1">
                  Coba Gratis 14 Hari <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
                  <Play className="w-5 h-5 text-slate-400" /> Lihat Demo
                </button>
              </div>

              {/* Small Features Grid */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700 font-bold">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><Users className="w-5 h-5" /></div>
                  Kelola prospek <br/>dengan mudah
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700"><Monitor className="w-5 h-5" /></div>
                  Pantau pipeline <br/>secara real-time
                </div>
              </div>
            </div>

            {/* Hero Image / Laptop SVG */}
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 flex justify-center">
              <div className="w-full max-w-[600px] xl:max-w-[700px]">
                <LaptopIllustration />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="py-12 border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in zoom-in duration-700">
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest">Dipercaya oleh perusahaan dari berbagai industri</p>
          <CompanyLogos />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-3 block">Fitur Unggulan</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Semua yang Anda Butuhkan<br/>untuk Penjualan yang Lebih Efektif
              </h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 hover:gap-3 transition-all">
              Lihat semua fitur <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 relative">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {/* Feature 1 */}
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Kelola Prospek</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Kumpulkan dan kelola prospek dari berbagai sumber dalam satu tempat terpusat.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pipeline Visual</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Pantau setiap tahap penjualan dengan tampilan pipeline yang intuitif dan interaktif.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Aktivitas Terjadwal</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Jadwalkan aktivitas follow up, meeting, hingga reminder agar tidak ada yang terlewat.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <BarChart2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Laporan & Analitik</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Dapatkan insight penjualan secara real-time untuk keputusan bisnis yang lebih tepat.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHY MARK SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            
            <div className="w-full lg:w-1/3">
              <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-3 block">Mengapa Mark?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Dirancang untuk Tim Sales yang Ingin Bertumbuh
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Platform kami tidak sekadar mencatat data, tetapi dirancang secara khusus untuk mendorong produktivitas dan kolaborasi antar tim.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 hover:gap-3 transition-all">
                Pelajari selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Smile className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Mudah Digunakan</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Antarmuka yang sederhana dan intuitif, siap digunakan tanpa pelatihan rumit.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <Users2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Kolaborasi Tim</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Bekerja sama lebih efektif dengan tim dalam satu platform terintegrasi.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Fleksibel & Skalabel</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Dapat disesuaikan dengan kebutuhan bisnis dan tumbuh bersama Anda.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-linear-to-br from-[#0B1B3D] to-blue-900 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center relative shadow-2xl">
          
          {/* Abstract Graphic */}
          <div className="w-full md:w-2/5 p-8 flex justify-center md:justify-start">
             <CTAGraphic />
          </div>

          {/* Text & Buttons */}
          <div className="w-full md:w-3/5 p-8 md:p-16 text-center md:text-left z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Siap Tingkatkan Penjualan Anda?
            </h2>
            <p className="text-blue-100 mb-10 max-w-lg mx-auto md:mx-0 text-lg">
              Bergabunglah dengan ribuan perusahaan yang telah merasakan manfaat Mark.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/login" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Coba Gratis 14 Hari <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-blue-900/50 border border-blue-400/50 text-white hover:bg-blue-800/50 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
                Hubungi Sales
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            
            {/* Brand Col */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <LogoMark />
                <span className="text-2xl font-bold text-slate-900 tracking-tight">mark</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm font-medium">
                Mark adalah platform sales & management system yang membantu bisnis mengelola penjualan, pipeline, dan aktivitas dalam satu sistem terintegrasi.
              </p>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="p-2 bg-slate-50 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg hover:text-pink-600 hover:bg-pink-50 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.996,15.005l0-6.01L15.224,12L9.996,15.005z"/></svg></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg hover:text-blue-800 hover:bg-blue-50 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Produk</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Integrasi</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Update</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Sumber Daya</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Video</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kontak</a></li>
              </ul>
            </div>

            {/* Newsletter Col */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-slate-900 mb-6">Siap Memulai?</h4>
              <Link to="/login" className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#0B1B3D] text-white rounded-xl hover:bg-[#152a55] transition-all font-bold shadow-lg shadow-blue-900/20 hover:-translate-y-0.5">
                Coba Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
            <p>© 2026 Mark. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
