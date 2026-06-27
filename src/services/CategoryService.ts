import { createCategorySchema, updateCategorySchema } from "@/validators/category";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { AuthService } from "@/services/AuthService";

export class CategoryService {
  static async listCategories() {
    try {
      const categories = await CategoryRepository.findAll();
      return {
        success: true,
        message: "Kategori berhasil diambil",
        data: categories,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil kategori",
        errors: [error.message],
      };
    }
  }

  static async createCategory(userId: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat membuat kategori baru",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = createCategorySchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data kategori gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { name, slug, icon, description, orderNumber } = validated.data;

    try {
      // 3. Prevent duplicate slugs
      const existingSlug = await CategoryRepository.findBySlug(slug);
      if (existingSlug) {
        return {
          success: false,
          message: "Slug kategori sudah terdaftar",
          errors: ["Slug sudah digunakan"],
        };
      }

      // 4. Create category record with auditor tracking fields
      const category = await CategoryRepository.create({
        name,
        slug,
        icon,
        description,
        orderNumber,
        createdBy: userId,
      });

      return {
        success: true,
        message: "Kategori berhasil dibuat",
        data: category,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal membuat kategori",
        errors: [error.message],
      };
    }
  }

  static async updateCategory(userId: string, id: string, input: any) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat memperbarui kategori",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate input
    const validated = updateCategorySchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data kategori gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { name, slug, icon, description, orderNumber } = validated.data;

    try {
      // 3. Confirm existence
      const existing = await CategoryRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Kategori tidak ditemukan",
          errors: ["Kategori tidak ditemukan"],
        };
      }

      // 4. Ensure slug is unique if it's changing
      if (slug && slug !== existing.slug) {
        const existingSlug = await CategoryRepository.findBySlug(slug);
        if (existingSlug) {
          return {
            success: false,
            message: "Slug kategori sudah digunakan oleh kategori lain",
            errors: ["Slug sudah digunakan"],
          };
        }
      }

      // 5. Update record with auditor tracking fields
      const updated = await CategoryRepository.update(id, {
        name,
        slug,
        icon,
        description,
        orderNumber,
        updatedBy: userId,
      });

      return {
        success: true,
        message: "Kategori berhasil diperbarui",
        data: updated,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui kategori",
        errors: [error.message],
      };
    }
  }

  static async deleteCategory(userId: string, id: string) {
    // 1. Authorize: Admin Only
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat menghapus kategori",
        errors: ["Forbidden"],
      };
    }

    try {
      // 2. Confirm existence
      const existing = await CategoryRepository.findById(id);
      if (!existing) {
        return {
          success: false,
          message: "Kategori tidak ditemukan",
          errors: ["Kategori tidak ditemukan"],
        };
      }

      // 3. Delete category
      const deleted = await CategoryRepository.delete(id);
      return {
        success: true,
        message: "Kategori berhasil dihapus",
        data: deleted,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal menghapus kategori",
        errors: [error.message],
      };
    }
  }
}
