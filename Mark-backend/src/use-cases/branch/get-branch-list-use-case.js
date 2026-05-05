class GetBranchListUseCase {
  constructor({ branchRepository }) {
    this.branchRepository = branchRepository;
  }

  async execute() {
    return await this.branchRepository.findAll();
  }
}

module.exports = GetBranchListUseCase;
