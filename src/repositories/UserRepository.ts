import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";

export class UserRepository {
  static async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  static async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  static async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
