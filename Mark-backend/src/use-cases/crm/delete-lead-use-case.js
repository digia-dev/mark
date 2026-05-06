class DeleteLeadUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(id) {
    return await this.leadRepository.delete(parseInt(id));
  }
}

module.exports = DeleteLeadUseCase;
