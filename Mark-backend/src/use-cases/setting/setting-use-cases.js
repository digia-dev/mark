class GetCompanyProfileUseCase {
  constructor({ settingRepository }) {
    this.settingRepository = settingRepository;
  }

  async execute() {
    return this.settingRepository.getCompanyProfile();
  }
}

class UpdateCompanyProfileUseCase {
  constructor({ settingRepository }) {
    this.settingRepository = settingRepository;
  }

  async execute(data) {
    return this.settingRepository.updateCompanyProfile(data);
  }
}

class GetSettingsUsersUseCase {
  constructor({ settingRepository }) {
    this.settingRepository = settingRepository;
  }

  async execute() {
    return this.settingRepository.getUsers();
  }
}

class GetPreferencesUseCase {
  constructor({ settingRepository }) {
    this.settingRepository = settingRepository;
  }

  async execute() {
    return this.settingRepository.getPreferences();
  }
}

class UpdatePreferencesUseCase {
  constructor({ settingRepository }) {
    this.settingRepository = settingRepository;
  }

  async execute(data) {
    return this.settingRepository.updatePreferences(data);
  }
}

module.exports = {
  GetCompanyProfileUseCase,
  UpdateCompanyProfileUseCase,
  GetSettingsUsersUseCase,
  GetPreferencesUseCase,
  UpdatePreferencesUseCase
};
