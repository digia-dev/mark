/**
 * Activity Logger Middleware
 * Digunakan untuk mencatat aktivitas write (POST, PUT, PATCH, DELETE)
 * 
 * @param {Object} prismaActivityLogRepository - Repository untuk menyimpan log
 * @param {Object} options - Metadata aktivitas { module, action, description }
 */
const activityLogger = (prismaActivityLogRepository, options) => async (req, res, next) => {
  // Simpan metadata ke res.locals agar bisa diakses jika ingin mencatat otomatis di akhir
  // Namun karena controller langsung mengirim response, kita perlu mencatat SEBELUM atau meng-override res.json
  
  // Cara yang lebih bersih untuk Clean Architecture: 
  // Biarkan use-case yang memicu event atau memanggil repository activity log.
  // Namun karena task meminta middleware, kita buat helper yang bisa dipanggil di controller
  // atau middleware yang meng-override res.json (risky but effective for "after-hook").
  
  const originalJson = res.json;
  
  res.json = function (data) {
    res.json = originalJson; // Kembalikan ke aslinya
    const response = res.json(data);
    
    // Hanya catat jika request sukses (2xx)
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
      const logData = {
        user_id: req.user.id,
        module: options.module,
        action: options.action,
        entity_type: options.entityType || options.module,
        entity_id: data.data?.id || parseInt(req.params.id) || 0,
        description: options.description || `${options.action} ${options.module}`,
        ip_address: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
        new_values: req.method !== 'GET' ? req.body : null
      };

      // Fire and forget
      prismaActivityLogRepository.create(logData).catch(err => {
        console.error('Failed to log activity:', err);
      });
    }
    
    return response;
  };

  next();
};

module.exports = activityLogger;
