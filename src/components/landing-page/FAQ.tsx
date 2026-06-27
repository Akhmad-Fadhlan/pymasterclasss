"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "Apakah saya harus memiliki dasar programming sebelum mendaftar?",
      a: "Tidak perlu. Learning path kami dirancang dari Python Fundamental (dasar sekali) untuk membimbing kamu yang belum pernah belajar coding sama sekali hingga mahir.",
    },
    {
      q: "Bagaimana cara kerja AI Mentor 24/7 di PyMasterClass?",
      a: "Di setiap modul praktek lab, ada tombol AI Mentor. Jika kode kamu error atau kamu bingung dengan instruksi soal, AI Mentor akan menganalisis kode kamu dan memberikan petunjuk (hint) serta penjelasan detail tanpa langsung membocorkan jawaban agar kamu tetap berpikir kritis.",
    },
    {
      q: "Apakah materi pembelajaran bisa diakses selamanya?",
      a: "Ya! Dengan membeli paket pembelajaran sekali saja (lifetime access), kamu bebas mengakses materi, slides interaktif, lab, dan pembaruan kurikulum di masa mendatang tanpa biaya langganan bulanan.",
    },
    {
      q: "Bagaimana proses penilaian project dan sertifikat resmi?",
      a: "Setiap selesai menyelesaikan mission (modul), kamu akan ditantang mengerjakan Mini Project. Setelah disubmit, project kamu akan dicek oleh sistem (Auto Checker) dan direview secara komprehensif. Setelah menyelesaikan seluruh path, sertifikat digital resmi ber-QR Code validasi akan diterbitkan dan siap dibagikan ke LinkedIn.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-[#F3F7FF] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-primary" />
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#0F172A]/60 font-medium">
            Ada pertanyaan yang sering diajukan? Temukan jawabannya di bawah ini.
          </p>
        </div>

        {/* FAQs List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <Card
                key={idx}
                variant="glass"
                className={`p-5 cursor-pointer border transition-all duration-300 ${
                  isOpen ? "border-primary/20 shadow-md bg-white" : "border-white/50 hover:bg-white/45"
                }`}
                onClick={() => toggleFAQ(idx)}
              >
                {/* Header Row */}
                <div className="flex justify-between items-center gap-4 text-left">
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-primary" : ""
                    }`}
                  />
                </div>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out text-left ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed border-t border-slate-100 pt-3.5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
