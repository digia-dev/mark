const bcrypt = require('bcryptjs');

class BcryptService {
  constructor() {
    this.saltRounds = 12;
  }

  async hash(password) {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = BcryptService;
