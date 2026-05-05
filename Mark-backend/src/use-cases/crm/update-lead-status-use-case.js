class UpdateLeadStatusUseCase {
  constructor({ leadRepository, loggerService, notificationService }) {
    this.leadRepository = leadRepository;
    this.loggerService = loggerService;
    this.notificationService = notificationService;
  }

  async execute(id, newStatus, userId) {
    const lead = await this.leadRepository.findById(parseInt(id));
    if (!lead) throw new Error('Lead not found');

    const validTransitions = {
      'new': ['contacted', 'lost'],
      'contacted': ['qualified', 'lost'],
      'qualified': ['negosiasi', 'lost'],
      'negosiasi': ['penawaran', 'lost'],
      'penawaran': ['converted', 'lost']
    };

    if (newStatus !== lead.status) {
      const allowed = validTransitions[lead.status];
      if (!allowed || !allowed.includes(newStatus)) {
        throw new Error(`Invalid status transition from ${lead.status} to ${newStatus}`);
      }
    }

    const updatedLead = await this.leadRepository.update(parseInt(id), { status: newStatus });

    // Log activity
    if (this.loggerService) {
      await this.loggerService.log({
        userId,
        action: 'diperbarui',
        module: 'crm',
        entityType: 'lead',
        entityId: parseInt(id),
        description: `Mengubah status lead menjadi ${newStatus}`,
        oldValues: { status: lead.status },
        newValues: { status: newStatus }
      });
    }

    return updatedLead;
  }
}

module.exports = UpdateLeadStatusUseCase;
