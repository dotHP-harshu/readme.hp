import { FolderOpen, Link2, Sparkles } from "lucide-react";
import type { JSX } from "react";

interface WorkflowCardInterface {
  icon: JSX.Element;
  heading: string;
  para: string;
}
const WORKFLOW_DATA: WorkflowCardInterface[] = [
  {
    icon: <Link2 />,
    heading: "Paste URL",
    para: "Simply provide the public GitHub repository URL you want to document.",
  },
  {
    icon: <FolderOpen />,
    heading: " Select Files",
    para: "Our crawler maps your tree. Choose specific modules or let AI handle the context.",
  },
  {
    icon: <Sparkles />,
    heading: "AI Generation",
    para: "Instant generation of features, installation guides, and contribution rules.",
  },
];

function WorkFlow() {
  return (
    <section className="px-6 py-[6vw] bg-bg-light dark:bg-bg-dark" style={{backgroundImage:"radial-gradient(#444cf7 0.5px, transparent 0.5px)", backgroundSize:"10px 10px"}}>
      <div className="max-w-7xl  mx-auto">
        <h2 className="md:text-4xl text-3xl font-semibold leading-none">
          Streamlined Workflow
        </h2>
        <p className="md:text-lg text-base font-light text-text-muted-light dark:text-text-muted-dark mt-2 leading-none">
          From code to documentation in three simple steps.
        </p>
      </div>

      <div className="max-w-7xl mt-[6vw] grid grid-cols-3 max-sm:grid-cols-1 gap-2 mx-auto">
        {WORKFLOW_DATA.map((ele, index) => (
          // ------------------ Workflow Card ------------------
          <div key={ele.heading} className="p-4 border border-border-light dark:border-border-dark rounded-lg group hover:border-primary-hover duration-400 space-y-4 bg-surface-primary-light dark:bg-surface-primary-dark">
            <div className="bg-primary/20 w-fit p-3 rounded-lg text-primary"><div className="group-hover:scale-125 transition-transform duration-500">{ele.icon}</div></div>
            <h3 className="text-xl font-semibold space-x-3"><span>{String(index+1).padStart(2,"0")}.</span><span>{ele.heading}</span></h3>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm"> {ele.para}</p>
          </div>
          // ------------------ Workflow Card ------------------ *
        ))}
      </div>
    </section>
  );
}

export default WorkFlow;
