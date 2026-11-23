/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LESSON_CONTENTS } from "./data";
import { Map, BookOpen, Monitor, Sparkles, Terminal, Compass, GraduationCap, Award, ChevronRight, Check } from "lucide-react";
import Roadmap from "./components/Roadmap";
import Lessons from "./components/Lessons";
import LivePlayground from "./components/LivePlayground";
import ProjectArchitect from "./components/ProjectArchitect";
import MentorChat from "./components/MentorChat";
import CareerCenter from "./components/CareerCenter";

type Tab = "roadmap" | "classroom" | "playground" | "architect" | "chat" | "career";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("roadmap");
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string>("html");

  // State to hold the active playground lesson/task
  const [playgroundCode, setPlaygroundCode] = useState(LESSON_CONTENTS["html"].exerciseInitialCode);
  const [playgroundPrompt, setPlaygroundPrompt] = useState(LESSON_CONTENTS["html"].exercisePrompt);

  const activeLesson = LESSON_CONTENTS[activeNodeId];

  const handleSelectNodeFromRoadmap = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setActiveTab("classroom");
  };

  const handleMarkComplete = (nodeId: string) => {
    if (!completedNodeIds.includes(nodeId)) {
      setCompletedNodeIds((prev) => [...prev, nodeId]);
    }
  };

  const loadCodeIntoPlayground = (code: string, prompt: string) => {
    setPlaygroundCode(code);
    setPlaygroundPrompt(prompt);
    setActiveTab("playground");
  };

  // Switch to educational playground with current lesson coordinates
  const handleOpenPlaygroundWithLesson = () => {
    if (activeLesson) {
      setPlaygroundCode(activeLesson.exerciseInitialCode);
      setPlaygroundPrompt(activeLesson.exercisePrompt);
      setActiveTab("playground");
    }
  };

  // Determine developer levels
  const completedCount = completedNodeIds.length;
  let devLevel = "Absolute Novice (Tier 1)";
  let levelColor = "text-neutral-400 bg-neutral-900 border-neutral-800";
  if (completedCount >= 7) {
    devLevel = "Full-Stack Elite Architect (Tier 5)";
    levelColor = "text-emerald-400 bg-emerald-950/40 border-emerald-900/40 shadow-sm shadow-emerald-500/10";
  } else if (completedCount >= 5) {
    devLevel = "Full-Stack Builder (Tier 4)";
    levelColor = "text-cyan-400 bg-cyan-950/40 border-cyan-500/20";
  } else if (completedCount >= 3) {
    devLevel = "Dynamic Scriptor (Tier 3)";
    levelColor = "text-blue-400 bg-blue-950/40 border-blue-500/20";
  } else if (completedCount >= 1) {
    devLevel = "Structural Handyman (Tier 2)";
    levelColor = "text-amber-400 bg-amber-950/40 border-amber-500/20";
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 flex flex-col antialiased">
      {/* Sleek, ambient global navigation header */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("roadmap")} id="nav-brand">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
              W
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-white font-sans sm:text-base">
                WebDev <span className="text-blue-500">Master AI</span>
              </h1>
              <p className="text-[10px] text-neutral-500 font-mono">Personalized Engineering Coach</p>
            </div>
          </div>

          {/* Developer status rank chip */}
          <div className="flex items-center space-x-3.5 flex-wrap justify-center">
            <div className={`text-xs px-3.5 py-1.5 rounded-xl border font-mono flex items-center space-x-2 shrink-0 ${levelColor}`} id="dev-level-status">
              <Award className="w-3.5 h-3.5 animate-pulse" />
              <span>Rank: {devLevel}</span>
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              Milestones: {completedCount}/7 Complete
            </div>
          </div>
        </div>
      </header>

      {/* Main Orchestration Layout */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Sidebar Nav (Desktop) / Nav Tabs bar (Mobile) */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-2.5">
          <nav className="p-2.5 bg-[#080808] border border-neutral-800 rounded-2xl flex flex-row lg:flex-col overflow-x-auto gap-1 lg:gap-1.5 scrollbar-none">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "roadmap"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <Map className="w-4 h-4 shrink-0" />
              <span>1. Progress Syllabus Map</span>
            </button>

            <button
              onClick={() => setActiveTab("classroom")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "classroom"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>2. Interactive Classroom</span>
              {activeLesson && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 ml-auto hidden lg:inline"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("playground")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "playground"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <Monitor className="w-4 h-4 shrink-0" />
              <span>3. Code Sandbox Editor</span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "chat"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>4. AI Mentor ChatHub</span>
            </button>

            <button
              onClick={() => setActiveTab("architect")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "architect"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              <span>5. AI Site Generator</span>
            </button>

            <button
              onClick={() => setActiveTab("career")}
              className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold rounded-xl tracking-tight transition-all shrink-0 ${
                activeTab === "career"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>6. Freelance SOP Hub</span>
            </button>
          </nav>

          {/* Proactive Help sidebar box */}
          <div className="bg-[#080808] border border-neutral-800 p-5 rounded-2xl hidden lg:block space-y-3 mt-auto">
            <div className="flex items-center space-x-2">
              <GraduationCap className="text-blue-500 w-4.5 h-4.5" />
              <h5 className="text-[11px] font-bold uppercase tracking-wider font-mono text-white">Focus Objectives</h5>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Skip endless syntactic memorization. Practice DOM updates and Tailwind spacing. Ask &ldquo;WebDev Master AI&rdquo; to review your codes.
            </p>
          </div>
        </aside>

        {/* Content Container Panel */}
        <main className="flex-grow min-w-0" id="main-content-area">
          {activeTab === "roadmap" && (
            <Roadmap
              completedNodeIds={completedNodeIds}
              activeNodeId={activeNodeId}
              onSelectNode={handleSelectNodeFromRoadmap}
            />
          )}

          {activeTab === "classroom" && activeLesson && (
            <Lessons
              lesson={activeLesson}
              onMarkComplete={handleMarkComplete}
              isCompleted={completedNodeIds.includes(activeNodeId)}
              onOpenPlayground={handleOpenPlaygroundWithLesson}
            />
          )}

          {activeTab === "playground" && (
            <LivePlayground
              initialCode={playgroundCode}
              exercisePrompt={playgroundPrompt}
            />
          )}

          {activeTab === "chat" && (
            <MentorChat
              onSuggestExercise={(code, prompt) => {
                setPlaygroundCode(code);
                setPlaygroundPrompt(prompt);
                setActiveTab("playground");
              }}
            />
          )}

          {activeTab === "architect" && (
            <ProjectArchitect
              onLoadCodeIntoPlayground={loadCodeIntoPlayground}
            />
          )}

          {activeTab === "career" && <CareerCenter />}
        </main>
      </div>

      {/* Humble branding footer */}
      <footer className="py-6 px-6 border-t border-neutral-900 bg-[#020202] text-center text-[11px] text-neutral-550 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>WebDev Master AI Classroom • Built in standard React & Express</span>
          <span className="text-neutral-500">All coordinates synchronized safely.</span>
        </div>
      </footer>
    </div>
  );
}
