import React from 'react';
import { 
  Search, Plus, Bell, MessageSquare, ChevronDown, 
  Menu, LogOut, User, Settings as SettingsIcon 
} from 'lucide-react';
import useAuthStore from '../../../features/auth/store/auth-store';
import { useLogout } from '../../../features/auth/hooks/use-auth';
import NotificationPanel from '../../../features/notification/components/NotificationPanel';

const Topbar = ({ toggleSidebar, onOpenSearch }) => {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20 relative">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari customer, lead, quotation, atau deal..." 
            onClick={onOpenSearch}
            readOnly
            className="w-full pl-10 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] text-gray-400 font-mono shadow-sm">
            Ctrl + K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Add Button */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-all hover:border-orange-200">
            <div className="bg-orange-500 text-white rounded-full p-0.5"><Plus size={14}/></div>
            <span className="hidden lg:inline">Tambah Cepat</span>
            <ChevronDown size={14} className="ml-1 text-gray-400" />
          </button>
          
          {/* Dropdown Menu (Hidden by default) */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
            {['Customer Baru', 'Lead Baru', 'Deal Baru', 'Quotation', 'Presentation', 'Trouble Ticket', 'Invoice', 'Produk/Service', 'Instalasi'].map((item) => (
              <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications & Messages */}
        <div className="flex items-center gap-1 border-r border-gray-200 pr-4 relative">
          <button 
            className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white"></span>
          </button>
          
          {/* Notification Popover */}
          {isNotifOpen && (
            <div className="absolute top-full mt-4 right-10 z-50">
               <NotificationPanel />
            </div>
          )}

          <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <MessageSquare size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative group pl-2">
          <button className="flex items-center gap-3 p-1 hover:bg-gray-50 rounded-lg transition-all">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1E3A8A&color=fff`} alt="User" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800 leading-tight">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{user?.role || 'Super Admin'}</span>
            </div>
            <ChevronDown size={16} className="text-gray-400 ml-1" />
          </button>

          {/* User Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <User size={16} /> Profil Saya
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <SettingsIcon size={16} /> Pengaturan Akun
            </button>
            <hr className="my-1 border-gray-100" />
            <button 
              onClick={() => logout()}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
