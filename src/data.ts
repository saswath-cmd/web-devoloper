/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoadmapNode, LessonContent } from "./types";

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: "html",
    title: "1. Semantic HTML",
    subtitle: "The Skeleton of the Web",
    category: "frontend",
    dependencies: [],
    estimatedHours: 4,
  },
  {
    id: "css",
    title: "2. Styling & CSS",
    subtitle: "The Visual Identity",
    category: "frontend",
    dependencies: ["html"],
    estimatedHours: 6,
  },
  {
    id: "js",
    title: "3. Interactive JavaScript",
    subtitle: "The Engine & State Logic",
    category: "frontend",
    dependencies: ["css"],
    estimatedHours: 12,
  },
  {
    id: "api",
    title: "4. Modern Web-APIs",
    subtitle: "Connecting to the World",
    category: "frontend",
    dependencies: ["js"],
    estimatedHours: 8,
  },
  {
    id: "node",
    title: "5. Node.js & Express",
    subtitle: "Serving Content Instantly",
    category: "backend",
    dependencies: ["api"],
    estimatedHours: 10,
  },
  {
    id: "database",
    title: "6. Schemas & Databases",
    subtitle: "Building Durable State",
    category: "database",
    dependencies: ["node"],
    estimatedHours: 8,
  },
  {
    id: "react",
    title: "7. Modern Reactive Frameworks",
    subtitle: "Unifying with React",
    category: "fullstack",
    dependencies: ["database"],
    estimatedHours: 15,
  },
];

