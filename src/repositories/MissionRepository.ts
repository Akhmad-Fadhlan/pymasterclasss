import { prisma } from "@/lib/prisma";
import { Mission, Prisma } from "@prisma/client";

export class MissionRepository {
  static async findManyByCourseId(courseId: string): Promise<Mission[]> {
    return prisma.mission.findMany({
      where: { courseId },
      orderBy: { orderNumber: "asc" },
    });
  }

  static async findById(id: string): Promise<Mission | null> {
    return prisma.mission.findUnique({
      where: { id },
      include: { course: true },
    });
  }

  static async create(data: Prisma.MissionUncheckedCreateInput): Promise<Mission> {
    return prisma.mission.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.MissionUncheckedUpdateInput): Promise<Mission> {
    return prisma.mission.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<Mission> {
    return prisma.mission.delete({
      where: { id },
    });
  }

  static async updateManyOrders(orders: { id: string; orderNumber: number }[]): Promise<void> {
    // Perform atomic transaction to avoid constraint collisions during reindexing
    await prisma.$transaction(
      orders.map((order) =>
        prisma.mission.update({
          where: { id: order.id },
          data: { orderNumber: order.orderNumber },
        })
      )
    );
  }
}
