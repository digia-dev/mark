import axios from '../../../lib/axios';

const leadService = {
  getLeads: async (params) => {
    const response = await axios.get('/leads', { params });
    return response.data;
  },

  createLead: async (data) => {
    const response = await axios.post('/leads', data);
    return response.data;
  },

  updateLead: async (id, data) => {
    const response = await axios.put(`/leads/${id}`, data);
    return response.data;
  },

  convertLead: async (id, data) => {
    const response = await axios.post(`/leads/${id}/convert`, data);
    return response.data;
  }
};

export default leadService;
