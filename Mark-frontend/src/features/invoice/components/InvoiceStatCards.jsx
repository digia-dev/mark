import React from 'react';
import { FileText, DollarSign, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

const InvoiceStatCards = ({ invoices = [], isLoading }) => {
  const stats = React.useMemo(() => {
    if (!invoices.length) return null;

    const totalInvoices = invoices.length;
    const totalBilled = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
    const totalPaid = invoices.reduce((acc, inv) => acc + (inv.paid_amount || 0), 0);
    const totalOutstanding = totalBilled - totalPaid;
    const avgPaymentTime = 12; // Placeholder for average payment time in days

    return {
      totalInvoices,
      totalBilled,
      totalPaid,
      totalOutstanding,
      avgPaymentTime
    };
  }, [invoices]);

  const cards = [
    {
      label: 'Total Tagihan',
      value: `Rp ${(stats?.totalBilled / 1000000 || 0).toFixed(1)}jt`,
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      label: 'Sudah Dibayar',
      value: `Rp ${(stats?.totalPaid / 1000000 || 0).toFixed(1)}jt`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    {
      label: 'Belum Dibayar',
      value: `Rp ${(stats?.totalOutstanding / 1000000 || 0).toFixed(1)}jt`,
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      label: 'Total Invoice',
      value: stats?.totalInvoices || 0,
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      label: 'Rata-rata Bayar',
      value: `${stats?.avgPaymentTime || 0} Hari`,
      icon: TrendingUp,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-28 bg-white border border-gray-100 rounded-[24px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-900/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} ${card.border} border group-hover:scale-110 transition-transform`}>
              <card.icon size={18} />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gray-900 tracking-tight">{card.value}</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceStatCards;
