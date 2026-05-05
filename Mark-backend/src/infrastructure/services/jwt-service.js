const jwt = require('jsonwebtoken');

class JwtService {
  constructor() {
    this.accessTokenSecret = process.env.JWT_SECRET || 'access-secret';
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
    this.accessTokenExpiresIn = process.env.JWT_EXPIRES_IN || '8h';
    this.refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiresIn
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn
    });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, this.accessTokenSecret);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshTokenSecret);
  }
}

module.exports = JwtService;
