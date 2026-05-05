class Branch {
  constructor({ id, name, address, phone, is_active, created_at, updated_at }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.is_active = is_active !== undefined ? is_active : true;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isActive() {
    return this.is_active;
  }
}

module.exports = Branch;
