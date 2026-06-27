import { z } from "zod";

export const createMissionSchema = z.object({
  courseId: z.string().uuid("ID Course tidak valid (harus format UUID)"),
  title: z.string().min(3, "Judul mission minimal harus 3 karakter"),
  description: z.string().min(10, "Deskripsi mission minimal harus 10 karakter"),
  orderNumber: z.number().int().min(1, "Nomor urut minimal bernilai 1"),
  xpReward: z.number().int().min(0, "XP reward tidak boleh bernilai negatif"),
});

export const updateMissionSchema = createMissionSchema.partial();

export const reorderMissionsSchema = z.object({
  courseId: z.string().uuid("ID Course tidak valid (harus format UUID)"),
  orderedIds: z.array(z.string().uuid("ID Mission tidak valid")).min(1, "Ordered IDs minimal harus berisi satu ID"),
});
