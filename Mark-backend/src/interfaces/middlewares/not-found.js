const { errorResponse } = require('../../shared/response');

const notFoundHandler = (req, res, next) => {
  res.status(404).json(
    errorResponse(
      'NOT_FOUND',
      `Resource not found: ${req.method} ${req.originalUrl}`
    )
  );
};

module.exports = notFoundHandler;
