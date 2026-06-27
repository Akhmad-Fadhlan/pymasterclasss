import { ActivityLogRepository } from "@/repositories/ActivityLogRepository";

export class ActivityLogService {
  static async logActivity(userId: string, action: string, module: string, ipAddress?: string) {
    try {
      const log = await ActivityLogRepository.create({
        userId,
        action,
        module,
        ipAddress: ipAddress || null,
      });
      return {
        success: true,
        message: "Log aktivitas berhasil dicatat",
        data: log,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mencatat log aktivitas",
        errors: [error.message],
      };
    }
  }

  static async getUserLogs(userId: string) {
    try {
      const logs = await ActivityLogRepository.findManyByUserId(userId);
      return {
        success: true,
        message: "Log aktivitas berhasil diambil",
        data: logs,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil log aktivitas",
        errors: [error.message],
      };
    }
  }
}
