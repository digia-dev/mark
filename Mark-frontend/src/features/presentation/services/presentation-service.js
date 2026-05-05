import axiosInstance from '../../../shared/services/axios-instance';

const presentationService = {
  getPresentations: async (params) => {
    const response = await axiosInstance.get('/presentations', { params });
    return response.data;
  },

  createPresentation: async (data) => {
    const response = await axiosInstance.post('/presentations', data);
    return response.data;
  }
};

export default presentationService;
