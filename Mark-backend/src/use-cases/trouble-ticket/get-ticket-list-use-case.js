class GetTicketListUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(filters) {
    const data = await this.troubleTicketRepository.findAll(filters);
    const total = await this.troubleTicketRepository.count(filters);

    return {
      data,
      meta: {
        total,
        page: parseInt(filters.page) || 1,
        limit: parseInt(filters.limit) || 10,
        total_pages: Math.ceil(total / (parseInt(filters.limit) || 10))
      }
    };
  }
}

module.exports = GetTicketListUseCase;
