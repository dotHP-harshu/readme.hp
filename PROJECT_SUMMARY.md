# PROJECT_SUMMARY.md — Readme.hp

> AI-powered README generator for GitHub repositories. Paste a repo URL, select files, get a professional README.md — instantly.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Directory Structure](#directory-structure)
5. [How It Works](#how-it-works)
6. [Current Strengths](#current-strengths)
7. [Issues & Risks](#issues--risks)
8. [Improvement Roadmap](#improvement-roadmap)
9. [Quick Wins](#quick-wins)

---

## Overview

**Readme.hp** is a full-stack web application that automatically generates professional `README.md` files for GitHub repositories using AI. Users paste a public GitHub repo URL, select which source files to analyze, and the system generates a polished README using a Map-Reduce AI pattern via the OpenRouter API.

- **Author**: dotHP (Harshu)
- **Repository**: `https://github.com/dothp-harshu/readme.hp`
- **Live Deployment**: Vercel (frontend) + custom server

---

## Tech Stack

### Frontend (`/frontend`)

| Category | Technology | Version |
|----------|-----------|---------|
| Language | TypeScript | ~5.9 |
| UI Framework | React | 19.2 |
| Bundler | Vite | 7.2 |
| Styling | Tailwind CSS | 4.x |
| Routing | React Router | 7.x |
| Animation | GSAP | 3.14 |
| Markdown | react-markdown + rehype-highlight + remark-gfm | 10.x |
| HTTP Client | Axios | 1.13 |
| Icons | Lucide React | 0.562 |
| Compiler | babel-plugin-react-compiler | 1.0 |

### Backend (`/server`)

| Category | Technology | Version |
|----------|-----------|---------|
| Runtime | Node.js (CommonJS) | — |
| Framework | Express | 5.2 |
| AI Provider | OpenRouter API (via OpenAI SDK) | — |
| AI Model | `z-ai/glm-4.5-air:free` | — |
| File Upload | Multer | 2.0 |
| HTTP Client | Axios | 1.13 |
| Environment | dotenv | 17.x |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React SPA)                     │
│                                                           │
│  1. User pastes GitHub URL                                │
│  2. Fetch repo file tree via GitHub API (client-side)     │
│  3. User selects files to analyze                         │
│  4. Send file list to server                              │
│  5. Display generated README with preview                 │
└───────────────┬─────────────────────┬────────────────────┘
                │                     │
    ┌───────────▼───────────┐  ┌──────▼──────────────┐
    │   GitHub Raw Content  │  │   Express API Server │
    │       API             │  │                       │
    │   (fetch file src)    │  │  POST /github/content │
    └───────────────────────┘  │  POST /ai/readme      │
                               │                       │
                               │  Map-Reduce Pipeline: │
                               │  1. Chunk content     │
                               │  2. Summarize chunks   │
                               │  3. Synthesize README  │
                               └──────────┬────────────┘
                                          │
                               ┌──────────▼────────────┐
                               │   OpenRouter AI API    │
                               │  (glm-4.5-air:free)    │
                               └───────────────────────┘
```

---

## Directory Structure

```
readme.hp/
├── frontend/                          # React + Vite SPA
│   ├── src/
│   │   ├── api/                       # API client layer
│   │   │   ├── githubApi.ts           # GitHub API: parse URL, fetch file tree
│   │   │   └── serverApi.ts           # Backend API: upload files, generate README
│   │   ├── components/
│   │   │   ├── Header.tsx             # Nav bar with theme toggle
│   │   │   ├── Footer.tsx             # Footer with feedback link
│   │   │   ├── PageLoader.tsx         # GSAP morph SVG loader
│   │   │   ├── HomePage/              # Landing page components
│   │   │   │   ├── HomeHero.tsx
│   │   │   │   ├── WorkFlow.tsx
│   │   │   │   ├── Feature.tsx
│   │   │   │   ├── DesignedFor.tsx
│   │   │   │   └── Limitations.tsx
│   │   │   ├── MainPage/              # Generator page components
│   │   │   │   ├── MainHero.tsx       # URL input + file tree (core UI)
│   │   │   │   ├── FileAnaSection.tsx # File analysis overlay
│   │   │   │   ├── GeneratingReadme.tsx
│   │   │   │   └── ReadmeSection.tsx  # Markdown preview + copy
│   │   │   ├── RepoFileSelection/
│   │   │   │   └── RepoFileItem.tsx   # Memoized file tree item
│   │   │   └── loaders/
│   │   │       └── ReadmeGenLoader.tsx
│   │   ├── context/
│   │   │   └── ThemeProvider.tsx       # Dark/light theme via Context
│   │   ├── hooks/
│   │   │   └── usePageTitle.tsx        # Custom hook for document.title
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── MainPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── types/
│   │   │   └── types.ts               # Shared TypeScript types
│   │   ├── utils/
│   │   │   └── MainHeroUtil.ts        # Smart file pre-selection logic
│   │   ├── App.tsx                    # Router setup (lazy-loaded pages)
│   │   ├── main.tsx                   # React entry point
│   │   └── index.css                  # Tailwind config + theme tokens
│   ├── prompts/                       # Prompt engineering docs
│   │   ├── prompt.md
│   │   └── results.md
│   ├── public/
│   │   ├── dothp.png
│   │   └── fonts/Monospace.woff
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│   ├── eslint.config.js
│   └── vercel.json
│
├── server/                            # Express API server
│   ├── index.js                       # Server entry point
│   ├── controllers/
│   │   ├── ai.controllers.js          # POST /ai/readme — AI generation logic
│   │   └── github.controllers.js      # POST /github/content — fetch repo files
│   ├── routes/
│   │   ├── ai.route.js                # AI routes with multer middleware
│   │   └── github.route.js            # GitHub routes
│   ├── utils/
│   │   ├── getChunks.js               # Text chunking (25K token limit)
│   │   ├── prompts.js                 # SUMMARY_PROMPT + README_PROMPT constants
│   │   ├── repoContentFormatter.js    # Format files into delimited blocks
│   │   └── responseFormatter.js       # Standardized API response format
│   ├── readme.md                      # Reducer prompt documentation
│   ├── prompt.md                      # Original generation prompt
│   ├── ecotrack.txt                   # Test data (should be removed)
│   ├── temp_repo_content.txt          # Test data (should be removed)
│   └── package.json
│
├── .gitignore
└── PROJECT_SUMMARY.md                 # This file
```

---

## How It Works

### End-to-End Flow

1. **URL Input** — User pastes a GitHub repository URL (e.g., `https://github.com/user/repo`)
2. **File Tree Fetch** — Frontend parses the URL, calls GitHub API to fetch the recursive file tree
3. **Smart Pre-Selection** — `MainHeroUtil.ts` auto-selects important files (source code, configs) and ignores build artifacts, lock files, dependencies
4. **File Selection** — User reviews and adjusts which files to include
5. **Content Fetch** — Frontend sends the selected file list to `POST /github/content`; server fetches raw file contents from GitHub
6. **Content Upload** — Frontend receives formatted content, sends it to `POST /ai/readme` as a FormData blob
7. **Map Phase** — Server chunks the content (~25K tokens per chunk), sends each chunk to the AI model with `SUMMARY_PROMPT` to extract: tech stack, features, file structure, API routes, architecture
8. **Reduce Phase** — All chunk summaries are combined and sent to the AI with `README_PROMPT` to synthesize a final, polished README.md
9. **Preview** — Frontend renders the generated README with markdown preview, raw view, and copy-to-clipboard

### Key Algorithm: Map-Reduce

```
[Large Codebase] → Chunk 1, Chunk 2, ... Chunk N
                         ↓
              [Map: Summarize Each Chunk]
                         ↓
              Summary 1, Summary 2, ... Summary N
                         ↓
              [Reduce: Synthesize README]
                         ↓
                   [Final README.md]
```

This pattern solves the LLM context window limitation — even repos with hundreds of files can be analyzed.

---

## Current Strengths

| Strength | Details |
|----------|---------|
| **Map-Reduce AI Pattern** | Elegant solution to context window limits; each chunk is summarized independently then synthesized |
| **Free AI Model** | Uses `glm-4.5-air:free` via OpenRouter — zero cost to operate |
| **Smart File Pre-selection** | Extensive curated lists of important vs ignorable files in `MainHeroUtil.ts` |
| **React.memo Performance** | `RepoFileItem` properly memoized with `displayName` for large file trees |
| **Lazy Loading** | All three pages lazy-loaded via `React.lazy` + `Suspense` — fast initial load |
| **Abort Support** | Generation can be cancelled mid-request via `AbortController` |
| **Theme System** | Clean dark/light mode via Context + localStorage persistence |
| **Strict TypeScript** | Frontend uses strict mode with `noUnusedLocals`, `noUnusedParameters` |
| **Tailwind CSS 4** | Modern CSS-first config with custom theme tokens |
| **Express 5** | Using latest Express with async error handling support |

---

## Issues & Risks

### Critical

| # | Issue | Location | Description |
|---|-------|----------|-------------|
| 1 | **ESM/CJS Module Conflict** | `server/utils/getChunks.js`, `server/utils/prompts.js` | These files use `export` (ESM) but are `require()`'d from CommonJS files. The server has no `"type": "module"` in package.json. This will cause runtime errors. |
| 2 | **No Input Validation (SSRF)** | `server/controllers/github.controllers.js` | `username`, `repo`, `branch` from client are interpolated directly into GitHub API URLs without sanitization. Malicious input could proxy arbitrary requests. |
| 3 | **No Rate Limiting** | Server-wide | No rate limiting middleware. Anyone can abuse the server to proxy GitHub/OpenRouter API calls. |
| 4 | **No File Size Limits** | `server/routes/ai.route.js` | Multer uses `memoryStorage()` with no size limit — client can upload arbitrarily large payloads, causing memory exhaustion. |
| 5 | **Error HTTP Status Codes** | `server/utils/responseFormatter.js` | All errors returned with `res.send()` (HTTP 200) instead of `res.status(code).send()`. Clients cannot detect errors via status codes. |

### High

| # | Issue | Location | Description |
|---|-------|----------|-------------|
| 6 | **No Security Headers** | `server/index.js` | No `helmet.js` or security headers middleware |
| 7 | **No CSRF Protection** | Server-wide | POST endpoints have no CSRF tokens |
| 8 | **Sequential AI Calls** | `server/controllers/ai.controllers.js:25-41` | Chunks processed serially in a `for...of` loop — large repos take minutes |
| 9 | **No Caching** | Server-wide | Same repo analyzed twice makes identical API calls |
| 10 | **Unused Dependency** | `server/package.json` | `@google/genai` is installed but never used anywhere |

### Medium

| # | Issue | Location | Description |
|---|-------|----------|-------------|
| 11 | **No Tests** | Entire codebase | Zero test files, no test frameworks configured |
| 12 | **Server is Plain JS** | `server/` | No TypeScript, no type checking, no JSDoc on server code |
| 13 | **No `.env.example`** | Server & Frontend | Developers must guess required environment variables |
| 14 | **Router Recreation** | `frontend/src/App.tsx:11` | `createBrowserRouter` called inside component body — new router on every render |
| 15 | **Loose Type Casting** | `MainHero.tsx:80`, `FileAnaSection.tsx:48`, `MainPage.tsx:28` | Unsafe `as` assertions without runtime validation |
| 16 | **Duplicate Logo JSX** | `Header.tsx:10-14`, `Footer.tsx:8-12` | Brand logo duplicated identically — should be a shared component |
| 17 | **Hardcoded AI Model** | `ai.controllers.js:28,44` | Model name hardcoded — should be configurable via env var |
| 18 | **No Error Boundaries** | Frontend-wide | No React error boundaries — component crash = full app crash |
| 19 | **Inconsistent Naming** | Various | `setrepoError` (lowercase r) vs `setIsLoadingFiles` (camelCase) |

### Low

| # | Issue | Location | Description |
|---|-------|----------|-------------|
| 20 | **Test Files in Repo** | `server/ecotrack.txt`, `server/temp_repo_content.txt` | 1500+ lines of test data from other projects — should be removed |
| 21 | **Commented-Out Code** | `vite.config.ts:18-33`, `usePageTitle.tsx:11-27` | Dead code left in source files |
| 22 | **Typo: "Catched"** | `ai.controllers.js:39` | Should be "Caught" |
| 23 | **GSAP Bundle Weight** | `frontend/` | ~60KB library used only for two loader animations |
| 24 | **No Prettier** | Frontend & Server | No formatting tool configured — inconsistent code style |
| 25 | **No CI/CD** | Repository | No GitHub Actions or similar pipeline |
| 26 | **No Meta/OG Tags** | `frontend/index.html` | No Open Graph tags for social sharing |
| 27 | **Empty Frontend README** | `frontend/README.md` | Contains only `# Readme.hp` — ironic for a README generator |

---

## Improvement Roadmap

### Phase 1: Stability & Security (Immediate)

Fix critical bugs and harden the server.

| Task | Effort | Impact |
|------|--------|--------|
| Fix ESM/CJS module conflict in `getChunks.js` and `prompts.js` — change `export` to `module.exports` | 15 min | Fixes potential runtime crash |
| Add input validation/sanitization for `username`, `repo`, `branch` on server | 1 hr | Prevents SSRF attacks |
| Add `express-rate-limit` middleware to all endpoints | 30 min | Prevents API abuse |
| Add file size limits to multer (e.g., `limits: { fileSize: 5 * 1024 * 1024 }`) | 10 min | Prevents memory exhaustion |
| Add `helmet` for security headers | 15 min | Basic security hardening |
| Return proper HTTP status codes from error responses | 30 min | Enables proper error handling on client |
| Remove unused `@google/genai` dependency | 5 min | Cleaner dependency tree |
| Remove temp/test files (`ecotrack.txt`, `temp_repo_content.txt`) | 5 min | Cleaner repo |
| Add `.env.example` files for both frontend and server | 15 min | Better developer experience |

### Phase 2: Code Quality (Short-term)

Improve maintainability and catch bugs early.

| Task | Effort | Impact |
|------|--------|--------|
| Add Vitest + React Testing Library for frontend unit/component tests | 1 day | Catch regressions |
| Add unit tests for server utils (`getChunks`, `repoContentFormatter`, `prompts`) | 3 hrs | Validate core logic |
| Convert server to TypeScript with `ts-node` or `tsx` | 1 day | Type safety, better IDE support |
| Add Prettier with consistent config | 30 min | Uniform code formatting |
| Extract brand logo into a shared `Logo` component | 15 min | Eliminate duplication |
| Add React Error Boundaries around route-level components | 1 hr | Graceful crash recovery |
| Fix `createBrowserRouter` placement in `App.tsx` | 10 min | Prevent router recreation |
| Add ESLint + Prettier integration | 30 min | Enforce consistent style |
| Replace unsafe `as` type assertions with runtime validation or zod schemas | 2 hrs | Type safety |
| Fix naming inconsistencies (`setrepoError` → `setRepoError`) | 15 min | Code consistency |

### Phase 3: Performance (Medium-term)

Optimize for speed and resource usage.

| Task | Effort | Impact |
|------|--------|--------|
| Parallelize chunk summarization (batch 3-5 concurrent AI calls) | 2 hrs | 3-5x faster generation |
| Add in-memory caching (LRU cache keyed by repo+branch+files hash) | 3 hrs | Instant repeat analysis |
| Replace GSAP loader animations with CSS animations | 2 hrs | ~60KB bundle reduction |
| Add component-level code splitting (lazy-load markdown renderer) | 1 hr | Faster initial page load |
| Add streaming response for AI generation (SSE) | 3 hrs | Real-time progress feedback |
| Externalize AI model name to environment variable | 15 min | Easy model switching |

### Phase 4: Features & Polish (Long-term)

Add capabilities that make the tool more powerful and professional.

| Task | Effort | Impact |
|------|--------|--------|
| Add AI model selector (let users choose from multiple models) | 1 day | Flexibility for different use cases |
| Add repo analysis history (localStorage or database) | 2 days | Revisit past analyses |
| Add user authentication + saved READMEs | 1 week | Personalization, retention |
| Add CI/CD pipeline (GitHub Actions for lint, test, build, deploy) | 1 day | Automated quality gates |
| Add Open Graph / meta tags for social sharing | 30 min | Better link previews |
| Write comprehensive `README.md` for the project itself | 2 hrs | Proper documentation |
| Add i18n support for non-English README generation | 3 days | Global audience |
| Add custom prompt templates (let users define README style) | 2 days | Personalization |
| Add repository comparison mode (analyze multiple repos) | 1 week | Advanced feature |
| Add Webhook/Slack integration for automated README updates | 3 days | DevOps workflow |

---

## Quick Wins

These are easy fixes that immediately improve the project — most take under 30 minutes:

| # | Task | Time | Why |
|---|------|------|-----|
| 1 | Remove `ecotrack.txt` and `temp_repo_content.txt` from `server/` | 5 min | Cleaner repo, no test data in production |
| 2 | Change `export` to `module.exports` in `getChunks.js` and `prompts.js` | 10 min | Fixes potential ESM/CJS runtime error |
| 3 | Fix typo "Catched" → "Caught" in `ai.controllers.js` | 2 min | Professionalism |
| 4 | Remove commented-out code from `vite.config.ts` (lines 18-33) | 5 min | Cleaner codebase |
| 5 | Remove commented-out code from `usePageTitle.tsx` (lines 11-27) | 5 min | Cleaner codebase |
| 6 | Extract brand logo into shared `Logo.tsx` component | 15 min | DRY principle |
| 7 | Add `limits: { fileSize: 5 * 1024 * 1024 }` to multer config | 5 min | Prevent memory attacks |
| 8 | Add `.env.example` to both `frontend/` and `server/` | 10 min | Better DX |
| 9 | Fix `createBrowserRouter` placement in `App.tsx` | 10 min | Prevent unnecessary re-renders |
| 10 | Remove unused `@google/genai` from `server/package.json` | 2 min | Clean dependencies |

**Total estimated time for all quick wins: ~55 minutes**

---

## Environment Variables Reference

### Server (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `CLIENT_URL` | Yes | Frontend URL for CORS origin |
| `OPENROUTER_API_KEY` | Yes | API key for OpenRouter AI service |

### Frontend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SERVER_URL` | Yes | Backend server URL |
| `VITE_WEB_3_FORM_TOKEN` | Yes | Web3Forms access key (contact form) |

---

## Build & Run Commands

### Frontend

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server (Vite, port 5173)
npm run build        # TypeScript check + production build
npm run lint         # ESLint check
npm run preview      # Preview production build locally
```

### Server

```bash
cd server
npm install          # Install dependencies
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start with plain Node.js
```

---

*Generated by analyzing the full Readme.hp codebase. Last updated: July 2026.*
