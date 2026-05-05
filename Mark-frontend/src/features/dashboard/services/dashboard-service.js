import axios from '../../../lib/axios';

const dashboardService = {
  getDashboardStats: async (params) => {
    const response = await axios.get('/reports/dashboard', { params });
    return response.data;
  }
};

export default dashboardService;
