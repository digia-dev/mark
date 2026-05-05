class ExportLeadsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.source) where.source = filters.source;
    if (filters.area) where.area = filters.area;

    return this.prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        assigned_user: { select: { name: true } }
      }
    });
  }
}

module.exports = ExportLeadsUseCase;
