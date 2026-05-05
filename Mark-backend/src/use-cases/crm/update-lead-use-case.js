class UpdateLeadUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(id, data) {
    return this.leadRepository.update(parseInt(id), data);
  }
}

module.exports = UpdateLeadUseCase;
