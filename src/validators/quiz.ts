import { z } from "zod";

export const createQuizSchema = z.object({
  lessonId: z.string().uuid("ID Lesson tidak valid (harus format UUID)"),
  title: z.string().min(3, "Judul kuis minimal harus 3 karakter"),
  passingScore: z.number().int().min(0).max(100, "Passing score harus bernilai antara 0 sampai 100"),
  duration: z.number().int().min(1, "Durasi kuis minimal bernilai 1 menit"),
});

export const updateQuizSchema = createQuizSchema.partial();

export const createQuestionSchema = z.object({
  quizId: z.string().uuid("ID Quiz tidak valid (harus format UUID)"),
  question: z.string().min(5, "Teks pertanyaan minimal harus 5 karakter"),
  explanation: z.string().min(5, "Teks penjelasan minimal harus 5 karakter"),
  orderNumber: z.number().int().min(1, "Nomor urut minimal bernilai 1"),
});

export const updateQuestionSchema = createQuestionSchema.partial();

export const createAnswerSchema = z.object({
  questionId: z.string().uuid("ID Question tidak valid (harus format UUID)"),
  answer: z.string().min(1, "Jawaban tidak boleh kosong"),
  isCorrect: z.boolean({ invalid_type_error: "isCorrect harus bernilai boolean" }),
});

export const updateAnswerSchema = createAnswerSchema.partial();

export const startQuizSchema = z.object({
  quizId: z.string().uuid("ID Quiz tidak valid (harus format UUID)"),
});

export const submitQuizSchema = z.object({
  quizId: z.string().uuid("ID Quiz tidak valid (harus format UUID)"),
  startedAt: z.string().datetime("startedAt harus berformat ISO Date"),
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid("ID Question tidak valid (harus format UUID)"),
        answerId: z.string().uuid("ID Answer tidak valid (harus format UUID)"),
      })
    )
    .min(1, "Jawaban kuis minimal harus berisi satu jawaban"),
});
