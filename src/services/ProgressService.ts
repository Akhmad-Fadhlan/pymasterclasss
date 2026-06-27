import { updateProgressSchema } from "@/validators/progress";
import { ProgressRepository } from "@/repositories/ProgressRepository";
import { ActivityLogService } from "@/services/ActivityLogService";
import { prisma } from "@/lib/prisma";

export class ProgressService {
  static async updateLessonProgress(userId: string, input: any) {
    // 1. Validate input schema
    const validated = updateProgressSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi data progress gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { lessonId, percentage, completed } = validated.data;
    const isCompleted = completed !== undefined ? completed : percentage >= 100;

    try {
      // 2. Confirm lesson exists and retrieve courseId
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          mission: true,
        },
      });

      if (!lesson) {
        return {
          success: false,
          message: "Lesson tidak ditemukan",
          errors: ["Lesson tidak ditemukan"],
        };
      }

      const courseId = lesson.mission.courseId;

      // 3. Save progress record to database
      const progressRecord = await ProgressRepository.upsertProgress(
        userId,
        lessonId,
        percentage,
        isCompleted
      );

      // 4. Recalculate enrollment course progress
      const completedCount = await ProgressRepository.findCompletedLessonsCount(userId, courseId);
      const totalCount = await ProgressRepository.findTotalLessonsCount(courseId);

      let courseProgressPercentage = 0;
      if (totalCount > 0) {
        courseProgressPercentage = Math.round((completedCount / totalCount) * 100);
      }

      await ProgressRepository.updateEnrollmentProgress(userId, courseId, courseProgressPercentage);

      // 5. Track activity in logs
      await ActivityLogService.logActivity(
        userId,
        "UPDATE_LESSON_PROGRESS",
        "LESSON",
        `Updated lesson ID: ${lessonId} progress: ${percentage}%, completed: ${isCompleted}`
      );

      return {
        success: true,
        message: "Progress lesson berhasil diperbarui",
        data: progressRecord,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal memperbarui progress lesson",
        errors: [error.message],
      };
    }
  }

  static async calculateStreak(userId: string): Promise<number> {
    try {
      const logs = await ProgressRepository.findLatestUserActivityLogs(userId);
      if (logs.length === 0) return 0;

      // Convert activity logs to YYYY-MM-DD date strings to group daily activity
      const activeDates = new Set<string>();
      logs.forEach((log) => {
        const dateStr = log.createdAt.toISOString().split("T")[0];
        activeDates.add(dateStr);
      });

      const today = new Date();
      const getFormattedDate = (d: Date) => d.toISOString().split("T")[0];

      let checkDate = new Date(today);
      let dateStr = getFormattedDate(checkDate);

      // If active today, starting streak count is 1.
      // Else, check yesterday. If yesterday is also not active, streak is broken (0).
      let streak = 0;
      if (activeDates.has(dateStr)) {
        streak = 1;
      } else {
        checkDate.setDate(checkDate.getDate() - 1);
        dateStr = getFormattedDate(checkDate);
        if (activeDates.has(dateStr)) {
          streak = 1;
        } else {
          return 0; // Streak broken
        }
      }

      // Loop backwards day by day to count consecutive days
      while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        dateStr = getFormattedDate(checkDate);
        if (activeDates.has(dateStr)) {
          streak++;
        } else {
          break; // First missing day breaks the streak
        }
      }

      return streak;
    } catch {
      return 0;
    }
  }

  static async calculateXP(userId: string): Promise<number> {
    try {
      // 1. Completed lessons count (+50 XP each)
      const completedLessons = await prisma.progress.count({
        where: { userId, completed: true },
      });

      // 2. Passed unique quiz attempts count (+100 XP each)
      const passedQuizzes = await prisma.quizAttempt.findMany({
        where: {
          userId,
          score: {
            gte: 70,
          },
        },
        distinct: ["quizId"],
      });

      // 3. Earned achievements XP rewards sum
      const achievementsList = await prisma.userAchievement.findMany({
        where: { userId },
        include: {
          achievement: true,
        },
      });

      const achievementsXp = achievementsList.reduce((acc, curr) => acc + curr.achievement.xp, 0);

      return completedLessons * 50 + passedQuizzes.length * 100 + achievementsXp;
    } catch {
      return 0;
    }
  }

  static async getContinueLearning(userId: string, courseId?: string) {
    try {
      // 1. Seek user's latest updated learning progress record
      const latestProgress = await ProgressRepository.findLatestActiveLesson(userId, courseId);

      if (!latestProgress) {
        // Recommend first lesson in target course
        const targetCourseId = courseId;
        if (!targetCourseId) return null;

        const firstLesson = await prisma.lesson.findFirst({
          where: {
            mission: {
              courseId: targetCourseId,
            },
          },
          orderBy: [{ mission: { orderNumber: "asc" } }, { orderNumber: "asc" }],
          include: {
            mission: true,
          },
        });

        return firstLesson;
      }

      const currentLesson = latestProgress.lesson;

      // 2. If current active lesson is not yet completed, resume learning it
      if (!latestProgress.completed) {
        return currentLesson;
      }

      // 3. Seek next lesson in sequence
      // Next lesson in current mission
      const nextInMission = await prisma.lesson.findFirst({
        where: {
          missionId: currentLesson.missionId,
          orderNumber: {
            gt: currentLesson.orderNumber,
          },
        },
        orderBy: { orderNumber: "asc" },
        include: {
          mission: true,
        },
      });

      if (nextInMission) {
        return nextInMission;
      }

      // Next mission in course
      const nextMission = await prisma.mission.findFirst({
        where: {
          courseId: currentLesson.mission.courseId,
          orderNumber: {
            gt: currentLesson.mission.orderNumber,
          },
        },
        orderBy: { orderNumber: "asc" },
      });

      if (nextMission) {
        const firstInNextMission = await prisma.lesson.findFirst({
          where: {
            missionId: nextMission.id,
          },
          orderBy: { orderNumber: "asc" },
          include: {
            mission: true,
          },
        });

        if (firstInNextMission) {
          return firstInNextMission;
        }
      }

      // Course complete
      return null;
    } catch {
      return null;
    }
  }

  static async getDashboardProgress(userId: string) {
    try {
      const streak = await this.calculateStreak(userId);
      const xp = await this.calculateXP(userId);

      // Fetch user's enrollments with course details
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
            },
          },
        },
      });

      // Recommend continue learning for the user's latest active course
      const latestActive = await ProgressRepository.findLatestActiveLesson(userId);
      const courseId = latestActive?.lesson.mission.courseId || enrollments[0]?.courseId;

      const continueLearning = courseId ? await this.getContinueLearning(userId, courseId) : null;

      return {
        success: true,
        message: "Progress dashboard berhasil dihitung",
        data: {
          streak,
          xp,
          enrollments: enrollments.map((e) => ({
            id: e.id,
            courseId: e.courseId,
            courseTitle: e.course.title,
            courseSlug: e.course.slug,
            courseThumbnail: e.course.thumbnail,
            progress: e.progress,
            startedAt: e.startedAt,
            completedAt: e.completedAt,
          })),
          continueLearning: continueLearning
            ? {
                id: continueLearning.id,
                title: continueLearning.title,
                slug: continueLearning.slug,
                missionTitle: continueLearning.mission.title,
                courseId: continueLearning.mission.courseId,
              }
            : null,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mengambil progress dashboard",
        errors: [error.message],
      };
    }
  }
}
