import axiosInstance from '../../../shared/services/axios-instance';

const invoiceService = {
  getInvoices: async (params) => {
    const response = await axiosInstance.get('/invoices', { params });
    return response.data;
  },

  createInvoice: async (data) => {
    const response = await axiosInstance.post('/invoices', data);
    return response.data;
  }
};

export default invoiceService;
