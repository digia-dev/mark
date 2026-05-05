class TroubleTicketRepository {
  async create(data) { throw new Error('Not implemented'); }
  async update(id, data) { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async findAll(filters) { throw new Error('Not implemented'); }
  async count(filters) { throw new Error('Not implemented'); }
  async getLatestNumber(year) { throw new Error('Not implemented'); }
  async updateStatus(id, status, extraData) { throw new Error('Not implemented'); }
  async assign(id, userId) { throw new Error('Not implemented'); }
  async addNote(id, noteData) { throw new Error('Not implemented'); }
  async getStats() { throw new Error('Not implemented'); }
}

module.exports = TroubleTicketRepository;
