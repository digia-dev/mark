const Product = require('../../domain/entities/product');

class PrismaProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findById(id) {
    const product = await this.prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) return null;
    return new Product(product);
  }

  async findAll(filters = {}) {
    const { status, category, technology, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (technology) where.technology = technology;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [products, total, counts] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.product.count({ where }),
      this.prisma.product.groupBy({
        by: ['status'],
        _count: { id: true }
      })
    ]);

    const statusCounts = counts.reduce((acc, c) => ({ ...acc, [c.status]: c._count.id }), {});

    return {
      data: products.map(p => new Product(p)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        stats: {
          active: statusCounts['active'] || 0,
          inactive: statusCounts['inactive'] || 0,
          promo: statusCounts['promo'] || 0
        }
      },
    };
  }

  async getStats() {
    const counts = await this.prisma.product.groupBy({
      by: ['status'],
      _count: { id: true }
    });
    
    const statusCounts = counts.reduce((acc, c) => ({ ...acc, [c.status]: c._count.id }), {});
    const total = await this.prisma.product.count();
    
    return {
      total,
      active: statusCounts['active'] || 0,
      inactive: statusCounts['inactive'] || 0,
      promo: statusCounts['promo'] || 0
    };
  }

  async create(data) {
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        image_url: data.image_url,
        speed_down: data.speed_down,
        speed_up: data.speed_up,
        price: data.price,
        technology: data.technology,
        area_coverage: data.area_coverage,
        is_best_seller: data.is_best_seller,
        is_promo: data.is_promo,
        promo_price: data.promo_price,
        promo_end_date: data.promo_end_date ? new Date(data.promo_end_date) : null,
        status: data.status,
      },
    });

    return new Product(product);
  }

  async update(id, data) {
    const product = await this.prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        image_url: data.image_url,
        speed_down: data.speed_down,
        speed_up: data.speed_up,
        price: data.price,
        technology: data.technology,
        area_coverage: data.area_coverage,
        is_best_seller: data.is_best_seller,
        is_promo: data.is_promo,
        promo_price: data.promo_price,
        promo_end_date: data.promo_end_date ? new Date(data.promo_end_date) : null,
        status: data.status,
      },
    });

    return new Product(product);
  }

  async delete(id) {
    const product = await this.prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return new Product(product);
  }

  async updateStatus(id, status) {
    const product = await this.prisma.product.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return new Product(product);
  }
}

module.exports = PrismaProductRepository;
