import axiosInstance from '../../../lib/axios';

const quotationService = {
  getQuotations: async (params) => {
    const response = await axiosInstance.get('/quotations', { params });
    return response.data;
  },

  getQuotationDetail: async (id) => {
    const response = await axiosInstance.get(`/quotations/${id}`);
    return response.data;
  },

  createQuotation: async (data) => {
    const response = await axiosInstance.post('/quotations', data);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/quotations/${id}/status`, { status });
    return response.data;
  },

  updateQuotation: async (id, data) => {
    const response = await axiosInstance.put(`/quotations/${id}`, data);
    return response.data;
  },

  getStats: async () => {
    const response = await axiosInstance.get('/quotations/stats');
    return response.data;
  }
};

export default quotationService;
