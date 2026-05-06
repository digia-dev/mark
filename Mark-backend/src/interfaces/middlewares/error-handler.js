const { errorResponse } = require('../../shared/response');
const logger = require('../../infrastructure/services/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  // Handle specific errors
  if (err.name === 'ZodError') {
    const details = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return res.status(400).json(
      errorResponse('VALIDATION_ERROR', 'Input tidak valid', details)
    );
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json(
      errorResponse('VALIDATION_ERROR', 'Validasi gagal', err.details)
    );
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    // Handle unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json(
        errorResponse('CONFLICT', 'Data sudah ada (duplicate entry)', err.meta?.target)
      );
    }
    
    return res.status(400).json(
      errorResponse('DATABASE_ERROR', 'Gagal memproses data ke database', err.message)
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
