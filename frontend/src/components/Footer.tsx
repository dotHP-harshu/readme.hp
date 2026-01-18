import { Github } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="bg-surface-primary-light dark:bg-surface-primary-dark flex flex-row-reverse justify-between items-center mt-6 px-20 max-xs:px-6 py-2 border-t-2 border-border-light dark:border-t-border-dark">
      <div className="text-xl flex justify-center items-center gap-0.5">
        <span className="font-code">readme</span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full self-baseline-last -translate-y-1/2"></span>
        <span className="font-extrabold font-sans italic">hp</span>
      </div>
      <div className="flex justify-center items-center">
        <span className="p-2 rounded-full bg-surface-secondary-light dark:bg-surface-secondary-dark inline-block w-fit h-fit cursor-pointer text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 hover:bg-surface-secondary-hover-light dark:hover:bg-surface-secondary-hover-dark">
            <Github/>
        </span>
      </div>
    </div>
  );
}

export default Footer;
