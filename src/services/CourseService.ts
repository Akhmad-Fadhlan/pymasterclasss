import { createCourseSchema, updateCourseSchema } from "@/validators/course";
import { CourseRepository } from "@/repositories/CourseRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { AuthService } from "@/services/AuthService";

export class CourseService {
  static async listCourses(params: {
    page?: number;
    limit?: number;
    status?: any;
    categoryId?: string;
    level?: any;
    search?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const status = params.status || "PUBLISHED"; // Default public list queries only PUBLISHED courses
    const categoryId = params.categoryId;
    const level = params.level;
    const search = params.search;

    try {
      const result = await CourseRepository.findManyPaginated({
        page,
        limit,
        status,
        categoryId,
        level,
        search,
      });

      return {
        success: true,
        message: "Course berhasil diambil",
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data course",
        errors: [error.message],
      };
    }
  }

  static async getCourseDetails(slug: string) {
    try {
      const course = await CourseRepository.findBySlug(slug);
      if (!course) {
        return {
          success: false,
          message: "Course tidak ditemukan",
          errors: ["Course tidak ditemukan"],
        };
      }

      return {
        success: true,
        message: "Detail course berhasil diambil",
        data: course,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil detail course",
        errors: [error.message],
      };
    }
  }

  static async createCourse(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat membuat course",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createCourseSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data course gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const {
      title,
      slug,
      shortDescription,
      description,
      thumbnail,
      level,
      duration,
      price,
      categoryId,
      status,
    } = validated.data;

    try {
      // 3. Confirm category exists
      const category = await CategoryRepository.findById(categoryId);
      if (!category) {
        return {
          success: false,
          message: "Kategori tidak ditemukan",
          errors: ["Kategori tidak ditemukan"],
        };
      }

      // 4. Ensure slug is unique
      const existingSlug = await CourseRepository.findBySlug(slug);
      if (existingSlug) {
        return {
          success: false,
          message: "Slug course sudah terdaftar",
          errors: ["Slug sudah digunakan"],
        };
      }

      // 5. Create course with auditor tracking fields
      const course = await CourseRepository.create({
        title,
        slug,
        shortDescription,
        description,
        thumbnail,
        level,
        duration,
        price,
        categoryId,
        status: status || "DRAFT",
        createdBy: userId,
      });

      return {
        success: true,
        message: "Course berhasil dibuat",
        data: course,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat course",
        errors: [error.message],
      };
    }
  }

  static async updateCourse(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengubah course",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updateCourseSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data course gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const {
      title,
      slug,
      shortDescription,
      description,
      thumbnail,
      level,
      duration,
      price,
      categoryId,
      status,
    } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await CourseRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Course tidak ditemukan",
          errors: ["Course tidak ditemukan"],
        };
      }

      // 4. Confirm category exists if changed
      if (categoryId && categoryId !== existing.categoryId) {
        const category = await CategoryRepository.findById(categoryId);
        if (!category) {
          return {
            success: false,
            message: "Kategori tidak ditemukan",
            errors: ["Kategori tidak ditemukan"],
          };
        }
      }

      // 5. Ensure slug is unique if changed
      if (slug && slug !== existing.slug) {
        const existingSlug = await CourseRepository.findBySlug(slug);
        if (existingSlug) {
          return {
            success: false,
            message: "Slug course sudah terdaftar",
            errors: ["Slug sudah digunakan"],
          };
        }
      }

      // 6. Update course with auditor tracking fields
      const updated = await CourseRepository.update(id, {
        title,
        slug,
        shortDescription,
        description,
        thumbnail,
        level,
        duration,
        price,
        categoryId,
        status,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Course berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui course",
        errors: [error.message],
      };
    }
  }

  static async deleteCourse(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus course",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await CourseRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Course tidak ditemukan",
          errors: ["Course tidak ditemukan"],
        };
      }

      // 3. Soft Delete course (set status to ARCHIVED)
      const archived = await CourseRepository.softDelete(id);

      return {
        success: true,
        message: "Course berhasil diarsipkan (soft delete)",
        data: archived,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus course",
        errors: [error.message],
      };
    }
  }

  static async searchCourses(params: {
    keyword?: string;
    category?: string;
    level?: any;
    page?: number;
    limit?: number;
  }) {
    const keyword = params.keyword || undefined;
    const category = params.category || undefined; // can be category slug or category ID
    const level = params.level || undefined;
    const page = params.page || 1;
    const limit = params.limit || 10;

    try {
      let categoryId: string | undefined = undefined;

      // If category parameter is present and is not a UUID, retrieve category by slug
      if (category) {
        const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(category);
        if (isUuid) {
          categoryId = category;
        } else {
          const categoryRecord = await CategoryRepository.findBySlug(category);
          if (categoryRecord) {
            categoryId = categoryRecord.id;
          }
        }
      }

      const result = await CourseRepository.findManyPaginated({
        page,
        limit,
        status: "PUBLISHED", // Search query only reveals PUBLISHED courses
        categoryId,
        level,
        search: keyword,
      });

      return {
        success: true,
        message: "Pencarian berhasil diselesaikan",
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Pencarian gagal",
        errors: [error.message],
      };
    }
  }
}
