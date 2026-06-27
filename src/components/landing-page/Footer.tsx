import React from "react";
import { BookOpen } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-extrabold tracking-tight text-white">
                PYMASTERCLASS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Platform belajar Python dari dasar hingga mahir melalui project nyata, AI Mentor, latihan interaktif, hingga deploy ke internet.
            </p>
            {/* Social media links */}
            <div className="flex gap-4">
              {/* Github */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              {/* Linkedin */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              {/* Mail */}
              <a
                href="mailto:support@pymasterclass.com"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Program Belajar</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li><a href="#learning-path" className="hover:text-white transition-colors">Python Fundamental</a></li>
              <li><a href="#learning-path" className="hover:text-white transition-colors">Flask Web Dev</a></li>
              <li><a href="#learning-path" className="hover:text-white transition-colors">FastAPI Backend</a></li>
              <li><a href="#learning-path" className="hover:text-white transition-colors">IoT & AI Integration</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Komunitas</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li><a href="#testimoni" className="hover:text-white transition-colors">Testimoni Alumni</a></li>
              <li><a href="#harga" className="hover:text-white transition-colors">Paket Belajar</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal info */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Legalitas</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Ketentuan Layanan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <span>&copy; {new Date().getFullYear()} PyMasterClass. Hak Cipta Dilindungi Undang-Undang.</span>
          <span>Dibuat dengan ❤️ di Indonesia</span>
        </div>
      </div>
    </footer>
  );
};
