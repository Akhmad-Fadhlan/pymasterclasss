import { createPracticeSchema, updatePracticeSchema, submitPracticeSchema } from "@/validators/practice";
import { PracticeRepository } from "@/repositories/PracticeRepository";
import { LessonRepository } from "@/repositories/LessonRepository";
import { AuthService } from "@/services/AuthService";
import { prisma } from "@/lib/prisma";

export class PracticeService {
  static async listPractices(lessonId: string) {
    try {
      const practices = await PracticeRepository.findManyByLessonId(lessonId);
      return {
        success: true,
        message: "Latihan berhasil diambil",
        data: practices,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data latihan",
        errors: [error.message],
      };
    }
  }

  static async createPractice(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menambahkan latihan",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createPracticeSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data latihan gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { lessonId, title, instruction, starterCode, expectedOutput } = validated.data;

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

      // 4. Create practice record with auditor fields
      const practice = await PracticeRepository.create({
        lessonId,
        title,
        instruction,
        starterCode,
        expectedOutput,
        createdBy: userId,
      });

      return {
        success: true,
        message: "Latihan berhasil dibuat",
        data: practice,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat latihan",
        errors: [error.message],
      };
    }
  }

  static async updatePractice(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengubah latihan",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updatePracticeSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data latihan gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { title, instruction, starterCode, expectedOutput } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await PracticeRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Latihan tidak ditemukan",
          errors: ["Latihan tidak ditemukan"],
        };
      }

      // 4. Update practice record with auditor fields
      const updated = await PracticeRepository.update(id, {
        title,
        instruction,
        starterCode,
        expectedOutput,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Latihan berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui latihan",
        errors: [error.message],
      };
    }
  }

  static async deletePractice(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus latihan",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await PracticeRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Latihan tidak ditemukan",
          errors: ["Latihan tidak ditemukan"],
        };
      }

      // 3. Delete practice record
      const deleted = await PracticeRepository.delete(id);
      return {
        success: true,
        message: "Latihan berhasil dihapus",
        data: deleted,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus latihan",
        errors: [error.message],
      };
    }
  }

  static async submitPractice(userId: string, input: any) {
    // 1. Validate submission Zod schema
    const validated = submitPracticeSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data submit gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { practiceId, submittedOutput } = validated.data;

    try {
      // 2. Find practice details
      const practice = await PracticeRepository.findById(practiceId);
      if (!practice) {
        return {
          success: false,
          message: "Latihan tidak ditemukan",
          errors: ["Latihan tidak ditemukan"],
        };
      }

      // 3. Compare outputs (Trimming whitespace and lowercasing for resilience)
      const expected = practice.expectedOutput.trim().replace(/\r\n/g, "\n");
      const submitted = submittedOutput.trim().replace(/\r\n/g, "\n");
      const passed = expected === submitted;

      if (passed) {
        // 4. Update student progress for this lesson to completed
        await prisma.progress.upsert({
          where: {
            userId_lessonId: {
              userId,
              lessonId: practice.lessonId,
            },
          },
          update: {
            completed: true,
            percentage: 100,
          },
          create: {
            userId,
            lessonId: practice.lessonId,
            completed: true,
            percentage: 100,
          },
        });

        // Track action in Activity logs
        const { ActivityLogService } = await import("@/services/ActivityLogService");
        await ActivityLogService.logActivity(
          userId,
          "SUBMIT_PRACTICE_SUCCESS",
          "LESSON",
          `Passed practice ID: ${practiceId}`
        );

        return {
          success: true,
          message: "Output sesuai, latihan berhasil diselesaikan!",
          data: { passed: true },
        };
      } else {
        return {
          success: true,
          message: "Output tidak sesuai dengan expected output. Silakan coba lagi.",
          data: { passed: false },
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan saat memeriksa latihan",
        errors: [error.message],
      };
    }
  }
}
