import {  CircleCheckBig, Link2, WandSparkles } from "lucide-react";

function MainHero() {
  return (
    <div className="flex justify-center items-center flex-col min-h-[80dvh] space-y-6 px-6">
        <div className="absolute inset-0 pointer-events-none z-0" style={{backgroundImage:"radial-gradient(circle at center, rgba(31, 177, 249, 0.15) 0%, rgba(12, 12, 13, 0) 70%)"}}></div>
      <h2 className="md:text-5xl text-4xl max-xs:text-3xl font-semibold tracking-tight leading-tight text-center max-w-2xl w-full">
        Generate professional documentation from your code.
      </h2>

      <p className="md:text-xl text-lg font-light tracking-tight text-text-muted-light dark:text-text-muted-dark max-w-2xl w-full text-center">
        Paste a GitHub repository URL, select your context, and let our AI
        document your codebase in seconds.
      </p>

      <form className=" max-w-3xl w-full space-y-2">
        <div className="bg-surface-primary-light dark:bg-surface-primary-dark flex items-stretch gap-4 w-full px-4 py-3 max-xs:px-2 max-xs:py-1.5 border-2 border-border-light dark:border-border-dark rounded-lg overflow-hidden focus-within:border-primary-hover shadow-sm focus-within:shadow-primary transition-all duration-200">
            <div className="flex justify-center items-center "><Link2 className="text-text-muted-light dark:text-text-muted-dark" /></div>
            <input type="text" className="flex-1 w-full outline-none bg-transparent px-2 font-code placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark text-base" placeholder="https://github.com/username/project"   />
            <button className="bg-primary flex justify-center items-center gap-2 px-4 py-1 rounded-lg cursor-pointer text-text-light hover:bg-primary-hover transition-colors duration-200"><WandSparkles strokeWidth={1.25}/> <span className="text-lg font-semibold tracking-normal max-sm:hidden">Generate</span></button>
        </div>
        <div>
            <p className="text-sm max-xs:text-xs font-light text-text-muted-light dark:text-text-muted-dark flex justify-center items-center w-fit gap-2"><CircleCheckBig className="" strokeWidth={1} size={16}/> <span>Public Repos Only</span></p>
        </div>
      </form>
    </div>
  );
}

export default MainHero;
