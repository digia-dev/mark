class CreateBranchUseCase {
  constructor({ branchRepository }) {
    this.branchRepository = branchRepository;
  }

  async execute(data) {
    return await this.branchRepository.create(data);
  }
}

module.exports = CreateBranchUseCase;
