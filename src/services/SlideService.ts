import { createSlideSchema, updateSlideSchema, reorderSlidesSchema } from "@/validators/slide";
import { SlideRepository } from "@/repositories/SlideRepository";
import { LessonRepository } from "@/repositories/LessonRepository";
import { AuthService } from "@/services/AuthService";

export class SlideService {
  static async listSlides(lessonId: string) {
    try {
      const slides = await SlideRepository.findManyByLessonId(lessonId);
      return {
        success: true,
        message: "Slide berhasil diambil",
        data: slides,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data slide",
        errors: [error.message],
      };
    }
  }

  static async createSlide(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menambahkan slide",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createSlideSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data slide gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { lessonId, title, content, orderNumber } = validated.data;

    try {
      // 3. Verify lesson exists
      const lesson = await LessonRepository.findById(lessonId);
      if (!lesson) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      // 4. Create slide with auditor fields
      const slide = await SlideRepository.create({
        lessonId,
        title,
        content: content as any,
        orderNumber,
        createdBy: userId,
      });

      return {
        success: true,
        message: "Slide berhasil dibuat",
        data: slide,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat slide",
        errors: [error.message],
      };
    }
  }

  static async updateSlide(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengubah slide",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updateSlideSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data slide gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { title, content, orderNumber } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await SlideRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Slide tidak ditemukan",
          errors: ["Slide tidak ditemukan"],
        };
      }

      // 4. Update slide with auditor fields
      const updated = await SlideRepository.update(id, {
        title,
        content: content as any,
        orderNumber,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Slide berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui slide",
        errors: [error.message],
      };
    }
  }

  static async deleteSlide(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus slide",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await SlideRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Slide tidak ditemukan",
          errors: ["Slide tidak ditemukan"],
        };
      }

      // 3. Delete slide
      const deleted = await SlideRepository.delete(id);
      return {
        success: true,
        message: "Slide berhasil dihapus",
        data: deleted,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus slide",
        errors: [error.message],
      };
    }
  }

  static async reorderSlides(userId: string, lessonId: string, orderedIds: string[]) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengatur ulang urutan slide",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = reorderSlidesSchema.safeParse({ lessonId, orderedIds });
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data reorder gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      // 3. Verify lesson exists
      const lesson = await LessonRepository.findById(lessonId);
      if (!lesson) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      // 4. Fetch current slides in the lesson to verify ownership
      const currentSlides = await SlideRepository.findManyByLessonId(lessonId);
      const currentIds = currentSlides.map((s) => s.id);

      // Verify that all provided IDs belong to this lesson
      const isValidSeq = orderedIds.every((id) => currentIds.includes(id));
      if (!isValidSeq) {
        return {
          success: false,
          message: "Bad Request: Beberapa ID slide tidak cocok dengan lesson ini",
          errors: ["ID Slide tidak valid untuk lesson yang diberikan"],
        };
      }

      // 5. Construct order updates
      const orders = orderedIds.map((id, index) => ({
        id,
        orderNumber: index + 1,
      }));

      // 6. Update orders atomically in transaction
      await SlideRepository.updateManyOrders(orders);

      // Fetch the updated slide list
      const updatedList = await SlideRepository.findManyByLessonId(lessonId);

      return {
        success: true,
        message: "Urutan slide berhasil diperbarui",
        data: updatedList,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengatur ulang urutan slide",
        errors: [error.message],
      };
    }
  }
}
