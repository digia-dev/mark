import axiosInstance from '../../../lib/axios';

const invoiceService = {
  getInvoices: async (params) => {
    const response = await axiosInstance.get('/invoices', { params });
    return response.data;
  },

  createInvoice: async (data) => {
    const response = await axiosInstance.post('/invoices', data);
    return response.data;
  },

  getStats: async () => {
    const response = await axiosInstance.get('/invoices/stats');
    return response.data;
  },

  getInvoice: async (id) => {
    const response = await axiosInstance.get(`/invoices/${id}`);
    return response.data;
  },

  updateInvoice: async (id, data) => {
    const response = await axiosInstance.put(`/invoices/${id}`, data);
    return response.data;
  },

  deleteInvoice: async (id) => {
    const response = await axiosInstance.delete(`/invoices/${id}`);
    return response.data;
  },

  recordPayment: async (id, data) => {
    const response = await axiosInstance.post(`/invoices/${id}/record-payment`, data);
    return response.data;
  },

  generatePdf: async (id) => {
    const response = await axiosInstance.get(`/invoices/${id}/pdf`);
    return response.data;
  }
};

export default invoiceService;
