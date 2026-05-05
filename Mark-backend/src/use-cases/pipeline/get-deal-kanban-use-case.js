class GetDealKanbanUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(params) {
    const deals = await this.dealRepository.findForKanban(params);

    // Group by stage
    const stages = ['prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi'];
    const grouped = stages.reduce((acc, stage) => {
      const stageDeals = deals.filter(d => d.stage === stage);
      acc[stage] = {
        deals: stageDeals,
        total_value: stageDeals.reduce((sum, d) => sum + (d.value || 0), 0),
        count: stageDeals.length
      };
      return acc;
    }, {});

    // Calculate Summary (for sidebar)
    const totalDeals = deals.length;
    const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
    const summary = stages.map(stage => ({
      stage,
      count: grouped[stage].count,
      percentage: totalDeals > 0 ? (grouped[stage].count / totalDeals) * 100 : 0
    }));

    // Calculate Stats (for top cards)
    // For now using mock trends, in real app would compare with previous period
    const stats = {
      totalDeals: { value: totalDeals, trend: '+12%', isPositive: true },
      totalValue: { value: totalValue, trend: '+Rp 470.000.000', isPositive: true },
      dealsWon: { value: deals.filter(d => d.stage === 'closing').length, trend: '+22.8%', isPositive: true },
      winRate: { value: '22.8%', trend: '+21.6%', isPositive: true },
      avgCycle: { value: '28 Hari', trend: '+31 Hari', isPositive: false }
    };

    return {
      grouped,
      summary,
      stats,
      totalDeals,
      totalValue
    };
  }
}

module.exports = GetDealKanbanUseCase;
