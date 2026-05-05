import api from '../../../services/api';

class SettingsService {
  async getCompanySettings() {
    const response = await api.get('/settings/company');
    return response.data.data;
  }

  async updateCompanySettings(data) {
    const response = await api.put('/settings/company', data);
    return response.data.data;
  }

  async getUserPreferences() {
    const response = await api.get('/settings/preferences');
    return response.data.data;
  }

  async updateUserPreferences(data) {
    const response = await api.put('/settings/preferences', data);
    return response.data.data;
  }

  async getSalesTarget(month, year) {
    const response = await api.get('/targets', { params: { month, year } });
    return response.data.data;
  }

  async createSalesTarget(data) {
    const response = await api.post('/targets', data);
    return response.data.data;
  }
}

export const settingsService = new SettingsService();
