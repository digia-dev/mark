const authMiddleware = (jwtService) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Akses ditolak, token tidak ditemukan'
      }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwtService.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Token tidak valid atau expired'
      }
    });
  }
};

module.exports = authMiddleware;
