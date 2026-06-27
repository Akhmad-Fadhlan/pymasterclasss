import { createMissionSchema, updateMissionSchema, reorderMissionsSchema } from "@/validators/mission";
import { MissionRepository } from "@/repositories/MissionRepository";
import { CourseRepository } from "@/repositories/CourseRepository";
import { AuthService } from "@/services/AuthService";

export class MissionService {
  static async listMissions(courseId: string) {
    try {
      const missions = await MissionRepository.findManyByCourseId(courseId);
      return {
        success: true,
        message: "Misi berhasil diambil",
        data: missions,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data misi",
        errors: [error.message],
      };
    }
  }

  static async createMission(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menambahkan misi",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createMissionSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data misi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { courseId, title, description, orderNumber, xpReward } = validated.data;

    try {
      // 3. Verify course exists
      const course = await CourseRepository.findById(courseId);
      if (!course) {
        return {
          success: false,
          message: "Course tidak ditemukan",
          errors: ["Course tidak ditemukan"],
        };
      }

      // 4. Create mission record with auditor fields
      const mission = await MissionRepository.create({
        courseId,
        title,
        description,
        orderNumber,
        xpReward,
        createdBy: userId,
      });

      return {
        success: true,
        message: "Misi berhasil dibuat",
        data: mission,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat misi",
        errors: [error.message],
      };
    }
  }

  static async updateMission(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengubah misi",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updateMissionSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data misi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { title, description, orderNumber, xpReward } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await MissionRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Misi tidak ditemukan",
          errors: ["Misi tidak ditemukan"],
        };
      }

      // 4. Update mission with auditor fields
      const updated = await MissionRepository.update(id, {
        title,
        description,
        orderNumber,
        xpReward,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Misi berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui misi",
        errors: [error.message],
      };
    }
  }

  static async deleteMission(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus misi",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await MissionRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Misi tidak ditemukan",
          errors: ["Misi tidak ditemukan"],
        };
      }

      // 3. Delete mission
      const deleted = await MissionRepository.delete(id);
      return {
        success: true,
        message: "Misi berhasil dihapus",
        data: deleted,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus misi",
        errors: [error.message],
      };
    }
  }

  static async reorderMissions(userId: string, courseId: string, orderedIds: string[]) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengatur ulang urutan misi",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = reorderMissionsSchema.safeParse({ courseId, orderedIds });
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data reorder gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      // 3. Verify course exists
      const course = await CourseRepository.findById(courseId);
      if (!course) {
        return {
          success: false,
          message: "Course tidak ditemukan",
          errors: ["Course tidak ditemukan"],
        };
      }

      // 4. Fetch current missions in the course to verify ownership
      const currentMissions = await MissionRepository.findManyByCourseId(courseId);
      const currentIds = currentMissions.map((m) => m.id);

      // Verify that all provided IDs belong to this course
      const isValidSeq = orderedIds.every((id) => currentIds.includes(id));
      if (!isValidSeq) {
        return {
          success: false,
          message: "Bad Request: Beberapa ID misi tidak cocok dengan course ini",
          errors: ["ID Misi tidak valid untuk course yang diberikan"],
        };
      }

      // 5. Construct order updates
      const orders = orderedIds.map((id, index) => ({
        id,
        orderNumber: index + 1,
      }));

      // 6. Update orders atomically in transaction
      await MissionRepository.updateManyOrders(orders);

      // Fetch the updated mission list
      const updatedList = await MissionRepository.findManyByCourseId(courseId);

      return {
        success: true,
        message: "Urutan misi berhasil diperbarui",
        data: updatedList,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengatur ulang urutan misi",
        errors: [error.message],
      };
    }
  }
}
