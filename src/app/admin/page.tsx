"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Layout,
  Layers,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  Eye,
  Settings,
  DollarSign,
  Compass,
  ArrowRight,
  ShieldCheck,
  Power,
  Edit3
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"analytics" | "builder" | "students">("analytics");

  // Admin Mock Analytics Data
  const analytics = {
    revenue: "Rp 45.280.000",
    students: "10.240",
    activeMissions: "12",
    completionRate: "86.4%",
  };

  // Course Builder Local State for simulation
  const [missions, setMissions] = useState([
    { id: 1, title: "Python Foundation", lessons: 4, published: true },
    { id: 2, title: "Flask Web Development", lessons: 3, published: true },
    { id: 3, title: "FastAPI Backend", lessons: 3, published: false },
  ]);
  const [newMissionTitle, setNewMissionTitle] = useState("");

  const addMission = () => {
    if (!newMissionTitle.trim()) return;
    const newId = missions.length + 1;
    setMissions([...missions, { id: newId, title: newMissionTitle, lessons: 1, published: false }]);
    setNewMissionTitle("");
  };

  const deleteMission = (id: number) => {
    setMissions(missions.filter((m) => m.id !== id));
  };

  const togglePublish = (id: number) => {
    setMissions(
      missions.map((m) => (m.id === id ? { ...m, published: !m.published } : m))
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F7FF] flex flex-col md:flex-row pb-20 md:pb-0">
      
      {/* 1. Admin Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 flex-shrink-0 text-left text-slate-400">
        {/* Brand logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">
            ADMIN PANEL
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {[
            { id: "analytics", name: "Analytics Dashboard", icon: TrendingUp },
            { id: "builder", name: "Course Builder", icon: Layers },
            { id: "students", name: "Siswa Analytics", icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Back to main dashboard link */}
        <Link href="/dashboard" className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors mt-auto">
          <Layout className="w-5 h-5" />
          Dashboard Siswa
        </Link>
      </aside>

      {/* 2. Main Content Viewport */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
                {activeTab === "analytics" && "Admin Control Room"}
                {activeTab === "builder" && "Course & Path Builder"}
                {activeTab === "students" && "Database Siswa"}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {activeTab === "analytics" && "Statistik performa belajar dan keuangan PyMasterClass."}
                {activeTab === "builder" && "Susun dan kelola Mission, Lesson, Slide, Quiz, dan Mini Project."}
                {activeTab === "students" && "Daftar progress, nilai kuis, dan kelulusan siswa."}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#10B981]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Super Admin
              </span>
            </div>
          </div>

          {/* TAB 1: ANALYTICS DASHBOARD */}
          {activeTab === "analytics" && (
            <div className="flex flex-col gap-6 text-left">
              
              {/* Analytics metrics row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", val: analytics.revenue, color: "text-emerald-600", icon: DollarSign },
                  { label: "Siswa Aktif", val: analytics.students, color: "text-primary", icon: Users },
                  { label: "Misi Aktif", val: analytics.activeMissions, color: "text-purple-600", icon: Compass },
                  { label: "Rasio Kelulusan", val: analytics.completionRate, color: "text-[#F59E0B]", icon: CheckCircle },
                ].map((met, idx) => {
                  const MetIcon = met.icon;
                  return (
                    <Card key={idx} variant="glass" className="p-5 border border-white/60 relative overflow-hidden flex flex-col justify-center">
                      <MetIcon className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 opacity-30" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{met.label}</span>
                      <span className={`text-xl sm:text-2xl font-black ${met.color}`}>{met.val}</span>
                    </Card>
                  );
                })}
              </div>

              {/* Graphical representation mock cards */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Popular Modules chart */}
                <div className="md:col-span-8">
                  <Card variant="glass" className="p-6 border border-white/60 flex flex-col h-full">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Popularitas Modul</h3>
                    <div className="flex flex-col gap-4">
                      {[
                        { name: "Python Foundation", pct: "95%", val: "4.8K siswa" },
                        { name: "Flask Web Dev", pct: "75%", val: "3.2K siswa" },
                        { name: "FastAPI Backend", pct: "45%", val: "1.5K siswa" },
                      ].map((mod, mi) => (
                        <div key={mi} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-[#0F172A]">{mod.name}</span>
                            <span className="text-primary">{mod.val}</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 p-[1.5px]">
                            <div className="h-full bg-primary rounded-full" style={{ width: mod.pct }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Sales logs */}
                <div className="md:col-span-4">
                  <Card variant="glass" className="p-6 border border-white/60 flex flex-col h-full">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Penjualan Terbaru</h3>
                    <div className="flex flex-col gap-3.5">
                      {[
                        { user: "Fathan G.", pkg: "Profesional", date: "Tadi" },
                        { user: "Rian C.", pkg: "Starter", date: "1 jam lalu" },
                        { user: "Putri E.", pkg: "Ultimate", date: "2 jam lalu" },
                      ].map((sale, si) => (
                        <div key={si} className="flex justify-between items-center text-xs font-bold border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                          <div>
                            <h4 className="text-[#0F172A]">{sale.user}</h4>
                            <span className="text-[10px] text-slate-400">Paket {sale.pkg}</span>
                          </div>
                          <span className="text-slate-400 font-semibold">{sale.date}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: COURSE BUILDER */}
          {activeTab === "builder" && (
            <div className="flex flex-col gap-6 text-left">
              
              {/* Creator form */}
              <Card variant="glass" className="p-6 border border-white/60 flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <Input
                    label="Tambah Mission (Modul Baru)"
                    placeholder="Nama Misi, Contoh: Data Science Integration"
                    value={newMissionTitle}
                    onChange={(e) => setNewMissionTitle(e.target.value)}
                  />
                </div>
                <Button onClick={addMission} variant="primary" className="flex items-center gap-1.5 w-full sm:w-auto h-11">
                  <Plus className="w-4 h-4" />
                  Tambah Misi
                </Button>
              </Card>

              {/* Missions list */}
              <div className="flex flex-col gap-4">
                {missions.map((m) => (
                  <Card key={m.id} variant="glass" className="p-5 border border-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                        {m.id}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0F172A]">{m.title}</h4>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                          {m.lessons} Lesson checkpoints • Slide, Quiz, Project Ready
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => togglePublish(m.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                          m.published
                            ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/25"
                            : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        {m.published ? "Published" : "Draft"}
                      </button>

                      <button
                        onClick={() => deleteMission(m.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-rose-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: SISWA DATABASE */}
          {activeTab === "students" && (
            <div className="flex flex-col gap-6 text-left">
              <Card variant="glass" className="p-6 border border-white/60">
                <div className="flex flex-col divide-y divide-slate-100">
                  {[
                    { name: "Fathan Ghipari", email: "fathan@example.com", path: "Backend Dev", progress: "78%", rating: "4.9" },
                    { name: "Rian Cahyadi", email: "rian@example.com", path: "Web Dev", progress: "90%", rating: "4.7" },
                    { name: "Putri Eka", email: "putri@example.com", path: "FastAPI", progress: "60%", rating: "5.0" },
                    { name: "Andi Wijaya", email: "andi@example.com", path: "IoT AI", progress: "20%", rating: "4.2" },
                  ].map((student, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0F172A]">{student.name}</h4>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{student.email}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-0.5">Jalur Path</span>
                          <span className="text-[#0F172A]">{student.path}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-0.5">Progress</span>
                          <span className="text-primary">{student.progress}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-0.5">Skor Kuis</span>
                          <span className="text-[#F59E0B]">{student.rating} / 5.0</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      {/* Admin Mobile Navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 py-2.5 px-6 flex justify-between items-center md:hidden text-slate-400">
        {[
          { id: "analytics", name: "Analytics", icon: TrendingUp },
          { id: "builder", name: "Builder", icon: Layers },
          { id: "students", name: "Siswa", icon: Users },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-200"
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
