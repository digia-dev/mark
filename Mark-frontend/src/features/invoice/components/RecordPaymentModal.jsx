import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, CreditCard, Hash, FileText } from 'lucide-react';

const RecordPaymentModal = ({ isOpen, onClose, invoice, onSave }) => {
  const [formData, setFormData] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    amount: '',
    payment_method: 'transfer',
    reference_number: '',
    notes: ''
  });

  useEffect(() => {
    if (invoice && isOpen) {
      const remainingBalance = (invoice.total || 0) - (invoice.paid_amount || 0);
      setFormData(prev => ({
        ...prev,
        amount: remainingBalance
      }));
    }
  }, [invoice, isOpen]);

  if (!isOpen || !invoice) return null;

  const remainingBalance = (invoice.total || 0) - (invoice.paid_amount || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      invoice_id: invoice.id,
      ...formData,
      amount: Number(formData.amount)
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-lg font-black text-gray-900">Rekam Pembayaran</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Invoice {invoice.invoice_number}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="bg-blue-50/50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sisa Tagihan</span>
                <p className="text-2xl font-black text-blue-900">{formatCurrency(remainingBalance)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Tanggal Pembayaran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <input
                    type="date"
                    required
                    value={formData.payment_date}
                    onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Nominal Pembayaran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-bold">
                    Rp
                  </div>
                  <input
                    type="number"
                    required
                    min="1"
                    max={remainingBalance}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium text-gray-900"
                    placeholder="Masukkan nominal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Metode Pembayaran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <CreditCard size={16} />
                  </div>
                  <select
                    required
                    value={formData.payment_method}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium text-gray-900 appearance-none"
                  >
                    <option value="transfer">Bank Transfer</option>
                    <option value="cash">Tunai</option>
                    <option value="qris">QRIS</option>
                    <option value="virtual_account">Virtual Account</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Nomor Referensi (Opsional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Hash size={16} />
                  </div>
                  <input
                    type="text"
                    value={formData.reference_number}
                    onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium text-gray-900"
                    placeholder="Contoh: TRF-00123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                    <FileText size={16} />
                  </div>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium text-gray-900 resize-none"
                    placeholder="Catatan..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm shadow-blue-900/20"
            >
              Simpan Pembayaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
