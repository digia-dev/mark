class GetPresentationDetailUseCase {
  constructor({ presentationRepository }) {
    this.presentationRepository = presentationRepository;
  }

  async execute(id) {
    const presentation = await this.presentationRepository.findById(parseInt(id));
    if (!presentation) {
      throw new Error('Presentation not found');
    }
    return presentation;
  }
}

module.exports = GetPresentationDetailUseCase;
