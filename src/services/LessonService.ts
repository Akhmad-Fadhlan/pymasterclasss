import { createLessonSchema, updateLessonSchema, reorderLessonsSchema } from "@/validators/lesson";
import { LessonRepository } from "@/repositories/LessonRepository";
import { MissionRepository } from "@/repositories/MissionRepository";
import { AuthService } from "@/services/AuthService";

export class LessonService {
  static async listLessons(missionId: string) {
    try {
      const lessons = await LessonRepository.findManyByMissionId(missionId);
      return {
        success: true,
        message: "Lesson berhasil diambil",
        data: lessons,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data lesson",
        errors: [error.message],
      };
    }
  }

  static async getLessonDetail(id: string) {
    try {
      const lesson = await LessonRepository.findByIdWithContent(id);
      if (!lesson) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      return {
        success: true,
        message: "Detail lesson berhasil diambil",
        data: lesson,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil detail lesson",
        errors: [error.message],
      };
    }
  }

  static async createLesson(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menambahkan lesson",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createLessonSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data lesson gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { missionId, title, slug, duration, orderNumber } = validated.data;

    try {
      // 3. Verify mission exists
      const mission = await MissionRepository.findById(missionId);
      if (!mission) {
        return {
          success: false,
          message: "Misi tidak ditemukan",
          errors: ["Misi tidak ditemukan"],
        };
      }

      // 4. Ensure slug is unique
      const existingSlug = await LessonRepository.findBySlug(slug);
      if (existingSlug) {
        return {
          success: false,
          message: "Slug lesson sudah terdaftar",
          errors: ["Slug sudah digunakan"],
        };
      }

      // 5. Create lesson with auditor fields
      const lesson = await LessonRepository.create({
        missionId,
        title,
        slug,
        duration,
        orderNumber,
        createdBy: userId,
      });

      return {
        success: true,
        message: "Lesson berhasil dibuat",
        data: lesson,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat lesson",
        errors: [error.message],
      };
    }
  }

  static async updateLesson(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengubah lesson",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updateLessonSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data lesson gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { title, slug, duration, orderNumber } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await LessonRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      // 4. Ensure slug is unique if changed
      if (slug && slug !== existing.slug) {
        const existingSlug = await LessonRepository.findBySlug(slug);
        if (existingSlug) {
          return {
            success: false,
            message: "Slug lesson sudah terdaftar",
            errors: ["Slug sudah digunakan"],
          };
        }
      }

      // 5. Update lesson with auditor fields
      const updated = await LessonRepository.update(id, {
        title,
        slug,
        duration,
        orderNumber,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Lesson berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui lesson",
        errors: [error.message],
      };
    }
  }

  static async deleteLesson(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus lesson",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await LessonRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      // 3. Delete lesson
      const deleted = await LessonRepository.delete(id);
      return {
        success: true,
        message: "Lesson berhasil dihapus",
        data: deleted,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus lesson",
        errors: [error.message],
      };
    }
  }

  static async reorderLessons(userId: string, missionId: string, orderedIds: string[]) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengatur ulang urutan lesson",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = reorderLessonsSchema.safeParse({ missionId, orderedIds });
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data reorder gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      // 3. Verify mission exists
      const mission = await MissionRepository.findById(missionId);
      if (!mission) {
        return {
          success: false,
          message: "Misi tidak ditemukan",
          errors: ["Misi tidak ditemukan"],
        };
      }

      // 4. Fetch current lessons in the mission to verify ownership
      const currentLessons = await LessonRepository.findManyByMissionId(missionId);
      const currentIds = currentLessons.map((l) => l.id);

      // Verify that all provided IDs belong to this mission
      const isValidSeq = orderedIds.every((id) => currentIds.includes(id));
      if (!isValidSeq) {
        return {
          success: false,
          message: "Bad Request: Beberapa ID lesson tidak cocok dengan misi ini",
          errors: ["ID Lesson tidak valid untuk misi yang diberikan"],
        };
      }

      // 5. Construct order updates
      const orders = orderedIds.map((id, index) => ({
        id,
        orderNumber: index + 1,
      }));

      // 6. Update orders atomically in transaction
      await LessonRepository.updateManyOrders(orders);

      // Fetch the updated lesson list
      const updatedList = await LessonRepository.findManyByMissionId(missionId);

      return {
        success: true,
        message: "Urutan lesson berhasil diperbarui",
        data: updatedList,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengatur ulang urutan lesson",
        errors: [error.message],
      };
    }
  }
}
