import { z } from "zod";

// Zod schemas for all valid slide content block types
const slideElementSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    text: z.string().min(1, "Heading text tidak boleh kosong"),
    level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  }),
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1, "Paragraph text tidak boleh kosong"),
  }),
  z.object({
    type: z.literal("image"),
    url: z.string().url("URL gambar tidak valid"),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("code_block"),
    code: z.string().min(1, "Code content tidak boleh kosong"),
    language: z.string().min(1, "Language label tidak boleh kosong"),
  }),
  z.object({
    type: z.literal("table"),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string().min(1, "Quote text tidak boleh kosong"),
    author: z.string().optional(),
  }),
  z.object({
    type: z.literal("alert"),
    alertType: z.enum(["info", "warning", "success", "error"]),
    text: z.string().min(1, "Alert text tidak boleh kosong"),
  }),
  z.object({
    type: z.literal("list"),
    listType: z.enum(["ordered", "unordered"]),
    items: z.array(z.string()).min(1, "List item tidak boleh kosong"),
  }),
  z.object({
    type: z.literal("video"),
    url: z.string().url("URL video tidak valid"),
    provider: z.enum(["youtube", "vimeo", "supabase"]),
  }),
]);

export const createSlideSchema = z.object({
  lessonId: z.string().uuid("ID Lesson tidak valid (harus format UUID)"),
  title: z.string().min(3, "Judul slide minimal harus 3 karakter"),
  content: z.array(slideElementSchema).min(1, "Content slide minimal harus berisi satu elemen block"),
  orderNumber: z.number().int().min(1, "Nomor urut minimal bernilai 1"),
});

export const updateSlideSchema = createSlideSchema.partial();

export const reorderSlidesSchema = z.object({
  lessonId: z.string().uuid("ID Lesson tidak valid (harus format UUID)"),
  orderedIds: z.array(z.string().uuid("ID Slide tidak valid")).min(1, "Ordered IDs minimal harus berisi satu ID"),
});
