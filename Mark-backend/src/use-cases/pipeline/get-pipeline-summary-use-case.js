class GetPipelineSummaryUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(filters = {}) {
    const deals = await this.prisma.deal.findMany({
      where: filters,
      select: {
        id: true,
        value: true,
        stage: true,
        status: true,
        created_at: true,
        closed_at: true
      }
    });

    const totalDeals = deals.length;
    const totalValue = deals.reduce((acc, deal) => acc + (Number(deal.value) || 0), 0);
    const winRate = totalDeals > 0 ? (deals.filter(d => d.status === 'won').length / totalDeals) * 100 : 0;
    
    const perStage = deals.reduce((acc, deal) => {
      acc[deal.stage] = (acc[deal.stage] || 0) + 1;
      return acc;
    }, {});

    return {
      totalDeals,
      totalValue,
      winRate,
      perStage,
      avgCycle: 0 // Placeholder for average sales cycle
    };
  }
}

module.exports = GetPipelineSummaryUseCase;
