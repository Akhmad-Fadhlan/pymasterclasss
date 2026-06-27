import { z } from "zod";

export const createPracticeSchema = z.object({
  lessonId: z.string().uuid("ID Lesson tidak valid (harus format UUID)"),
  title: z.string().min(3, "Judul practice minimal harus 3 karakter"),
  instruction: z.string().min(10, "Instruksi practice minimal harus 10 karakter"),
  starterCode: z.string().min(1, "Starter code tidak boleh kosong"),
  expectedOutput: z.string().min(1, "Expected output tidak boleh kosong"),
});

export const updatePracticeSchema = createPracticeSchema.partial();

export const submitPracticeSchema = z.object({
  practiceId: z.string().uuid("ID Practice tidak valid (harus format UUID)"),
  code: z.string().min(1, "Code submissions tidak boleh kosong"),
  submittedOutput: z.string().min(1, "Output yang disubmit tidak boleh kosong"),
});
