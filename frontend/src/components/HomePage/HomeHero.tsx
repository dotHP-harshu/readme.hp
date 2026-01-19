import { BadgeCheck, Zap } from "lucide-react";

function HomeHero() {
  return (
    <section className="h-dvh w-full ">
      <div className="flex justify-center items-center flex-col h-full space-y-6 px-6 bg-linear-to-r from-primary/20 to-bg-light dark:to-bg-dark">
        <div className="flex justify-center items-center gap-4">
          {["No account needed", "markdown export"].map((ele) => (
            <div
              key={ele}
              className="flex w-fit gap-2 items-center justify-center"
            >
              <span>
                <BadgeCheck className="text-green-500" size={16} />
              </span>
              <span className="text-sm text-text-muted-light dark:text-text-muted-dark max-xs:text-xs">
                {ele}
              </span>
            </div>
          ))}
        </div>
        <h2 className="md:text-7xl text-6xl max-xs:text-4xl tracking-tight leading-none text-center max-w-3xl w-full font-bold">
          Generate <span className="text-primary italic">README</span> files
          from any repo
        </h2>

        <p className="md:text-xl text-lg font-light tracking-tight text-text-muted-light dark:text-text-muted-dark max-w-xl w-full text-center">
          Leverage AI to document your codebases instantly. No login required,
          just paste your GitHub URL and watch the magic happen.
        </p>
        <div className="flex justify-center items-center flex-col gap-4">
          <button className="bg-primary flex justify-center select-none items-center gap-2 px-4 py-2 outline-none rounded-lg cursor-pointer text-text-dark  hover:bg-primary-hover transition-colors duration-200">
            <Zap strokeWidth={1.25} size={16} />
            <span className="text-base font-semibold tracking-normal">
              Get Started
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
