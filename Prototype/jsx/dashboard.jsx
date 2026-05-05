import React, { useState } from 'react';
import { 
  Search, Plus, Bell, MessageSquare, ChevronDown, Calendar, RefreshCcw, 
  Users, DollarSign, Briefcase, Activity, AlertTriangle, MoreVertical, 
  Map, Monitor, FileText, Clock, FileInput, Box, BarChart2, Settings,
  CheckCircle2, Square, TrendingUp, TrendingDown, Maximize
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {/* Mock Logo Icon */}
              <div className="relative w-8 h-8">
                <div className="absolute top-0 left-0 w-6 h-6 bg-orange-500 rounded-tl-lg rounded-br-lg transform rotate-45"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-900 rounded-tl-lg rounded-br-lg transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight"><span className="text-orange-500"></span>Mark</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-900 text-white rounded-md font-medium text-sm">
              <Monitor size={18} /> Dashboard
            </a>
            
            <div className="pt-2">
              <button className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Users size={18} /> CRM
                </div>
                <ChevronDown size={16} />
              </button>
              <div className="pl-10 space-y-1 mt-1">
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-900">Customers</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-900">Leads</a>
              </div>
            </div>

            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Map size={18} /> Pipeline
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <FileText size={18} /> Quotation
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Monitor size={18} /> Presentation
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Clock size={18} /> Timeline (Instalasi)
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <AlertTriangle size={18} /> Trouble Ticket
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <FileInput size={18} /> Invoices
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Box size={18} /> Products & Services
            </a>
            
            <div className="pt-2 border-t border-gray-100 mt-2">
              <button className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                <div className="flex items-center gap-3">
                  <BarChart2 size={18} /> Reports
                </div>
                <ChevronDown size={16} />
              </button>
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Bell size={18} /> Notifications
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
              <Activity size={18} /> Activity Logs
            </a>
            <button className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Settings size={18} /> Settings
                </div>
                <ChevronDown size={16} />
              </button>
          </nav>
        </div>

        {/* Target Widget */}
        <div className="p-4 mx-4 mb-6 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center">
          <p className="text-sm font-semibold text-gray-700">Target Bulan Ini</p>
          <p className="text-xs text-gray-500 mb-3">Mei 2025</p>
          
          {/* Circular Progress Mock */}
          <div className="relative w-24 h-24 mb-3">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" strokeWidth="3"
              />
              <path
                className="text-orange-500"
                strokeDasharray="85, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-800">85%</span>
            </div>
          </div>

          <p className="font-bold text-gray-800 text-sm">Rp 850.000.000</p>
          <p className="text-xs text-gray-500 mb-4">dari Rp 1.000.000.000</p>
          <button className="w-full py-1.5 text-xs text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-center gap-1">
            Lihat Detail Target <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center w-full max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari customer, lead, quotation, atau deal..." 
                className="w-full pl-10 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-500 font-mono">
                Ctrl + K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
              <div className="bg-orange-500 text-white rounded-full p-0.5"><Plus size={14}/></div>
              Tambah Cepat
              <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>

            <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">12</span>
              </button>
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <MessageSquare size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pl-2">
              <img src="https://ui-avatars.com/api/?name=Administrator&background=e2e8f0&color=475569" alt="User" className="w-9 h-9 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">Administrator</span>
                <span className="text-xs text-gray-500">Super Admin</span>
              </div>
              <ChevronDown size={16} className="text-gray-400 ml-1" />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Page Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
              <p className="text-sm text-gray-500">Selamat datang kembali, Administrator 👋</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 bg-white rounded-md px-3 py-2 text-sm text-gray-600">
                <span>01 Mei 2025 - 31 Mei 2025</span>
                <Calendar size={16} className="ml-3 text-gray-400" />
              </div>
              
              <div className="flex items-center border border-gray-200 bg-white rounded-md px-3 py-2 text-sm text-gray-600 w-40 justify-between">
                <span>Semua Sales</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>

              <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
                Refresh Data
                <RefreshCcw size={14} />
              </button>
            </div>
          </div>

          {/* Metrics Top Row */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <MetricCard 
              icon={<Users size={20} className="text-blue-600"/>} bg="bg-blue-50"
              title="Total Customers" value="1.248" trend="up" trendValue="12.5%" subtext="Dari bulan lalu 1.108"
            />
            <MetricCard 
              icon={<DollarSign size={20} className="text-orange-600"/>} bg="bg-orange-50"
              title="Revenue (Bulan Ini)" value="Rp 850.000.000" trend="up" trendValue="18.7%" subtext="Dari bulan lalu Rp 716.000.000"
            />
            <MetricCard 
              icon={<Briefcase size={20} className="text-green-600"/>} bg="bg-green-50"
              title="Deals Closing" value="32" trend="up" trendValue="23.1%" subtext="Dari bulan lalu 26"
            />
            <MetricCard 
              icon={<Monitor size={20} className="text-purple-600"/>} bg="bg-purple-50"
              title="Instalasi Aktif" value="18" trend="up" trendValue="5.9%" subtext="Dari bulan lalu 17"
            />
            <MetricCard 
              icon={<AlertTriangle size={20} className="text-red-600"/>} bg="bg-red-50"
              title="Trouble Ticket" value="24" trend="down" trendValue="9.1%" subtext="Belum selesai" isWarning
            />
          </div>

          {/* Row 2: Chart, Funnel, Activities */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Grafik Revenue</h3>
                <div className="flex items-center gap-2">
                  <div className="border border-gray-200 rounded px-2 py-1 flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    Bulanan <ChevronDown size={12}/>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><MoreVertical size={16}/></button>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-blue-900 rounded-full"></div> Revenue (Rp)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 border-b-2 border-dashed border-orange-500"></div> Target (Rp)
                </div>
              </div>

              {/* Mock Line Chart */}
              <div className="relative h-64 w-full mt-4">
                {/* Y Axis Guides */}
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pb-6 pr-4">
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">1.2 M</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">1 M</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">800 Jt</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">600 Jt</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">400 Jt</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">200 Jt</span></div>
                  <div className="flex justify-between border-b border-gray-100 w-full"><span className="-translate-y-2">0</span></div>
                </div>
                
                {/* Lines Area (Simplified SVG Mock) */}
                <div className="absolute inset-0 left-10 bottom-6">
                   <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Target Line (Orange Dashed) */}
                      <path d="M0,80 Q20,70 40,60 T100,50" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4" />
                      {/* Revenue Line (Blue Solid) */}
                      <path d="M0,85 L15,70 L30,55 L45,40 L60,45 L80,45 L100,30" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
                      
                      {/* Dots on Revenue Line */}
                      <circle cx="0" cy="85" r="2" fill="#1e3a8a" />
                      <circle cx="15" cy="70" r="2" fill="#1e3a8a" />
                      <circle cx="30" cy="55" r="2" fill="#1e3a8a" />
                      <circle cx="45" cy="40" r="3" fill="#1e3a8a" stroke="#fff" strokeWidth="1" /> {/* Active point */}
                      <circle cx="60" cy="45" r="2" fill="#1e3a8a" />
                      <circle cx="80" cy="45" r="2" fill="#1e3a8a" />
                      <circle cx="100" cy="30" r="2" fill="#1e3a8a" />
                   </svg>
                   
                   {/* Tooltip Mock */}
                   <div className="absolute top-8 left-[35%] bg-white border border-gray-200 shadow-lg rounded p-2 z-10 w-44">
                     <p className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-1 mb-1">Mei 2025</p>
                     <p className="text-[10px] text-gray-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-900 inline-block"></span> Revenue: Rp 850.000.000</p>
                     <p className="text-[10px] text-gray-600 flex items-center gap-1 mt-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> Target: Rp 1.000.000.000</p>
                   </div>
                </div>

                {/* X Axis */}
                <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-gray-500 font-medium px-2">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span className="text-gray-800 font-bold bg-gray-100 px-1 rounded">Mei</span><span>Jun</span><span>Jul</span><span>Agu</span><span>Sep</span><span>Okt</span><span>Nov</span><span>Des</span>
                </div>
              </div>
            </div>

            {/* Pipeline Funnel */}
            <div className="col-span-12 lg:col-span-3 bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-800">Pipeline Funnel</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                  Semua Pipeline <ChevronDown size={12}/>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center gap-1">
                {/* Funnel Layers */}
                <div className="flex items-center w-full group cursor-pointer">
                  <div className="w-24 text-right pr-4 text-xs">
                    <p className="font-semibold text-gray-700">Prospek</p>
                    <p className="text-gray-400">(214)</p>
                  </div>
                  <div className="h-10 bg-blue-900 text-white flex items-center justify-center text-sm font-bold w-[180px]" style={{clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'}}>214</div>
                </div>
                
                <div className="flex items-center w-full group cursor-pointer">
                  <div className="w-24 text-right pr-4 text-xs">
                    <p className="font-semibold text-gray-700">Negosiasi</p>
                    <p className="text-gray-400">(66)</p>
                  </div>
                  <div className="h-10 bg-blue-600 text-white flex items-center justify-center text-sm font-bold w-[160px]" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'}}>86</div>
                </div>

                <div className="flex items-center w-full group cursor-pointer">
                  <div className="w-24 text-right pr-4 text-xs">
                    <p className="font-semibold text-gray-700">Penawaran</p>
                    <p className="text-gray-400">(54)</p>
                  </div>
                  <div className="h-10 bg-orange-500 text-white flex items-center justify-center text-sm font-bold w-[130px]" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}}>54</div>
                </div>

                <div className="flex items-center w-full group cursor-pointer">
                  <div className="w-24 text-right pr-4 text-xs">
                    <p className="font-semibold text-gray-700">Closing</p>
                    <p className="text-gray-400">(32)</p>
                  </div>
                  <div className="h-10 bg-green-500 text-white flex items-center justify-center text-sm font-bold w-[100px]" style={{clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)'}}>32</div>
                </div>

                <div className="flex items-center w-full group cursor-pointer">
                  <div className="w-24 text-right pr-4 text-xs">
                    <p className="font-semibold text-gray-700">Instalasi</p>
                    <p className="text-gray-400">(18)</p>
                  </div>
                  <div className="h-10 bg-red-500 text-white flex items-center justify-center text-sm font-bold w-[70px]" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'}}>18</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-bold">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="text-gray-800">8,41%</span>
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="col-span-12 lg:col-span-3 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Aktivitas Terbaru</h3>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lihat Semua</a>
              </div>
              
              <div className="space-y-4">
                <ActivityItem 
                  icon={<FileText size={14} className="text-blue-600" />} bg="bg-blue-100"
                  text={<><b>Quotation Q-2025-0520</b> berhasil dibuat oleh Andi Pratama untuk PT Maju Jaya</>}
                  time="20 Mei 2025, 14:30"
                />
                <ActivityItem 
                  icon={<Activity size={14} className="text-green-600" />} bg="bg-green-100"
                  text={<><b>Deal PT Cahaya Teknologi</b> dipindahkan ke stage <b>Closing</b></>}
                  time="20 Mei 2025, 13:45"
                />
                <ActivityItem 
                  icon={<Calendar size={14} className="text-purple-600" />} bg="bg-purple-100"
                  text={<><b>Instalasi</b> untuk <b>Budi Santoso</b> dijadwalkan pada 22 Mei 2025</>}
                  time="20 Mei 2025, 11:20"
                />
                <ActivityItem 
                  icon={<DollarSign size={14} className="text-green-600" />} bg="bg-green-100"
                  text={<><b>Pembayaran</b> untuk INV-2025-0456 sebesar Rp 2.500.000 berhasil</>}
                  time="20 Mei 2025, 10:15"
                />
                <ActivityItem 
                  icon={<AlertTriangle size={14} className="text-red-600" />} bg="bg-red-100"
                  text={<><b>Trouble Ticket TT-2025-0187</b> diperbarui oleh Support Team</>}
                  time="20 Mei 2025, 09:05"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Map, Sales Top 5, Leads */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Map */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Peta Sebaran Customer</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                    Semua Area <ChevronDown size={12}/>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><Maximize size={14}/></button>
                </div>
              </div>
              
              {/* Mock Map Background */}
              <div className="relative w-full h-48 bg-[#dbeafe] rounded-lg overflow-hidden border border-blue-200">
                {/* Decorative Map shapes (Abstract) */}
                <svg className="absolute inset-0 w-full h-full text-blue-200/50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M10,40 Q30,20 50,40 T90,30 L90,80 Q70,90 50,70 T10,80 Z" />
                   <path d="M20,60 Q35,75 55,65" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
                
                {/* Map Controls */}
                <div className="absolute top-2 left-2 flex flex-col bg-white rounded shadow-sm border border-gray-200">
                  <button className="p-1 hover:bg-gray-50 border-b border-gray-200"><Plus size={14} className="text-gray-600"/></button>
                  <button className="p-1 hover:bg-gray-50"><span className="text-gray-600 font-bold text-lg leading-none">-</span></button>
                </div>

                {/* Map Pins */}
                <MapPin top="45%" left="20%" count={12} />
                <MapPin top="35%" left="35%" count={54} />
                <MapPin top="65%" left="40%" count={31} />
                <MapPin top="40%" left="55%" count={31} />
                <MapPin top="60%" left="70%" count={9} />

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1.5 rounded shadow-sm text-[10px] flex items-center gap-3 border border-gray-100">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-300"></span> 1 - 10</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-300"></span> 11 - 30</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> 31 - 50</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {'>'} 50</span>
                </div>
              </div>
            </div>

            {/* Deals by Sales */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Deals by Sales (Top 5)</h3>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lihat Semua</a>
              </div>
              
              <div className="space-y-4">
                <BarItem name="Andi Pratama" count={12} value="Rp 320.000.000" color="bg-blue-900" width="w-[85%]" />
                <BarItem name="Siti Nurhaliza" count={9} value="Rp 210.000.000" color="bg-blue-500" width="w-[65%]" />
                <BarItem name="Rizky Maulana" count={7} value="Rp 160.000.000" color="bg-orange-500" width="w-[50%]" />
                <BarItem name="Dewi Lestari" count={6} value="Rp 110.000.000" color="bg-green-500" width="w-[45%]" />
                <BarItem name="Fajar Ramadhan" count={5} value="Rp 90.000.000" color="bg-red-500" width="w-[35%]" />
              </div>
              
              {/* X Axis */}
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 pl-24 pr-16 border-t border-gray-100 pt-1">
                <span>0</span><span>5</span><span>10</span><span>15</span>
              </div>
            </div>

            {/* Lead Terbaru */}
            <div className="col-span-12 lg:col-span-3 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Lead Terbaru</h3>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lihat Semua</a>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">PD</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">PT Digital Nusantara</p>
                      <p className="text-xs text-gray-500">Internet Dedicated 100 Mbps</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">20 Mei 2025</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">CS</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">CV Sukses Mandiri</p>
                      <p className="text-xs text-gray-500">Corporate Internet</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">20 Mei 2025</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">YC</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">Yayasan Cerdas Bangsa</p>
                      <p className="text-xs text-gray-500">Internet & Hotspot</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">20 Mei 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Pipeline Overview & Tasks */}
          <div className="grid grid-cols-12 gap-6 pb-6">
            
            {/* Pipeline Overview Kanban-style */}
            <div className="col-span-12 lg:col-span-8">
              <h3 className="font-semibold text-gray-800 mb-3">Pipeline Overview</h3>
              <div className="grid grid-cols-5 gap-3">
                
                <KanbanColumn 
                  title="PROSPEK" count="214 Deals" value="Rp 1.120.000.000" color="bg-blue-900"
                  items={[
                    { client: "PT Mitra Sejahtera", sales: "Andi S.", val: "Rp 50.000.000" },
                    { client: "CV Sinar Abadi", sales: "Siti N.", val: "Rp 35.000.000" },
                    { client: "Yayasan Harapan Bangsa", sales: "Rizky M.", val: "Rp 20.000.000" }
                  ]}
                  moreCount={211}
                />
                
                <KanbanColumn 
                  title="NEGOSIASI" count="86 Deals" value="Rp 680.000.000" color="bg-blue-600"
                  items={[
                    { client: "PT Cahaya Teknologi", sales: "Andi S.", val: "Rp 90.000.000" },
                    { client: "CV Berkah Abadi", sales: "Siti N.", val: "Rp 45.000.000" },
                    { client: "PT Global Solusi", sales: "Dewi L.", val: "Rp 40.000.000" }
                  ]}
                  moreCount={83}
                />

                <KanbanColumn 
                  title="PENAWARAN" count="54 Deals" value="Rp 450.000.000" color="bg-orange-500"
                  items={[
                    { client: "PT Maju Jaya", sales: "Andi S.", val: "Rp 80.000.000" },
                    { client: "CV Sukses Mandiri", sales: "Siti N.", val: "Rp 70.000.000" },
                    { client: "PT Digital Nusantara", sales: "Rizky M.", val: "Rp 70.000.000" }
                  ]}
                  moreCount={51}
                />

                <KanbanColumn 
                  title="CLOSING" count="32 Deals" value="Rp 320.000.000" color="bg-green-500"
                  items={[
                    { client: "PT Sejahtera Abadi", sales: "Dewi L.", val: "Rp 70.000.000" },
                    { client: "Yayasan Pendidikan", sales: "Fajar R.", val: "Rp 60.000.000" },
                    { client: "CV Prima Mandiri", sales: "Andi S.", val: "Rp 80.000.000" }
                  ]}
                  moreCount={29}
                />

                <KanbanColumn 
                  title="INSTALASI" count="18 Deals" value="Rp 210.000.000" color="bg-red-500"
                  items={[
                    { client: "Budi Santoso", sales: "Rizky M.", val: "Rp 15.000.000" },
                    { client: "Toko Makmur", sales: "Dewi L.", val: "Rp 10.000.000" },
                    { client: "Kantor Desa Mekar", sales: "Fajar R.", val: "Rp 20.000.000" }
                  ]}
                  moreCount={15}
                />

              </div>
            </div>

            {/* Tugas Mendatang */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-fit mt-8 lg:mt-0">
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Tugas Mendatang</h3>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lihat Semua</a>
              </div>

              <div className="space-y-4">
                <TaskItem 
                  text="Follow up penawaran ke PT Maju Jaya" 
                  time="21 Mei 2025, 10:00" 
                  badge="Andi Pratama" badgeColor="bg-blue-50 text-blue-600"
                  checked={true}
                />
                <TaskItem 
                  text="Presentasi produk ke CV Berkah Abadi" 
                  time="21 Mei 2025, 14:00" 
                  badge="Siti Nurhaliza" badgeColor="bg-orange-50 text-orange-600"
                  checked={false}
                />
                <TaskItem 
                  text="Survey lokasi instalasi di Jl. Melati No. 10" 
                  time="22 Mei 2025, 09:00" 
                  badge="Rizky Maulana" badgeColor="bg-green-50 text-green-600"
                  checked={false}
                />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const MetricCard = ({ icon, bg, title, value, trend, trendValue, subtext, isWarning }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
    <div className={`p-3 rounded-full ${bg} mt-1 shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-xs font-medium mb-1">{title}</p>
      <div className="flex items-end gap-2 mb-1">
        <h2 className="text-xl font-bold text-gray-800 leading-none">{value}</h2>
        {!isWarning && trend && (
          <span className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '▲' : '▼'} {trendValue}
          </span>
        )}
      </div>
      <p className="text-[10px] text-gray-400">{subtext}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon, bg, text, time }) => (
  <div className="flex gap-3 items-start">
    <div className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-700 leading-snug">{text}</p>
      <p className="text-[10px] text-gray-400 mt-1">{time}</p>
    </div>
  </div>
);

const MapPin = ({ top, left, count }) => (
  <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
    <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-[9px] font-bold z-10">
      {count}
    </div>
    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute"></div>
  </div>
);

const BarItem = ({ name, count, value, color, width }) => (
  <div className="flex items-center text-xs">
    <div className="w-24 font-medium text-gray-700 truncate pr-2">{name}</div>
    <div className="flex-1 flex items-center gap-2">
      <div className={`${width} h-5 ${color} rounded-sm relative flex items-center`}>
         <span className="absolute -right-5 font-bold text-gray-700 text-[10px]">{count}</span>
      </div>
    </div>
    <div className="w-24 text-right text-gray-500 text-[10px]">{value}</div>
  </div>
);

const KanbanColumn = ({ title, count, value, color, items, moreCount }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
    <div className={`${color} text-white p-2 text-center`}>
      <h4 className="text-[10px] font-bold tracking-wider">{title}</h4>
      <p className="text-[9px] opacity-90">{count} | {value}</p>
    </div>
    <div className="p-2 space-y-2 flex-1 bg-gray-50/50">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-2 rounded border border-gray-100 text-[9px] shadow-sm">
          <p className="font-semibold text-gray-800 truncate mb-1">{item.client}</p>
          <div className="flex justify-between text-gray-500">
            <span>{item.sales}</span>
            <span className="font-medium text-gray-700">{item.val}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center py-2 border-t border-gray-100 bg-white">
      <span className="text-[10px] text-gray-500 hover:text-blue-600 cursor-pointer">+ {moreCount} deals lainnya</span>
    </div>
  </div>
);

const TaskItem = ({ text, time, badge, badgeColor, checked }) => (
  <div className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <button className={`mt-0.5 ${checked ? 'text-blue-600' : 'text-gray-300 hover:text-gray-400'}`}>
      {checked ? <CheckCircle2 size={16} /> : <Square size={16} />}
    </button>
    <div className="flex-1">
      <p className={`text-xs ${checked ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{text}</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-[10px] text-gray-400">{time}</p>
        <span className={`text-[9px] px-2 py-0.5 rounded ${badgeColor} font-medium`}>{badge}</span>
      </div>
    </div>
  </div>
);

export default Dashboard;