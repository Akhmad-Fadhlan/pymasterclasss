import { prisma } from "@/lib/prisma";
import { Slide, Prisma } from "@prisma/client";

export class SlideRepository {
  static async findManyByLessonId(lessonId: string): Promise<Slide[]> {
    return prisma.slide.findMany({
      where: { lessonId },
      orderBy: { orderNumber: "asc" },
    });
  }

  static async findById(id: string): Promise<Slide | null> {
    return prisma.slide.findUnique({
      where: { id },
    });
  }

  static async create(data: Prisma.SlideUncheckedCreateInput): Promise<Slide> {
    return prisma.slide.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.SlideUncheckedUpdateInput): Promise<Slide> {
    return prisma.slide.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<Slide> {
    return prisma.slide.delete({
      where: { id },
    });
  }

  static async updateManyOrders(orders: { id: string; orderNumber: number }[]): Promise<void> {
    // Atomically sequence orders in transaction
    await prisma.$transaction(
      orders.map((order) =>
        prisma.slide.update({
          where: { id: order.id },
          data: { orderNumber: order.orderNumber },
        })
      )
    );
  }
}
