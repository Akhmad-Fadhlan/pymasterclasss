"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Award, Layers } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Project {
  title: string;
  tech: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  img: string;
}

export const ProjectShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects: Project[] = [
    {
      title: "Website Inventaris",
      tech: "Flask",
      difficulty: "Intermediate",
      duration: "6-8 Jam",
      img: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Dashboard Admin",
      tech: "Flask",
      difficulty: "Intermediate",
      duration: "6-8 Jam",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "REST API",
      tech: "FastAPI",
      difficulty: "Intermediate",
      duration: "6-8 Jam",
      img: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Smart Greenhouse",
      tech: "IoT & AI",
      difficulty: "Advanced",
      duration: "8-12 Jam",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Desktop GUI App",
      tech: "PyQt",
      difficulty: "Intermediate",
      duration: "7 Jam",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Landing Page AI",
      tech: "AI Web",
      difficulty: "Beginner",
      duration: "4-6 Jam",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= projects.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 3 : prev - 1));
  };

  // For mobile navigation
  const handleNextMobile = () => {
    setCurrentIndex((prev) => (prev + 1 >= projects.length ? 0 : prev + 1));
  };

  const handlePrevMobile = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section id="projek" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Project Nyata yang Akan Kamu Bangun
          </h2>
          <p className="text-base text-[#0F172A]/60 font-medium">
            Semua project dirancang untuk portofolio dan kebutuhan dunia kerja.
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative">
          
          {/* Desktop Slider View (shows 3 cards) */}
          <div className="hidden md:block overflow-hidden py-4">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3.05)}%)`,
              }}
            >
              {projects.map((proj, idx) => (
                <div key={idx} className="min-w-[calc(33.333%-1.33rem)] w-[calc(33.333%-1.33rem)] flex-shrink-0">
                  <Card variant="glass" hoverable className="h-full border border-slate-100 flex flex-col p-4">
                    {/* Project Image */}
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 relative bg-slate-100">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 bg-[#2563EB] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {proj.tech}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-[#0F172A] mb-3 text-left">
                      {proj.title}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-4 mt-auto text-slate-500 text-xs">
                      <div className="flex items-center gap-1 font-semibold">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        <span>{proj.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{proj.duration}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Slider View (shows 1 card) */}
          <div className="md:hidden overflow-hidden py-4">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((proj, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-2">
                  <Card variant="glass" className="w-full border border-slate-100 flex flex-col p-4">
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 relative bg-slate-100">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#2563EB] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {proj.tech}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-3 text-left">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-auto text-slate-500 text-xs">
                      <div className="flex items-center gap-1 font-semibold">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        <span>{proj.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{proj.duration}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-primary transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-primary transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex md:hidden gap-2 mx-auto">
              <button
                onClick={handlePrevMobile}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMobile}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden md:block">
              <Button variant="primary" className="flex items-center gap-2">
                Lihat Semua Project
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
