class DeleteBranchUseCase {
  constructor({ branchRepository }) {
    this.branchRepository = branchRepository;
  }

  async execute(id) {
    const branch = await this.branchRepository.findById(id);
    if (!branch) {
      const error = new Error('Branch not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    return await this.branchRepository.delete(id);
  }
}

module.exports = DeleteBranchUseCase;
