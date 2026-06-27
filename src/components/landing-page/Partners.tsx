import React from "react";

export const Partners: React.FC = () => {
  return (
    <section className="py-12 bg-white/40 border-y border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Dipercaya oleh institusi dan komunitas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16 opacity-60">
          
          {/* SMK BISA HEBAT */}
          <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm tracking-tight">
            <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" />
            </svg>
            <div className="leading-none text-left">
              <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">SMK</div>
              <div>BISA-HEBAT</div>
            </div>
          </div>

          {/* Universitas Indonesia */}
          <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
            <div className="w-6 h-6 rounded-full border-2 border-slate-500 flex items-center justify-center text-[10px] text-slate-500 font-extrabold">UI</div>
            <span className="tracking-wide">Universitas Indonesia</span>
          </div>

          {/* Kampus Merdeka */}
          <div className="flex items-center gap-1.5 font-black text-slate-700 text-base italic">
            <span className="text-primary not-italic">✔</span> Kampus <span className="text-[#F59E0B] not-italic">Merdeka</span>
          </div>

          {/* Dicoding */}
          <div className="flex items-center gap-1.5 font-extrabold text-slate-700 text-base tracking-tight">
            <div className="w-5 h-5 bg-slate-500 rounded-lg flex items-center justify-center text-white text-xs font-black">d</div>
            <span>dicoding</span>
          </div>

          {/* GDSC */}
          <div className="flex items-center gap-2 font-semibold text-slate-700 text-xs tracking-tight">
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-60" />
            </div>
            <span>Google Developer Student Clubs</span>
          </div>

        </div>
      </div>
    </section>
  );
};
