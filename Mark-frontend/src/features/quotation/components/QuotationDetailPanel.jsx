import React from 'react';
import { 
  X, FileText, Package, ListChecks, History, 
  MessageSquare, Paperclip, CheckCircle2, Send, 
  Eye, AlertCircle, Download, Copy, Printer
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

const QuotationDetailPanel = ({ isOpen, onClose, quotation }) => {
  if (!quotation) return null;

  const statusSteps = [
    { label: 'Draft Created', date: quotation.created_at, icon: FileText, done: true },
    { label: 'Sent to Client', date: quotation.sent_at, icon: Send, done: !!quotation.sent_at },
    { label: 'Viewed by Client', date: quotation.viewed_at, icon: Eye, done: !!quotation.viewed_at },
    { 
      label: quotation.status === 'approved' ? 'Approved' : quotation.status === 'rejected' ? 'Rejected' : 'Awaiting Approval', 
      date: quotation.approved_at || quotation.rejected_at, 
      icon: quotation.status === 'approved' ? CheckCircle2 : AlertCircle, 
      done: quotation.status === 'approved' || quotation.status === 'rejected' 
    }
  ];

  return (
    <div 
      className={`fixed top-0 right-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-200 flex flex-col border-l border-gray-100 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-black text-gray-900">{quotation.quot_number}</h2>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              quotation.status === 'approved' ? 'bg-green-50 text-green-600 border border-green-100' :
              quotation.status === 'sent' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
              'bg-gray-100 text-gray-500 border border-gray-200'
            }`}>
              {quotation.status}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Dibuat untuk <span className="text-gray-900 font-bold">{quotation.customer?.name || quotation.lead?.name}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-gray-100">
            <Printer size={18} />
          </button>
          <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-gray-100">
            <Download size={18} />
          </button>
          <button onClick={onClose} className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm border border-transparent hover:border-gray-100 ml-2">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="detail" className="flex-1 flex flex-col overflow-hidden">
        <Tabs.List className="flex px-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          {[
            { id: 'detail', label: 'Detail', icon: FileText },
            { id: 'items', label: 'Items', icon: Package },
            { id: 'terms', label: 'Syarat & Ketentuan', icon: ListChecks },
            { id: 'history', label: 'Riwayat', icon: History },
            { id: 'notes', label: 'Catatan', icon: MessageSquare }
          ].map(tab => (
            <Tabs.Trigger 
              key={tab.id}
              value={tab.id}
              className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 transition-all flex items-center gap-2"
            >
              <tab.icon size={14} />
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Tabs.Content value="detail" className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Progress Tracker */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Progress Pelacakan</h3>
              <div className="relative space-y-8 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {statusSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-sm border-4 border-white ${step.done ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <step.icon size={16} />
                    </div>
                    <div>
                      <p className={`text-sm font-black ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                      {step.date && (
                        <p className="text-[10px] font-bold text-gray-400">
                          {new Date(step.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Info */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sales PIC</span>
                <p className="text-sm font-bold text-gray-900">{quotation.sales?.name || 'Unassigned'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Berlaku Hingga</span>
                <p className="text-sm font-bold text-gray-900">{new Date(quotation.valid_until).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Area</span>
                <p className="text-sm font-bold text-gray-900">{quotation.area || '-'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mata Uang</span>
                <p className="text-sm font-bold text-gray-900">{quotation.currency}</p>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="items" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-gray-100">
                   <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi Item</th>
                   <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Qty</th>
                   <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {quotation.items?.map((item, i) => (
                   <tr key={i}>
                     <td className="py-4">
                       <p className="text-sm font-black text-gray-900">{item.description}</p>
                       <p className="text-[10px] font-medium text-gray-400">{item.product?.name}</p>
                     </td>
                     <td className="py-4 text-right">
                        <p className="text-sm font-bold text-gray-900">{item.qty}</p>
                        <p className="text-[10px] font-medium text-gray-400">@ {new Intl.NumberFormat('id-ID').format(item.unit_price)}</p>
                     </td>
                     <td className="py-4 text-right">
                       <p className="text-sm font-black text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(item.total)}</p>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>

             {/* Summary Calculation */}
             <div className="mt-8 p-8 bg-blue-900 text-white rounded-[32px] space-y-4 shadow-xl shadow-blue-900/20">
                <div className="flex justify-between items-center text-xs font-bold opacity-60 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>Rp {new Intl.NumberFormat('id-ID').format(quotation.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold opacity-60 uppercase tracking-widest">
                  <span>Diskon</span>
                  <span>- Rp {new Intl.NumberFormat('id-ID').format(quotation.discount)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold opacity-60 uppercase tracking-widest">
                  <span>Pajak (11%)</span>
                  <span>Rp {new Intl.NumberFormat('id-ID').format(quotation.tax)}</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black uppercase tracking-widest">Total Tagihan</span>
                  <span className="text-2xl font-black italic">Rp {new Intl.NumberFormat('id-ID').format(quotation.total)}</span>
                </div>
             </div>
          </Tabs.Content>
          
          <Tabs.Content value="terms" className="animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {quotation.terms || 'Tidak ada syarat & ketentuan khusus untuk penawaran ini.'}
                </p>
             </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>

      {/* Footer Action */}
      <div className="p-8 border-t border-gray-100 flex gap-4 bg-white">
        <button className="flex-1 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
           <Copy size={18} /> Duplikat
        </button>
        <button className="flex-1 py-4 bg-orange-600 text-white rounded-2xl text-sm font-black hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2">
           <Send size={18} /> Kirim Ke Pelanggan
        </button>
      </div>
    </div>
  );
};

export default QuotationDetailPanel;
