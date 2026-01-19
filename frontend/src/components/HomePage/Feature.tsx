import { Brain, Folder, Lock, Palette } from "lucide-react";
import type { JSX } from "react";

interface FeatureCardInterface {
  icon: JSX.Element;
  heading: string;
  para: string;
}

const FEATURE_DATA: FeatureCardInterface[] = [
  {
    icon: <Folder />,
    heading: "Selective Context",
    para: "Choose only the files that matter.",
  },
  {
    icon: <Brain />,
    heading: "README by AI",
    para: "Generate structured README files from code.",
  },
  {
    icon: <Palette />,
    heading: "Minimal Interface",
    para: "Fast, clean, and distraction-free.",
  },
  {
    icon: <Lock />,
    heading: "No Login",
    para: "We don't want your data. Just your code's context.",
  },
];

function Feature() {
  return (
    <section className="px-6 w-full py-[6vw] bg-linear-to-l from-primary/20 to-bg-light dark:to-bg-dark">
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 grid-cols-1 max-md:gap-6">
        {/* -------------- left -------------------- */}
        <div className="space-y-6">
          <h2 className="md:text-4xl text-3xl font-semibold leading-none">
            Better READMEs, backed by real project context
          </h2>
          <p className="md:text-lg text-base font-light text-text-muted-light dark:text-text-muted-dark mt-2 leading-none">
            The tool reads your repository structure and helps you document it
            clearly, using AI as an assistant — not a replacement.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 max-xs:grid-cols-1">
            {FEATURE_DATA.map((elem) => (
              <div key={elem.heading} className="p-2 flex gap-4">
                <div className="w-fit text-primary">{elem.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold leading-none">
                    {elem.heading}
                  </h3>
                  <p className="text-base text-text-muted-light dark:text-text-muted-dark font-light ">
                    {elem.para}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------------- right ------------------- */}
        <div className="flex justify-center items-center">
          <div className="bg-surface-primary-light dark:bg-surface-primary-dark p-4 rounded-2xl border-2 border-border-light dark:border-border-dark relative">
            <div className="absolute inset-0 select-none bg-linear-to-b from-transparent to-surface-primary-light/90 dark:to-surface-primary-dark/90 rounded-2xl"></div>
            <div className="flex items-center gap-2 border-b border-border-dark px-4 pb-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="ml-4 font-mono text-xs text-slate-500">
                README.md
              </div>
            </div>

            <div className="mt-4 font-mono text-sm text-slate-400 space-y-4 px-4 h-fit overflow-hidden mask-fade-bottom">
              <p className="text-white"># Project Nexus 🚀</p>
              <p>
                The ultimate lightweight orchestration layer for microservices.
              </p>
              <p className="text-primary">## Key Features</p>
              <p>- **Zero-config**: works out of the box</p>
              <p>- **Ultra-lightweight**: &lt;5kb gzipped</p>
              <p>- **Type-safe**: Built with TypeScript</p>
              <p className="text-primary">## Installation</p>
              <p className="bg-black/50 p-2 rounded">npm install nexus-core</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
