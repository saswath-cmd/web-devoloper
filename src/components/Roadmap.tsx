/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ROADMAP_NODES } from "../data";
import { RoadmapNode } from "../types";
import { CheckCircle2, Circle, AlertCircle, Clock, BookOpen } from "lucide-react";

interface RoadmapProps {
  completedNodeIds: string[];
  activeNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export default function Roadmap({ completedNodeIds, activeNodeId, onSelectNode }: RoadmapProps) {
  // Let's draw a sophisticated bento-like timeline grid with beautiful states
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-serif italic text-white sm:text-4xl leading-tight">
          Your Personalized Syllabus Map
        </h2>
        <p className="text-sm text-neutral-400">
          The 20% high-leverage knowledge timeline that unlocks 80% of actual building output. Go step-by-step from raw element markup to robust reactive dashboards.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Connection line in background */}
        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-neutral-800 -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-12 relative">
          {ROADMAP_NODES.map((node, index) => {
            const isCompleted = completedNodeIds.includes(node.id);
            const isActive = activeNodeId === node.id;
            const isLeft = index % 2 === 0;

            const categoryColors = {
              frontend: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
              backend: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
              fullstack: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
              database: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
            };

            return (
              <div 
                key={node.id} 
                className={`flex flex-col md:flex-row items-center md:justify-between relative ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Central connector node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 justify-center items-center z-10 hidden md:flex">
                  <button
                    onClick={() => onSelectNode(node.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20"
                        : isActive
                        ? "bg-blue-500 text-white ring-4 ring-blue-500/30 font-bold scale-110"
                        : "bg-neutral-900 border-2 border-neutral-700 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-xs font-mono">{index + 1}</span>
                    )}
                  </button>
                </div>

                {/* Content Box */}
                <div className="w-full md:w-[44%]">
                  <div
                    onClick={() => onSelectNode(node.id)}
                    className={`cursor-pointer group relative p-6 bg-[#080808] border rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-neutral-900/40"
                        : isCompleted
                        ? "border-emerald-500/30 hover:border-emerald-500/60 bg-[#0a0a0a]"
                        : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/20"
                    }`}
                    id={`roadmap-node-${node.id}`}
                  >
                    {/* Status badges */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full ${categoryColors[node.category]}`}>
                        {node.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{node.estimatedHours}h</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {node.title}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 mb-4">{node.subtitle}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
                      <span className="text-neutral-500 font-mono">
                        {node.dependencies.length > 0
                          ? `Requires: ${node.dependencies.join(", ")}`
                          : "No prerequisites"}
                      </span>
                      <span className="text-blue-400 font-medium group-hover:underline flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                        {isCompleted ? "Review Class" : isActive ? "Learn Now" : "Unlock Module"}
                      </span>
                    </div>

                    {/* Left/Right pointer triangles in styling */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#080808] border-t border-l border-inherit rotate-45 hidden md:block ${
                      isLeft ? "-right-1.5 border-b-0 border-r-0" : "-left-1.5 border-t-0 border-l-0 border-b border-r"
                    }`}></div>
                  </div>
                </div>

                {/* Spacing alignment helper for timeline */}
                <div className="w-[44%] hidden md:block"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
