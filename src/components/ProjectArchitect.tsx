/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GeneratedProject } from "../types";
import { Code2, Compass, Cpu, FolderOpen, Award, Sparkles, CheckSquare, ExternalLink, Loader2 } from "lucide-react";

interface ProjectArchitectProps {
  onLoadCodeIntoPlayground: (code: string, prompt: string) => void;
}

export default function ProjectArchitect({ onLoadCodeIntoPlayground }: ProjectArchitectProps) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState<string>("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setProject(null);

    try {
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || "Failed to orchestrate website construction.");
      }

      const data: GeneratedProject = await response.json();
      setProject(data);
      if (data.files && data.files.length > 0) {
        setSelectedFilePath(data.files[0].path);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Verification failed during server invocation.");
    } finally {
      setLoading(false);
    }
  };

  const selectedFile = project?.files.find((f) => f.path === selectedFilePath);

  const handleLaunchInSandbox = () => {
    if (!project) return;
    const htmlFile = project.files.find((f) => f.path.endsWith(".html") || f.path === "index.html");
    if (htmlFile) {
      onLoadCodeIntoPlayground(
        htmlFile.content,
        `Extend and polish the layout of '${project.title}': ${project.description}`
      );
    } else if (project.files.length > 0) {
      onLoadCodeIntoPlayground(
        project.files[0].content,
        `Refine and inspect the script: ${project.title}`
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Search N input header */}
      <div className="p-8 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
        <div className="flex items-center space-x-2.5 text-blue-400 font-mono text-xs">
          <Sparkles className="w-4.5 h-4.5" />
          <span>PROJECT BUILDER CAPABILITY</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-serif italic text-white leading-tight">
            Deploy Instantly From Natural Spoken Idea
          </h2>
          <p className="text-xs text-neutral-400 leading-normal max-w-3xl">
            Describe any web page, component, or layout (e.g., &ldquo;A coffee shop menu card with filter tags and beautiful gradients,&rdquo; or &ldquo;An atmospheric dashboard with dynamic timeline counters&rdquo;). WebDev Master AI will structure a master blueprint, explain standard best practices, and code standard semantic elements.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex gap-3 pt-2">
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            placeholder="e.g. A gorgeous, modern task planner with status filter tags and hover animations..."
            className="flex-grow bg-[#050505] text-white border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 rounded-xl px-5 py-3 text-sm outline-none transition-all placeholder:text-neutral-500"
            id="desc-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold text-white text-xs rounded-xl flex items-center space-x-2 shrink-0 transition-colors shadow-lg shadow-blue-600/10 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Blueprint...</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5" />
                <span>Build Project</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl text-xs text-rose-400">
            {error}
          </div>
        )}
      </div>

      {/* Loading Overlay State */}
      {loading && (
        <div className="p-10 text-center bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-neutral-200 uppercase tracking-widest font-mono">
              Analyzing visual description...
            </h4>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We are assembling clean, interactive semantic tags with visual responsive styling and modern helper scripts. Hang tight.
            </p>
          </div>
        </div>
      )}

      {/* Structured Blueprint Output */}
      {project && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Architectural specs (Left column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/30 border border-blue-900/30 px-2 py-0.5 rounded-full">
                MASTER CORE BLUEPRINT
              </span>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{project.description}</p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-neutral-800">
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  Proposed Architectural Stack:
                </h4>
                <p className="text-xs text-neutral-300 bg-black/40 p-3 rounded-lg border border-neutral-800 font-mono leading-relaxed whitespace-pre-wrap">
                  {project.architecture}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 font-mono">
                  <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                  Proposed Directory Paths:
                </h4>
                <div className="text-xs text-neutral-300 font-mono bg-black/40 p-3 rounded-lg border border-neutral-800 whitespace-pre-wrap">
                  {project.folderStructure}
                </div>
              </div>
            </div>

            {/* Learning milestones */}
            {project.learningMilestones && (
              <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 font-mono">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Architect Learning Tasks:
                </h4>
                <div className="space-y-2">
                  {project.learningMilestones.map((m, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start p-3 bg-neutral-900/40 rounded-xl border border-neutral-800">
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explanation, code and sandbox switch button (Right column) */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-800 pb-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    Source File: {selectedFilePath}
                  </h4>
                  <p className="text-[10px] text-neutral-400">Fully structured, production quality output code.</p>
                </div>

                <button
                  onClick={handleLaunchInSandbox}
                  className="flex items-center space-x-1.5 px-4.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-colors cursor-pointer"
                >
                  <span>Launch In Editor Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Code File tabs */}
              {project.files.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {project.files.map((f) => (
                    <button
                      key={f.path}
                      onClick={() => setSelectedFilePath(f.path)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors shrink-0 cursor-pointer ${
                        selectedFilePath === f.path
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                          : "border-neutral-850 hover:border-neutral-700 text-neutral-400"
                      }`}
                    >
                      {f.path}
                    </button>
                  ))}
                </div>
              )}

              {/* Source code render block */}
              {selectedFile && (
                <div className="relative">
                  <pre className="p-4 bg-black/60 border border-neutral-800 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed text-neutral-300 max-h-[400px]">
                    <code>{selectedFile.content}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Beginner explanation section */}
            <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-3.5">
              <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 font-mono">
                <Compass className="w-4 h-4 text-blue-400" />
                How the Code Works:
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans whitespace-pre-line p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                {project.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
