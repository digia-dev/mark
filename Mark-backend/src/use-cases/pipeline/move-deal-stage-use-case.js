class MoveDealStageUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id, { targetStage, notes }) {
    const deal = await this.dealRepository.findById(id);
    if (!deal) throw new Error('Deal not found');

    const previousStage = deal.stage;
    const updatedDeal = await this.dealRepository.update(id, { 
      stage: targetStage,
      updated_at: new Date()
    });

    // Record activity
    await this.dealRepository.addActivity(id, {
      type: 'stage_change',
      description: `Moved from ${previousStage} to ${targetStage}`,
      notes
    });

    return updatedDeal;
  }
}

module.exports = MoveDealStageUseCase;
