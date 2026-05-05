const { ValidationError } = require('../../shared/response');

const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error) {
    const details = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    // Global error handler will catch this if we pass it to next()
    // but usually validate middleware sends 400 immediately
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'input tidak valid',
        details
      }
    });
  }
};

module.exports = validate;
