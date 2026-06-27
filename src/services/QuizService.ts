import {
  createQuizSchema,
  updateQuizSchema,
  createQuestionSchema,
  updateQuestionSchema,
  createAnswerSchema,
  updateAnswerSchema,
  submitQuizSchema,
} from "@/validators/quiz";
import { QuizRepository } from "@/repositories/QuizRepository";
import { LessonRepository } from "@/repositories/LessonRepository";
import { AuthService } from "@/services/AuthService";
import { prisma } from "@/lib/prisma";

export class QuizService {
  // Quiz CRUD
  static async getQuizByLessonId(lessonId: string) {
    try {
      const quiz = await QuizRepository.findQuizByLessonId(lessonId);
      if (!quiz) {
        return {
          success: false,
          message: "Kuis tidak ditemukan untuk lesson ini",
          errors: ["Kuis tidak ditemukan"],
        };
      }

      return {
        success: true,
        message: "Kuis berhasil diambil",
        data: quiz,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil data kuis",
        errors: [error.message],
      };
    }
  }

  static async createQuiz(userId: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat membuat kuis", errors: ["Forbidden"] };
    }

    const validated = createQuizSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { lessonId, title, passingScore, duration } = validated.data;

    try {
      const lesson = await LessonRepository.findById(lessonId);
      if (!lesson) {
        return { success: false, message: "Lesson tidak ditemukan", errors: ["Lesson tidak ditemukan"] };
      }

      const quiz = await QuizRepository.createQuiz({
        lessonId,
        title,
        passingScore,
        duration,
        createdBy: userId,
      });

      return { success: true, message: "Kuis berhasil dibuat", data: quiz };
    } catch (error: any) {
      return { success: false, message: "Gagal membuat kuis", errors: [error.message] };
    }
  }

  static async updateQuiz(userId: string, id: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat memperbarui kuis", errors: ["Forbidden"] };
    }

    const validated = updateQuizSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      const existing = await QuizRepository.findQuizById(id);
      if (!existing) {
        return { success: false, message: "Kuis tidak ditemukan", errors: ["Kuis tidak ditemukan"] };
      }

      const updated = await QuizRepository.updateQuiz(id, {
        ...validated.data,
        updatedBy: userId,
      });

      return { success: true, message: "Kuis berhasil diperbarui", data: updated };
    } catch (error: any) {
      return { success: false, message: "Gagal memperbarui kuis", errors: [error.message] };
    }
  }

  static async deleteQuiz(userId: string, id: string) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat menghapus kuis", errors: ["Forbidden"] };
    }

    try {
      const existing = await QuizRepository.findQuizById(id);
      if (!existing) {
        return { success: false, message: "Kuis tidak ditemukan", errors: ["Kuis tidak ditemukan"] };
      }

      const deleted = await QuizRepository.deleteQuiz(id);
      return { success: true, message: "Kuis berhasil dihapus", data: deleted };
    } catch (error: any) {
      return { success: false, message: "Gagal menghapus kuis", errors: [error.message] };
    }
  }

  // Question CRUD
  static async createQuestion(userId: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat menambahkan pertanyaan", errors: ["Forbidden"] };
    }

    const validated = createQuestionSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { quizId, question, explanation, orderNumber } = validated.data;

    try {
      const quiz = await QuizRepository.findQuizById(quizId);
      if (!quiz) {
        return { success: false, message: "Kuis tidak ditemukan", errors: ["Kuis tidak ditemukan"] };
      }

      const record = await QuizRepository.createQuestion({
        quizId,
        question,
        explanation,
        orderNumber,
      });

      return { success: true, message: "Pertanyaan berhasil ditambahkan", data: record };
    } catch (error: any) {
      return { success: false, message: "Gagal membuat pertanyaan", errors: [error.message] };
    }
  }

  static async updateQuestion(userId: string, id: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat memperbarui pertanyaan", errors: ["Forbidden"] };
    }

    const validated = updateQuestionSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      const existing = await QuizRepository.findQuestionById(id);
      if (!existing) {
        return { success: false, message: "Pertanyaan tidak ditemukan", errors: ["Pertanyaan tidak ditemukan"] };
      }

      const updated = await QuizRepository.updateQuestion(id, validated.data);
      return { success: true, message: "Pertanyaan berhasil diperbarui", data: updated };
    } catch (error: any) {
      return { success: false, message: "Gagal memperbarui pertanyaan", errors: [error.message] };
    }
  }

  static async deleteQuestion(userId: string, id: string) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat menghapus pertanyaan", errors: ["Forbidden"] };
    }

    try {
      const existing = await QuizRepository.findQuestionById(id);
      if (!existing) {
        return { success: false, message: "Pertanyaan tidak ditemukan", errors: ["Pertanyaan tidak ditemukan"] };
      }

      const deleted = await QuizRepository.deleteQuestion(id);
      return { success: true, message: "Pertanyaan berhasil dihapus", data: deleted };
    } catch (error: any) {
      return { success: false, message: "Gagal menghapus pertanyaan", errors: [error.message] };
    }
  }

  // Answer CRUD
  static async createAnswer(userId: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat menambahkan jawaban", errors: ["Forbidden"] };
    }

    const validated = createAnswerSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { questionId, answer, isCorrect } = validated.data;

    try {
      const question = await QuizRepository.findQuestionById(questionId);
      if (!question) {
        return { success: false, message: "Pertanyaan tidak ditemukan", errors: ["Pertanyaan tidak ditemukan"] };
      }

      const record = await QuizRepository.createAnswer({
        questionId,
        answer,
        isCorrect,
      });

      return { success: true, message: "Jawaban berhasil ditambahkan", data: record };
    } catch (error: any) {
      return { success: false, message: "Gagal membuat jawaban", errors: [error.message] };
    }
  }

  static async updateAnswer(userId: string, id: string, input: any) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat memperbarui jawaban", errors: ["Forbidden"] };
    }

    const validated = updateAnswerSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    try {
      const existing = await QuizRepository.findAnswerById(id);
      if (!existing) {
        return { success: false, message: "Jawaban tidak ditemukan", errors: ["Jawaban tidak ditemukan"] };
      }

      const updated = await QuizRepository.updateAnswer(id, validated.data);
      return { success: true, message: "Jawaban berhasil diperbarui", data: updated };
    } catch (error: any) {
      return { success: false, message: "Gagal memperbarui jawaban", errors: [error.message] };
    }
  }

  static async deleteAnswer(userId: string, id: string) {
    const isAdmin = await AuthService.verifyRole(userId, ["ADMIN"]);
    if (!isAdmin) {
      return { success: false, message: "Forbidden: Hanya Admin yang dapat menghapus jawaban", errors: ["Forbidden"] };
    }

    try {
      const existing = await QuizRepository.findAnswerById(id);
      if (!existing) {
        return { success: false, message: "Jawaban tidak ditemukan", errors: ["Jawaban tidak ditemukan"] };
      }

      const deleted = await QuizRepository.deleteAnswer(id);
      return { success: true, message: "Jawaban berhasil dihapus", data: deleted };
    } catch (error: any) {
      return { success: false, message: "Gagal menghapus jawaban", errors: [error.message] };
    }
  }

  // Student Attempt
  static async startAttempt(userId: string, quizId: string) {
    try {
      const quiz = await QuizRepository.findQuizById(quizId);
      if (!quiz) {
        return {
          success: false,
          message: "Kuis tidak ditemukan",
          errors: ["Kuis tidak ditemukan"],
        };
      }

      return {
        success: true,
        message: "Kuis dimulai",
        data: {
          quizId,
          startedAt: new Date().toISOString(),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memulai kuis",
        errors: [error.message],
      };
    }
  }

  static async submitAttempt(userId: string, input: any) {
    const validated = submitQuizSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data submit kuis gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { quizId, startedAt, answers: submittedAnswers } = validated.data;

    try {
      // 1. Fetch quiz structure for grading (includes correct choices)
      const quiz = await QuizRepository.findQuizForGrading(quizId);
      if (!quiz) {
        return {
          success: false,
          message: "Kuis tidak ditemukan",
          errors: ["Kuis tidak ditemukan"],
        };
      }

      const totalQuestions = quiz.questions.length;
      if (totalQuestions === 0) {
        return {
          success: false,
          message: "Kuis tidak memiliki pertanyaan untuk dinilai",
          errors: ["Kuis kosong"],
        };
      }

      // 2. Score questions
      let correctCount = 0;
      quiz.questions.forEach((question) => {
        const submission = submittedAnswers.find((ans) => ans.questionId === question.id);
        if (submission) {
          const correctAnswer = question.answers.find((ans) => ans.isCorrect);
          if (correctAnswer && correctAnswer.id === submission.answerId) {
            correctCount++;
          }
        }
      });

      // 3. Compute score percentage
      const score = Math.round((correctCount / totalQuestions) * 100);
      const passed = score >= quiz.passingScore;

      // 4. Create attempt record
      const attempt = await QuizRepository.createAttempt({
        userId,
        quizId,
        score,
        startedAt: new Date(startedAt),
        finishedAt: new Date(),
      });

      // 5. Update student progress if passed
      if (passed) {
        await prisma.progress.upsert({
          where: {
            userId_lessonId: {
              userId,
              lessonId: quiz.lessonId,
            },
          },
          update: {
            completed: true,
            percentage: 100,
          },
          create: {
            userId,
            lessonId: quiz.lessonId,
            completed: true,
            percentage: 100,
          },
        });

        // Track activity in logs
        const { ActivityLogService } = await import("@/services/ActivityLogService");
        await ActivityLogService.logActivity(
          userId,
          "SUBMIT_QUIZ_PASS",
          "LESSON",
          `Passed quiz ID: ${quizId} with score: ${score}`
        );
      }

      return {
        success: true,
        message: passed ? "Selamat! Anda lulus kuis." : "Maaf, Anda belum mencapai passing score.",
        data: {
          score,
          passed,
          xp: passed ? 100 : 0,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memproses penilaian kuis",
        errors: [error.message],
      };
    }
  }

  static async getUserHistory(userId: string) {
    try {
      const history = await QuizRepository.findAttemptsByUserId(userId);
      return {
        success: true,
        message: "Riwayat kuis berhasil diambil",
        data: history,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil riwayat kuis",
        errors: [error.message],
      };
    }
  }
}
