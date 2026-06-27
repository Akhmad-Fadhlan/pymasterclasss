import { z } from "zod";

// Password Policy: Minimal 8 karakter, Huruf Besar, Huruf Kecil, Angka, Simbol
export const passwordSchema = z
  .string()
  .min(8, "Password minimal harus 8 karakter")
  .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf besar")
  .regex(/[a-z]/, "Password harus mengandung minimal satu huruf kecil")
  .regex(/[0-9]/, "Password harus mengandung minimal satu angka")
  .regex(/[^A-Za-z0-9]/, "Password harus mengandung minimal satu simbol / spesial karakter");

export const registerSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: passwordSchema,
  fullName: z.string().min(3, "Nama lengkap minimal harus 3 karakter"),
  username: z
    .string()
    .min(3, "Username minimal harus 3 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh mengandung huruf, angka, dan underscore"),
});

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  otp: z.string().length(6, "Kode OTP harus berjumlah 6 digit"),
});

export const profileSetupSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal harus 3 karakter"),
  username: z
    .string()
    .min(3, "Username minimal harus 3 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh mengandung huruf, angka, dan underscore"),
});

export const updateProfileSchema = z.object({
  avatar: z.string().url("Format URL avatar tidak valid").optional().nullable(),
  bio: z.string().max(500, "Bio maksimal 500 karakter").optional().nullable(),
  phone: z.string().max(30, "Nomor telepon maksimal 30 karakter").optional().nullable(),
});

export const requestResetSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export const resendOtpSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});
