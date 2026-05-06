/**
 * Get Activity Log Stats Use Case
 */
class GetActivityLogStatsUseCase {
  constructor({ activityLogRepository }) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute() {
    return await this.activityLogRepository.getStats();
  }
}

module.exports = GetActivityLogStatsUseCase;
