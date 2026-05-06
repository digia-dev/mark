import React, { useState } from 'react';
import { Plus, Search, Filter, Download, CreditCard, Clock, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useInvoices, useInvoiceStats, useCreateInvoice, useRecordPayment, useGenerateInvoicePdf } from '../features/invoice/hooks/use-invoices';
import { useCustomers } from '../features/crm/hooks/use-customers';
import { useProductList } from '../features/product/hooks/use-products';
import { toast } from 'react-hot-toast';

// Components
import InvoiceTable from '../features/invoice/components/InvoiceTable';
import InvoiceForm from '../features/invoice/components/InvoiceForm';
import RecordPaymentModal from '../features/invoice/components/RecordPaymentModal';
import InvoiceDetailPanel from '../features/invoice/components/InvoiceDetailPanel';

const InvoicePage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { data, isLoading } = useInvoices(params);
  const { data: statsData, isLoading: isStatsLoading } = useInvoiceStats();
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: productsData } = useProductList({ limit: 100 });
  
  const createMutation = useCreateInvoice();
  const paymentMutation = useRecordPayment();
  const pdfMutation = useGenerateInvoicePdf();

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
      toast.success('Invoice berhasil dibuat');
    } catch (error) {
      console.error('Failed to create invoice:', error);
      toast.error('Gagal membuat invoice');
    }
  };

  const handleSavePayment = async (paymentData) => {
    try {
      await paymentMutation.mutateAsync({ id: paymentData.invoice_id, data: paymentData });
      setIsPaymentModalOpen(false);
      setSelectedInvoice(null);
      toast.success('Pembayaran berhasil direkam');
    } catch (error) {
      console.error('Failed to record payment:', error);
      toast.error('Gagal merekam pembayaran');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const invoiceStats = statsData?.data || {
    total_outstanding: 0,
    unpaid_count: 0,
    overdue_amount: 0,
    paid_this_month: 0
  };

  const stats = [
    { label: 'Total Piutang', value: formatCurrency(invoiceStats.total_outstanding), color: 'text-gray-900', bg: 'bg-gray-50', icon: CreditCard },
    { label: 'Belum Dibayar', value: `${invoiceStats.unpaid_count} Invoice`, color: 'text-red-600', bg: 'bg-red-50', icon: Clock },
    { label: 'Overdue', value: formatCurrency(invoiceStats.overdue_amount), color: 'text-white', bg: 'bg-red-600', icon: AlertTriangle },
    { label: 'Lunas (Bulan Ini)', value: formatCurrency(invoiceStats.paid_this_month), color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2 },
  ];

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Invoices & Payments</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola penagihan pelanggan dan rekonsiliasi pembayaran</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.success('Mengekspor rekap keuangan...')}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Download size={18} />
            Rekap Keuangan
          </button>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <Plus size={18} />
            Buat Invoice Baru
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-[32px] border border-gray-100 ${stat.bg} shadow-sm group hover:scale-[1.02] transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.color === 'text-white' ? 'text-red-600' : stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black truncate ${stat.color}`}>{isStatsLoading ? '...' : stat.value}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest mt-1 ${stat.color === 'text-white' ? 'text-white/80' : 'text-gray-400'}`}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari no. invoice atau pelanggan..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-900 transition-all font-bold"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
          >
            <option value="">Semua Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="overdue">Overdue</option>
          </select>
          <button 
            onClick={() => toast.info('Filter lanjutan segera hadir')}
            className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-95"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Content: Table */}
      <InvoiceTable 
        invoices={data?.data || []} 
        isLoading={isLoading} 
        onRecordPayment={(inv) => {
          setSelectedInvoice(inv);
          setIsPaymentModalOpen(true);
        }}
        onViewDetail={(inv) => {
          setSelectedInvoice(inv);
          setIsDetailOpen(true);
        }}
        onDownloadPdf={async (inv) => {
          try {
            toast.loading(`Menyiapkan PDF invoice ${inv.inv_number}...`, { id: 'pdf' });
            const result = await pdfMutation.mutateAsync(inv.id);
            toast.success(`PDF invoice ${inv.inv_number} siap`, { id: 'pdf' });
            if (result.success && result.data.pdf_url) {
              window.open(result.data.pdf_url, '_blank');
            } else {
              toast.error('Gagal mendapatkan URL PDF', { id: 'pdf' });
            }
          } catch (error) {
            console.error('Failed to generate PDF:', error);
            toast.error('Gagal mengunduh PDF', { id: 'pdf' });
          }
        }}
      />

      {/* Invoice Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-10"
            >
              <X size={20} />
            </button>
            <InvoiceForm 
              customers={customersData?.data || []}
              products={productsData?.data || []}
              onSubmit={handleCreate}
              onCancel={() => setIsFormOpen(false)}
              isSubmitting={createMutation.isLoading}
            />
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      <RecordPaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onSave={handleSavePayment}
      />

      {/* Detail Panel */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-white animate-in slide-in-from-right duration-300 shadow-2xl">
            <InvoiceDetailPanel 
              invoiceId={selectedInvoice?.id}
              onClose={() => {
                setIsDetailOpen(false);
                setSelectedInvoice(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
