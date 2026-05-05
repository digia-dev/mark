import axios from '../../../lib/axios';

const dealService = {
  getKanban: async (params) => {
    const response = await axios.get('/deals/kanban', { params });
    return response.data;
  },

  getList: async (params) => {
    const response = await axios.get('/deals', { params });
    return response.data;
  },

  createDeal: async (data) => {
    const response = await axios.post('/deals', data);
    return response.data;
  },

  moveStage: async (id, data) => {
    const response = await axios.patch(`/deals/${id}/move-stage`, data);
    return response.data;
  }
};

export default dealService;
