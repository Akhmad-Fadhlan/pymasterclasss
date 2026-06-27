import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "Starter",
      price: "Rp 199.000",
      period: "/lifetime",
      desc: "Cocok untuk pemula yang ingin belajar dasar Python.",
      features: [
        "Akses Semua Materi",
        "Interactive Slides",
        "Practice Lab",
        "Sertifikat Dasar",
      ],
      cta: "Pilih Paket",
      popular: false,
      btnVariant: "outline" as const,
    },
    {
      name: "Profesional",
      price: "Rp 499.000",
      period: "/lifetime",
      desc: "Untuk praktisi yang ingin menguasai backend & AI.",
      features: [
        "Semua Fitur Starter",
        "AI Mentor 24/7",
        "Project Review",
        "Sertifikat Resmi",
        "Komunitas Premium",
      ],
      cta: "Pilih Paket",
      popular: true,
      btnVariant: "primary" as const,
    },
    {
      name: "Ultimate",
      price: "Rp 999.000",
      period: "/lifetime",
      desc: "Bimbingan karir intensif untuk menjadi software engineer.",
      features: [
        "Semua Fitur Profesional",
        "1-on-1 Mentoring",
        "Review Project Lengkap",
        "Prioritas Support",
      ],
      cta: "Pilih Paket",
      popular: false,
      btnVariant: "outline" as const,
    },
  ];

  return (
    <section id="harga" className="py-24 bg-gradient-to-b from-[#F3F7FF] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Pilih Paket yang Paling Sesuai
          </h2>
          <p className="text-base text-[#0F172A]/60 font-medium">
            Akses semua materi, project, dan fitur premium.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <Card
              key={idx}
              variant={tier.popular ? "glass-dark" : "glass"}
              className={`flex flex-col relative border ${
                tier.popular
                  ? "border-primary/30 shadow-xl shadow-primary/5 scale-105 z-10 md:translate-y-[-8px]"
                  : "border-white/50"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                  Paling Populer
                </span>
              )}

              {/* Tier details */}
              <div className="text-left mb-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{tier.name}</span>
                <div className="flex items-baseline mt-2 mb-3">
                  <span className="text-3xl font-extrabold tracking-tight text-[#0F172A]">{tier.price}</span>
                  <span className="text-slate-400 text-xs font-semibold ml-1">{tier.period}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{tier.desc}</p>
              </div>

              <hr className="border-slate-200/50 mb-6" />

              {/* Features list */}
              <div className="flex-1 text-left flex flex-col gap-3.5 mb-8">
                {tier.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]/80">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <Button
                variant={tier.btnVariant}
                size="lg"
                fullWidth
                className={tier.popular ? "shadow-md shadow-primary/20" : ""}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
