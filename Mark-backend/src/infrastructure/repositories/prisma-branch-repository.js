const Branch = require('../../domain/entities/branch');

class PrismaBranchRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findById(id) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: parseInt(id) },
    });

    if (!branch) return null;
    return new Branch(branch);
  }

  async findAll() {
    const branches = await this.prisma.branch.findMany({
      orderBy: { name: 'asc' },
    });

    return branches.map(b => new Branch(b));
  }

  async create(data) {
    const branch = await this.prisma.branch.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        is_active: data.is_active,
      },
    });

    return new Branch(branch);
  }

  async update(id, data) {
    const branch = await this.prisma.branch.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        is_active: data.is_active,
      },
    });

    return new Branch(branch);
  }

  async delete(id) {
    const branch = await this.prisma.branch.delete({
      where: { id: parseInt(id) },
    });

    return new Branch(branch);
  }
}

module.exports = PrismaBranchRepository;
