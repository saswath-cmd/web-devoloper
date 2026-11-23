/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, User, Sparkles, AlertCircle, HelpCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";

interface MentorChatProps {
  onSuggestExercise: (initialCode: string, prompt: string) => void;
}

export default function MentorChat({ onSuggestExercise }: MentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "mentor",
      text: "Greetings, future developer! I am your WebDev Master AI mentor. Whether you are struggling to understand margins, the difference between loops, database schemas, or want to start building templates, I am here to help you master standard modern tech. What are we building or studying today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll automatically to bottom of conversation
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send history context so the AI model maintains context
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || "Failed to consult the AI Mentor framework. Ensure API key is configured.");
      }

      const payload = await response.json();
      const mentorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "mentor",
        text: payload.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "AI consultation failed. Ensure Settings > Secrets lists your GEMINI_API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (prompt: string) => {
    handleSend(prompt);
  };

  const suggestions = [
    { label: "Analogy for CSS Grid", prompt: "Give me an intuitive, beginner-friendly analogy for CSS Grid compared to Flexbox." },
    { label: "Give me an JavaScript Array Exercise", prompt: "Create a practical JavaScript task list manipulation exercise using .filter() or .map(). Provide initial code." },
    { label: "Explain Database schemas simply", prompt: "Explain SQL schemas versus Firestore collections simply using a filing cabinet analogy." },
    { label: "Explain why my states loop", prompt: "Why does React re-render infinitely when updating a state directly inside the rendering loop body? Explain with examples." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
      {/* Suggestions side drawer */}
      <div className="lg:col-span-1 space-y-4">
        <div className="p-5 bg-[#0a0a0a] border border-neutral-800 rounded-2xl space-y-3">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Direct Mentoring Prompts
          </h4>
          <p className="text-[11px] text-neutral-400 leading-normal">
            Syllabus-focused concepts you can immediately clarify or test with WebDev Master AI:
          </p>

          <div className="space-y-2 pt-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(s.prompt)}
                disabled={loading}
                className="w-full text-left p-3 bg-neutral-900/60 border border-neutral-800 hover:border-blue-500/30 text-[11px] text-neutral-300 rounded-xl transition-all font-sans leading-relaxed flex items-center justify-between group cursor-pointer"
              >
                <span>{s.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity drop-shadow shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main chat center */}
      <div className="lg:col-span-3 flex flex-col bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden min-h-[550px]">
        {/* Mentor Header */}
        <div className="px-5 py-4 bg-[#0f0f0f] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="text-xs font-mono font-bold text-neutral-200 uppercase tracking-widest">
              Live Mentoring Consultation Room
            </h3>
          </div>
          <span className="text-[10px] text-neutral-500 bg-neutral-900 px-2 py-0.5 border border-neutral-800 rounded font-mono">
            chat:gemini-3.5-flash
          </span>
        </div>

        {/* Message area logs */}
        <div className="flex-grow p-5 space-y-4 overflow-y-auto max-h-[400px]">
          {messages.map((m) => {
            const isMentor = m.sender === "mentor";

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isMentor ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                {/* Visual sender badge */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isMentor 
                    ? "bg-blue-500/15 border-blue-500/20 text-blue-400"
                    : "bg-teal-500/15 border-teal-500/20 text-teal-400"
                }`}>
                  {isMentor ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble main text */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed font-sans whitespace-pre-wrap ${
                    isMentor 
                      ? "bg-neutral-900/60 text-neutral-200 border border-neutral-800"
                      : "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/10"
                  }`}>
                    {/* Basic parsing helper for code block visuals inside chatbot bubbles */}
                    {m.text}
                  </div>
                  <span className={`text-[10px] font-mono text-neutral-500 block ${isMentor ? "text-left" : "text-right"}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <p className="text-xs text-neutral-500 font-mono italic">
                WebDev Master AI is formulating dynamic analogies...
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={listRef} />
        </div>

        {/* Action input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="p-3 bg-neutral-900/40 border-t border-neutral-800 flex gap-2"
        >
          <input
            type="text"
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder="Ask anything (e.g., 'What is standard CORS error?', 'Explain flex alignment using lists')..."
            className="flex-grow bg-[#050505] border border-neutral-800 focus:border-blue-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-all placeholder:text-neutral-500"
            id="chat-text-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
