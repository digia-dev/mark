import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Globe, Building2, User, 
  Calendar, CreditCard, Activity, Package, Clock, 
  FileText, Plus, ChevronRight, ExternalLink, MessageSquare 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import SidePanel from '../../../shared/components/SidePanel';
import { useCustomerDetail } from '../hooks/use-customers';

const TabButton = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
      active ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-400 hover:text-gray-600'
    }`}
  >
    {label}
  </button>
);

const Section = ({ title, children, action }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">{title}</h3>
      {action}
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, label, value, color = 'bg-gray-50 text-gray-400' }) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-black text-gray-900 truncate">{value || '-'}</p>
    </div>
  </div>
);

const CustomerDetailPanel = ({ isOpen, onClose, customerId, onEdit }) => {
  const navigate = useNavigate();
  const { data: customer, isLoading } = useCustomerDetail(customerId);
  const [activeTab, setActiveTab] = useState('informasi');

  if (isLoading && isOpen) {
    return (
      <SidePanel isOpen={isOpen} onClose={onClose} title="Detail Customer">
        <div className="p-6 animate-pulse space-y-6">
          <div className="h-20 bg-gray-50 rounded-2xl" />
          <div className="h-64 bg-gray-50 rounded-2xl" />
        </div>
      </SidePanel>
    );
  }

  if (!customer) return null;

  const tabs = [
    { id: 'informasi', label: 'Informasi' },
    { id: 'layanan', label: 'Layanan Aktif' },
    { id: 'keuangan', label: 'Keuangan' },
    { id: 'aktivitas', label: 'Aktivitas' },
    { id: 'dokumen', label: 'Dokumen' },
    { id: 'catatan', label: 'Catatan' }
  ];

  const handleWhatsApp = () => {
    if (!customer?.phone) {
      toast.error('Nomor telepon tidak tersedia');
      return;
    }
    const phone = customer.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <SidePanel 
      isOpen={isOpen} 
      onClose={onClose} 
      title={customer?.customer_code} 
      subtitle={customer?.name}
      footer={
        <div className="flex gap-3">
          <button 
            onClick={() => {
              onEdit(customer);
              onClose();
            }}
            className="flex-1 py-3 bg-blue-900 text-white rounded-xl text-xs font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Edit Profil
          </button>
          <button 
            onClick={handleWhatsApp}
            className="flex-1 py-3 bg-white border border-gray-100 text-gray-700 rounded-xl text-xs font-black hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            Kirim WhatsApp
          </button>
        </div>
      }
    >
      {/* Summary Stats */}
      <div className="px-6 py-4 bg-gray-50/50 grid grid-cols-2 gap-3 border-b border-gray-100">
        <div 
          onClick={() => setActiveTab('layanan')}
          className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all active:scale-95"
        >
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Layanan</p>
          <p className="text-sm font-black text-blue-900">{customer?.customer_services?.length || 0} Aktif</p>
        </div>
        <div 
          onClick={() => setActiveTab('keuangan')}
          className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all active:scale-95"
        >
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Tagihan</p>
          <p className="text-sm font-black text-blue-900">Rp {new Intl.NumberFormat('id-ID').format(customer?.invoices?.reduce((acc, inv) => acc + inv.total, 0) || 0)}</p>
        </div>
        <div 
          onClick={() => setActiveTab('keuangan')}
          className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-orange-200 transition-all active:scale-95"
        >
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Outstanding</p>
          <p className="text-sm font-black text-orange-600">Rp {new Intl.NumberFormat('id-ID').format(customer?.invoices?.filter(i => i.status !== 'paid').reduce((acc, inv) => acc + inv.total, 0) || 0)}</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-not-allowed opacity-60">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tiket Aktif</p>
          <p className="text-sm font-black text-red-600">0 Open</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-100 px-6 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <TabButton 
            key={tab.id} 
            label={tab.label} 
            active={activeTab === tab.id} 
            onClick={() => setActiveTab(tab.id)} 
          />
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'informasi' && (
          <>
            <Section title="Informasi Dasar">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={User} label="Contact Person" value={customer?.contact_person} />
                <InfoItem icon={Building2} label="Sektor" value={customer?.sector} />
                <InfoItem icon={Globe} label="Tipe" value={customer?.type} color="bg-blue-50 text-blue-600" />
                <InfoItem icon={Calendar} label="Status" value={customer?.status} color={customer?.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} />
              </div>
            </Section>

            <Section title="Kontak & Alamat">
              <div className="space-y-4">
                <InfoItem icon={Phone} label="Telepon" value={customer?.phone} />
                <InfoItem icon={Mail} label="Email" value={customer?.email} />
                <InfoItem icon={MapPin} label="Alamat" value={customer?.address} />
                <div className="ml-11 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Kota</p>
                    <p className="text-sm font-black text-gray-900">{customer?.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Area</p>
                    <p className="text-sm font-black text-gray-900">{customer?.area || '-'}</p>
                  </div>
                </div>
              </div>
            </Section>
          </>
        )}

        {activeTab === 'layanan' && (
          <Section 
            title="Layanan Aktif" 
            action={
              <button 
                onClick={() => toast.success('Membuka form layanan baru...')}
                className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest active:scale-95"
              >
                + Tambah
              </button>
            }
          >
            {customer?.customer_services?.length > 0 ? (
              customer.customer_services.map(service => (
                <div key={service.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-black text-gray-900">{service.product?.name}</h4>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black rounded uppercase">{service.status}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[11px] font-bold text-gray-400">Rp {new Intl.NumberFormat('id-ID').format(service.price)} / bln</p>
                    <p className="text-[10px] font-bold text-gray-500 italic">Mulai: {new Date(service.start_date).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Package className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada layanan aktif</p>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'keuangan' && (
          <Section 
            title="Riwayat Keuangan" 
            action={
              <button 
                onClick={() => navigate('/invoices')}
                className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest active:scale-95"
              >
                Semua
              </button>
            }
          >
             {customer?.invoices?.length > 0 ? (
               customer.invoices.map(invoice => (
                 <div 
                   key={invoice.id} 
                   onClick={() => navigate(`/invoices`)}
                   className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all cursor-pointer mb-3 last:mb-0 active:scale-[0.98]"
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                          <FileText size={16} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-gray-900">{invoice.inv_number}</p>
                          <p className="text-[10px] font-bold text-gray-400">{new Date(invoice.invoice_date).toLocaleDateString('id-ID')}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(invoice.total)}</p>
                       <span className={`text-[9px] font-black uppercase ${invoice.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>{invoice.status}</span>
                    </div>
                 </div>
               ))
             ) : (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <CreditCard className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada riwayat tagihan</p>
              </div>
             )}
          </Section>
        )}

        {activeTab === 'aktivitas' && (
          <Section 
            title="Aktivitas & Log" 
            action={
              <button 
                onClick={() => toast.success('Fitur tambah catatan segera hadir')}
                className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest active:scale-95"
              >
                + Catatan
              </button>
            }
          >
             <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {customer?.interactions?.map(log => (
                  <div key={log.id} className="relative pl-10">
                     <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                     </div>
                     <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{log.type}</span>
                           <span className="text-[10px] font-bold text-gray-400">{new Date(log.created_at).toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-700 leading-relaxed mb-3">{log.notes}</p>
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-black text-blue-700 uppercase">
                              {log.creator?.name?.substring(0, 2)}
                           </div>
                           <span className="text-[10px] font-bold text-gray-500">Oleh: {log.creator?.name}</span>
                        </div>
                     </div>
                  </div>
                ))}
                {(!customer?.interactions || customer.interactions.length === 0) && (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Activity className="mx-auto text-gray-300 mb-2" size={24} />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada aktivitas tercatat</p>
                  </div>
                )}
             </div>
          </Section>
        )}

        {(activeTab === 'dokumen' || activeTab === 'catatan') && (
          <div className="p-12 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Clock className="mx-auto text-gray-200 mb-4" size={48} />
            <h3 className="text-sm font-black text-gray-900 mb-1 uppercase tracking-tight">Segera Hadir</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fitur ini sedang dalam pengembangan</p>
          </div>
        )}
      </div>
    </SidePanel>
  );
};

export default CustomerDetailPanel;
