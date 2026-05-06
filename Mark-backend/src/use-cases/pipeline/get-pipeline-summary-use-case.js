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
      totalDeals: { value: totalDeals, trend: '0%', isPositive: true },
      totalValue: { value: totalValue, trend: '0%', isPositive: true },
      dealsWon: { value: deals.filter(d => d.status === 'won').length, trend: '0%', isPositive: true },
      winRate: { value: `${winRate.toFixed(1)}%`, trend: '0%', isPositive: true },
      avgCycle: { value: '0 hari', trend: '0%', isPositive: true },
      perStage
    };
  }
}

module.exports = GetPipelineSummaryUseCase;
