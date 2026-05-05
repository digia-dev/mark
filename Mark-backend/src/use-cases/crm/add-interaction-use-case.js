class AddInteractionUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId, data, userId) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: parseInt(customerId) }
    });
    
    if (!customer) {
      const error = new Error('Customer not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    return this.prisma.interaction.create({
      data: {
        customer_id: customer.id,
        type: data.type,
        notes: data.notes,
        next_action: data.next_action || null,
        next_action_date: data.next_action_date ? new Date(data.next_action_date) : null,
        created_by: userId
      }
    });
  }
}

module.exports = AddInteractionUseCase;
