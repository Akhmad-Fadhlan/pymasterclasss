import { prisma } from "@/lib/prisma";
import { Quiz, Question, Answer, QuizAttempt, Prisma } from "@prisma/client";

export class QuizRepository {
  // Quiz CRUD
  static async findQuizById(id: string): Promise<Quiz | null> {
    return prisma.quiz.findUnique({
      where: { id },
    });
  }

  static async findQuizByLessonId(lessonId: string) {
    return prisma.quiz.findFirst({
      where: { lessonId },
      include: {
        questions: {
          orderBy: { orderNumber: "asc" },
          include: {
            answers: {
              select: {
                id: true,
                questionId: true,
                answer: true,
                // isCorrect field is strictly excluded here to prevent client inspection cheating
              },
            },
          },
        },
      },
    });
  }

  static async findQuizForGrading(quizId: string) {
    return prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            answers: true, // Includes isCorrect flag for backend scoring calculations
          },
        },
      },
    });
  }

  static async createQuiz(data: Prisma.QuizUncheckedCreateInput): Promise<Quiz> {
    return prisma.quiz.create({
      data,
    });
  }

  static async updateQuiz(id: string, data: Prisma.QuizUncheckedUpdateInput): Promise<Quiz> {
    return prisma.quiz.update({
      where: { id },
      data,
    });
  }

  static async deleteQuiz(id: string): Promise<Quiz> {
    return prisma.quiz.delete({
      where: { id },
    });
  }

  // Question CRUD
  static async findQuestionById(id: string): Promise<Question | null> {
    return prisma.question.findUnique({
      where: { id },
    });
  }

  static async createQuestion(data: Prisma.QuestionUncheckedCreateInput): Promise<Question> {
    return prisma.question.create({
      data,
    });
  }

  static async updateQuestion(id: string, data: Prisma.QuestionUncheckedUpdateInput): Promise<Question> {
    return prisma.question.update({
      where: { id },
      data,
    });
  }

  static async deleteQuestion(id: string): Promise<Question> {
    return prisma.question.delete({
      where: { id },
    });
  }

  // Answer CRUD
  static async findAnswerById(id: string): Promise<Answer | null> {
    return prisma.answer.findUnique({
      where: { id },
    });
  }

  static async createAnswer(data: Prisma.AnswerUncheckedCreateInput): Promise<Answer> {
    return prisma.answer.create({
      data,
    });
  }

  static async updateAnswer(id: string, data: Prisma.AnswerUncheckedUpdateInput): Promise<Answer> {
    return prisma.answer.update({
      where: { id },
      data,
    });
  }

  static async deleteAnswer(id: string): Promise<Answer> {
    return prisma.answer.delete({
      where: { id },
    });
  }

  // Attempts & History
  static async createAttempt(data: Prisma.QuizAttemptUncheckedCreateInput): Promise<QuizAttempt> {
    return prisma.quizAttempt.create({
      data,
    });
  }

  static async findAttemptsByUserId(userId: string): Promise<any[]> {
    return prisma.quizAttempt.findMany({
      where: { userId },
      include: {
        quiz: {
          select: {
            title: true,
            passingScore: true,
          },
        },
      },
      orderBy: { finishedAt: "desc" },
    });
  }
}
