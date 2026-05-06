class UpdatePresentationUseCase {
  constructor({ presentationRepository }) {
    this.presentationRepository = presentationRepository;
  }

  async execute(id, data) {
    const existing = await this.presentationRepository.findById(parseInt(id));
    if (!existing) {
      throw new Error('Presentation not found');
    }
    
    // Remove fields that shouldn't be updated directly
    delete data.id;
    delete data.pres_number;
    delete data.created_at;
    delete data.updated_at;

    if (data.presentation_date) {
      data.presentation_date = new Date(data.presentation_date);
    }

    return await this.presentationRepository.update(parseInt(id), data);
  }
}

module.exports = UpdatePresentationUseCase;
