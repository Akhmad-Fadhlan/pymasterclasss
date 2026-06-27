import { prisma } from "@/lib/prisma";
import { Practice, Prisma } from "@prisma/client";

export class PracticeRepository {
  static async findManyByLessonId(lessonId: string): Promise<Practice[]> {
    return prisma.practice.findMany({
      where: { lessonId },
    });
  }

  static async findById(id: string): Promise<Practice | null> {
    return prisma.practice.findUnique({
      where: { id },
      include: { lesson: true },
    });
  }

  static async create(data: Prisma.PracticeUncheckedCreateInput): Promise<Practice> {
    return prisma.practice.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.PracticeUncheckedUpdateInput): Promise<Practice> {
    return prisma.practice.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<Practice> {
    return prisma.practice.delete({
      where: { id },
    });
  }
}
