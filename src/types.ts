/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoadmapNode {
  id: string;
  title: string;
  subtitle: string;
  category: "frontend" | "backend" | "fullstack" | "database";
  dependencies: string[];
  estimatedHours: number;
}

export interface LessonContent {
  id: string;
  nodeId: string;
  title: string;
  concept: string;
  takeaways: string[];
  theoryCode: string; // example code
  theoryLanguage: string;
  analogy: string;
  exercisePrompt: string;
  exerciseInitialCode: string;
  exerciseExpectedOutput?: string; // conceptual or simple check
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "mentor" | "system";
  text: string;
  timestamp: string;
  codeSnippet?: {
    code: string;
    language: string;
    title?: string;
  };
}

export interface GeneratedProject {
  title: string;
  description: string;
  architecture: string;
  folderStructure: string;
  explanation: string;
  files: {
    path: string;
    content: string;
    language: string;
  }[];
  learningMilestones: string[];
}
