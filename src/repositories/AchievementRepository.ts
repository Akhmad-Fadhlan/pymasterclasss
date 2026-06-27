import { prisma } from "@/lib/prisma";
import { Achievement, UserAchievement, Prisma } from "@prisma/client";

export class AchievementRepository {
  static async findAll(): Promise<Achievement[]> {
    return prisma.achievement.findMany();
  }

  static async findUserAchievements(userId: string): Promise<UserAchievement[]> {
    return prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });
  }

  static async rewardAchievement(data: Prisma.UserAchievementUncheckedCreateInput): Promise<UserAchievement> {
    return prisma.userAchievement.create({
      data,
      include: { achievement: true },
    });
  }
}
