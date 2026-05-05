class InstallationRepository {
  async create(data) { throw new Error('Not implemented'); }
  async update(id, data) { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async findByDealId(dealId) { throw new Error('Not implemented'); }
  async findAll(filters) { throw new Error('Not implemented'); }
  async count(filters) { throw new Error('Not implemented'); }
  async getLatestNumber(year) { throw new Error('Not implemented'); }
  async updateStatus(id, status, extraData) { throw new Error('Not implemented'); }
  async updateStage(id, stageData) { throw new Error('Not implemented'); }
  async assignTechnician(id, technicianId) { throw new Error('Not implemented'); }
  async getGanttData(filters) { throw new Error('Not implemented'); }
  async getStats() { throw new Error('Not implemented'); }
}

module.exports = InstallationRepository;
