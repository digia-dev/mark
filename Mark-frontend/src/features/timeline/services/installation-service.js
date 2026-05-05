import axiosInstance from '../../../lib/axios';

const installationService = {
  getInstallations: async (params) => {
    const response = await axiosInstance.get('/installations', { params });
    return response.data;
  },

  scheduleInstallation: async (data) => {
    const response = await axiosInstance.post('/installations', data);
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await axiosInstance.patch(`/installations/${id}/status`, data);
    return response.data;
  }
};

export default installationService;
