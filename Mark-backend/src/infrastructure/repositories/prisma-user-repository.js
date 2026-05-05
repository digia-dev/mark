const UserRepository = require('../../domain/repositories/user-repository');

class PrismaUserRepository extends UserRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    return this.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findAll(filters = {}) {
    const { role, branch_id, is_active, search } = filters;
    const where = {};

    if (role) where.role = role;
    if (branch_id) where.branch_id = parseInt(branch_id);
    if (is_active !== undefined) where.is_active = is_active === 'true' || is_active === true;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } }
      ];
    }

    return this.prisma.user.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });
  }

  async create(data) {
    return this.prisma.user.create({
      data
    });
  }

  async update(id, data) {
    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async delete(id) {
    return this.prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = PrismaUserRepository;
