const Presentation = require('../../domain/entities/presentation');

class CreatePresentationUseCase {
  constructor({ presentationRepository }) {
    this.presentationRepository = presentationRepository;
  }

  async execute(data) {
    const year = new Date().getFullYear();
    const latestNumber = await this.presentationRepository.getLatestNumber(year);
    
    let sequence = 1;
    let subSequence = 1;

    if (latestNumber) {
      const parts = latestNumber.split('-');
      sequence = parseInt(parts[2]);
      subSequence = parseInt(parts[3]) + 1;
    }

    const pres_number = `PRES-${year}-${sequence.toString().padStart(4, '0')}-${subSequence.toString().padStart(3, '0')}`;

    return await this.presentationRepository.create({
      ...data,
      pres_number,
      presentation_date: new Date(data.presentation_date),
      status: 'scheduled'
    });
  }
}

module.exports = CreatePresentationUseCase;
