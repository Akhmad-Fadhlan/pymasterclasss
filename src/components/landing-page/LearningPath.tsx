"use client";

import React from "react";
import { Check, Lock, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PathStep {
  num: number;
  title: string;
  status: "completed" | "active" | "locked";
}

export const LearningPath: React.FC = () => {
  const steps: PathStep[] = [
    { num: 1, title: "Python Fundamental", status: "completed" },
    { num: 2, title: "Flask Web Dev", status: "active" },
    { num: 3, title: "FastAPI Backend", status: "active" },
    { num: 4, title: "Data Science", status: "locked" },
    { num: 5, title: "GUI Python", status: "locked" },
    { num: 6, title: "IoT x AI", status: "locked" },
    { num: 7, title: "AI Web Builder", status: "locked" },
    { num: 8, title: "Deploy & Graduation", status: "locked" },
  ];

  return (
    <section id="learning-path" className="py-24 bg-gradient-to-b from-white to-[#F3F7FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Learning Path Python Developer
            </h2>
            <p className="text-base text-[#0F172A]/60 font-medium max-w-xl">
              Ikuti roadmap terstruktur dari dasar hingga mampu membangun produk nyata dan siap kerja.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right flex justify-start lg:justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              Lihat Semua Path
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Stepper (hidden on mobile/tablet) */}
        <div className="hidden lg:block relative py-12">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          
          <div className="relative z-10 flex justify-between items-center gap-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 text-center">
                {/* Step Node */}
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-300 relative ${
                    step.status === "completed"
                      ? "bg-[#10B981] border-[#E8F8F3] text-white shadow-lg shadow-[#10B981]/20"
                      : step.status === "active"
                      ? "bg-primary border-blue-50 text-white shadow-lg shadow-primary/20 scale-110"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : step.status === "active" ? (
                    step.num
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}

                  {/* Top Check indicator for completed */}
                  {step.status === "completed" && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-[#10B981] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[#10B981] stroke-[4]" />
                    </div>
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={`mt-4 text-xs font-bold px-2 ${
                    step.status === "active"
                      ? "text-primary"
                      : step.status === "completed"
                      ? "text-[#0F172A]"
                      : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet & Mobile Layout: Vertical Stepper */}
        <div className="lg:hidden relative flex flex-col gap-8 text-left py-4">
          {/* Vertical Connector line exactly centered behind the circles */}
          <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-200 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center pl-12 z-10">
              {/* Stepper Node (Circle) */}
              <div
                className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs z-10 transition-all duration-300 ${
                  step.status === "completed"
                    ? "bg-[#10B981] border-[#E8F8F3] text-white shadow-md shadow-[#10B981]/10"
                    : step.status === "active"
                    ? "bg-primary border-blue-50 text-white scale-110 shadow-md shadow-primary/10"
                    : "bg-white border-slate-100 text-slate-400"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : step.status === "active" ? (
                  step.num
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>
              
              <div>
                <h4
                  className={`text-sm font-bold ${
                    step.status === "active"
                      ? "text-primary"
                      : step.status === "completed"
                      ? "text-[#0F172A]"
                      : "text-slate-400"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {step.status === "completed"
                    ? "Selesai Dipelajari"
                    : step.status === "active"
                    ? "Materi Berjalan"
                    : "Terkunci"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
