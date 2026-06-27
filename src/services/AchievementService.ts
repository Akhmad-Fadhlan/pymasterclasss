import { AchievementRepository } from "@/repositories/AchievementRepository";

export class AchievementService {
  static async getAllAchievements() {
    try {
      const achievements = await AchievementRepository.findAll();
      return {
        success: true,
        message: "Daftar pencapaian berhasil diambil",
        data: achievements,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil daftar pencapaian",
        errors: [error.message],
      };
    }
  }

  static async getUserAchievements(userId: string) {
    try {
      const userAchievements = await AchievementRepository.findUserAchievements(userId);
      return {
        success: true,
        message: "Pencapaian pengguna berhasil diambil",
        data: userAchievements,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil pencapaian pengguna",
        errors: [error.message],
      };
    }
  }
}
