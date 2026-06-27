import { SettingsRepository } from "@/repositories/SettingsRepository";

export class SettingsService {
  static async getSettings() {
    try {
      const settings = await SettingsRepository.getSettings();
      return {
        success: true,
        message: "Pengaturan berhasil diambil",
        data: settings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil pengaturan",
        errors: [error.message],
      };
    }
  }

  static async updateSettings(id: string, input: any) {
    try {
      const updated = await SettingsRepository.update(id, input);
      return {
        success: true,
        message: "Pengaturan berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui pengaturan",
        errors: [error.message],
      };
    }
  }
}
