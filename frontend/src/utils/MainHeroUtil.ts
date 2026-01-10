import type { fileTreeElement } from "../types/types";

const importantExtensions = [
  "js", // JavaScript
  "ts", // TypeScript
  "py", // Python
  "java", // Java
  "c",
  "cpp", // C/C++
  "go", // Go
  "rb", // Ruby
  "php", // PHP
  "html",
  "css", // Frontend
  "json", // Project configs
  "rs", // Rust
  "sh", // Shell scripts
];

const frameworkIgnoreList = new Set([
  // Node.js / npm / package managers
  "node_modules",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",

  // Vite / Webpack / Build
  "dist",
  "build",
  ".vite",
  ".next",
  ".nuxt",
  ".output",
  "out",
  ".cache",

  // Next.js / Vercel / Hosting
  ".vercel",
  "vercel.json",
  "next.config.js",

  // Angular
  ".angular",
  "e2e",

  // Vue
  "vite.config.js",
  "vue.config.js",

  // React
  "public",
  "react-scripts",
  ".eslintcache",

  // Python / Django / Flask
  "__pycache__",
  "env",
  ".venv",
  "venv",
  "migrations",
  "static",
  "media",

  // PHP / Laravel
  "vendor",
  "storage",
  "bootstrap",
  "bootstrap/cache",
  "artisan",

  // General IDE / Editor / CI Tools
  ".vscode",
  ".idea",
  ".github",
  ".husky",
  ".circleci",
  ".gitlab-ci.yml",

  // Testing / Coverage
  "test",
  "tests",
  "__tests__",
  "coverage",
  "jest.config.js",
  "vitest.config.ts",

  // Static / Assets
  "assets",
  "images",
  "img",
  "icons",
  "fonts",
  "favicon.ico",

  // Configs
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  "babel.config.js",
  "postcss.config.js",
  "tailwind.config.js",

  // Lint / Format / Meta
  ".eslintrc",
  ".eslintrc.json",
  ".prettierrc",
  ".editorconfig",
  ".stylelintrc",

  // Map & Binary Files
  ".map",
  ".min.js",
  ".min.css",
  ".dll",
  ".exe",

  // Misc
  "README.md",
  "LICENSE",
  ".DS_Store",
  "Thumbs.db",
]);

const importantFilenames = [
  "README.md",
  "readme.md",
  "package.json",
  "requirements.txt",
  "setup.py",
  "main.py",
  "index.js",
  "app.js",
  "server.js",
  "config.js",
  "dockerfile",
  "Makefile",
];

export function makeImpFileArray(array: fileTreeElement[]): fileTreeElement[] {

    return  array.filter((f)=>{
        const file = f as fileTreeElement
        if(! file.path) return false
        const path = file.path.toLocaleLowerCase()
        const segments = path.split("/")
        // Ignored
        if(segments.some((seg) => frameworkIgnoreList.has(seg))) return false
        const fileName = segments[segments.length-1]
        const ext = fileName.split(".").pop() || ""

        return (importantExtensions.includes(ext) || importantFilenames.includes(fileName))
    })
}

export function shuffleArray(array: string[]): string[] {
  let arr = array.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
