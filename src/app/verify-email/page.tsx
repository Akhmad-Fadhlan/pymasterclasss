"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "fathan@example.com";
  
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Kode verifikasi wajib diisi");
      return;
    }
    if (code.length < 4) {
      setError("Kode verifikasi minimal 4 digit");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification API request
    setTimeout(() => {
      setIsLoading(false);
      // Lead to Onboarding page!
      router.push("/onboarding");
    }, 1500);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setCountdown(60);
    }, 1200);
  };

  return (
    <Card variant="glass" className="border border-white/60 p-8 shadow-xl">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-semibold text-center leading-relaxed">
          Kami telah mengirimkan kode verifikasi 6 digit ke <br />
          <span className="text-[#0F172A] font-bold">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <Input
          label="Kode Verifikasi (OTP)"
          name="otp"
          type="text"
          placeholder="123456"
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          error={error}
          disabled={isLoading}
          className="text-center tracking-widest text-lg font-bold"
        />

        <Button
          type="submit"
          variant={isLoading ? "disabled" : "primary"}
          disabled={isLoading}
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi Email"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      {/* Resend Code Link */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          onClick={handleResend}
          disabled={countdown > 0 || resending}
          className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            countdown > 0 || resending ? "text-slate-400 cursor-not-allowed" : "text-primary hover:underline"
          }`}
        >
          {resending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            "Kirim Ulang Kode"
          )}
        </button>
        {countdown > 0 && (
          <span className="text-xs font-semibold text-slate-400">
            Tunggu {countdown} detik untuk kirim ulang
          </span>
        )}
      </div>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F7FF] via-[#F3F7FF] to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blurs */}
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
            Verifikasi Email Anda
          </h2>
        </div>

        {/* Wrap in Suspense to resolve searchParams */}
        <Suspense fallback={
          <Card variant="glass" className="p-8 border border-white/60 text-center text-sm font-semibold text-slate-500">
            Memuat formulir verifikasi...
          </Card>
        }>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
