import { prisma } from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";

export class CategoryRepository {
  static async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { orderNumber: "asc" },
    });
  }

  static async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  static async findBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  static async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.CategoryUncheckedUpdateInput): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}
