"use client";

import React, { useEffect, useRef } from "react";
import { Brain, Terminal, Smartphone, Gamepad, Globe, Check, MessageSquare, Play, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import gsap from "gsap";

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger inside useEffect to prevent Next.js SSR error
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    // GSAP ScrollTrigger animation for Bento cards
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-[#F3F7FF]/50 relative overflow-hidden">
      
      {/* Decorative colorful blur blobs behind bento grid for glassmorphism pop */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px] animate-float-1" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary/25 rounded-full blur-[120px] animate-float-2" />
      <div className="absolute top-[50%] left-[45%] w-[250px] h-[250px] bg-purple-500/15 rounded-full blur-[90px] animate-float-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-extrabold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>FITUR UNGGULAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Mengapa PyMasterClass?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-semibold max-w-lg mx-auto leading-relaxed">
            Platform belajar Python modern yang dirancang khusus untuk membantu Anda membangun produk nyata.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Mentor (Spans 2 cols on desktop) */}
          <div className="md:col-span-2">
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div className="flex-1 flex flex-col items-start justify-between text-left">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                    <Brain className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">AI Mentor 24/7</h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                    Kapan pun Anda bingung atau mengalami error saat coding, asisten AI kami siap membimbing Anda dengan petunjuk logis, tanpa langsung memberikan contekan jawaban.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                  Tanya AI Mentor Sekarang <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              
              {/* Card visual element: Live Chat Mockup */}
              <div className="w-full md:w-64 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-left font-sans flex flex-col gap-3 shadow-md flex-shrink-0 self-center">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-[10px] font-bold text-slate-300">AI Mentor Online</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="bg-slate-800 p-2 rounded-xl text-[10px] text-slate-200 self-end max-w-[80%] rounded-tr-none font-semibold">
                    Kenapa list saya IndexErrors?
                  </div>
                  <div className="bg-primary p-2.5 rounded-xl text-[10px] text-white self-start max-w-[85%] rounded-tl-none font-semibold leading-normal">
                    IndexError terjadi karena Anda memanggil indeks yang melebihi panjang list. Coba periksa fungsi `len(list)`.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 2: Project Based (Spans 1 col) */}
          <div>
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col justify-between text-left group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">Project Based</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Belajar dengan membuat portofolio aplikasi riil yang siap dipamerkan ke recruiter atau di-deploy untuk publik.
                </p>
              </div>

              {/* Card visual element: File Directory Mockup */}
              <div className="bg-white/80 rounded-xl p-3 border border-slate-200/50 flex flex-col gap-1.5 font-mono text-[10px] text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-400 border-b border-slate-100 pb-1.5">
                  <span className="w-2.5 h-2.5 bg-rose-400 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  <span className="ml-1 font-bold">project_directory/</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary font-bold">
                  <span>📂</span> src/
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <span>🐍</span> app.py <span className="text-[#10B981] ml-auto">ok</span>
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <span>🐍</span> models.py <span className="text-[#10B981] ml-auto">ok</span>
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <span>📄</span> config.json
                </div>
              </div>
            </Card>
          </div>

          {/* Card 3: Interactive Slides (Spans 1 col) */}
          <div>
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col justify-between text-left group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div>
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-6 shadow-sm">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">Interactive Slides</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Tidak ada video membosankan. Materi disajikan lewat slide ringkas interaktif, interaksi kode, dan ilustrasi visual.
                </p>
              </div>

              {/* Card visual element: Progress dots */}
              <div className="bg-white/80 rounded-xl p-3 border border-slate-200/50 flex items-center justify-between gap-4 font-bold text-xs">
                <span className="text-slate-400">Slide 3 dari 8</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>
            </Card>
          </div>

          {/* Card 4: Coding Playground (Spans 2 cols on desktop) */}
          <div className="md:col-span-2">
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div className="flex-1 flex flex-col items-start justify-between text-left">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center mb-6 shadow-sm">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">Coding Playground</h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                    Praktik langsung di browser Anda dengan sandbox editor terintegrasi. Uji kode Anda dan lihat hasilnya secara instan tanpa ribet instalasi server lokal.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                  Coba Playground Sekarang <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              
              {/* Card visual element: Integrated Code Editor Mockup */}
              <div className="w-full md:w-64 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col overflow-hidden text-left font-mono text-[10px] shadow-lg flex-shrink-0">
                <div className="bg-slate-950 px-3 py-1.5 flex justify-between items-center border-b border-slate-800">
                  <span className="text-slate-400 font-bold">main.py</span>
                  <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center text-primary text-[8px] font-bold">▶</div>
                </div>
                <div className="p-3 text-slate-300 leading-normal flex-1">
                  <span className="text-purple-400">def</span> <span className="text-blue-400">hello</span>():<br />
                  &nbsp;&nbsp;<span className="text-amber-400">print</span>(<span className="text-emerald-400">"Hello World!"</span>)<br />
                  <br />
                  hello()
                </div>
                <div className="bg-slate-950 border-t border-slate-800 p-2 text-emerald-400 text-[8px]">
                  Output: Hello World!
                </div>
              </div>
            </Card>
          </div>

          {/* Card 5: Gamification (Spans 1 col) */}
          <div>
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col justify-between text-left group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div>
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-6 shadow-sm">
                  <Gamepad className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">Gamification</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Sistem XP, Badge, dan Leaderboard kompetitif membuat petualangan belajar pemrograman menjadi adiktif dan menantang.
                </p>
              </div>

              {/* Card visual element: Reward XP Ring */}
              <div className="bg-white/80 rounded-xl p-3 border border-slate-200/50 flex items-center justify-center gap-3.5 font-bold text-xs">
                <div className="w-8 h-8 rounded-full border-4 border-amber-400 flex items-center justify-center text-[10px] text-amber-500 font-black">
                  XP
                </div>
                <div className="text-left leading-none">
                  <div className="text-[#0F172A] font-extrabold">+150 XP</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold mt-1">Quiz Bonus</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 6: Deploy Project (Spans 2 cols on desktop) */}
          <div className="md:col-span-2">
            <Card variant="glass" className="h-full border border-white/70 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
              <div className="flex-1 flex flex-col items-start justify-between text-left">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mb-6 shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">Deploy Project</h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                    Mulai dari setup webhook backend hingga deploy REST API live ke internet. Bangun portfolio portofolio komprehensif Anda yang siap pakai dan terintegrasi domain.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                  Pelajari Sistem Deploy <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              
              {/* Card visual element: Server Deployment Mockup */}
              <div className="w-full md:w-64 bg-slate-900 rounded-2xl border border-slate-800 p-4 text-left font-mono text-[9px] text-slate-400 flex flex-col gap-2.5 shadow-lg flex-shrink-0">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-300 font-bold">Deploying server...</span>
                  <span className="text-primary font-bold">98%</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check className="w-3 h-3 stroke-[3]" /> SSL Certification: Active
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check className="w-3 h-3 stroke-[3]" /> DNS Routing: Configured
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                  <div className="h-full bg-primary rounded-full" style={{ width: "98%" }} />
                </div>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
