import { prisma } from "@/lib/prisma";
import { Notification, Prisma } from "@prisma/client";

export class NotificationRepository {
  static async findManyByUserId(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(id: string): Promise<Notification | null> {
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  static async create(data: Prisma.NotificationUncheckedCreateInput): Promise<Notification> {
    return prisma.notification.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.NotificationUncheckedUpdateInput): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data,
    });
  }
}
