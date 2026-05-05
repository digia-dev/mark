class UpdateQuotationStatusUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(id, status) {
    const quotation = await this.quotationRepository.findById(id);
    if (!quotation) {
      throw new Error('Quotation not found');
    }

    const validTransitions = {
      'draft': ['sent'],
      'sent': ['approved', 'rejected', 'expired'],
      'approved': [],
      'rejected': ['draft'],
      'expired': ['draft']
    };

    if (!validTransitions[quotation.status].includes(status)) {
      throw new Error(`Invalid status transition from ${quotation.status} to ${status}`);
    }

    const extraData = {};
    if (status === 'sent') extraData.sent_at = new Date();
    if (status === 'approved') extraData.approved_at = new Date();
    if (status === 'rejected') extraData.rejected_at = new Date();

    return await this.quotationRepository.updateStatus(id, status, extraData);
  }
}

module.exports = UpdateQuotationStatusUseCase;
