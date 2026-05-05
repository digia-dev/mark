class PrismaTroubleTicketRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.trouble_ticket.create({
      data,
      include: {
        customer: { select: { name: true } },
        assigned_user: { select: { name: true } }
      }
    });
  }

  async update(id, data) {
    return await this.prisma.trouble_ticket.update({
      where: { id },
      data,
      include: {
        customer: { select: { name: true } },
        assigned_user: { select: { name: true } }
      }
    });
  }

  async findById(id) {
    return await this.prisma.trouble_ticket.findUnique({
      where: { id },
      include: {
        customer: true,
        assigned_user: true,
        creator: true,
        notes: {
          include: {
            user: { select: { name: true } }
          },
          orderBy: { created_at: 'desc' }
        }
      }
    });
  }

  async findAll({ offset, limit, search, status, priority, category, assigned_to, customer_id }) {
    const where = {};
    if (search) {
      where.OR = [
        { ticket_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;
    if (assigned_to) where.assigned_to = parseInt(assigned_to);
    if (customer_id) where.customer_id = parseInt(customer_id);

    return await this.prisma.trouble_ticket.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        customer: { select: { name: true } },
        assigned_user: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, priority, category, assigned_to, customer_id } = filters;
    if (search) {
      where.OR = [
        { ticket_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;
    if (assigned_to) where.assigned_to = parseInt(assigned_to);
    if (customer_id) where.customer_id = parseInt(customer_id);

    return await this.prisma.trouble_ticket.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.trouble_ticket.findFirst({
      where: { ticket_number: { startsWith: `TT-${year}-` } },
      orderBy: { ticket_number: 'desc' },
      select: { ticket_number: true }
    });
    return latest ? latest.ticket_number : null;
  }

  async updateStatus(id, status, extraData) {
    const { notes, ...rest } = extraData;
    
    // Use transaction if we need to add a note too
    return await this.prisma.$transaction(async (tx) => {
      if (notes) {
        await tx.ticket_note.create({
          data: {
            ticket_id: id,
            content: `Status changed to ${status}. Note: ${notes}`,
            is_internal: true,
            user_id: 1 // Default system or current user? usually injected
          }
        });
      }

      return await tx.trouble_ticket.update({
        where: { id },
        data: {
          status,
          ...rest
        },
        include: {
          customer: { select: { name: true } },
          assigned_user: { select: { name: true } }
        }
      });
    });
  }

  async assign(id, user_id) {
    return await this.prisma.trouble_ticket.update({
      where: { id },
      data: { assigned_to: user_id },
      include: {
        assigned_user: { select: { name: true } }
      }
    });
  }

  async addNote(id, noteData) {
    return await this.prisma.ticket_note.create({
      data: {
        ticket_id: id,
        ...noteData
      },
      include: {
        user: { select: { name: true } }
      }
    });
  }

  async getStats() {
    const counts = await this.prisma.trouble_ticket.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const total = await this.prisma.trouble_ticket.count();

    // Average resolution time (diff between created_at and resolved_at)
    // Prisma doesn't have direct avg for date diff, might need raw query or JS processing
    const resolvedTickets = await this.prisma.trouble_ticket.findMany({
      where: { status: { in: ['resolved', 'closed'] }, NOT: { resolved_at: null } },
      select: { created_at: true, resolved_at: true }
    });

    let avgResolutionMinutes = 0;
    if (resolvedTickets.length > 0) {
      const totalMinutes = resolvedTickets.reduce((acc, t) => {
        const diff = new Date(t.resolved_at) - new Date(t.created_at);
        return acc + (diff / (1000 * 60));
      }, 0);
      avgResolutionMinutes = totalMinutes / resolvedTickets.length;
    }

    return {
      total,
      by_status: counts.reduce((acc, c) => ({ ...acc, [c.status]: c._count.id }), {}),
      avg_resolution_minutes: Math.round(avgResolutionMinutes)
    };
  }
}

module.exports = PrismaTroubleTicketRepository;
