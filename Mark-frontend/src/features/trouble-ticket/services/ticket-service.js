import axiosInstance from '../../../shared/services/axios-instance';

const ticketService = {
  getTickets: async (params) => {
    const response = await axiosInstance.get('/trouble-tickets', { params });
    return response.data;
  },

  createTicket: async (data) => {
    const response = await axiosInstance.post('/trouble-tickets', data);
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await axiosInstance.patch(`/trouble-tickets/${id}/status`, data);
    return response.data;
  }
};

export default ticketService;
