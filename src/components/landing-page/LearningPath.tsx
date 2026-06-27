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
        <div className="hidden lg:block relative max-w-5xl mx-auto py-16 px-8">
          
          {/* Serpent Connector Lines (Aligned exactly to circle centers at 92px offset) */}
          {/* Row 1 horizontal line */}
          <div className="absolute top-[92px] left-[12.5%] right-[12.5%] h-[4px] bg-slate-200/80 z-0" />
          
          {/* Row 2 horizontal line */}
          <div className="absolute bottom-[92px] left-[12.5%] right-[12.5%] h-[4px] bg-slate-200/80 z-0" />
          
          {/* Right U-Turn Connector linking Row 1 (col 4) to Row 2 (col 4) */}
          <div className="absolute right-[calc(12.5%-28px)] top-[92px] bottom-[92px] w-[56px] border-r-4 border-y-4 border-l-0 border-slate-200/80 rounded-r-3xl z-0" />

          {/* Serpent grid */}
          <div className="relative z-10 grid grid-cols-4 gap-y-28">
            {steps.map((step, idx) => {
              // serpentine layout mapping:
              // Row 1 (left to right): col 1, col 2, col 3, col 4
              // Row 2 (right to left): col 4, col 3, col 2, col 1
              const gridPositions = [
                "col-start-1 row-start-1", // Step 1
                "col-start-2 row-start-1", // Step 2
                "col-start-3 row-start-1", // Step 3
                "col-start-4 row-start-1", // Step 4
                "col-start-4 row-start-2", // Step 5
                "col-start-3 row-start-2", // Step 6
                "col-start-2 row-start-2", // Step 7
                "col-start-1 row-start-2", // Step 8
              ];

              return (
                <div key={idx} className={`flex flex-col items-center text-center ${gridPositions[idx]}`}>
                  {/* Step Node */}
                  <div
                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-extrabold text-sm transition-all duration-300 relative z-10 ${
                      step.status === "completed"
                        ? "bg-[#10B981] border-[#E8F8F3] text-white shadow-lg shadow-[#10B981]/20"
                        : step.status === "active"
                        ? "bg-primary border-blue-50 text-white shadow-lg shadow-primary/20 scale-110"
                        : "bg-white border-slate-100 text-slate-400"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : step.status === "active" ? (
                      step.num
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}

                    {/* Step order badge count indicator */}
                    <div className="absolute -top-2.5 -left-2.5 bg-slate-100 border border-slate-200/80 rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm z-20">
                      #{step.num}
                    </div>
                  </div>

                  {/* Step Title */}
                  <div className="mt-4 flex flex-col items-center gap-1.5">
                    <span
                      className={`text-sm font-extrabold transition-colors ${
                        step.status === "active"
                          ? "text-primary"
                          : step.status === "completed"
                          ? "text-[#0F172A]"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        step.status === "completed"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : step.status === "active"
                          ? "bg-primary/10 text-primary animate-pulse"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step.status === "completed"
                        ? "Selesai"
                        : step.status === "active"
                        ? "Berjalan"
                        : "Terkunci"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet & Mobile Layout: Vertical Serpentine Stepper */}
        <div className="lg:hidden relative grid grid-cols-2 gap-x-4 gap-y-24 py-12 px-2 max-w-md mx-auto">
          {steps.map((step, idx) => {
            // Serpentine mapping in 2 columns:
            // Row 1: col 1, col 2
            // Row 2: col 2, col 1
            // Row 3: col 1, col 2
            // Row 4: col 2, col 1
            const mobileGridPositions = [
              "col-start-1 row-start-1", // Step 1
              "col-start-2 row-start-1", // Step 2
              "col-start-2 row-start-2", // Step 3
              "col-start-1 row-start-2", // Step 4
              "col-start-1 row-start-3", // Step 5
              "col-start-2 row-start-3", // Step 6
              "col-start-2 row-start-4", // Step 7
              "col-start-1 row-start-4", // Step 8
            ];

            // Render connector lines relative to each step node
            let connectorLine = null;
            if (idx === 0) {
              // Row 1: step 1 -> step 2 (horizontal right)
              connectorLine = (
                <div className={`absolute left-1/2 top-6 w-full h-[3px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 1) {
              // Right turn down: step 2 -> step 3 (vertical down)
              connectorLine = (
                <div className={`absolute left-[calc(50%-1.5px)] top-6 w-[3px] h-[190px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 2) {
              // Row 2: step 3 -> step 4 (horizontal left)
              connectorLine = (
                <div className={`absolute right-1/2 top-6 w-full h-[3px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 3) {
              // Left turn down: step 4 -> step 5 (vertical down)
              connectorLine = (
                <div className={`absolute left-[calc(50%-1.5px)] top-6 w-[3px] h-[190px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 4) {
              // Row 3: step 5 -> step 6 (horizontal right)
              connectorLine = (
                <div className={`absolute left-1/2 top-6 w-full h-[3px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 5) {
              // Right turn down: step 6 -> step 7 (vertical down)
              connectorLine = (
                <div className={`absolute left-[calc(50%-1.5px)] top-6 w-[3px] h-[190px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            } else if (idx === 6) {
              // Row 4: step 7 -> step 8 (horizontal left)
              connectorLine = (
                <div className={`absolute right-1/2 top-6 w-full h-[3px] z-0 ${
                  step.status === "completed" ? "bg-[#10B981]" : "bg-slate-200"
                }`} />
              );
            }

            return (
              <div key={idx} className={`flex flex-col items-center text-center relative ${mobileGridPositions[idx]}`}>
                {/* Connector line relative to this node */}
                {connectorLine}

                {/* Circle Stepper Node */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs z-10 transition-all duration-300 relative ${
                    step.status === "completed"
                      ? "bg-[#10B981] border-[#E8F8F3] text-white shadow-md shadow-[#10B981]/15"
                      : step.status === "active"
                      ? "bg-primary border-blue-50 text-white scale-110 shadow-md shadow-primary/15"
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

                  {/* Step order badge for mobile */}
                  <div className="absolute -top-1.5 -left-1.5 bg-slate-50 border border-slate-200/60 rounded-full w-5 h-5 flex items-center justify-center text-[8px] font-black text-slate-500 shadow-sm z-20">
                    #{step.num}
                  </div>
                </div>
                
                {/* Step Metadata & Title */}
                <div className="mt-3 flex flex-col items-center gap-1">
                  <h4
                    className={`text-xs font-extrabold ${
                      step.status === "active"
                        ? "text-primary"
                        : step.status === "completed"
                        ? "text-[#0F172A]"
                        : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      step.status === "completed"
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : step.status === "active"
                        ? "bg-primary/10 text-primary animate-pulse"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    {step.status === "completed"
                      ? "Selesai"
                      : step.status === "active"
                      ? "Berjalan"
                      : "Terkunci"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
