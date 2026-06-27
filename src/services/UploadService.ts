import { supabase } from "@/lib/supabase";
import { UserRepository } from "@/repositories/UserRepository";
import { ActivityLogService } from "@/services/ActivityLogService";

export class UploadService {
  static async uploadAvatar(userId: string, file: File) {
    // 1. Validate file MIME type (only jpg, jpeg, png, webp)
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      return {
        success: false,
        message: "Format file tidak didukung. Hanya JPG, PNG, dan WEBP yang diizinkan.",
        errors: ["Format file tidak valid"],
      };
    }

    // 2. Validate file size (max 5 MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        message: "Ukuran file melebihi batas maksimum 5 MB.",
        errors: ["Ukuran file terlalu besar"],
      };
    }

    try {
      // 3. Rename file using UUID to prevent collisions and name-hijacks
      const crypto = await import("crypto");
      const fileId = crypto.randomUUID();
      const extension = file.name.split(".").pop();
      const fileName = `${fileId}.${extension}`;

      // Convert File to ArrayBuffer/Buffer for server environment uploading compatibility
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // 4. Upload file to Supabase avatars storage bucket
      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return {
          success: false,
          message: "Gagal mengunggah avatar ke Supabase Storage: " + error.message,
          errors: [error.message],
        };
      }

      // 5. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // 6. Update user profile database record
      await UserRepository.update(userId, {
        avatar: publicUrl,
      });

      // 7. Register upload to activity logs
      await ActivityLogService.logActivity(
        userId,
        `UPLOAD_AVATAR`,
        "USER",
        `Uploaded: ${fileName}`
      );

      return {
        success: true,
        message: "Avatar berhasil diperbarui",
        data: {
          avatarUrl: publicUrl,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mengunggah avatar",
        errors: [error.message],
      };
    }
  }

  static async uploadCourseThumbnail(userId: string, file: File) {
    // 1. Authorize: Admin Only
    const { AuthService } = await import("@/services/AuthService");
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return {
        success: false,
        message: "Forbidden: Hanya Admin yang dapat mengunggah thumbnail",
        errors: ["Forbidden"],
      };
    }

    // 2. Validate file MIME type (only jpg, jpeg, png, webp)
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      return {
        success: false,
        message: "Format file tidak didukung. Hanya JPG, PNG, dan WEBP yang diizinkan.",
        errors: ["Format file tidak valid"],
      };
    }

    // 3. Validate file size (max 5 MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        message: "Ukuran file melebihi batas maksimum 5 MB.",
        errors: ["Ukuran file terlalu besar"],
      };
    }

    try {
      // 4. Rename using UUID
      const crypto = await import("crypto");
      const fileId = crypto.randomUUID();
      const extension = file.name.split(".").pop();
      const fileName = `${fileId}.${extension}`;

      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // 5. Upload to Supabase course-thumbnail bucket
      const { error } = await supabase.storage
        .from("course-thumbnail")
        .upload(fileName, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return {
          success: false,
          message: "Gagal mengunggah thumbnail ke Supabase Storage: " + error.message,
          errors: [error.message],
        };
      }

      // 6. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("course-thumbnail")
        .getPublicUrl(fileName);

      // 7. Log upload activity
      await ActivityLogService.logActivity(
        userId,
        `UPLOAD_COURSE_THUMBNAIL`,
        "COURSE",
        `Uploaded: ${fileName}`
      );

      return {
        success: true,
        message: "Thumbnail berhasil diunggah",
        data: {
          thumbnailUrl: publicUrl,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mengunggah thumbnail",
        errors: [error.message],
      };
    }
  }
}
