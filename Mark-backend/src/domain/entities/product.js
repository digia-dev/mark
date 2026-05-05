class Product {
  constructor({ 
    id, name, category, description, image_url, 
    speed_down, speed_up, price, technology, 
    area_coverage, is_best_seller, is_promo, 
    promo_price, promo_end_date, status, 
    created_at, updated_at 
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.image_url = image_url;
    this.speed_down = speed_down;
    this.speed_up = speed_up;
    this.price = price;
    this.technology = technology;
    this.area_coverage = area_coverage;
    this.is_best_seller = is_best_seller;
    this.is_promo = is_promo;
    this.promo_price = promo_price;
    this.promo_end_date = promo_end_date;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isActive() {
    return this.status !== 'inactive';
  }

  getCurrentPrice() {
    if (this.is_promo && this.promo_price && !this.isPromoExpired()) {
      return this.promo_price;
    }
    return this.price;
  }

  isPromoExpired() {
    if (!this.promo_end_date) return false;
    return new Date() > new Date(this.promo_end_date);
  }
}

module.exports = Product;
