/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DollarSign, Landmark, Briefcase, Calendar, ShieldCheck, Star } from "lucide-react";

export default function CareerCenter() {
  const [targetIncome, setTargetIncome] = useState(60000);
  const [taxBuffer, setTaxBuffer] = useState(25); // as percentage
  const [weeklyHours, setWeeklyHours] = useState(25); // high focus billable hours
  const [vacationWeeks, setVacationWeeks] = useState(4);

  // Compute hourly rate
  const totalWeeks = 52 - vacationWeeks;
  const billableHoursPerYear = totalWeeks * weeklyHours;
  const desiredGrossIncome = targetIncome * (1 + taxBuffer / 100);
  const calculatedHourlyRate = billableHoursPerYear > 0 ? Math.ceil(desiredGrossIncome / billableHoursPerYear) : 0;

  // Visual Project Estimator
  const [complexity, setComplexity] = useState(3); // 1-5 multiplier
  const [pageCount, setPageCount] = useState(3);
  const [customAssetScope, setCustomAssetScope] = useState(false);

  const basePricePerPage = 250;
  const estimatedBase = pageCount * basePricePerPage * (1 + complexity * 0.2);
  const estimatedProjectPrice = Math.round(estimatedBase + (customAssetScope ? 450 : 0));

  return (
    <div className="space-y-8">
      {/* Intro visual header */}
      <div className="p-8 bg-[#0a0a0a] border border-neutral-800 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center space-x-2.5 text-blue-400 font-mono text-xs">
          <Star className="w-4.5 h-4.5" />
          <span>CAREER & FREELANCE MODE ENABLED</span>
        </div>

        <h2 className="text-3xl font-serif italic text-white leading-tight mt-2">
          The Fastest Path To Web Mastery & Client Value
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-3xl leading-relaxed animate-fade-in">
          Learning code without studying commercial value makes you an amateur. Professionals do not write lines of code; they build business outcomes for clients (increasing sales, automating sign-ups, or presenting premium visuals). Explore how you can turn your skills into a highly lucrative freelance career.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* SOP Guidelines */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Agency Standard SOP: Building for Clients
            </h3>
            <p className="text-xs text-neutral-400 leading-normal">
              How elite professionals coordinate web milestones without endless revisions:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold flex items-center justify-center text-neutral-350 mt-0.5 animate-transition">1</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-white">Discovery & Value Audit</h4>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Instead of saying &ldquo;I build react page,&rdquo; ask: &ldquo;What is your active goal? Increasing table bookings by 15%?&rdquo; Target value first.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold flex items-center justify-center text-neutral-350 mt-0.5 animate-transition">2</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-white">Wireframe Mockups & Style Guide</h4>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Set color pairings (Inter + JetBrains Mono) and interactive components explicitly BEFORE coding. This stops design re-writes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold flex items-center justify-center text-neutral-350 mt-0.5 animate-transition">3</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-white">Rigorous Technical Assembly</h4>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Use modular file architecture, strict TypeScript rules, and clean responsive grids so the site is lightweight and maintains fast speeds.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold flex items-center justify-center text-neutral-350 mt-0.5 animate-transition">4</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-white">Handoff, Document, & Maintenance Retainer</h4>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Explain code simply. Pitch an ongoing maintenance retainer package ($250/month) to update assets, back up data indices, and adjust campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Path timeline */}
          <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              The Fast Track Portfolio Projects
            </h3>
            <p className="text-xs text-neutral-400 leading-normal">
              Skip generic exercises. Build these three high-income freelance blueprints to showcase actual capability to regional agencies or local businesses:
            </p>

            <ul className="space-y-3 pt-2 text-xs">
              <li className="flex gap-2 items-start bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800 leading-relaxed text-neutral-300">
                <span className="font-mono text-blue-400 font-bold">01. Locality Landing Funnel:</span> Focus on extreme fast LCP load speeds, highly accessible touch layout targets, custom semantic grids, and real sign-up event listeners.
              </li>
              <li className="flex gap-2 items-start bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800 leading-relaxed text-neutral-300">
                <span className="font-mono text-blue-400 font-bold">02. Dynamic CRM Client Dashboard:</span> Focus on React component composition, clean useState filters, beautiful visual graphs utilizing D3/Recharts modules, and interactive API querying.
              </li>
              <li className="flex gap-2 items-start bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800 leading-relaxed text-neutral-300">
                <span className="font-mono text-blue-400 font-bold">03. Full-Stack Secure Form Vault:</span> Focus on Node/Express servers, securing access credentials on environmental buffers, structured cloud database persistence.
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing Matrix Center (Calculators) */}
        <div className="space-y-6">
          {/* Billable calculator */}
          <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5 font-mono">
              <DollarSign className="w-4.5 h-4.5 text-blue-400" />
              Ideal Freelance Hourly Rate Calculator
            </h3>
            <p className="text-xs text-neutral-400">
              Calculate your actual billable baseline based on non-billable hours, business taxes, and desired personal income:
            </p>

            <div className="space-y-4 pt-3 border-t border-neutral-800/60 text-xs text-neutral-300">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Target Net Income:</span>
                  <span className="text-white font-bold font-mono">${targetIncome.toLocaleString()}/yr</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={targetIncome}
                  onChange={(e) => setTargetIncome(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="target-income-calc"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Business Taxes & Software:</span>
                  <span className="text-white font-bold font-mono">{taxBuffer}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={taxBuffer}
                  onChange={(e) => setTaxBuffer(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="tax-buffer-calc"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">High-focus billable client hours per week:</span>
                  <span className="text-white font-bold font-mono">{weeklyHours}h</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="2"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="weekly-hours-calc"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Vacation Weeks per year:</span>
                  <span className="text-white font-bold font-mono">{vacationWeeks} weeks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="vacation-calc"
                />
              </div>

              <div className="mt-5 p-5 bg-blue-600/5 border border-blue-500/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-400 font-mono font-bold block">RECOMMENDED BASE HOURLY RATE</span>
                  <span className="text-3xl font-extrabold text-white tracking-tight font-mono">${calculatedHourlyRate}</span>
                  <span className="text-xs text-blue-350 font-mono">/hr</span>
                </div>
                <div className="text-right text-[10px] text-neutral-500 font-mono leading-relaxed">
                  Billable Yr: {billableHoursPerYear}h <br />
                  Gross Target: ${Math.round(desiredGrossIncome).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Project baseline calculator */}
          <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5 font-mono">
              <Landmark className="w-4.5 h-4.5 text-blue-400" />
              Project Specific Value-Estimator
            </h3>
            <p className="text-xs text-neutral-400">
              Calculate value pricing scopes for typical micro-projects or localized landing funnels:
            </p>

            <div className="space-y-4 pt-3 border-t border-neutral-800 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-neutral-800 pb-1">
                  <span className="text-neutral-400">Layout Page Count:</span>
                  <span className="text-white font-bold font-mono">{pageCount} Pages</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={pageCount}
                  onChange={(e) => setPageCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="page-count-calc"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-neutral-800 pb-1">
                  <span className="text-neutral-400">Complexity & Logic Level:</span>
                  <span className="text-white font-bold font-mono">{complexity} (Multiplier x{1 + complexity * 0.2})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-1 rounded bg-neutral-800 cursor-pointer"
                  id="complexity-calc"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 rounded-xl border border-neutral-800">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-neutral-200">Include Custom Asset Sourcing?</span>
                  <span className="text-[10px] text-neutral-500">Includes copywriting + graphic rendering. +$450</span>
                </div>
                <input
                  type="checkbox"
                  checked={customAssetScope}
                  onChange={(e) => setCustomAssetScope(e.target.checked)}
                  className="w-4.5 h-4.5 accent-emerald-500 cursor-pointer"
                  id="asset-check-calc"
                />
              </div>

              <div className="p-5 bg-emerald-600/5 border border-emerald-500/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">PROPOSED FIXED QUOTE</span>
                  <span className="text-3xl font-extrabold text-white tracking-tight font-mono">${estimatedProjectPrice}</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-sans italic text-right leading-relaxed max-w-[150px]">
                  Quote based on value delivered, not hourly limits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
