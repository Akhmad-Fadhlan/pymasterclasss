import { prisma } from "@/lib/prisma";
import { ActivityLog, Prisma } from "@prisma/client";

export class ActivityLogRepository {
  static async create(data: Prisma.ActivityLogUncheckedCreateInput): Promise<ActivityLog> {
    return prisma.activityLog.create({
      data,
    });
  }

  static async findManyByUserId(userId: string): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
