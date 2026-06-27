import { z } from "zod";

export const createLessonSchema = z.object({
  missionId: z.string().uuid("ID Mission tidak valid (harus format UUID)"),
  title: z.string().min(3, "Judul lesson minimal harus 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal harus 3 karakter")
    .regex(/^[a-z0-9_-]+$/, "Slug hanya boleh mengandung huruf kecil, angka, strip (-), dan underscore (_)"),
  duration: z.number().int().min(1, "Durasi belajar minimal bernilai 1 menit"),
  orderNumber: z.number().int().min(1, "Nomor urut minimal bernilai 1"),
});

export const updateLessonSchema = createLessonSchema.partial();

export const reorderLessonsSchema = z.object({
  missionId: z.string().uuid("ID Mission tidak valid (harus format UUID)"),
  orderedIds: z.array(z.string().uuid("ID Lesson tidak valid")).min(1, "Ordered IDs minimal harus berisi satu ID"),
});
