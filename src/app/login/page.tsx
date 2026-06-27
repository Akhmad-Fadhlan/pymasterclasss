"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate login API request
    setTimeout(() => {
      setIsLoading(false);
      // In the user flow, login leads to: Onboarding or Dashboard
      // If student is new -> Onboarding. Let's redirect to Onboarding page!
      router.push("/onboarding");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F7FF] via-[#F3F7FF] to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo and header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">
              PYMASTERCLASS
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Selamat Datang Kembali
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Masuk ke akunmu untuk melanjutkan mission belajar
          </p>
        </div>

        {/* Form Card */}
        <Card variant="glass" className="border border-white/60 p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Address */}
            <div className="relative">
              <Input
                label="Alamat Email"
                name="email"
                type="email"
                placeholder="fathan@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isLoading}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-[38px] w-4 h-4 text-slate-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex justify-between items-center mb-[-6px] absolute right-1 top-[4px] z-10">
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
                className="pl-10"
              />
              <Lock className="absolute left-3 top-[38px] w-4 h-4 text-slate-400" />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant={isLoading ? "disabled" : "primary"}
              disabled={isLoading}
              fullWidth
              className="mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menghubungkan...
                </>
              ) : (
                <>
                  Masuk Akun
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-extrabold text-slate-400">
              <span className="bg-white/60 px-2.5 rounded-full">Atau</span>
            </div>
          </div>

          {/* Register Option */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">
              Daftar gratis di sini
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
