"use client";

import React, { useEffect, useRef } from "react";
import { Check, ArrowRight, Play, Sparkles, Code, BookOpen, Clock, BrainCircuit, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import gsap from "gsap";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightMockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial mount animations with GSAP
    const ctx = gsap.context(() => {
      gsap.from(leftContentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(rightMockupRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Subtle float animation for right mockup
      gsap.to(rightMockupRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative pt-32 pb-20 overflow-hidden flex items-center min-h-screen bg-gradient-to-b from-[#F3F7FF] via-[#F3F7FF] to-white"
    >
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] -z-10 animate-float-1" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px] -z-10 animate-float-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div ref={leftContentRef} className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tag/Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F59E0B]" />
              <span>Belajar Python dengan Cara Modern</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] mb-6">
              Learn <span className="text-primary">Python</span>.<br />
              Build <span className="text-secondary">Real Products</span>.
            </h1>

            {/* Description */}
            <p className="text-lg text-[#0F172A]/70 mb-8 max-w-xl leading-relaxed">
              Kuasai Python dari dasar hingga mahir melalui project nyata, AI Mentor, latihan interaktif, hingga deploy ke internet.
            </p>

            {/* Features Checklist Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 w-full max-w-lg">
              {[
                "AI Mentor 24/7",
                "Interactive Slides",
                "Project Based Learning",
                "Sertifikat Resmi",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Button size="lg" className="flex items-center gap-2 group">
                Mulai Belajar Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Play className="w-4 h-4 text-primary fill-primary" />
                Lihat Demo Kelas
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 border-t border-slate-200/80 pt-8 w-full max-w-xl">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
                ].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Student avatar"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-bold text-[#0F172A] ml-1">4.9/5</span>
                  <span className="text-xs text-[#0F172A]/50 font-medium">(1000+ review)</span>
                </div>
                <div className="text-xs font-semibold text-[#0F172A]/70">
                  <span className="text-primary font-bold">10.000+</span> Siswa Aktif
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dashboard Mockup Card */}
          <div ref={rightMockupRef} className="lg:col-span-5 w-full flex justify-center relative">
            
            {/* Orbiting Icons */}
            {/* Icon 1: Python Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center border border-white/80 shadow-lg animate-orbit-1 z-20">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                <path d="M49.5 5A44.5 44.5 0 005 49.5a4.5 4.5 0 004.5 4.5h10.9v-4.5a20 20 0 0120-20H45v-9.1c0-4.5 4.5-9.1 9.1-9.1h18.2a4.5 4.5 0 004.5-4.5 4.5 4.5 0 00-4.5-4.5H49.5z" fill="#2563EB" />
                <circle cx="34" cy="20" r="3" fill="white" />
                <path d="M50.5 95A44.5 44.5 0 0095 50.5a4.5 4.5 0 00-4.5-4.5H79.6v4.5a20 20 0 01-20 20H55v9.1c0 4.5-4.5 9.1-9.1 9.1H27.7a4.5 4.5 0 00-4.5 4.5 4.5 4.5 0 004.5 4.5H50.5z" fill="#F59E0B" />
                <circle cx="66" cy="80" r="3" fill="white" />
              </svg>
            </div>
            
            {/* Icon 2: Bar Progress */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center border border-white/80 shadow-lg animate-orbit-2 z-20">
              <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>

            {/* Icon 3: Arduino Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center border border-white/80 shadow-lg animate-orbit-3 z-20">
              <svg className="w-8 h-8 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 8.5C6.1 8.5 4.5 10.1 4.5 12c0 1.9 1.6 3.5 3.5 3.5 1.5 0 2.8-1 3.3-2.3.2-.5.7-.7 1.2-.7s1 .2 1.2.7c.5 1.3 1.8 2.3 3.3 2.3 1.9 0 3.5-1.6 3.5-3.5 0-1.9-1.6-3.5-3.5-3.5-1.5 0-2.8 1-3.3 2.3-.2.5-.7.7-1.2.7s-1-.2-1.2-.7C10.8 9.5 9.5 8.5 8 8.5zm8 2.5h2v2h-2v-2zM6 11h4v2H6v-2z" />
              </svg>
            </div>

            {/* Icon 4: Website Browser */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center border border-white/80 shadow-lg animate-orbit-4 z-20">
              <svg className="w-6 h-6 text-[#9333EA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M2 8h20" />
                <path d="M6 6h.01" />
                <path d="M10 6h.01" />
              </svg>
            </div>

            <div className="relative w-full max-w-[420px] aspect-[4/5] glass-card rounded-3xl p-6 shadow-2xl flex flex-col">
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-md">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                      Halo, Fathan 👋
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400">Lanjutkan belajar hari ini</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-md border-2 border-white">
                  F
                </div>
              </div>

              {/* KPI metrics panel */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Mission", val: "12", color: "bg-blue-50 text-primary border-blue-100" },
                  { label: "Selesai", val: "35", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  { label: "Tertunda", val: "7", color: "bg-amber-50 text-amber-600 border-amber-100" },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border ${kpi.color} shadow-sm`}
                  >
                    <span className="text-xl font-extrabold leading-none mb-1">{kpi.val}</span>
                    <span className="text-[10px] font-semibold opacity-70">{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* Main Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2">
                  <span>Progress Belajar</span>
                  <span className="text-primary">78%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px]">
                  <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full shadow-inner shadow-white/30" style={{ width: "78%" }} />
                </div>
              </div>

              {/* Active module display / Lanjutkan Belajar card */}
              <div className="mt-auto flex flex-col gap-3">
                <h4 className="text-xs font-bold text-[#0F172A]/70 uppercase tracking-wider">Lanjutkan Belajar</h4>
                <div className="p-4 rounded-2xl border border-slate-200/50 bg-white/60 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Mission 3</span>
                    <h5 className="text-sm font-bold text-[#0F172A] truncate mb-1">FastAPI Backend</h5>
                    <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F59E0B]" />
                      Lanjutan: Routing & Path Params
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-[#0F172A]">60%</span>
                </div>
              </div>

              {/* Floating micro indicators (like decoration) */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-md" />
              <div className="absolute bottom-10 -right-5 w-16 h-16 bg-blue-400/20 rounded-full blur-lg" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
