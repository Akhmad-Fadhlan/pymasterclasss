import { prisma } from "@/lib/prisma";
import { Settings, Prisma } from "@prisma/client";

export class SettingsRepository {
  static async getSettings(): Promise<Settings | null> {
    return prisma.settings.findFirst();
  }

  static async create(data: Prisma.SettingsCreateInput): Promise<Settings> {
    return prisma.settings.create({
      data,
    });
  }

  static async update(id: string, data: Prisma.SettingsUncheckedUpdateInput): Promise<Settings> {
    return prisma.settings.update({
      where: { id },
      data,
    });
  }
}
