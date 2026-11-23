/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Monitor, RefreshCw } from "lucide-react";

interface LivePlaygroundProps {
  initialCode: string;
  exercisePrompt: string;
}

export default function LivePlayground({ initialCode, exercisePrompt }: LivePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [compiledDoc, setCompiledDoc] = useState("");

  // Update editor value if initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Execute compilation into the iframe srcDoc template
  const handleCompile = () => {
    // Detect if the user's code is plain JavaScript (or JSON) or contains HTML markup
    const trimCode = code.trim();
    const hasHtml = /<[a-z][\s\S]*>/i.test(trimCode);

    let finalBodyHtml = "";
    let injectScript = "";

    if (!hasHtml) {
      // It's pure JS or JSON
      // Let's check if it requires our default Interactive DOM elements (Lesson JS helper)
      if (trimCode.includes("action-btn") || trimCode.includes("status-txt") || exercisePrompt.toLowerCase().includes("action-btn")) {
        finalBodyHtml = `
          <div class="max-w-md mx-auto bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-center shadow-lg my-6">
            <h4 class="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase text-center">DOM Mutation Sandbox</h4>
            <div class="p-4 bg-black/40 rounded-xl border border-slate-800 flex justify-center">
              <button id="action-btn" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95 text-white">
                Interactive Button (#action-btn)
              </button>
            </div>
            <p id="status-txt" class="text-xs text-slate-300 font-mono py-1">
              Session Waiting for event trigger...
            </p>
          </div>
        `;
      } else {
        // Generic JS / JSON console lesson (like api fetch)
        finalBodyHtml = `
          <div class="max-w-lg mx-auto bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-4 my-6">
            <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h4 class="text-xs font-bold text-neutral-400 font-mono tracking-wider uppercase">Console Output Feed</h4>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div id="virtual-console" class="p-4 bg-black rounded-xl font-mono text-[11px] leading-relaxed text-emerald-400 min-h-[150px] overflow-y-auto whitespace-pre-wrap">
              Initializing runner...
            </div>
          </div>
        `;
      }
      
      // Let's intercept console.log so it prints to our virtual console
      injectScript = `
        <script>
          const logger = document.querySelector("#virtual-console");
          if (logger) {
            logger.innerHTML = "";
            const originalLog = console.log;
            console.log = function(...args) {
              originalLog.apply(console, args);
              const formatted = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' ');
              const line = document.createElement("div");
              line.className = "py-1 border-b border-neutral-950/40 text-emerald-400";
              line.textContent = "➔ " + formatted;
              logger.appendChild(line);
            };
          }
          
          try {
            ${code}
          } catch (err) {
            console.error(err);
            if (logger) {
              const errLine = document.createElement("div");
              errLine.className = "py-1 text-rose-400 font-bold";
              errLine.textContent = "✘ Error: " + err.message;
              logger.appendChild(errLine);
            }
          }
        </script>
      `;
    } else {
      // Standard HTML page
      finalBodyHtml = code;
    }

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script>
            // Suppress cross-origin "Script error." details logging inside this iframe sandbox
            window.onerror = function(message) {
              if (message && (message.indexOf("Script error") !== -1 || message.indexOf("Script error.") !== -1)) {
                return true;
              }
              return false;
            };
          </script>
          <!-- Inject Tailwind securely inside the iframe sandbox -->
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              background-color: #0d0d0d;
              color: #e5e5e5;
              font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
              padding: 1.5rem;
              margin: 0;
            }
          </style>
        </head>
        <body>
          ${finalBodyHtml}
          ${injectScript}
        </body>
      </html>
    `;
    setCompiledDoc(htmlTemplate);
  };

  // Compile on mount, or whenever current code is modified
  useEffect(() => {
    handleCompile();
  }, [code]);

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#0a0a0a] p-6 border border-neutral-800 rounded-2xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            Interactive Coding Playground & Sandbox
          </h2>
          <p className="text-xs text-neutral-400 leading-normal max-w-2xl">
            <strong>Exercise Task:</strong> {exercisePrompt}
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-3 py-1.5 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50 text-xs font-medium text-neutral-400 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Template</span>
          </button>
          
          <button
            onClick={handleCompile}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-lg transition-colors shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* Editor Box */}
        <div className="flex flex-col bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-500/30">
          <div className="flex items-center justify-between px-5 py-3 bg-[#0f0f0f] border-b border-neutral-800">
            <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              Live Source Code Editor
            </span>
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full flex-grow p-5 bg-black/60 outline-none text-xs font-mono text-neutral-200 leading-relaxed resize-none min-h-[350px]"
            id="code-editor"
            placeholder="<!-- Write HTML and Tailwind classes inside this panel to watch it compile live ->"
          />
        </div>

        {/* Live Preview Console */}
        <div className="flex flex-col bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-[#0f0f0f] border-b border-neutral-800">
            <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Virtual Core Renderer (Live Web Sandbox)
            </span>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-800">
              iframe:sandboxed
            </span>
          </div>

          <div className="flex-grow bg-[#0d0d0d] relative min-h-[350px]">
            {compiledDoc ? (
              <iframe
                srcDoc={compiledDoc}
                title="Live Code Sandbox preview"
                sandbox="allow-scripts"
                className="w-full h-full border-0 rounded-b-2xl absolute inset-0 bg-[#0d0d0d]"
                id="preview-iframe"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500 font-mono">
                Click "Run Code" to boot sandbox frames
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
