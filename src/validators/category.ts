import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3, "Nama kategori minimal harus 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal harus 3 karakter")
    .regex(/^[a-z0-9_-]+$/, "Slug hanya boleh mengandung huruf kecil, angka, strip (-), dan underscore (_)"),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  orderNumber: z.number().int().min(1, "Nomor urut minimal bernilai 1"),
});

export const updateCategorySchema = createCategorySchema.partial();
