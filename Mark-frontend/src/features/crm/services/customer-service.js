import axios from '../../../lib/axios';

const customerService = {
  getCustomers: async (params) => {
    const response = await axios.get('/customers', { params });
    return response.data;
  },

  getCustomer: async (id) => {
    const response = await axios.get(`/customers/${id}`);
    return response.data;
  },

  createCustomer: async (data) => {
    const response = await axios.post('/customers', data);
    return response.data;
  },

  updateCustomer: async (id, data) => {
    const response = await axios.put(`/customers/${id}`, data);
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get('/customers/stats');
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await axios.delete(`/customers/${id}`);
    return response.data;
  }
};

export default customerService;
