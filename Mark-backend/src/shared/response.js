/**
 * Standardized success response
 * @param {any} data - Main data to return
 * @param {any} meta - Additional metadata (pagination, etc)
 */
const successResponse = (data, meta = null) => {
  return {
    success: true,
    data,
    meta,
  };
};

/**
 * Standardized error response
 * @param {string} code - Error code (e.g., 'VALIDATION_ERROR')
 * @param {string} message - Human readable message
 * @param {any} details - Additional error details
 */
const errorResponse = (code, message, details = null) => {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
