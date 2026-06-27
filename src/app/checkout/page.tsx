"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, CreditCard, ShieldCheck, ArrowRight, CheckCircle2, Ticket, QrCode, Building } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Selected package details
  const packageName = searchParams.get("package") || "Profesional";
  const rawPrice = packageName === "Starter" ? 199000 : packageName === "Ultimate" ? 999000 : 499000;
  
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "transfer" | "card">("qris");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "PYTHONBARU") {
      setDiscount(50000);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Kode voucher tidak valid");
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const formattedPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  if (isSuccess) {
    return (
      <Card variant="glass" className="border border-white/60 p-8 shadow-xl text-center flex flex-col items-center max-w-md w-full mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-[#10B981] flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-2">
          Pembayaran Berhasil!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-sm mb-6 leading-relaxed">
          Terima kasih! Akses kelas premium **{packageName}** Anda telah diaktifkan secara instan.
        </p>
        <div className="w-full bg-white/60 rounded-xl p-4 border border-slate-100 text-left flex flex-col gap-2 mb-6">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Paket</span>
            <span className="text-primary">{packageName}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Total Bayar</span>
            <span className="text-[#0F172A]">{formattedPrice(rawPrice - discount)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Status</span>
            <span className="text-[#10B981]">Aktif (Lifetime)</span>
          </div>
        </div>
        <Button onClick={() => router.push("/dashboard")} variant="primary" fullWidth className="flex items-center justify-center gap-1.5">
          Masuk ke Dashboard
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left panel: Billing & Payment options */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Billing details form */}
        <Card variant="glass" className="border border-white/60 p-6 text-left">
          <h3 className="text-base font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Metode Pembayaran
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { id: "qris", name: "QRIS", icon: QrCode },
              { id: "transfer", name: "Bank Transfer", icon: Building },
              { id: "card", name: "Credit Card", icon: CreditCard },
            ].map((method) => {
              const MethodIcon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-primary/5 border-primary text-primary font-bold shadow-sm"
                      : "bg-white/60 border-slate-200/50 hover:bg-white text-slate-500 font-semibold"
                  }`}
                >
                  <MethodIcon className="w-5 h-5" />
                  <span className="text-xs">{method.name}</span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handlePayment} className="flex flex-col gap-4">
            <Input label="Nama Lengkap Pemilik Rekening" placeholder="Fathan Ghipari" required disabled={isLoading} />
            <Input label="Nomor WhatsApp Konfirmasi" placeholder="08123456789" required disabled={isLoading} />
            {paymentMethod === "card" && (
              <>
                <Input label="Nomor Kartu Kredit" placeholder="4111 2222 3333 4444" required disabled={isLoading} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expired Date" placeholder="MM/YY" required disabled={isLoading} />
                  <Input label="CVV" placeholder="123" required disabled={isLoading} />
                </div>
              </>
            )}
            {paymentMethod === "qris" && (
              <div className="p-6 bg-white/80 border border-slate-200/50 rounded-2xl flex flex-col items-center gap-3">
                <div className="w-40 h-40 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                  {/* Mock QR code placeholder */}
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">QR Code QRIS</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 text-center">
                  Pindai QR di atas menggunakan aplikasi e-wallet Anda untuk menyelesaikan pembayaran.
                </p>
              </div>
            )}
            {paymentMethod === "transfer" && (
              <div className="p-4 bg-white/80 border border-slate-200/50 rounded-2xl flex flex-col gap-3 text-xs font-semibold text-slate-500">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span>Nama Bank</span>
                  <span className="text-[#0F172A] font-bold">Bank Mandiri</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span>Nomor Rekening</span>
                  <span className="text-primary font-black">123-00-9876543-2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Atas Nama</span>
                  <span className="text-[#0F172A] font-bold">PT PyMasterClass Indonesia</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant={isLoading ? "disabled" : "primary"}
              disabled={isLoading}
              fullWidth
              className="mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  Selesaikan Pembayaran
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* Right panel: Pricing Summary */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Promo card */}
        <Card variant="glass" className="border border-white/60 p-5 text-left flex items-center gap-3">
          <Ticket className="w-5 h-5 text-[#F59E0B]" />
          <div className="flex-1">
            <input
              type="text"
              placeholder="Masukkan kode kupon..."
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={couponApplied || isLoading}
              className="bg-transparent text-sm font-semibold placeholder:text-slate-400 focus:outline-none w-full"
            />
            {couponError && <span className="text-[10px] text-danger font-medium block mt-1">{couponError}</span>}
            {couponApplied && <span className="text-[10px] text-[#10B981] font-bold block mt-1">Kupon berhasil diterapkan (-Rp 50.000)</span>}
          </div>
          <button
            onClick={applyCoupon}
            disabled={couponApplied || !coupon.trim() || isLoading}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              couponApplied || !coupon.trim() || isLoading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-700"
            }`}
          >
            Terapkan
          </button>
        </Card>

        {/* Pricing review */}
        <Card variant="glass" className="border border-white/60 p-6 text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Ringkasan Pesanan</h3>
          
          <div className="flex flex-col gap-4 text-xs font-bold text-slate-500">
            <div className="flex justify-between items-center">
              <span>Paket Belajar {packageName}</span>
              <span className="text-[#0F172A]">{formattedPrice(rawPrice)}</span>
            </div>
            
            <div className="flex justify-between items-center text-rose-500">
              <span>Potongan Diskon</span>
              <span>-{formattedPrice(discount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>PPN (11%)</span>
              <span className="text-[#0F172A]">{formattedPrice((rawPrice - discount) * 0.11)}</span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-between items-center text-sm font-black">
              <span className="text-[#0F172A]">Total Pembayaran</span>
              <span className="text-primary text-base">{formattedPrice((rawPrice - discount) * 1.11)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 text-[10px] text-slate-400 leading-relaxed font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Pembayaran aman dienkripsi 256-bit SSL. Garansi uang kembali 100% jika Anda membatalkan pesanan dalam 7 hari pertama.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F7FF] via-[#F3F7FF] to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">
              PYMASTERCLASS
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Checkout Pembelian Paket
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Konfirmasi pesanan dan pilih opsi transfer untuk memulai belajar.
          </p>
        </div>

        {/* Wrap form inside Suspense to resolve searchParams query */}
        <Suspense fallback={
          <Card variant="glass" className="p-8 border border-white/60 text-center font-semibold text-slate-500">
            Memuat detail checkout...
          </Card>
        }>
          <CheckoutForm />
        </Suspense>

      </div>
    </div>
  );
}
