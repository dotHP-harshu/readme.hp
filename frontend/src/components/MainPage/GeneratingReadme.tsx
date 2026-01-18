import ReadmeGenLoader from "../loaders/ReadmeGenLoader";



function GeneratingReadme() {
  return (
    <div className="bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-xs fixed top-0 left-0 w-dvw h-dvh z-10 flex justify-center items-center border-2 border-border-light dark:border-border-dark ">
      <div className="bg-surface-primary-light dark:bg-surface-primary-dark rounded-lg w-[80vw] h-[80vh] max-w-4xl relative flex justify-center items-center p-6 border-2 border-border-light dark:border-border-dark">
        <ReadmeGenLoader/>
      </div>
    </div>
  );
}

export default GeneratingReadme;
