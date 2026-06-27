import React from "react";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const Testimonial: React.FC = () => {
  const reviews = [
    {
      name: "Rian Cahyadi",
      role: "Alumni SMK • Backend Dev at Tech Corp",
      text: "Belajar di PyMasterClass sangat interaktif! Gak cuma nonton video, tapi langsung ngoding di slide-nya dan ada AI Mentor yang siap bantu 24/7 pas error. Sangat rekomendasi buat anak SMK!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
    },
    {
      name: "Fadhlan A.",
      role: "Mahasiswa UI • Data Scientist",
      text: "Learning path-nya jelas banget dari Python Dasar sampai ke FastAPI. Project-project portofolionya riil seperti di dunia kerja. Sangat membantu saya lulus seleksi magang!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
    },
    {
      name: "Putri Eka",
      role: "Self-taught Developer",
      text: "Suka banget sama gamifikasinya! Ada XP dan level yang bikin nagih belajar setiap hari. Dashboard-nya interaktif banget dan glassmorphism design-nya cakep luar biasa.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
    },
  ];

  return (
    <section id="testimoni" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Dipercaya oleh Ribuan Siswa
          </h2>
          <p className="text-base text-[#0F172A]/60 font-medium">
            Apa kata alumni dan siswa aktif kami tentang PyMasterClass.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <Card
              key={idx}
              variant="glass"
              hoverable
              className="flex flex-col relative text-left p-8 border border-slate-100 h-full"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

              {/* Rating stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6 flex-1">
                "{rev.text}"
              </p>

              <hr className="border-slate-100 mb-6" />

              {/* User details */}
              <div className="flex items-center gap-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{rev.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{rev.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
