import React, { useState, useEffect } from 'react';
import { Building2, Users, MapPin, Box, Sliders, Target, Search, Save, Settings as SettingsIcon, Loader2, Plus } from 'lucide-react';
import { useCompanyProfile, useUpdateCompanyProfile, useUsers } from '../features/setting/hooks/use-settings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil Perusahaan', icon: Building2 },
    { id: 'users', label: 'Manajemen User', icon: Users },
    { id: 'branches', label: 'Cabang & Area', icon: MapPin },
    { id: 'products', label: 'Produk & Layanan', icon: Box },
    { id: 'preferences', label: 'Preferensi Aplikasi', icon: Sliders },
    { id: 'targets', label: 'Target Penjualan', icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="text-blue-900" size={32} />
            Pengaturan Sistem
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">
            Konfigurasi utama Mark ISP Management
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Menu */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${
                  isActive 
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm min-h-[600px]">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'targets' && <TargetSettings />}
          {activeTab !== 'profile' && activeTab !== 'users' && activeTab !== 'targets' && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-6 border border-gray-100">
                <SettingsIcon size={40} className="animate-spin-slow" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Modul Sedang Dikembangkan</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest max-w-sm">
                Pengaturan untuk bagian ini akan segera tersedia di pembaruan selanjutnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const { data: usersResponse, isLoading } = useUsers();
  const users = usersResponse?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Manajemen User</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Kelola akses dan hak istimewa pengguna</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          <Plus size={14} />
          Tambah User
        </button>
      </div>

      <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama & Email</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="4" className="h-16 px-6 bg-gray-50/30"></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-bold">Tidak ada user ditemukan</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900">{user.name}</span>
                      <span className="text-[10px] font-bold text-gray-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      user.role === 'super-admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      user.role === 'admin' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Edit Access</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { data: profileResponse, isLoading } = useCompanyProfile();
  const updateMutation = useUpdateCompanyProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    tax_id: ''
  });

  useEffect(() => {
    if (profileResponse?.data) {
      setFormData({
        name: profileResponse.data.name || '',
        address: profileResponse.data.address || '',
        phone: profileResponse.data.phone || '',
        email: profileResponse.data.email || '',
        website: profileResponse.data.website || '',
        tax_id: profileResponse.data.tax_id || ''
      });
    }
  }, [profileResponse]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateMutation.mutateAsync(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-900" size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Profil Perusahaan</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Informasi utama identitas ISP</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Nama Perusahaan</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-900 outline-none transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">NPWP Perusahaan</label>
            <input 
              type="text" 
              value={formData.tax_id}
              onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-900 outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Alamat Pusat</label>
            <textarea 
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-900 outline-none transition-colors h-24 resize-none"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Logo Perusahaan</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl h-40 flex flex-col items-center justify-center text-gray-400 hover:border-blue-900 hover:text-blue-900 hover:bg-blue-50/50 transition-all cursor-pointer overflow-hidden">
              {profileResponse?.data?.logo_url ? (
                <img src={profileResponse.data.logo_url} alt="Logo" className="h-full w-full object-contain p-4" />
              ) : (
                <>
                  <Building2 size={32} className="mb-3" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Klik untuk unggah logo</p>
                  <p className="text-[9px] font-bold mt-1">PNG, JPG (Max. 2MB)</p>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Email Resmi</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-900 outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Nomor Telepon</label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-900 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <button 
          type="submit"
          disabled={updateMutation.isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all disabled:opacity-50"
        >
          {updateMutation.isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

const TargetSettings = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Pengaturan Target Sales</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Target pendapatan bulanan per cabang</p>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <select className="border-2 border-gray-100 rounded-xl px-4 py-2 text-xs font-black text-gray-900 outline-none focus:border-blue-900 transition-colors uppercase tracking-widest">
            <option>Tahun 2025</option>
            <option>Tahun 2024</option>
          </select>
          <select className="border-2 border-gray-100 rounded-xl px-4 py-2 text-xs font-black text-gray-900 outline-none focus:border-blue-900 transition-colors uppercase tracking-widest">
            <option>Semua Cabang</option>
            <option>Jakarta Selatan (Pusat)</option>
            <option>Tangerang</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((month, index) => (
            <div key={month} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2 group focus-within:border-orange-500 transition-colors">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{month}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                <input 
                  type="text" 
                  defaultValue={index < 5 ? "1.000.000.000" : "0"}
                  className="w-full bg-transparent border-none pl-9 py-1 text-sm font-black text-gray-900 outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">
            <Save size={16} />
            Simpan Target
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
