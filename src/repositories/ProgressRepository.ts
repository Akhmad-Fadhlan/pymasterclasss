import { prisma } from "@/lib/prisma";
import { Progress, Enrollment, Prisma } from "@prisma/client";

export class ProgressRepository {
  static async findProgress(userId: string, lessonId: string): Promise<Progress | null> {
    return prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });
  }

  static async upsertProgress(
    userId: string,
    lessonId: string,
    percentage: number,
    completed: boolean
  ): Promise<Progress> {
    return prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        percentage,
        completed,
      },
      create: {
        userId,
        lessonId,
        percentage,
        completed,
      },
    });
  }

  static async findCompletedLessonsCount(userId: string, courseId: string): Promise<number> {
    return prisma.progress.count({
      where: {
        userId,
        completed: true,
        lesson: {
          mission: {
            courseId,
          },
        },
      },
    });
  }

  static async findTotalLessonsCount(courseId: string): Promise<number> {
    return prisma.lesson.count({
      where: {
        mission: {
          courseId,
        },
      },
    });
  }

  static async findCompletedLessonsInMissionCount(userId: string, missionId: string): Promise<number> {
    return prisma.progress.count({
      where: {
        userId,
        completed: true,
        lesson: {
          missionId,
        },
      },
    });
  }

  static async findTotalLessonsInMissionCount(missionId: string): Promise<number> {
    return prisma.lesson.count({
      where: {
        missionId,
      },
    });
  }

  static async updateEnrollmentProgress(
    userId: string,
    courseId: string,
    progressVal: number
  ): Promise<Enrollment | null> {
    const enrollment = await prisma.enrollment.findFirst({
      where: { userId, courseId },
    });

    if (!enrollment) return null;

    const completedAt = progressVal >= 100 ? new Date() : null;

    return prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: progressVal,
        completedAt: completedAt || undefined,
      },
    });
  }

  static async findLatestUserActivityLogs(userId: string) {
    return prisma.activityLog.findMany({
      where: { userId },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 1000,
    });
  }

  static async findLatestActiveLesson(userId: string, courseId?: string) {
    const whereClause: Prisma.ProgressWhereInput = {
      userId,
    };

    if (courseId) {
      whereClause.lesson = {
        mission: {
          courseId,
        },
      };
    }

    return prisma.progress.findFirst({
      where: whereClause,
      orderBy: [
        { lesson: { mission: { orderNumber: "desc" } } },
        { lesson: { orderNumber: "desc" } },
      ],
      include: {
        lesson: {
          include: {
            mission: true,
          },
        },
      },
    });
  }
}
