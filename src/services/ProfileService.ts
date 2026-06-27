import { profileSetupSchema, updateProfileSchema } from "@/validators/auth";
import { UserRepository } from "@/repositories/UserRepository";

export class ProfileService {
  static async setupProfile(userId: string, input: any) {
    // 1. Zod Validation
    const validated = profileSetupSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi setup profil gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { fullName, username } = validated.data;

    try {
      // 2. Check if username is taken by a different user
      const existingUser = await UserRepository.findByUsername(username);
      if (existingUser && existingUser.id !== userId) {
        return {
          success: false,
          message: "Username sudah digunakan",
          errors: ["Username sudah digunakan"],
        };
      }

      // 3. Update profile fields
      const profile = await UserRepository.update(userId, {
        fullName,
        username,
      });

      return {
        success: true,
        message: "Profil berhasil dikonfigurasi",
        data: profile,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengkonfigurasi profil",
        errors: [error.message],
      };
    }
  }

  static async getProfile(userId: string) {
    try {
      const profile = await UserRepository.findById(userId);
      if (!profile) {
        return {
          success: false,
          message: "Profil tidak ditemukan di database",
          errors: ["Profil tidak ditemukan"],
        };
      }

      return {
        success: true,
        message: "Profil berhasil diambil",
        data: profile,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data profil",
        errors: [error.message],
      };
    }
  }

  static async updateProfile(userId: string, input: any) {
    // 1. Zod Validation
    const validated = updateProfileSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi pembaruan profil gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { avatar, bio, phone } = validated.data;

    try {
      // 2. Update profile columns
      const profile = await UserRepository.update(userId, {
        avatar,
        bio,
        phone,
      });

      return {
        success: true,
        message: "Profil berhasil diperbarui",
        data: profile,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui profil",
        errors: [error.message],
      };
    }
  }
}
