class AssignLeadUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(id, userId) {
    return this.leadRepository.update(parseInt(id), { assigned_to: parseInt(userId) });
  }
}

module.exports = AssignLeadUseCase;
