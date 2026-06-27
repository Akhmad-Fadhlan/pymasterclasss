import { NotificationRepository } from "@/repositories/NotificationRepository";

export class NotificationService {
  static async getUserNotifications(userId: string) {
    try {
      const notifications = await NotificationRepository.findManyByUserId(userId);
      return {
        success: true,
        message: "Notifikasi berhasil diambil",
        data: notifications,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data notifikasi",
        errors: [error.message],
      };
    }
  }

  static async markAsRead(userId: string, notificationId: string) {
    try {
      const notification = await NotificationRepository.findById(notificationId);
      if (!notification) {
        return {
          success: false,
          message: "Notifikasi tidak ditemukan",
          errors: ["Notifikasi tidak ditemukan"],
        };
      }

      // Validate ownership
      if (notification.userId !== userId) {
        return {
          success: false,
          message: "Forbidden: Anda tidak memiliki akses ke notifikasi ini",
          errors: ["Forbidden"],
        };
      }

      const updated = await NotificationRepository.update(notificationId, {
        isRead: true,
      });

      return {
        success: true,
        message: "Notifikasi ditandai sebagai dibaca",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menandai notifikasi sebagai dibaca",
        errors: [error.message],
      };
    }
  }
}
