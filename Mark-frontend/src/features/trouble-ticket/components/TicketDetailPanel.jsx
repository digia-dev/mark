import React, { useState } from 'react';
import { X, Clock, AlertCircle, Play, CheckCircle2, CheckSquare, MessageSquare, User, Calendar, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import SlaTimer from './SlaTimer';
import TicketNoteForm from './TicketNoteForm';

const STATUS_TRANSITIONS = {
  'open': ['in-progress', 'resolved', 'cancelled'],
  'in-progress': ['resolved', 'on-hold', 'cancelled'],
  'on-hold': ['in-progress', 'resolved', 'cancelled'],
  'resolved': ['closed', 'in-progress'],
  'closed': ['open'],
  'cancelled': ['open']
};

const TicketDetailPanel = ({ ticket, onClose, onUpdateStatus, onAddNote, onAssign, users = [] }) => {
  const [activeTab, setActiveTab] = useState('detail');

  if (!ticket) return null;

  const availableTransitions = STATUS_TRANSITIONS[ticket.status] || [];
  const technicians = users.filter(u => u.role === 'technician' || u.role === 'TS');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} className="text-red-500" />;
      case 'in-progress': return <Play size={16} className="text-blue-500 fill-current" />;
      case 'resolved': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'closed': return <CheckSquare size={16} className="text-gray-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed top-4 right-4 bottom-4 w-full max-w-3xl bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col border border-white translate-x-0 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 shrink-0">
              {getStatusIcon(ticket.status)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-gray-900">{ticket.ticket_number}</h2>
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-gray-200">
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 line-clamp-1">{ticket.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        {/* SLA & Quick Actions */}
        <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">SLA Target</span>
              <SlaTimer deadline={ticket.sla_deadline} status={ticket.status} />
            </div>
            <div className="w-px h-10 bg-gray-100"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Penugasan</span>
              <select 
                className="text-sm font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
                value={ticket.assigned_to || ''}
                onChange={(e) => onAssign(ticket.id, parseInt(e.target.value))}
              >
                <option value="">Unassigned</option>
                {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            {availableTransitions.map(newStatus => (
              <button
                key={newStatus}
                onClick={() => onUpdateStatus(ticket.id, newStatus)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-100 transition-all shadow-sm"
              >
                Set {newStatus}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 px-6 border-b border-gray-100">
          {['detail', 'aktivitas', 'catatan'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-black tracking-wide capitalize border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-900' 
                  : 'border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-gray-50/30">
          
          {activeTab === 'detail' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                  <ShieldAlert size={14} /> Deskripsi Keluhan
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                    <User size={14} /> Info Pelanggan
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Nama</span>
                      <span className="text-sm font-bold text-gray-900">{ticket.customer?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                    <Calendar size={14} /> Waktu
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Dibuat Pada</span>
                      <span className="text-sm font-bold text-gray-900">
                        {format(new Date(ticket.created_at), 'dd MMM yyyy, HH:mm', { locale: idLocale })}
                      </span>
                    </div>
                    {ticket.resolved_at && (
                      <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Diselesaikan Pada</span>
                        <span className="text-sm font-bold text-emerald-600">
                          {format(new Date(ticket.resolved_at), 'dd MMM yyyy, HH:mm', { locale: idLocale })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'catatan' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <TicketNoteForm onSubmit={(data) => onAddNote(ticket.id, data)} isLoading={false} />
              
              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Riwayat Catatan</h3>
                {ticket.notes?.length === 0 ? (
                  <p className="text-sm text-gray-500 italic px-2">Belum ada catatan.</p>
                ) : (
                  <div className="space-y-3">
                    {ticket.notes?.map(note => (
                      <div key={note.id} className={`p-4 rounded-2xl border ${note.is_internal ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-900">{note.user?.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {format(new Date(note.created_at), 'dd MMM HH:mm')}
                            {note.is_internal && <span className="ml-2 text-orange-500 border border-orange-200 bg-orange-100 px-1.5 py-0.5 rounded-md">Internal</span>}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'aktivitas' && (
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-200">
              <p className="text-sm text-gray-500 text-center italic">Riwayat perubahan status dan SLA akan tampil di sini.</p>
              {/* Activity log implementation usually goes here */}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default TicketDetailPanel;
