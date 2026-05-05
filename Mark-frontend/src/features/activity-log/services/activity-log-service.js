import axiosInstance from '../../../lib/axios';

const activityLogService = {
  getLogs: async (params) => {
    const response = await axiosInstance.get('/activity-logs', { params });
    return response.data;
  }
};

export default activityLogService;
