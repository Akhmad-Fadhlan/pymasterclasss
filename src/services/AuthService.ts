import { registerSchema, loginSchema, verifyOtpSchema, requestResetSchema, resetPasswordSchema, resendOtpSchema } from "@/validators/auth";
import { UserRepository } from "@/repositories/UserRepository";
import { supabase } from "@/lib/supabase";

export class AuthService {
  static async register(input: any) {
    // 1. Validate inputs via Zod
    const validated = registerSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi input gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { email, password, fullName, username } = validated.data;

    try {
      // 2. Check if username already exists
      const existingUser = await UserRepository.findByUsername(username);
      if (existingUser) {
        return {
          success: false,
          message: "Username sudah digunakan",
          errors: ["Username sudah digunakan"],
        };
      }

      // 3. Check if email already exists
      const existingEmail = await UserRepository.findByEmail(email);
      if (existingEmail) {
        return {
          success: false,
          message: "Email sudah terdaftar",
          errors: ["Email sudah terdaftar"],
        };
      }

      // 4. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData.user) {
        return {
          success: false,
          message: authError?.message || "Gagal mendaftarkan akun di sistem auth",
          errors: [authError?.message || "Gagal mendaftarkan akun di sistem auth"],
        };
      }

      // Retrieve default student role in database
      const { prisma } = await import("@/lib/prisma");
      let studentRole = await prisma.role.findUnique({
        where: { name: "STUDENT" },
      });

      if (!studentRole) {
        studentRole = await prisma.role.create({
          data: {
            name: "STUDENT",
            description: "Default Student Role",
          },
        });
      }

      // 5. Create database user profile linked to Supabase UID
      const profile = await UserRepository.create({
        id: authData.user.id,
        email,
        fullName,
        username,
        roleId: studentRole.id,
        isVerified: false,
      });

      return {
        success: true,
        message: "Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.",
        data: profile,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal pada proses registrasi",
        errors: [error.message],
      };
    }
  }

  static async login(input: any) {
    // 1. Validate inputs via Zod
    const validated = loginSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi login gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { email, password } = validated.data;

    try {
      // 2. Perform Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return {
          success: false,
          message: "Email atau password salah",
          errors: [error?.message || "Email atau password salah"],
        };
      }

      // 3. Fetch database profile info
      const profile = await UserRepository.findById(data.user.id);

      return {
        success: true,
        message: "Login berhasil",
        data: {
          session: data.session,
          user: profile,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal pada proses login",
        errors: [error.message],
      };
    }
  }

  static async verifyOtp(input: any) {
    // 1. Validate inputs via Zod
    const validated = verifyOtpSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi OTP gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { email, otp } = validated.data;

    try {
      // 2. Verify token in Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (error || !data.user) {
        return {
          success: false,
          message: "Kode verifikasi tidak valid atau kadaluarsa",
          errors: [error?.message || "Kode verifikasi tidak valid atau kadaluarsa"],
        };
      }

      // 3. Set isVerified state inside database
      const profile = await UserRepository.update(data.user.id, {
        isVerified: true,
      });

      return {
        success: true,
        message: "Email berhasil diverifikasi.",
        data: profile,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal pada proses verifikasi",
        errors: [error.message],
      };
    }
  }

  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return {
          success: false,
          message: "Gagal melakukan logout",
          errors: [error.message],
        };
      }
      return {
        success: true,
        message: "Berhasil logout",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal pada proses logout",
        errors: [error.message],
      };
    }
  }

  static async requestPasswordReset(input: any) {
    const validated = requestResetSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi request reset gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { email } = validated.data;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`,
      });

      if (error) {
        return {
          success: false,
          message: "Gagal mengirim link reset password",
          errors: [error.message],
        };
      }

      return {
        success: true,
        message: "Link reset password telah dikirim ke email Anda",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal saat memproses reset password",
        errors: [error.message],
      };
    }
  }

  static async resetPassword(input: any) {
    const validated = resetPasswordSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi password baru gagal",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { password } = validated.data;

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return {
          success: false,
          message: "Gagal mereset password baru Anda",
          errors: [error.message],
        };
      }

      return {
        success: true,
        message: "Password berhasil diperbarui",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mereset password",
        errors: [error.message],
      };
    }
  }

  static async resendVerificationOtp(input: any) {
    const validated = resendOtpSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        message: "Validasi email tidak valid",
        errors: validated.error.errors.map((e) => e.message),
      };
    }

    const { email } = validated.data;

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        return {
          success: false,
          message: "Gagal mengirim ulang kode OTP verifikasi",
          errors: [error.message],
        };
      }

      return {
        success: true,
        message: "Kode OTP verifikasi baru telah dikirim ke email Anda",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mengirim ulang kode",
        errors: [error.message],
      };
    }
  }

  static async verifyRole(userId: string, allowedRoles: ("ADMIN" | "INSTRUCTOR" | "STUDENT")[]): Promise<boolean> {
    try {
      const profile = await UserRepository.findById(userId);
      if (!profile || !(profile as any).role) return false;
      return allowedRoles.includes((profile as any).role.name as any);
    } catch {
      return false;
    }
  }
}
