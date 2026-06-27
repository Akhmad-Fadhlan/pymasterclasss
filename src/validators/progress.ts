import { z } from "zod";

export const updateProgressSchema = z.object({
  lessonId: z.string().uuid("ID Lesson tidak valid (harus format UUID)"),
  percentage: z.number().min(0).max(100, "Percentage harus bernilai antara 0 sampai 100"),
  completed: z.boolean().optional(),
});
