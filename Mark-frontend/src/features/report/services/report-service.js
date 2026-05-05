import axiosInstance from '../../../lib/axios';

const reportService = {
  getDashboardStats: async (params) => {
    const response = await axiosInstance.get('/reports/dashboard', { params });
    return response.data;
  },

  getSalesPerformance: async (params) => {
    const response = await axiosInstance.get('/reports/sales', { params });
    return response.data;
  },

  getPipelineReport: async (params) => {
    const response = await axiosInstance.get('/reports/pipeline', { params });
    return response.data;
  },

  getProductPerformance: async (params) => {
    const response = await axiosInstance.get('/reports/product-performance', { params });
    return response.data;
  }
};

export default reportService;
