class DeletePresentationUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(id) {
    // Check if it exists
    const existing = await this.prisma.productPresentation.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existing) {
      throw new Error('Presentation not found');
    }

    // Hard delete since there's no deleted_at column
    return await this.prisma.productPresentation.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = DeletePresentationUseCase;
