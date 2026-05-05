import axios from '../../../lib/axios';

const productService = {
  getProducts: async (params) => {
    const response = await axios.get('/products', { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data) => {
    const response = await axios.post('/products', data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await axios.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  },

  toggleStatus: async (id, status) => {
    const response = await axios.patch(`/products/${id}/status`, { status });
    return response.data;
  },
};

export default productService;
