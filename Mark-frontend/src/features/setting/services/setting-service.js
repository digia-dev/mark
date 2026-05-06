import axiosInstance from '../../../lib/axios';

const settingService = {
  getCompanyProfile: async () => {
    const response = await axiosInstance.get('/settings/company');
    return response.data;
  },

  updateCompanyProfile: async (data) => {
    const response = await axiosInstance.put('/settings/company', data);
    return response.data;
  },

  getUsers: async (params) => {
    const response = await axiosInstance.get('/settings/users', { params });
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await axiosInstance.put(`/settings/users/${id}`, data);
    return response.data;
  },

  getBranches: async () => {
    const response = await axiosInstance.get('/settings/branches');
    return response.data;
  },

  getPreferences: async () => {
    const response = await axiosInstance.get('/settings/preferences');
    return response.data;
  },

  updatePreferences: async (data) => {
    const response = await axiosInstance.put('/settings/preferences', data);
    return response.data;
  }
};

export default settingService;
