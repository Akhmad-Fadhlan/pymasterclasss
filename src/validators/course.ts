import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Judul course minimal harus 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal harus 3 karakter")
    .regex(/^[a-z0-9_-]+$/, "Slug hanya boleh mengandung huruf kecil, angka, strip (-), dan underscore (_)"),
  shortDescription: z.string().min(10, "Deskripsi singkat minimal harus 10 karakter"),
  description: z.string().min(20, "Deskripsi lengkap minimal harus 20 karakter"),
  thumbnail: z.string().url("Format URL thumbnail tidak valid").optional().nullable(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
    errorMap: () => ({ message: "Level harus BEGINNER, INTERMEDIATE, atau ADVANCED" }),
  }),
  duration: z.number().int().min(1, "Durasi belajar minimal bernilai 1 menit"),
  price: z.number().min(0, "Harga course tidak boleh bernilai negatif"),
  categoryId: z.string().uuid("ID Kategori tidak valid (harus format UUID)"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export const updateCourseSchema = createCourseSchema.partial();
