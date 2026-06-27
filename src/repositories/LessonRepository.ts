import { prisma } from "@/lib/prisma";
import { Lesson, Prisma } from "@prisma/client";

export class LessonRepository {
  static async findManyByMissionId(missionId: string): Promise<Lesson[]> {
    return prisma.lesson.findMany({
      where: { missionId },
      orderBy: { orderNumber: "asc" },
    });
  }

  static async findById(id: string): Promise<Lesson | null> {
    return prisma.lesson.findUnique({
      where: { id },
      include: { mission: true },
    });
  }

  static async findByIdWithContent(id: string): Promise<any | null> {
    return prisma.lesson.findUnique({
      where: { id },
      include: {
        slides: { orderBy: { orderNumber: "asc" } },
        practices: true,
        quizzes: {
          include: {
            questions: {
              include: {
                answers: true,
              },
            },
          },
        },
      },
    });
  }

  static async findBySlug(slug: string): Promise<Lesson | null> {
    return prisma.lesson.findUnique({
      where: { slug },
    });
  }

  static async create(data: Prisma.LessonUncheckedCreateInput): Promise<Lesson> {
    return prisma.lesson.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.LessonUncheckedUpdateInput): Promise<Lesson> {
    return prisma.lesson.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<Lesson> {
    return prisma.lesson.delete({
      where: { id },
    });
  }

  static async updateManyOrders(orders: { id: string; orderNumber: number }[]): Promise<void> {
    // Perform bulk update of order numbers atomically in a database transaction
    await prisma.$transaction(
      orders.map((order) =>
        prisma.lesson.update({
          where: { id: order.id },
          data: { orderNumber: order.orderNumber },
        })
      )
    );
  }
}
