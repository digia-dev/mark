import api from '../../../lib/axios';

export const ticketService = {
  getTickets: async (params) => {
    const response = await api.get('/trouble-tickets', { params });
    return response.data;
  },
  
  getTicketDetail: async (id) => {
    const response = await api.get(`/trouble-tickets/${id}`);
    return response.data.data;
  },
  
  getTicketStats: async () => {
    const response = await api.get('/trouble-tickets/stats');
    return response.data.data;
  },

  createTicket: async (data) => {
    const response = await api.post('/trouble-tickets', data);
    return response.data.data;
  },

  updateTicket: async (id, data) => {
    const response = await api.put(`/trouble-tickets/${id}`, data);
    return response.data.data;
  },

  updateStatus: async (id, statusData) => {
    const response = await api.patch(`/trouble-tickets/${id}/status`, statusData);
    return response.data.data;
  },

  assignTicket: async (id, userId) => {
    const response = await api.patch(`/trouble-tickets/${id}/assign`, { user_id: userId });
    return response.data.data;
  },

  addNote: async (id, noteData) => {
    const response = await api.post(`/trouble-tickets/${id}/notes`, noteData);
    return response.data.data;
  }
};
