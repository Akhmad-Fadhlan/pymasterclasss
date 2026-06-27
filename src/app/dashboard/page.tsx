"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Home,
  Compass,
  Trophy,
  User,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  BrainCircuit,
  Award,
  LogOut,
  ChevronRight,
  Sparkles,
  Play
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"beranda" | "mission" | "kelas" | "profil">("beranda");
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { id: "beranda", name: "Beranda", icon: Home },
    { id: "mission", name: "Mission", icon: Compass },
    { id: "kelas", name: "Kelas", icon: Trophy },
    { id: "profil", name: "Profil", icon: User },
  ] as const;

  // Mock Leaderboard Data
  const leaderboard = [
    { rank: 1, name: "Fathan Ghipari", xp: 1250, badge: "Python Master", isSelf: true },
    { rank: 2, name: "Rian Cahyadi", xp: 1100, badge: "Flask Pro", isSelf: false },
    { rank: 3, name: "Putri Eka", xp: 980, badge: "FastAPI Hero", isSelf: false },
    { rank: 4, name: "Budi Santoso", xp: 850, badge: "Data Wiz", isSelf: false },
    { rank: 5, name: "Siti Rahma", xp: 720, badge: "IoT Cadet", isSelf: false },
  ];

  // Mock Missions Data
  const missions = [
    {
      id: 1,
      title: "Python Foundation",
      checkpoints: 4,
      status: "completed",
      desc: "Dasar-dasar variabel, perulangan, & tipe data.",
    },
    {
      id: 2,
      title: "Flask Web Development",
      checkpoints: 3,
      status: "completed",
      desc: "Routing, templates, & database integration.",
    },
    {
      id: 3,
      title: "FastAPI Backend",
      checkpoints: 3,
      status: "active",
      desc: "Membangun REST API performa tinggi, async, & JWT.",
    },
    {
      id: 4,
      title: "Data Science",
      checkpoints: 5,
      status: "locked",
      desc: "Pengolahan Pandas, NumPy, & visualisasi grafik.",
    },
  ];

  const handleStartMission = (mId: number) => {
    // Redirect to learning flow page with mission id
    router.push(`/learning?mission=${mId}`);
  };

  return (
    <div className="min-h-screen bg-[#F3F7FF] flex flex-col md:flex-row pb-20 md:pb-0">
      
      {/* 1. Sidebar Navigation (Desktop only) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/60 p-6 flex-shrink-0 text-left">
        {/* Brand logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#0F172A]">
            PYMASTERCLASS
          </span>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex flex-col gap-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Logout button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors mt-auto cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </aside>

      {/* 2. Main content viewport */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
                {activeTab === "beranda" && "Dashboard"}
                {activeTab === "mission" && "Mission Peta Perjalanan"}
                {activeTab === "kelas" && "Leaderboard Kelas"}
                {activeTab === "profil" && "Profil Pelajar"}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {activeTab === "beranda" && "Halo Fathan, terus belajar dan capai target harianmu!"}
                {activeTab === "mission" && "Selesaikan checkpoint misi untuk membuka sertifikat."}
                {activeTab === "kelas" && "Kumpulkan XP belajar untuk naik tingkat peringkat."}
                {activeTab === "profil" && "Kelola akun, badge penghargaan, dan verifikasi sertifikat."}
              </p>
            </div>
            {/* User profile dot avatar */}
            <div className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-md border-2 border-white cursor-pointer">
              F
            </div>
          </div>

          {/* TAB 1: BERANDA */}
          {activeTab === "beranda" && (
            <div className="flex flex-col gap-6">
              {/* Stats KPI Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Misi Aktif", val: "12", color: "bg-blue-50 text-primary border-blue-100", icon: Compass },
                  { label: "Selesai", val: "35", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: CheckCircle },
                  { label: "Tertunda", val: "7", color: "bg-amber-50 text-amber-600 border-amber-100", icon: AlertCircle },
                ].map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <Card
                      key={idx}
                      variant="glass"
                      className={`flex flex-col items-center justify-center p-4 border border-white/60 relative overflow-hidden`}
                    >
                      <StatIcon className="w-4 h-4 text-slate-400 absolute top-3 right-3 opacity-40" />
                      <span className="text-2xl sm:text-3xl font-black mb-1">{stat.val}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    </Card>
                  );
                })}
              </div>

              {/* Progress and Search block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Search Bar */}
                <div className="md:col-span-6">
                  <Card variant="glass" className="p-5 flex items-center gap-3 border border-white/50 h-full">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari mission, materi, atau project..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-sm font-semibold placeholder:text-slate-400 focus:outline-none w-full text-left"
                    />
                  </Card>
                </div>

                {/* Progress Bar Card */}
                <div className="md:col-span-6">
                  <Card variant="glass" className="p-5 border border-white/50 flex flex-col justify-center h-full">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2">
                      <span className="uppercase tracking-wider">Progress Belajar</span>
                      <span className="text-primary font-black">78%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px]">
                      <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                    </div>
                  </Card>
                </div>

              </div>

              {/* Continue Learning card */}
              <Card variant="glass" className="p-6 border border-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">Mission 3</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">FastAPI Backend</h3>
                    <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      Lanjutan: Routing & Path Params (60% Selesai)
                    </p>
                  </div>
                </div>
                <Button onClick={() => handleStartMission(3)} variant="primary" className="flex items-center gap-2 group w-full sm:w-auto">
                  Lanjutkan Belajar
                  <Play className="w-3 h-3 fill-white text-white group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Card>

              {/* Grid content: Daily Goal & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* Daily Goal card */}
                <Card variant="glass" className="border border-white/50 flex flex-col">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                    Daily Goal
                  </h3>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2.5">
                    <span>120 / 200 XP hari ini</span>
                    <span className="text-slate-400">60%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px] mb-4">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-[#F59E0B] rounded-full" style={{ width: "60%" }} />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed mt-auto">
                    Kumpulkan 80 XP lagi dengan menyelesaikan latihan atau quiz untuk mencetak rentetan (streak) belajarmu!
                  </p>
                </Card>

                {/* Achievements Showcase */}
                <Card variant="glass" className="border border-white/50 flex flex-col">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    Badge Penghargaan
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: "⚡", name: "Code Warrior", desc: "10x latihan" },
                      { icon: "🛡️", name: "Secure Dev", desc: "Lulus Auth Module" },
                      { icon: "🎓", name: "First Step", desc: "Register Akun" },
                    ].map((badge, bidx) => (
                      <div key={bidx} className="flex flex-col items-center flex-1 text-center bg-white/40 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-2xl mb-1.5">{badge.icon}</span>
                        <span className="text-[10px] font-extrabold text-[#0F172A] truncate w-full">{badge.name}</span>
                        <span className="text-[9px] font-semibold text-slate-400 mt-0.5">{badge.desc}</span>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>
            </div>
          )}

          {/* TAB 2: MISSION ROADMAP */}
          {activeTab === "mission" && (
            <div className="flex flex-col gap-6 text-left">
              {missions.map((m) => (
                <Card
                  key={m.id}
                  variant="glass"
                  className={`p-6 border relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                    m.status === "locked" ? "opacity-60 border-slate-200/50" : "border-white/60"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border font-bold ${
                        m.status === "completed"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : m.status === "active"
                          ? "bg-blue-50 border-blue-100 text-primary animate-pulse"
                          : "bg-slate-50 border-slate-100 text-slate-400"
                      }`}
                    >
                      {m.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-extrabold text-[#0F172A]">{m.title}</h3>
                        {m.status === "completed" && (
                          <Badge variant="selesai">Selesai</Badge>
                        )}
                        {m.status === "active" && (
                          <Badge variant="berjalan">Berjalan</Badge>
                        )}
                        {m.status === "locked" && (
                          <Badge variant="tertunda">Terkunci</Badge>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-400 mt-1">{m.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-400 mr-2">
                      {m.checkpoints} Checkpoints
                    </span>
                    {m.status === "completed" ? (
                      <Button onClick={() => handleStartMission(m.id)} variant="outline" size="sm">
                        Ulas Kembali
                      </Button>
                    ) : m.status === "active" ? (
                      <Button onClick={() => handleStartMission(m.id)} variant="primary" size="sm" className="flex items-center gap-1.5">
                        Mulai Misi
                        <Play className="w-3 h-3 fill-white text-white" />
                      </Button>
                    ) : (
                      <Button variant="disabled" size="sm" disabled>
                        Terkunci
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* TAB 3: LEADERBOARD KELAS */}
          {activeTab === "kelas" && (
            <div className="flex flex-col gap-6 text-left">
              <Card variant="glass" className="border border-white/60 p-6">
                <div className="flex flex-col divide-y divide-slate-100">
                  {leaderboard.map((student) => (
                    <div
                      key={student.rank}
                      className={`flex items-center justify-between py-4 ${
                        student.isSelf ? "bg-primary/5 -mx-6 px-6 font-bold" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-6 text-center font-black text-sm ${
                            student.rank === 1
                              ? "text-yellow-500 text-lg"
                              : student.rank === 2
                              ? "text-slate-400"
                              : student.rank === 3
                              ? "text-amber-600"
                              : "text-slate-400"
                          }`}
                        >
                          {student.rank === 1 ? "🥇" : student.rank === 2 ? "🥈" : student.rank === 3 ? "🥉" : student.rank}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#0F172A]">{student.name}</h4>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {student.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-primary">{student.xp} XP</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* TAB 4: PROFIL PELAJAR */}
          {activeTab === "profil" && (
            <div className="flex flex-col gap-6 text-left">
              <Card variant="glass" className="border border-white/60 p-8 flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white">
                    F
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0F172A]">Fathan Ghipari</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">Siswa PyMasterClass sejak Juni 2026</p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Username", val: "fathanghipari" },
                    { label: "WhatsApp", val: "08123456789" },
                    { label: "Tujuan Belajar", val: "FastAPI Backend & AI Integration" },
                    { label: "Peringkat Kelas", val: "1st Place (1250 XP)" },
                  ].map((fld, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fld.label}</span>
                      <span className="text-sm font-bold text-[#0F172A]">{fld.val}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Sertifikat Kelulusan</h4>
                  <div className="p-4 rounded-xl border border-slate-200/50 bg-white/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-[#10B981]">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#0F172A]">Python Foundation Certificate</h5>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Diterbitkan 25 Juni 2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Unduh PDF</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      {/* 3. Bottom Navigation Bar (Mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/60 py-2.5 px-6 flex justify-between items-center md:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.name}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
