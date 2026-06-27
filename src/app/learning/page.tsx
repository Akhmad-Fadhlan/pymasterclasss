"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Play,
  Brain,
  CheckCircle,
  HelpCircle,
  Code,
  Sparkles,
  ArrowRight,
  Send,
  MessageSquare
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function LearningFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const missionId = searchParams.get("mission") || "3"; // Default is Mission 3: FastAPI Backend

  // Learning Step Progress:
  // Step 1: Slide 1 (Overview)
  // Step 2: Slide 2 (Concepts)
  // Step 3: Practice (Python Lab)
  // Step 4: Quiz
  // Step 5: Mission Complete
  const [learningStep, setLearningStep] = useState(1);

  // Editor states
  const [code, setCode] = useState("print(\"Halo, PyMasterClass!\")");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Output console akan muncul di sini setelah Anda menjalankan kode..."]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // AI Mentor Chat states
  const [chatTab, setChatTab] = useState<"editor" | "ai">("editor");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo Fathan! Saya AI Mentor Anda. Jika Anda mengalami kesulitan dalam coding atau materi, tanyakan saja di sini." }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");

    // Simulate AI response based on message content
    setTimeout(() => {
      let aiResponse = "Saya siap membantu. Coba tanyakan spesifik mengenai tipe data, error console, atau sintaksis fungsi Python.";
      if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("halo")) {
        aiResponse = "Halo! Butuh bantuan untuk menulis kode print atau function di modul ini?";
      } else if (userMsg.toLowerCase().includes("error") || userMsg.toLowerCase().includes("bantu")) {
        aiResponse = "Tentu! Pastikan tanda kutip dan tanda kurung Anda seimbang. Misalnya: `print(\"Hello World\")`. Coba periksa baris kode Anda kembali.";
      } else if (userMsg.toLowerCase().includes("hint") || userMsg.toLowerCase().includes("petunjuk")) {
        aiResponse = "Petunjuk latihan: Anda perlu menulis sintaksis `print(\"Hello World\")` persis seperti petunjuk agar program berhasil divalidasi.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 1000);
  };

  const runCode = () => {
    setTerminalOutput((prev) => [...prev, `> python main.py`]);
    
    setTimeout(() => {
      // Simple code checker for simulation
      if (learningStep === 3) {
        const cleanCode = code.replace(/\s/g, "");
        if (cleanCode.includes('print("HelloWorld")') || cleanCode.includes("print('HelloWorld')")) {
          setTerminalOutput((prev) => [...prev, "Hello World", "✅ Kode berhasil dijalankan dan divalidasi!", "Klik 'Lanjutkan' untuk masuk ke Quiz."]);
          setIsSuccess(true);
          setShowHint(false);
        } else {
          setTerminalOutput((prev) => [...prev, "Output: " + code, "❌ Output tidak sesuai ekspektasi. Harusnya mencetak: Hello World", "Klik 'Tanya AI Mentor' jika bingung."]);
          setIsSuccess(false);
          setShowHint(true);
        }
      } else {
        setTerminalOutput((prev) => [...prev, "Output: " + code, "Dijalankan sukses!"]);
      }
    }, 600);
  };

  // Quiz states
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    setQuizSubmitted(true);
    if (quizAnswer === 2) {
      setQuizCorrect(true);
    } else {
      setQuizCorrect(false);
    }
  };

  // Reset states on step changes
  useEffect(() => {
    if (learningStep === 3) {
      setCode("# Tulis kode print(\"Hello World\") di bawah ini\n");
      setTerminalOutput(["Output console akan muncul di sini setelah Anda menjalankan kode..."]);
      setIsSuccess(false);
    }
  }, [learningStep]);

  return (
    <div className="min-h-screen bg-[#F3F7FF] flex flex-col">
      {/* Top Header Navigation */}
      <header className="glass border-b border-slate-200/40 py-4 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-left">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">
              Mission {missionId}
            </span>
            <h2 className="text-sm font-extrabold text-[#0F172A] mt-0.5">
              {missionId === "3" ? "FastAPI Backend" : "Python Foundation"}
            </h2>
          </div>
        </div>

        {/* Progress Tracker bar */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs font-bold text-[#0F172A]">Checkpoint {learningStep} dari 5</span>
            <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 mt-1">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(learningStep / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout Split-pane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Pane: Slides, Objectives, Quizzes */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto border-r border-slate-200/50 text-left justify-between h-auto md:h-[calc(100vh-73px)]">
          <div className="flex flex-col gap-6">
            
            {/* STEP 1: Overview */}
            {learningStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Materi Overview & Objective
                </h1>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Selamat datang di checkpoint ini! Di modul ini kita akan membahas dasar eksekusi program di Python menggunakan fungsi output bawaan yaitu `print`.
                </p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Tujuan Pembelajaran</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    "Memahami cara kerja interpreter Python mengeksekusi kode.",
                    "Menggunakan fungsi `print()` untuk mengeluarkan string text.",
                    "Mengenali kegunaan tanda kutip tunggal ('') dan ganda (\"\").",
                  ].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-[#0F172A]/80">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* STEP 2: Concept Slides */}
            {learningStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Konsep Fungsi Print
                </h1>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-4">
                  Fungsi `print()` adalah fungsi internal Python yang mengirimkan data atau argumen ke layar console standar output.
                </p>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Untuk mengeluarkan sebuah kata atau kalimat (tipe data *String*), tulisan tersebut wajib dibungkus di dalam tanda kutip (quotes).
                </p>

                <Card variant="outline" className="p-4 bg-slate-900 border-none text-left font-mono text-xs sm:text-sm text-slate-200">
                  <span className="text-slate-400"># Contoh penggunaan:</span><br />
                  <span className="text-amber-400">print</span>(<span className="text-emerald-400">"Halo Dunia!"</span>)<br />
                  <span className="text-amber-400">print</span>(<span className="text-emerald-400">'Belajar Python'</span>)
                </Card>

                <p className="text-xs font-semibold text-slate-400 leading-relaxed mt-6">
                  Kedua cara di atas valid di Python. Interpreter akan mengeksekusi baris pertama terlebih dahulu, kemudian baris berikutnya.
                </p>
              </div>
            )}

            {/* STEP 3: Practice Lab details */}
            {learningStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-cyan-600" />
                  Praktek Lab Coding
                </h1>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Sekarang, giliran Anda menulis program Python pertama! Ikuti instruksi di bawah ini dengan seksama.
                </p>

                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 text-left">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Tugas Praktek</h3>
                  <p className="text-xs sm:text-sm font-bold text-[#0F172A] leading-relaxed">
                    Tuliskan sebuah program Python yang mencetak kata <span className="text-primary font-black">"Hello World"</span> ke layar console output.
                  </p>
                </div>

                {showHint && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-left animate-in slide-in-from-top-3">
                    <h4 className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-1">
                      <HelpCircle className="w-4 h-4" />
                      Butuh Bantuan?
                    </h4>
                    <p className="text-xs font-semibold text-amber-600">
                      Tuliskan `print("Hello World")` di panel editor sebelah kanan, lalu klik tombol **Run Code**. Pastikan huruf kapital dan ejaannya tepat!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Quiz checkpoint */}
            {learningStep === 4 && (
              <div className="animate-in fade-in duration-300 text-left">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-4 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-amber-500" />
                  Kuis Cepat
                </h1>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                  Jawab pertanyaan berikut untuk memverifikasi tingkat pemahaman konsep Anda.
                </p>

                <h3 className="text-sm font-bold text-[#0F172A] mb-4">
                  Manakah di bawah ini sintaksis Python yang salah untuk mencetak teks?
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    "print(\"Halo\")",
                    "print('Halo')",
                    "print(Halo)",
                    "print(\"\"\"Halo\"\"\")",
                  ].map((opt, oidx) => {
                    const isSelected = quizAnswer === oidx;
                    return (
                      <div
                        key={oidx}
                        onClick={() => !quizSubmitted && setQuizAnswer(oidx)}
                        className={`p-4 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "bg-primary/5 border-primary text-primary"
                            : "bg-white/60 border-slate-200/50 hover:bg-white text-slate-600"
                        } ${quizSubmitted ? "cursor-not-allowed opacity-75" : ""}`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className={`p-4 rounded-xl border text-left mb-4 animate-in slide-in-from-top-3 ${
                    quizCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}>
                    <h4 className="text-xs font-bold flex items-center gap-1.5 mb-1">
                      {quizCorrect ? "✅ Jawaban Benar!" : "❌ Jawaban Belum Tepat"}
                    </h4>
                    <p className="text-xs font-semibold">
                      {quizCorrect
                        ? "Luar biasa! String text tanpa kutip `print(Halo)` akan memicu NameError karena dianggap memanggil variabel bernama 'Halo'."
                        : "Coba lagi! Ingat bahwa tulisan tanpa tanda kutip dianggap variabel oleh Python. Jika variabel tidak didefinisikan, program akan error."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: Mission Complete */}
            {learningStep === 5 && (
              <div className="animate-in fade-in duration-300 text-center flex flex-col items-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-[#10B981] flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-2">
                  Checkpoint Selesai!
                </h1>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-sm mb-6">
                  Selamat! Anda telah menguasai fungsi output print Python dan menyelesaikan kuis pemahaman dengan sukses.
                </p>
                <div className="bg-[#10B981]/10 px-4 py-2 rounded-xl text-xs font-bold text-[#10B981] mb-6">
                  +50 XP diperoleh
                </div>
              </div>
            )}

          </div>

          {/* Navigation buttons at bottom of left pane */}
          <div className="flex gap-4 border-t border-slate-200/50 pt-6 mt-8">
            {learningStep > 1 && (
              <Button
                variant="outline"
                onClick={() => {
                  setLearningStep(learningStep - 1);
                  setQuizSubmitted(false);
                  setQuizAnswer(null);
                }}
                className="flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </Button>
            )}
            
            {/* Next buttons conditionally */}
            {learningStep === 3 ? (
              <Button
                variant={isSuccess ? "primary" : "disabled"}
                disabled={!isSuccess}
                onClick={() => setLearningStep(4)}
                className="flex-1 flex items-center justify-center gap-1.5 ml-auto"
              >
                Lanjutkan
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : learningStep === 4 ? (
              !quizSubmitted ? (
                <Button
                  variant={quizAnswer !== null ? "primary" : "disabled"}
                  disabled={quizAnswer === null}
                  onClick={handleQuizSubmit}
                  className="flex-1 ml-auto"
                >
                  Kirim Jawaban
                </Button>
              ) : (
                <Button
                  variant={quizCorrect ? "primary" : "outline"}
                  onClick={() => {
                    if (quizCorrect) {
                      setLearningStep(5);
                    } else {
                      setQuizSubmitted(false);
                      setQuizAnswer(null);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 ml-auto"
                >
                  {quizCorrect ? "Selesai & Lanjutkan" : "Coba Kuis Lagi"}
                  {quizCorrect && <ChevronRight className="w-4 h-4" />}
                </Button>
              )
            ) : learningStep === 5 ? (
              <Button
                onClick={() => router.push("/dashboard")}
                variant="primary"
                className="flex-1 flex items-center justify-center gap-1.5"
              >
                Kembali ke Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setLearningStep(learningStep + 1)}
                className="flex-1 flex items-center justify-center gap-1.5 ml-auto"
              >
                Lanjutkan
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Pane: Editor Python & AI Mentor Panel */}
        <div className="w-full md:w-1/2 bg-slate-900 flex flex-col h-[500px] md:h-[calc(100vh-73px)]">
          {/* Editor Header tabs toggle */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setChatTab("editor")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chatTab === "editor" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-primary" />
                Editor Python
              </button>
              <button
                onClick={() => setChatTab("ai")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chatTab === "ai" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-[#F59E0B]" />
                AI Mentor
              </button>
            </div>
            
            {/* Run Button in Editor Mode */}
            {chatTab === "editor" && (
              <Button onClick={runCode} variant="primary" size="sm" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700">
                <Play className="w-3 h-3 fill-white text-white" />
                Run Code
              </Button>
            )}
          </div>

          {/* Editor Tab Content */}
          {chatTab === "editor" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Textarea Code Editor */}
              <div className="flex-1 relative p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={learningStep === 5}
                  className="w-full h-full bg-transparent text-slate-100 font-mono text-sm resize-none outline-none border-none leading-relaxed text-left"
                />
              </div>

              {/* Console Output Terminal */}
              <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col">
                <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800/80 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Terminal Output</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-left flex flex-col gap-1.5 text-emerald-400">
                  {terminalOutput.map((out, idx) => (
                    <div
                      key={idx}
                      className={
                        out.includes("❌")
                          ? "text-rose-400"
                          : out.includes("✅")
                          ? "text-emerald-400 font-bold"
                          : out.startsWith(">")
                          ? "text-slate-500"
                          : "text-slate-300"
                      }
                    >
                      {out}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Mentor Chat Tab Content */}
          {chatTab === "ai" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
              {/* Chat messages viewport */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] text-left ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {msg.sender === "user" ? "Anda" : "AI Mentor"}
                    </span>
                    <div
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/50"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Tanyakan ke AI Mentor..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-slate-950 text-xs font-semibold text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-primary placeholder:text-slate-500 text-left"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-primary hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function LearningFlowPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F3F7FF] flex items-center justify-center font-bold text-slate-500">
        Memuat materi pembelajaran...
      </div>
    }>
      <LearningFlowContent />
    </Suspense>
  );
}