export const LESSON_CONTENTS: Record<string, LessonContent> = {
  html: {
    id: "html-lesson",
    nodeId: "html",
    title: "Semantic HTML",
    concept: "HyperText Markup Language (HTML) is not a programming language; it is a markup language that structures your web content. Think of it like a newspaper: there are headings, subheadings, paragraphs, sidebars, and images. Semantic elements like <header>, <article>, and <footer> tell search engines and screen readers exactly what purpose every section serves.",
    takeaways: [
      "Use semantic tags (<header>, <nav>, <main>, <article>, <section>, <footer>) instead of nesting <div> inside <div> endlessly. This makes code searchable, accessible, and clean.",
      "The DOM (Document Object Model) is a tree of nodes created by the browser from your HTML. JavaScript walks this tree to edit visual elements on the fly.",
      "Forms require accessibility attributes. Always bind <label for='my-input'> to id='my-input' so screen-readers state the purpose of the element.",
      "Never style HTML using default tags like <font> - styling is strictly the job of CSS."
    ],
    analogy: "Think of HTML as the raw concrete and wooden studs of a house. It dictates the rooms, doors, and window shapes. It doesn't have paint, rugs, or lights, but the house cannot stand without it.",
    theoryLanguage: "html",
    theoryCode: `<!-- A clean, semantic, structured card -->
<article class="card">
  <header>
    <h3>How to Teach AI Web Development</h3>
    <p>Published <time datetime="2026-06-23">June 23, 2026</time></p>
  </header>
  <main>
    <p>The secret of elite mentors is focusing on the 20% of code that drives 80% of actual page logic...</p>
    <a href="#read-more">Learn the Secrets</a>
  </main>
  <footer>
    <small>Estimated reading time: 3 mins</small>
  </footer>
</article>`,
    exercisePrompt: "Create a complete, descriptive semantic signup card showing a title, a brief introductory paragraph, and a functional submit form with a name input field and a submit button.",
    exerciseInitialCode: `<article id="signup-card">
  <!-- 1. Add your header with a title -->
  
  <!-- 2. Add description text -->
  
  <!-- 3. Add a form asking for "Your Name" using input attributes -->
  
</article>`,
    quiz: [
      {
        id: "html-q1",
        question: "Which HTML element is most semantic for representing independent, self-contained, shareable content?",
        options: ["<div>", "<article>", "<section>", "<span>"],
        correctAnswerIndex: 1,
        explanation: "<article> indicates content that stands alone and of its own accord could be re-published elsewhere, like a blog post or tweet."
      },
      {
        id: "html-q2",
        question: "How do you connect a <label> with an <input> for optimal accessibility?",
        options: [
          "Set the label's 'for' attribute to match the input's 'id'",
          "Put them inside the same <div>",
          "Set the label's 'id' to match the input's 'name'",
          "Set both elements to have the exact same 'class'"
        ],
        correctAnswerIndex: 0,
        explanation: "Matching the label's 'for' attribute to the input's 'id' means clicking the label naturally shifts focus to the input, and assistive tech links them properly."
      }
    ]
  },
  css: {
    id: "css-lesson",
    nodeId: "css",
    title: "Styling & Tailwind CSS",
    concept: "CSS is the paintbrush and structural map of your site. Modern workflow has shifted away from writing thousands of lines of verbose CSS classes in style sheets. Instead, we use utility-first CSS frameworks like Tailwind. It provides ready-to-use classes that bind directly to our elements, enabling rapid responsive responsive layout grids, gorgeous color spacing, and eye-friendly typography right inside our templates.",
    takeaways: [
      "The CSS Box Model controls how much space an element takes: Content -> Padding -> Border -> Margin. Padding is internal; Margin is external.",
      "Flexbox (flex, flex-row, flex-col, justify-between, items-center) arranges elements horizontally or vertically with relative sizing, avoiding the need for fragile pixel coordinates.",
      "Tailwind is responsive-first. Write md: grid-cols-2 to automatically stack content into one column on mobile and two columns on medium screens.",
      "Contrast ratio dictates accessibility: text must stand out visually from its immediate background canvas."
    ],
    analogy: "If HTML is the physical framing of a house, CSS is the wallpaper, carpet, architectural trim, and coordinate grid determining where the couch and tables sit relative to the fireplace.",
    theoryLanguage: "html",
    theoryCode: `<!-- Flexbox card styled with rich Tailwind utilities -->
<div class="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
  <div class="flex items-center space-x-3">
    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
    <span class="text-xs font-mono text-emerald-400">CLASS ACTIVE</span>
  </div>
  <h4 class="text-lg font-bold text-white tracking-tight">The Box Model Master</h4>
  <p class="text-sm text-slate-400">Padding creates elegant space inside, margins keep neighboring cards from colliding.</p>
</div>`,
    exercisePrompt: "Apply Tailwind CSS utility classes to this generic unstyled dashboard card to make it look master-class! Set a dark slate background, rounded corners, padding, a subtle border, and style the heading and description beautifully.",
    exerciseInitialCode: `<div class="">
  <h3 class="">Interactive Dashboard</h3>
  <p class="">Modify this text to use Tailwind! Add bg-slate-900, text-white, rounded-xl, p-6, border border-slate-800, text-emerald-400, etc.</p>
  <button class="">Accept Invitation</button>
</div>`,
    quiz: [
      {
        id: "css-q1",
        question: "What is the key difference between padding and margin in the CSS Box Model?",
        options: [
          "Padding is outside the border; margin is inside.",
          "Padding creates space inside the boundary; margin pushes neighboring elements outward.",
          "Padding applies only to grids; margin only to individual text spans.",
          "Margin is the border size; padding is the content size."
        ],
        correctAnswerIndex: 1,
        explanation: "Padding adds internal distance (spacing inside the card's background), whereas Margin is the buffer space pushing other elements away, outside the card."
      },
      {
        id: "css-q2",
        question: "Under Tailwind CSS guidelines, how do you change an element to a flex direction vertical layout?",
        options: ["class='flex flex-row'", "class='flex flex-col'", "class='display-block'", "class='grid-cols-1'"],
        correctAnswerIndex: 1,
        explanation: "The 'flex flex-col' utility aligns flex item children on the vertical Y-axis, stacked in a column."
      }
    ]
  },
  js: {
    id: "js-lesson",
    nodeId: "js",
    title: "Javascript & Event Loops",
    concept: "JavaScript makes a webpage alive. If HTML is the skeleton and CSS is the suit, JS is the nervous system. JavaScript captures user interaction (clicks, scroll, keyboard entry) and rewrites the HTML tree (DOM) in real-time. This dynamic update happens instantly in the client’s browser without fetching a completely new webpage from the server.",
    takeaways: [
      "Keep state isolated. State is the single source of truth describing what is visible on screen (e.g., activeTab, userEmail, isMenuOpen).",
      "Event listeners (element.addEventListener('input', callback)) capture real-time behavior and trigger custom handlers.",
      "Array methods (.map(), .filter(), .reduce()) are the developer's multi-tools. 80% of JS tasks involve transforming list arrays.",
      "Scope controls variable access. Prefer 'const' by default to prevent accidental overwrite; use 'let' only when reassignment is mandatory."
    ],
    analogy: "JavaScript is the electrical system and appliances of the house. Flipping a light switch changes the visual state of the dining room immediately. There is logic: if the sun is down, turn the smart porch light on.",
    theoryLanguage: "javascript",
    theoryCode: `// Creating interactive components dynamically
const button = document.querySelector("#trigger");
const counterDisplay = document.querySelector("#counter");

let currentCount = 0;

// Set event listener for clicks
button.addEventListener("click", () => {
  currentCount++;
  counterDisplay.textContent = \`Clicked: \${currentCount} times\`;
  
  // Dynamic CSS updates using JS classes
  if (currentCount >= 10) {
    counterDisplay.classList.add("text-emerald-400");
  }
});`,
    exercisePrompt: "Write a simple vanilla JavaScript script that adds a click event listener to a button with ID 'action-btn', increments a counter variable, and updates the text inside a paragraph with ID 'status-txt' to say: 'Session Active: Count: X'.",
    exerciseInitialCode: `// Write your JS interaction scripts here
let count = 0;
const btn = document.querySelector("#action-btn");
const status = document.querySelector("#status-txt");

// Add click listener and logic below:
`,
    quiz: [
      {
        id: "js-q1",
        question: "Why should you prefer 'const' over 'let' and 'var' when declaring variables in professional JavaScript?",
        options: [
          "'const' values load 50% faster in modern browsers.",
          "'const' signals that the variable reference will not be reassigned, preventing bugs and enhancing readability.",
          "'const' makes variables accessible globally by default.",
          "'let' is deprecated by ES2022 standards."
        ],
        correctAnswerIndex: 1,
        explanation: "Using const prevents accidental variable reassignment and signals semantic intent to other developers reading your logic block."
      },
      {
        id: "js-q2",
        question: "What is DOM Manipulation?",
        options: [
          "Hacking a server through its database parameters.",
          "Using JavaScript APIs to update, insert, or remove nodes from the HTML elements displayed in the browser.",
          "Optimizing CSS colors automatically.",
          "Compiling TypeScript code into production-ready assembly language."
        ],
        correctAnswerIndex: 1,
        explanation: "DOM Manipulation refers to using the document object object and APIs (like textContent, appendChild, classList) to modify the page markup programmatically."
      }
    ]
  },
  api: {
    id: "api-lesson",
    nodeId: "api",
    title: "Web-APIs & JSON payloads",
    concept: "Most web applications do not hold all information inside themselves. Instead, they talk to external APIs (Application Programming Interfaces). APIs act as waiters: they take your query request, walk to the kitchen database, and return with a rich JSON platter containing numbers, text description, or assets. We extract and bundle this payload into our active UI state.",
    takeaways: [
      "JSON (JavaScript Object Notation) is the language of the web. It is a lightweight format for structuring keys and values.",
      "Fetch API is built-in. Use 'async' and 'await' to pause execution elegantly while the network response streams in.",
      "Check response.ok before parsing or updating state. Always wrap integrations in a try/catch block to prevent app failure.",
      "Keep sensitive access keys out of client bundles, as the browser console exposes all web fetch targets."
    ],
    analogy: "An API is like a menu at a sushi restaurant. You do not need to know how the chef rolls the fish or where they sourced it; you just state the dish item number (Endpoint), wait for the tray to arrive (Response), and enjoy.",
    theoryLanguage: "javascript",
    theoryCode: `// Pull weather details securely from external API
async function fetchCurrentWeather(city) {
  try {
    const raw = await fetch(\`https://api.example.com/v1/weather?city=\${city}\`);
    if (!raw.ok) {
      throw new Error("City not found in registry");
    }
    const data = await raw.json();
    return {
      temp: data.temperature_c,
      condition: data.condition
    };
  } catch (err) {
    console.warn("External fetch failed:", err);
    return null;
  }
}`,
    exercisePrompt: "Write an asynchronous JS function called 'getProduct' that fetches index 1 from 'https://jsonplaceholder.typicode.com/todos/1', parses the returned JSON text, and prints the '.title' result to console.log.",
    exerciseInitialCode: `// Write an async function that queries endpoint data
async function getProduct() {
  // 1. Fetch data from jsonplaceholder
  
  // 2. Parse json payload
  
  // 3. Log results to console
  
}

getProduct();`,
    quiz: [
      {
        id: "api-q1",
        question: "What does response.json() return in a standard fetch command block?",
        options: [
          "A plain JavaScript array reference immediately available.",
          "A Promise that resolves with the parsed JSON data as a standard JavaScript object/array.",
          "A string of encoded binary bytes.",
          "A command execution state integer."
        ],
        correctAnswerIndex: 1,
        explanation: "Because the response stream is parsed asynchronously, response.json() returns a Promise which resolves to the actual usable JS structure."
      },
      {
        id: "api-q2",
        question: "Why should sensitive, secret developer API keys never be embedded inside a pure client-side web application?",
        options: [
          "Client-side keys fail to execute HTTPS queries properly.",
          "Because any browser user can open DevTools (Network tab/Source files) and steal the credit-loaded secrets instantly.",
          "The browser automatically disables keys without Node headers.",
          "Vite refuses to build any project containing text secrets."
        ],
        correctAnswerIndex: 1,
        explanation: "Anything shipped to the browser can be easily extracted in minutes. Keep secrets in backend environmental variables."
      }
    ]
  },
  node: {
    id: "node-lesson",
    nodeId: "node",
    title: "Node.js & Express servers",
    concept: "Node.js is a runtime that lets us execute JavaScript outside the browser—specifically, directly on your personal computer or on secure cloud container modules. Express is the lightweight standard framework that sits on Node to route web requests, process data bodies, construct endpoints, and proxy secure API requests smoothly.",
    takeaways: [
      "Servers listen constantly on designated ports (e.g. 3000) waiting for HTTP traffic from browsers.",
      "Direct API endpoints (app.get('/api/users', ...)) process inputs on the secure server side, bypassing CORS blocks and database leaks.",
      "Middleware plays referee. Functions like express.json() process incoming requests pre-routing and format data safely.",
      "The 'start' command in package.json tells hosts how to boot your server process in production container shells."
    ],
    analogy: "A web server is like a restaurant kitchen. The client browser sits in the dining room. Express routes are the waiters taking orders from guests, returning the completed order back to client table safely.",
    theoryLanguage: "javascript",
    theoryCode: `// An ultra-simple, robust Express server file
import express from "express";

const app = express();
const PORT = 3000;

// Enable JSON extraction middleware
app.use(express.json());

// Set an API route handler
app.get("/api/quotes", (req, res) => {
  const quote = { text: "Focus produces mastery.", author: "WebDev Mentor" };
  res.json(quote);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(\`Server is tuning in on port \${PORT}\`);
});`,
    exercisePrompt: "Write an Express POST endpoint path called '/api/greet' that extracts a 'username' from the request body JSON, and returns a JSON response stating: { message: 'Greeting Master X!' }.",
    exerciseInitialCode: `// Map a custom greeting post route in express
// Assume app is initialized already
// Write the handler block below:

app.post("/api/greet", (req, res) => {
  // 1. Get username from req.body
  
  // 2. Return JSON greeting
  
});`,
    quiz: [
      {
        id: "node-q1",
        question: "What is the primary role of Node.js in modern web architecture?",
        options: [
          "It is a browser plugin to run animations quickly.",
          "It is a runtime engine that allows developers to run JavaScript code on servers and local computers, outside the browser.",
          "It compiles CSS files into HTML directly.",
          "It operates as a relational query server."
        ],
        correctAnswerIndex: 1,
        explanation: "Node.js extracts Google Chrome's V8 engine to execute JavaScript at the server command-prompt level."
      },
      {
        id: "node-q2",
        question: "What does the Express method app.use(express.json()) do?",
        options: [
          "It installs a JSON file in package.json automatically.",
          "It is middleware that parses incoming requests with JSON payloads and populates 'req.body'.",
          "It enables styling sheets to render in JSON format.",
          "It compiles JavaScript logic into executable binaries."
        ],
        correctAnswerIndex: 1,
        explanation: "Without this express middleware, req.body is undefined when the client sends a JSON post body."
      }
    ]
  },
  database: {
    id: "database-lesson",
    nodeId: "database",
    title: "Schemas & Databases",
    concept: "Every application that requires user accounts, logs, posts, or shopping cart records requires persistent storage that survives server restarts. That is the role of the database. We use models (Firestore Document structures, or relational databases with SQL tables) to layout where columns, keys, indexes, and relationships reside safely.",
    takeaways: [
      "Databases store state values across sessions. cleared browser caches do not erase cloud database states.",
      "Relational databases (SQL) organize records in tables of rows and columns, linked together by foreign keys (one-to-many relationships).",
      "Document databases (Firestore / NoSQL) organize state into nested paths: collections containing documents containing key-value data.",
      "Always design validation rules. Never trust user inputs raw - validate them against schema scopes before writing to the database."
    ],
    analogy: "If HTML/CSS/JS is the architectural drawing and furniture styling, and the server is the house's power, the Database is the massive fireproof blueprint vault containing all keys, purchase records, and resident IDs safely logged.",
    theoryLanguage: "typescript",
    theoryCode: `// Firestore configuration format
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-setup";

async function saveTaskToVault(taskText, levelId) {
  try {
    const docRef = await addDoc(collection(db, "student_tasks"), {
      text: taskText,
      unit: levelId,
      completedAt: new Date().toISOString()
    });
    console.log("Document logged with Key ID:", docRef.id);
  } catch (err) {
    console.warn("Vault logging failed:", err);
  }
}`,
    exercisePrompt: "Create a schema structure describing a table or collection called 'web_projects'. Define three properties it must track to be useful to our portfolio: a project 'title' (string), a 'difficulty' level (number from 1 to 5), and a persistent 'repo_url' (string/URL). Set this up in standard JSON layout.",
    exerciseInitialCode: `{
  // Outline your project database document structure:
  "collectionName": "web_projects",
  "fields": {
    
  }
}`,
    quiz: [
      {
        id: "db-q1",
        question: "Which schema concept enforces that every user record has a unique value for identifying them (e.g. user_id)?",
        options: ["Foreign Key", "Primary Key", "Index Buffer", "Constraint Filter"],
        correctAnswerIndex: 1,
        explanation: "A Primary Key is a unique identifier constraint for a record row in database schemas, making sure duplicates are blocked."
      },
      {
        id: "db-q2",
        question: "When should you prefer Cloud Firestore / Firebase over local state arrays?",
        options: [
          "Only when compiling HTML to CSS.",
          "When you need user data to persist securely over long periods, across different browser devices and user reboots.",
          "Only when running three.js 3D renderings.",
          "When you want to increase client browser speeds."
        ],
        correctAnswerIndex: 1,
        explanation: "Cloud databases persist objects on high-performance internet servers so data is structured, secure, and shared."
      }
    ]
  },
  react: {
    id: "react-lesson",
    nodeId: "react",
    title: "Reactive Paradigms (React)",
    concept: "As websites grow, direct DOM coding (document.getElementById) becomes messy and difficult to maintain. React solves this through Declarative UI. Instead of matching elements and updating them step-by-step, we write code describing what the screen should look like based on React state (useState). When state changes, React dynamically re-draws only the parts of the page that have changed.",
    takeaways: [
      "Components are the building blocks. Wrap headers, cards, and input groups in isolated files so you can use them multiple times.",
      "State (useState) dictates component visuals. Edit the values in state, and React automatically and instantly re-renders the element.",
      "Side effects are controlled using hooks. useEffect coordinates operations (like fetching API servers) that happen during lifecycle updates.",
      "Props act as data attributes. Think ofProps as data payloads passed from a parent element to customize the child."
    ],
    analogy: "React is like a modern dashboard on a spaceship. The dials, maps, and alarms automatically light up, blink, or turn green based on the structural cockpit monitors. You do not touch the light manually; you just fly, and the indicators match your speed.",
    theoryLanguage: "typescript",
    theoryCode: `// React 18+ Clean component
import React, { useState, useEffect } from "react";

interface CounterProps {
  initialValue: number;
}

export function SpaceCounter({ initialValue }: CounterProps) {
  const [velocity, setVelocity] = useState(initialValue);

  return (
    <div className="p-4 bg-slate-900 rounded-lg text-center">
      <p className="font-mono text-emerald-400">Current Velocity: {velocity} km/s</p>
      <button 
        onClick={() => setVelocity(v => v + 5)}
        className="mt-2 text-xs px-3 py-1 bg-slate-800 rounded border border-slate-700 hover:bg-slate-750 text-white"
      >
        Propel Ship
      </button>
    </div>
  );
}`,
    exercisePrompt: "Write a React component named 'SkillTag' that takes a 'label' string as a prop, tracks a local boolean active state 'isSelected' (starts false), and toggles visual CSS highlight class borders whenever the button element is clicked.",
    exerciseInitialCode: `import React, { useState } from "react";

export default function SkillTag({ label }: { label: string }) {
  // 1. Declare isSelected state
  
  // 2. Map visual highlight borders based on that state
  
  return (
    <button className="">
      {label}
    </button>
  );
}`,
    quiz: [
      {
        id: "react-q1",
        question: "How does React determine when to redraw a specific component on screen?",
        options: [
          "It forces a full page reload every 1.5 seconds.",
          "Whenever a relative local state variable initialized with 'useState' is updated.",
          "When the browser window size matches standard thresholds.",
          "Only when custom HTML files are uploaded."
        ],
        correctAnswerIndex: 1,
        explanation: "State updates prompt React to evaluate structural differences across virtual components, injecting precise visual adjustments instantly."
      },
      {
        id: "react-q2",
        question: "What is the primary role of Props in a React element?",
        options: [
          "To secure server endpoints from CORS attacks.",
          "To pass data parameters from parent components into custom child components, customizing their visuals or values.",
          "To animate canvas elements dynamically.",
          "To run database migrations in Node.js."
        ],
        correctAnswerIndex: 1,
        explanation: "Props are structured read-only argument variables fed down the tree of components, matching attributes like src, href, or text labels."
      }
    ]
  }
};

export const CAREER_CALCULATORS = {
  fixedPriceTip: "Freelancing succeeds when pricing is value-driven rather than hourly constraint models.",
  hourlyTip: "Start value baseline: (Target Annual Income + 30% Tax Buffer) / 1000 high-focus hours."
};
