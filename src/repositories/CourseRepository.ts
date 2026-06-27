import { prisma } from "@/lib/prisma";
import { Course, Prisma } from "@prisma/client";

export class CourseRepository {
  static async findById(id: string): Promise<Course | null> {
    return prisma.course.findUnique({
      where: { id },
      include: { category: true, missions: true },
    });
  }

  static async findBySlug(slug: string): Promise<Course | null> {
    return prisma.course.findUnique({
      where: { slug },
      include: { category: true, missions: true },
    });
  }

  static async findAll(params?: {
    status?: Prisma.EnumCourseStatusFilter | any;
    categoryId?: string;
    level?: Prisma.EnumCourseLevelFilter | any;
  }): Promise<Course[]> {
    return prisma.course.findMany({
      where: {
        status: params?.status,
        categoryId: params?.categoryId,
        level: params?.level,
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(data: Prisma.CourseUncheckedCreateInput): Promise<Course> {
    return prisma.course.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.CourseUncheckedUpdateInput): Promise<Course> {
    return prisma.course.update({
      where: { id },
      data,
    });
  }

  static async findManyPaginated(params: {
    page: number;
    limit: number;
    status?: any;
    categoryId?: string;
    level?: any;
    search?: string;
  }): Promise<{ courses: Course[]; totalCount: number; totalPages: number }> {
    const { page, limit, status, categoryId, level, search } = params;
    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.CourseWhereInput = {
      status,
      categoryId,
      level,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [courses, totalCount] = await prisma.$transaction([
      prisma.course.findMany({
        where,
        skip,
        take,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      courses,
      totalCount,
      totalPages,
    };
  }

  static async softDelete(id: string): Promise<Course> {
    return prisma.course.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });
  }
}
