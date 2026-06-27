"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onStartLearningClick?: () => void;
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartLearningClick, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Beranda");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#beranda" },
    { name: "Learning Path", href: "#learning-path" },
    { name: "Projek", href: "#projek" },
    { name: "Harga", href: "#harga" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-sm border-b border-slate-200/40" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#0F172A]">
              PYMASTERCLASS
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-[#0F172A]/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" onClick={onLoginClick}>
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" onClick={onStartLearningClick}>
                Mulai Belajar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0F172A] hover:text-primary p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Opaque white bg to prevent overlaps) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-2xl border-b border-slate-200/80 absolute top-full left-0 right-0 py-5 px-6 flex flex-col gap-3 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsOpen(false);
                }}
                className={`text-sm font-bold px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-[#0F172A]/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <hr className="border-slate-100 my-2" />
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="md" fullWidth>
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="md" fullWidth>
                Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
