"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, User, Briefcase, Award, Check, Sparkles, BrainCircuit, Play, ArrowRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 State: Profile
  const [profile, setProfile] = useState({
    username: "",
    phone: "",
    profession: "",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Step 2 State: Learning Goal
  const [goal, setGoal] = useState<string>("");

  // Step 3 State: Assessment Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizErrors, setQuizErrors] = useState<string>("");

  // Step 4 State: AI Customizing Path
  const [aiProgress, setAiProgress] = useState(0);

  const goals = [
    { id: "web", title: "Web Development", desc: "Membangun website modern dengan Flask/Django.", icon: "🌐" },
    { id: "backend", title: "Backend API", desc: "Membuat REST API handal dengan FastAPI & Database.", icon: "⚙️" },
    { id: "datascience", title: "Data Science", desc: "Menganalisis data, statistik, & visualisasi Python.", icon: "📊" },
    { id: "ai", title: "AI Integration", desc: "Menghubungkan model kecerdasan buatan & NLP.", icon: "🧠" },
    { id: "iot", title: "IoT x AI", desc: "Pemrograman mikrokontroler dengan logika AI.", icon: "🔌" },
  ];

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Apa output dari kode Python berikut: print(type([]))?",
      options: ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
      correct: 0,
    },
    {
      id: 2,
      question: "Struktur data mana di Python yang menyimpan data dalam format key-value?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correct: 1,
    },
    {
      id: 3,
      question: "Keyword apa yang digunakan untuk mendefinisikan sebuah fungsi di Python?",
      options: ["function", "define", "def", "func"],
      correct: 2,
    },
  ];

  // AI simulation hook
  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setAiProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(5), 600);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!profile.username.trim()) errs.username = "Username wajib diisi";
    if (!profile.profession.trim()) errs.profession = "Pekerjaan/Latar belakang wajib diisi";
    
    if (Object.keys(errs).length > 0) {
      setProfileErrors(errs);
      return;
    }
    setStep(2);
  };

  const handleGoalSubmit = () => {
    if (!goal) return;
    setStep(3);
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < questions.length) {
      setQuizErrors("Mohon jawab seluruh pertanyaan assessment.");
      return;
    }
    setQuizErrors("");
    setStep(4);
  };

  const selectOption = (qId: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F7FF] via-[#F3F7FF] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-xl w-full relative z-10">
        
        {/* Step Indicator Headers */}
        {step <= 3 && (
          <div className="flex justify-between items-center mb-8 px-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                    step === s
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                      : step > s
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : "bg-white border-slate-200 text-slate-400"
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4 text-white stroke-[3]" /> : s}
                </div>
                <span
                  className={`text-xs font-bold ${
                    step === s ? "text-primary" : "text-slate-400"
                  }`}
                >
                  {s === 1 ? "Profil" : s === 2 ? "Tujuan" : "Assessment"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Complete Profile */}
        {step === 1 && (
          <Card variant="glass" className="border border-white/60 p-8 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2 text-left">
              Lengkapi Profil Belajarmu
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-6 text-left">
              Beri tahu kami sedikit tentang dirimu untuk memulai.
            </p>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <Input
                  label="Nama Pengguna (Username)"
                  placeholder="fathanghipari"
                  value={profile.username}
                  onChange={(e) => {
                    setProfile({ ...profile, username: e.target.value });
                    setProfileErrors({});
                  }}
                  error={profileErrors.username}
                  className="pl-10"
                />
                <User className="absolute left-3 top-[38px] w-4 h-4 text-slate-400" />
              </div>

              <div className="relative">
                <Input
                  label="No. Telepon / WhatsApp (Opsional)"
                  placeholder="08123456789"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="pl-10"
                />
                <User className="absolute left-3 top-[38px] w-4 h-4 text-slate-400" />
              </div>

              <div className="relative">
                <Input
                  label="Pekerjaan / Latar Belakang Pendidikan"
                  placeholder="Pelajar SMK / Mahasiswa / Pekerja"
                  value={profile.profession}
                  onChange={(e) => {
                    setProfile({ ...profile, profession: e.target.value });
                    setProfileErrors({});
                  }}
                  error={profileErrors.profession}
                  className="pl-10"
                />
                <Briefcase className="absolute left-3 top-[38px] w-4 h-4 text-slate-400" />
              </div>

              <Button type="submit" variant="primary" fullWidth className="mt-4 flex items-center justify-center gap-2">
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        )}

        {/* Step 2: Choose learning goal */}
        {step === 2 && (
          <Card variant="glass" className="border border-white/60 p-8 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2 text-left">
              Pilih Tujuan Belajarmu
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-6 text-left">
              Pilih jalur fokus yang paling ingin kamu kuasai.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {goals.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setGoal(g.title)}
                  className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-200 text-left ${
                    goal === g.title
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-white/60 border-slate-200/50 hover:bg-white"
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#0F172A]">{g.title}</h4>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{g.desc}</p>
                  </div>
                  {goal === g.title && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button
                variant={goal ? "primary" : "disabled"}
                disabled={!goal}
                onClick={handleGoalSubmit}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Assessment Quiz */}
        {step === 3 && (
          <Card variant="glass" className="border border-white/60 p-8 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2 text-left flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Assessment Awal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-6 text-left">
              Jawab pertanyaan evaluasi singkat untuk menganalisis pemahaman coding dasarmu.
            </p>

            <div className="flex flex-col gap-6 mb-6">
              {questions.map((q) => (
                <div key={q.id} className="text-left">
                  <h4 className="text-sm font-bold text-[#0F172A] mb-3">
                    {q.id}. {q.question}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => selectOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "bg-primary/5 border-primary text-primary"
                              : "bg-white/60 border-slate-200/50 hover:bg-white text-slate-600"
                          }`}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {quizErrors && (
              <span className="text-xs text-danger font-medium block mb-4 text-left">
                {quizErrors}
              </span>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button
                variant="primary"
                onClick={handleQuizSubmit}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Kirim Jawaban
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: AI Analysing path loading */}
        {step === 4 && (
          <Card variant="glass" className="border border-white/60 p-8 shadow-xl text-center flex flex-col items-center py-12">
            <div className="relative w-20 h-20 mb-6">
              {/* Outer spinning border */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-primary animate-spin" />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-md">
                <BrainCircuit className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F59E0B] animate-bounce" />
              AI Menentukan Path Belajarmu...
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-sm mb-6 leading-relaxed">
              Kecerdasan Buatan kami sedang menganalisis jawaban dan tujuan belajar untuk menyesuaikan roadmap modul yang paling tepat.
            </p>

            <div className="w-full max-w-xs h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px]">
              <div
                className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${aiProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary mt-2">{aiProgress}% Selesai</span>
          </Card>
        )}

        {/* Step 5: AI results customized learning path */}
        {step === 5 && (
          <Card variant="glass" className="border border-white/60 p-8 shadow-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#10B981]/15 flex items-center justify-center text-[#10B981] mb-6">
              <Award className="w-10 h-10" />
            </div>

            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full mb-3">
              Rekomendasi Path Untukmu
            </span>
            
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {goal} Developer Path
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-sm mb-8 leading-relaxed">
              Berdasarkan assessment dasar, kamu ditempatkan di level **Pemula-Menengah**. Kurikulum kamu disesuaikan untuk menguasai {goal} dalam waktu 3 bulan.
            </p>

            {/* Path details */}
            <div className="w-full bg-white/60 rounded-2xl p-4 border border-slate-200/40 text-left flex flex-col gap-3.5 mb-8">
              {[
                { title: "Materi Terbuka", val: "Python Fundamental, " + goal },
                { title: "Target Misi", val: "8 Missions & 6 Mini Projects" },
                { title: "Mentor AI Status", val: "Aktif 24/7 (Personalized Assist)" },
              ].map((det, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400">{det.title}</span>
                  <span className="text-[#0F172A]">{det.val}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push("/dashboard")}
              variant="primary"
              size="lg"
              fullWidth
              className="flex items-center justify-center gap-2"
            >
              Masuk ke Dashboard
              <Play className="w-4 h-4 fill-white text-white" />
            </Button>
          </Card>
        )}

      </div>
    </div>
  );
}
