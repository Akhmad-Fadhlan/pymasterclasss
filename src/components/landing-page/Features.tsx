"use client";

import React, { useEffect, useRef } from "react";
import { Brain, Terminal, Smartphone, Gamepad, Globe, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import gsap from "gsap";

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in features cards sequentially
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuresList = [
    {
      title: "AI Mentor",
      desc: "Dapatkan bantuan AI kapan saja untuk memahami materi.",
      icon: Brain,
      color: "bg-blue-50 text-primary border-blue-100",
    },
    {
      title: "Project Based",
      desc: "Belajar dengan membuat project nyata yang bisa digunakan.",
      icon: Terminal,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Interactive Slides",
      desc: "Materi interaktif yang mudah dipahami dan tidak membosankan.",
      icon: Smartphone,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Coding Playground",
      desc: "Kode langsung di browser, praktik tanpa install ribet.",
      icon: Terminal,
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    },
    {
      title: "Gamification",
      desc: "XP, badge, level, dan leaderboard membuat belajar lebih seru.",
      icon: Gamepad,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Deploy Project",
      desc: "Deploy project ke internet dan bangun portofolio.",
      icon: Globe,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Mengapa PyMasterClass?
          </h2>
          <p className="text-base text-[#0F172A]/60 font-medium">
            Platform belajar Python yang dirancang untuk hasil nyata.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                variant="glass"
                hoverable
                className="flex flex-col items-start text-left p-8 border border-white/60 relative overflow-hidden group"
              >
                {/* Decorative absolute element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] transition-all duration-300 group-hover:scale-125 -z-10" />

                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 shadow-sm ${feat.color}`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {feat.desc}
                </p>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
