import { AlertTriangle } from "lucide-react";
import ReadmeGenLoader from "../loaders/ReadmeGenLoader";



function GeneratingReadme({handleAbort}: {handleAbort: () => void}) {
  return (
    <div className="bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-xs fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center border-2 border-border-light dark:border-border-dark z-99 p-4">
      <div className="bg-surface-primary-light dark:bg-surface-primary-dark rounded-lg w-full h-[80vh] max-w-4xl relative flex flex-col gap-2 justify-center items-center p-6 border-2 border-border-light dark:border-border-dark">
        <div className="flex flex-col items-center gap-2 justify-center mb-6">
          <span className="inline-block mx-auto w-fit h-fit text-yellow-500/80"><AlertTriangle/></span>
          <p className="text-sm leading-none text-center text-yellow-500/50">It may take a few seconds—feel free to take a sip of water while we load this.</p>
        </div>
        <ReadmeGenLoader />
        <div className="mt-6">
          <button onClick={handleAbort} className="select-none  bg-red-600/20 text-red-600 border border-red-600/25 rounded-lg px-4 py-2 cursor-pointer">
            <span> Abort Request</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneratingReadme;
