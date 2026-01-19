import {
  Layers,
  Unlock,
  Clock,
  Puzzle,
} from "lucide-react";
import type { JSX } from "react";


interface LimitationCardInterface {
    icon:JSX.Element
  heading: string;
  para: string;
}

const LIMITATION_DATA: LimitationCardInterface[] = [
  {
    icon: <Layers/>,
    heading: "Context Limits for Large Repositories",
    para:
      "Large repositories may require selecting only the most relevant files due to AI context size limitations.",
  },
  {
    icon: <Unlock/>,
    heading: "Public Repositories Only (Default)",
    para:
      "Private repositories are not supported unless GitHub authentication and permission handling are implemented.",
  },
  {
    icon: <Clock/>,
    heading: "API Rate Limits Apply",
    para:
      "GitHub API and AI providers may enforce rate limits that affect how frequently repositories can be analyzed.",
  },
  {
    icon: <Puzzle/>,
    heading: "Non-Standard Project Structures",
    para:
      "Projects with unconventional layouts or niche frameworks may produce less accurate documentation results.",
  },
];


function Limitations() {
  return (
    <div className="px-6">
      <div className="text-center w-full space-y-2 mt-10 ">
        <h4 className="text-amber-300 uppercase text-2xl leading-none">
          Technical Specs & Constraints
        </h4>
        <h2 className="text-4xl font-bold leading-none mt-4">
          Clear boundaries
        </h2>
        <p className="text-lg font-light text-text-muted-light leading-none dark:text-text-muted-dark">
          Our AI works within well-defined technical limits. Understanding these
          constraints helps you get more accurate and reliable README outputs
          from your repository.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 max-sm:grid-cols-1 gap-6 py-10">

        {
            LIMITATION_DATA.map((elem)=>(
                <div key={elem.heading} className="group p-4 bg-bg-light dark:bg-bg-dark border-2 border-border-light dark:border-border-dark rounded-xl transition-colors duration-300 hover:bg-surface-secondary-light dark:hover:bg-surface-secondary-dark">
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-red-500/30 group-hover:text-red-400 transition-colors duration-300">{elem.icon}</span>
                        <h5 className="text-yellow-500/50 group-hover:text-yellow-400 transition-colors duration-300">{elem.heading}</h5>
                    </div>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-normal mt-4">{elem.para}</p>
                </div>
            ))
        }

      </div>
    </div>
  );
}

export default Limitations;
