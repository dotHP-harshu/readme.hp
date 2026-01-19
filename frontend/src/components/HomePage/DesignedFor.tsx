import { GitFork, User, GraduationCap, Zap } from "lucide-react";
import type { JSX } from "react";

interface DesignedForInterface {
  icon: JSX.Element;
  heading: string;
  para: string;
}

const DESIGNED_FOR_DATA: DesignedForInterface[] = [
  {
    icon: <GitFork />,
    heading: "Open Source Maintainers",
    para: "Keep documentation consistent across public repositories without rewriting READMEs for every change.",
  },
  {
    icon: <User />,
    heading: "Indie Developers",
    para: "Document side projects and experiments quickly so others can understand and use your work.",
  },
  {
    icon: <GraduationCap />,
    heading: "Students & Learners",
    para: "Learn professional README structure by generating documentation from real-world projects.",
  },
  {
    icon: <Zap />,
    heading: "Hackathon & Rapid Prototyping Teams",
    para: "Create usable documentation fast when speed matters more than perfection.",
  },
];

function DesignedFor() {
  return (
    <div className="px-6">
      <div className="text-center w-full space-y-2 mt-10 ">
        <h4 className="text-primary uppercase text-2xl leading-none">
          Who this tool is for
        </h4>
        <h2 className="text-4xl font-bold leading-none mt-4">
          Built for these workflows
        </h2>
        <p className="text-lg font-light text-text-muted-light leading-none dark:text-text-muted-dark">
          From individual developers to small teams, this tool helps turn
          repository context into usable documentation with minimal setup and no
          unnecessary complexity.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 max-sm:grid-cols-1 gap-6 py-10">
        {DESIGNED_FOR_DATA.map((elem) => (
          <div
            key={elem.heading}
            className="group p-4 bg-bg-light dark:bg-bg-dark border-2 border-border-light dark:border-border-dark rounded-xl transition-colors duration-300 hover:bg-surface-secondary-light dark:hover:bg-surface-secondary-dark"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-green-500/30 group-hover:text-green-400 transition-colors duration-300">
                {elem.icon}
              </span>
              <h5 className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors duration-300">
                {elem.heading}
              </h5>
            </div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-normal mt-4">
              {elem.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignedFor;
