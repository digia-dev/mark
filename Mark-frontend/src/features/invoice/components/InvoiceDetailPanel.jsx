import React, { useState } from 'react';
import { X, Calendar, DollarSign, FileText, User, CreditCard, ChevronRight, Download, Send, Tag, AlertCircle, Building, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const InvoiceDetailPanel = ({ invoice, onClose, onRecordPayment }) => {
  const [activeTab, setActiveTab] = useState('detail');

  if (!invoice) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd MMM yyyy', { locale: id });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-100 rounded-full border border-green-200">Lunas</span>;
      case 'partial':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-100 rounded-full border border-blue-200">Dibayar Sebagian</span>;
      case 'unpaid':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-100 rounded-full border border-orange-200">Belum Dibayar</span>;
      case 'overdue':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-red-700 bg-red-100 rounded-full border border-red-200">Jatuh Tempo</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full border border-gray-200">Draft</span>;
    }
  };

  const remainingBalance = (invoice.total || 0) - (invoice.paid_amount || 0);

  const tabs = [
    { id: 'detail', label: 'Detail' },
    { id: 'items', label: 'Item Tagihan' },
    { id: 'payments', label: 'Pembayaran' },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-gray-50 shadow-2xl z-40 transform transition-transform flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
            <X size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-gray-900">{invoice.invoice_number || 'New Invoice'}</h2>
              {getStatusBadge(invoice.status)}
            </div>
            <p className="text-xs font-semibold text-gray-500 flex items-center gap-1 mt-0.5">
              <Building size={12} /> {invoice.customer?.name || '-'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Unduh PDF">
            <Download size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Kirim ke Pelanggan">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto relative">
        {/* WATERMARK */}
        {invoice.status === 'paid' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-5">
            <div className="transform -rotate-45 text-[150px] font-black text-green-900 tracking-widest select-none">
              LUNAS
            </div>
          </div>
        )}

        <div className="p-6 space-y-6 relative z-10">
          
          {/* Quick Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Tagihan</p>
              <p className="text-lg font-black text-gray-900">{formatCurrency(invoice.total)}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Sudah Dibayar</p>
              <p className="text-lg font-black text-green-700">{formatCurrency(invoice.paid_amount)}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm md:col-span-2 bg-blue-50/50 border-blue-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Sisa Tagihan</p>
                  <p className="text-2xl font-black text-blue-900">{formatCurrency(remainingBalance)}</p>
                </div>
                {invoice.status !== 'paid' && (
                  <button 
                    onClick={() => onRecordPayment(invoice)}
                    className="px-3 py-1.5 bg-blue-900 text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-sm shadow-blue-900/20"
                  >
                    + Bayar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-4 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                  activeTab === tab.id 
                    ? 'text-blue-900 border-b-2 border-blue-900' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            
            {/* TAB: DETAIL */}
            {activeTab === 'detail' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">Informasi Umum</h3>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Tanggal Terbit</span>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" /> {formatDate(invoice.created_at)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Jatuh Tempo</span>
                      <p className={`text-sm font-medium flex items-center gap-2 ${invoice.status === 'overdue' ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                        <Clock size={14} className={invoice.status === 'overdue' ? 'text-red-500' : 'text-gray-400'} /> {formatDate(invoice.due_date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Periode Layanan</span>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(invoice.period_start)} - {formatDate(invoice.period_end)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Sales PIC</span>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <User size={14} className="text-gray-400" /> {invoice.user?.name || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {invoice.notes && (
                  <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100">
                    <h3 className="text-xs font-black text-orange-900 uppercase tracking-widest flex items-center gap-2 mb-2">
                      <AlertCircle size={14} /> Catatan Tambahan
                    </h3>
                    <p className="text-sm text-orange-800 font-medium leading-relaxed">{invoice.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: ITEMS */}
            {activeTab === 'items' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">Produk</th>
                        <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Qty</th>
                        <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Harga</th>
                        <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {invoice.items?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-sm font-bold text-gray-900">{item.product?.name || `Produk ${item.product_id}`}</p>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-600 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-600 text-right">{formatCurrency(item.unit_price)}</td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(item.quantity * item.unit_price)}</td>
                        </tr>
                      ))}
                      {(!invoice.items || invoice.items.length === 0) && (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-sm font-medium text-gray-500">
                            Tidak ada item
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Total Calculation */}
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <div className="space-y-2 max-w-[250px] ml-auto">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(invoice.subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                      <span>PPN (11%)</span>
                      <span>{formatCurrency(invoice.tax)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Total</span>
                      <span className="text-lg font-black text-blue-900">{formatCurrency(invoice.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                {invoice.payments?.length > 0 ? (
                  invoice.payments.map((payment, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-100 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <DollarSign size={18} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">{formatDate(payment.payment_date)} • {payment.payment_method.toUpperCase()}</p>
                          </div>
                          <span className="text-xs font-bold text-gray-500">#{payment.payment_number}</span>
                        </div>
                        {payment.notes && (
                          <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">{payment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Belum ada pembayaran</p>
                    <p className="text-xs font-medium text-gray-500 mt-1 mb-4">Invoice ini belum menerima pembayaran apapun.</p>
                    {invoice.status !== 'paid' && (
                      <button 
                        onClick={() => onRecordPayment(invoice)}
                        className="px-4 py-2 bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        Rekam Pembayaran
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPanel;
