/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { LessonContent } from "../types";
import { BookOpen, Check, HelpCircle, GraduationCap, ArrowRight, Play, Award } from "lucide-react";

interface LessonsProps {
  lesson: LessonContent;
  onMarkComplete: (nodeId: string) => void;
  isCompleted: boolean;
  onOpenPlayground: () => void;
}

export default function Lessons({ lesson, onMarkComplete, isCompleted, onOpenPlayground }: LessonsProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedAnswers({});
    setShowExplanation({});
  }, [lesson.id]);

  const handleOptionSelect = (qId: string, optIndex: number) => {
    if (selectedAnswers[qId] !== undefined) return; // cannot change answer once submitted
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  const allQuizzesAttempted = Object.keys(selectedAnswers).length === lesson.quiz.length;
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = lesson.quiz.find((item) => item.id === qId);
    return q && q.correctAnswerIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="p-8 bg-[#0a0a0a] border border-neutral-800 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex items-center space-x-3 text-sm font-mono text-blue-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>CLASSROOM MODULE</span>
          <span>•</span>
          <span className="uppercase text-neutral-500">{lesson.nodeId} Unit</span>
        </div>

        <h1 className="text-3xl font-serif italic text-white leading-tight sm:text-4xl">
          {lesson.title}
        </h1>

        <p className="text-sm text-neutral-300 mt-4 leading-relaxed bg-neutral-900/40 p-5 rounded-xl border border-neutral-800 font-sans">
          {lesson.concept}
        </p>
      </div>

      {/* Mentor Analogy Callout (Swiss styled) */}
      <div className="p-6 bg-gradient-to-r from-neutral-900 via-[#0a0a0a] to-blue-950/20 rounded-2xl border border-neutral-800 flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
          <GraduationCap className="w-6 h-6 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">The Mentor Analogy</h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans italic">
            &ldquo;{lesson.analogy}&rdquo;
          </p>
        </div>
      </div>

      {/* Structured core takeaways */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">The 20% Principle (80% of Outcomes)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.takeaways.map((takeaway, idx) => (
            <div key={idx} className="p-5 bg-[#080808] border border-neutral-800 rounded-xl flex gap-3 align-start">
              <span className="text-xs font-mono text-blue-400 shrink-0">0{idx + 1}.</span>
              <p className="text-xs text-neutral-400 leading-normal font-sans">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Representative Theory Code and Playground Access */}
      <div className="space-y-4 bg-[#080808] border border-neutral-800 rounded-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-800 pb-4 mb-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Classic Structural Pattern</h4>
            <p className="text-xs text-neutral-500">How professionals lay out coding statements.</p>
          </div>
          <button
            onClick={onOpenPlayground}
            className="flex items-center space-x-2 text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Open Exercise In Sandbox</span>
          </button>
        </div>

        <pre className="p-4 bg-black/50 border border-neutral-800 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed text-neutral-300">
          <code>{lesson.theoryCode}</code>
        </pre>
      </div>

      {/* Dynamic Skill Quizzes */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Test Your Knowledge</h3>
        </div>

        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosenIndex = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-6 bg-[#080808] border border-neutral-800 rounded-2xl space-y-4" id={`quiz-${q.id}`}>
                <div className="flex gap-2">
                  <span className="text-xs font-mono text-neutral-500">Q{qIdx + 1}.</span>
                  <h4 className="text-sm font-medium text-white font-sans">{q.question}</h4>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = chosenIndex === optIdx;
                    const isCorrect = q.correctAnswerIndex === optIdx;
                    const isWrongSelection = isSelected && !isCorrect;

                    let optionStyle = "border-neutral-800 hover:bg-neutral-900 text-neutral-300";
                    if (hasAnswered) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
                      } else if (isWrongSelection) {
                        optionStyle = "border-rose-500/40 bg-rose-500/10 text-rose-400";
                      } else {
                        optionStyle = "border-neutral-800 opacity-50 text-neutral-500";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs transition-colors flex justify-between items-center ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {hasAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Intelligent explanation dialog box */}
                {showExplanation[q.id] && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed font-sans ${
                    chosenIndex === q.correctAnswerIndex
                      ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-300"
                      : "bg-rose-500/5 border-rose-500/10 text-rose-300"
                  }`}>
                    <span className="font-bold block uppercase mb-1 font-mono tracking-wider">
                      {chosenIndex === q.correctAnswerIndex ? "Excellent! Correct." : "Not Quite."}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Completion Drawer */}
      <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          {isCompleted ? (
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold">
              <Award className="w-5 h-5" />
              <span>Unit Completed Successfully!</span>
            </div>
          ) : allQuizzesAttempted ? (
            <p className="text-xs text-neutral-400">
              Score: <span className="font-bold text-white">{score}/{lesson.quiz.length}</span>. Click below to mark this milestone complete!
            </p>
          ) : (
            <p className="text-xs text-neutral-500">
              Complete the interactive unit tests to log your progress.
            </p>
          )}
        </div>

        <button
          onClick={() => onMarkComplete(lesson.nodeId)}
          disabled={!allQuizzesAttempted || isCompleted}
          className={`flex items-center space-x-2 text-xs font-semibold px-6 py-3 rounded-xl transition-all ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
              : allQuizzesAttempted
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
              : "bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed"
          }`}
        >
          <span>{isCompleted ? "Milestone Unlocked" : "Mark as Completed"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
