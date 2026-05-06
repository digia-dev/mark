import React from 'react';
import { Settings, Mail, Phone, MapPin, User as UserIcon } from 'lucide-react';
import { useProfile } from '../features/auth/hooks/use-auth';

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-40 bg-white rounded-2xl border border-gray-100" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
          <p className="text-gray-500">Tidak dapat memuat profil. Coba refresh halaman atau hubungi administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Profil Saya</h1>
          <p className="text-sm text-gray-500">Kelola informasi profil akun</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-white text-2xl font-black overflow-hidden">
                {user.name ? user.name.split(' ').map(n => n[0]).slice(0,2).join('') : <UserIcon size={36} />}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-black text-gray-900">{user.name || '-'}</h2>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{user.role || '-'}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold text-gray-800">{user.email || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Telepon</p>
                  <p className="text-sm font-bold text-gray-800">{user.phone || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Area / Kota</p>
                  <p className="text-sm font-bold text-gray-800">{(user.area || user.city) || '-'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a href="/settings" className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                <Settings size={14} /> Pengaturan Akun
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 mb-4">Detail Lanjutan</h3>
            <p className="text-sm text-gray-500">Fitur edit profil dan ganti password akan tersedia di halaman Pengaturan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
