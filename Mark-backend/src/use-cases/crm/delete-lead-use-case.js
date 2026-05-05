class DeleteLeadUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(id) {
    return this.leadRepository.delete(parseInt(id));
  }
}

module.exports = DeleteLeadUseCase;
