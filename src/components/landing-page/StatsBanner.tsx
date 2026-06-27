import React from "react";

export const StatsBanner: React.FC = () => {
  const stats = [
    { value: "10.000+", label: "Siswa Aktif" },
    { value: "1.250+", label: "Project Dibuat" },
    { value: "4.9/5", label: "Rating Platform" },
    { value: "98%", label: "Siswa Puas" },
  ];

  return (
    <section className="bg-primary py-8 sm:py-10 shadow-lg relative overflow-hidden">
      {/* Subtle background abstract shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center px-4 ${
                index >= 2 ? "pt-6 md:pt-0" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1 animate-pulse">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
