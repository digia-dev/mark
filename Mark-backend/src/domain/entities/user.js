class User {
  constructor({
    id,
    name,
    email,
    password_hash,
    role,
    branch_id,
    phone,
    avatar,
    department,
    address,
    is_active,
    last_login_at,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.branch_id = branch_id;
    this.phone = phone;
    this.avatar = avatar;
    this.department = department;
    this.address = address;
    this.is_active = is_active;
    this.last_login_at = last_login_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isActive() {
    return this.is_active === true;
  }

  hasRole(role) {
    return this.role === role;
  }

  canAccess(permission) {
    const matrix = {
      customer_crud: ['super-admin', 'admin', 'sales'],
      lead_crud: ['super-admin', 'admin', 'sales'],
      deal_crud: ['super-admin', 'admin', 'sales'],
      quotation_create_edit: ['super-admin', 'admin', 'sales'],
      installation_update: ['super-admin', 'admin', 'teknisi'],
      invoice_create_edit: ['super-admin', 'admin'],
      user_management: ['super-admin', 'admin'],
      settings: ['super-admin', 'admin'],
      delete_data: ['super-admin', 'admin'],
      reports: ['super-admin', 'admin', 'sales']
    };

    if (!matrix[permission]) return false;
    return matrix[permission].includes(this.role);
  }
}

module.exports = User;
