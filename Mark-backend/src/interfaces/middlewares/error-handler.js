const { errorResponse } = require('../../shared/response');
const logger = require('../../infrastructure/services/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  // Handle specific errors
  if (err.name === 'ValidationError') {
    return res.status(400).json(
      errorResponse('VALIDATION_ERROR', 'Input validation failed', err.details)
    );
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    // Handle Prisma specific errors if needed
    return res.status(400).json(
      errorResponse('DATABASE_ERROR', 'Database operation failed', err.message)
    );
  }

  // Default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(
    errorResponse(
      err.code || 'INTERNAL_SERVER_ERROR',
      message,
      process.env.NODE_ENV === 'development' ? err.stack : null
    )
  );
};

module.exports = errorHandler;
