import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Loader,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getRepoContentApi } from "../../api/serverApi";
import type { fileTreeElement } from "../../types/types";

interface FileAnaSectionProps {
  hideSection: () => void;
  files: string[];
  repoFiles: fileTreeElement[];
  repoDetail: { username: string; repo: string; branch: string };
}

function FileAnaSection({
  hideSection,
  files,
  repoDetail,
  repoFiles,
}: FileAnaSectionProps) {
  const [successfullFiles, setSuccessfullFiles] = useState<string[]>([]);
  const [unsuccessfullFiles, setUnsuccessfullFiles] = useState<string[]>([]);
  const [isAnalysingFiles, setIsAnalysingFiles] = useState<boolean>(true);
  const [analyseError, setAnalyseError] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");

  const analyseFiles = async () => {
    setAnalyseError("");
    const { data, error } = await getRepoContentApi(
      files,
      repoDetail.username,
      repoDetail.repo,
      repoDetail.branch
    );

    if (error) {
      setIsAnalysingFiles(false);
      return setAnalyseError(error);
    }
    if (data) {
      const d = data as {
        successfullFiles: string[];
        unsuccessfullFiles: string[];
        content: string;
      };
      const repoPathsString = repoFiles.reduce((p, f) => p + `${f.path}\n`, "");
      const newContent = repoPathsString + d.content;
      setFileContent(newContent);

      setUnsuccessfullFiles(d.unsuccessfullFiles);
      setSuccessfullFiles(d.successfullFiles);
      setIsAnalysingFiles(false);
    }
  };

  const handleGenerate = (content: string) => {
    console.log(content);
  };

  useEffect(() => {
    analyseFiles();
  }, []);

  return (
    <div className="bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-xs fixed top-0 left-0 w-dvw h-dvh z-10 flex justify-center items-center border-2 border-border-light dark:border-border-dark ">
      <div className="bg-surface-primary-light dark:bg-surface-primary-dark rounded-lg w-[80vw] h-[80vh] max-w-4xl relative flex justify-center items-center p-6">
        <button
          onClick={hideSection}
          className="text-primary hover:text-primary-hover hover:scale-105 hover:rotate-90 transition-all duration-200 outline-none border-none cursor-pointer absolute top-0 right-0"
        >
          <span>
            <X size={30} strokeWidth={5} />
          </span>
        </button>
        {!isAnalysingFiles && analyseError !== "" && (
          <div className="flex justify-center items-center flex-col gap-6">
            <AlertTriangle className="text-red-500" />
            <p className="text-red-500 max-w-xl text-center">{analyseError}</p>
          </div>
        )}
        {isAnalysingFiles && (
          <div className="flex justify-center items-center flex-col gap-6">
            <Loader
              className="text-text-muted-light dark:text-text-muted-dark animate-spin duration-75 "
              size={50}
            />
            <p className="text-text-muted-light dark:text-text-muted-dark text-center font-semibold tracking-tight animate-pulse">
              Getting the file Content.
            </p>
          </div>
        )}
        {!isAnalysingFiles && (
          <div className="w-full h-full bg-surface-secondary-light dark:bg-surface-secondary-dark border-2 border-border-light dark:border-border-dark rounded-lg flex justify-between items-center flex-col">
            <ul className="w-full max-h-[85%] overflow-auto scroller p-2 border-b-2 border-border-light dark:border-border-dark">
              {unsuccessfullFiles.length > 0 &&
                unsuccessfullFiles.map((un) => (
                  <li
                    title={un}
                    key={un}
                    className="w-full px-2 py-1 text-red-500 cursor-pointer flex justify-start items-center gap-2"
                  >
                    <AlertOctagon size={16} />
                    <p className="truncate font-code tracking-tighter text-sm">
                      {un}
                    </p>
                  </li>
                ))}
              {successfullFiles.length > 0 &&
                successfullFiles.map((un) => (
                  <li
                    title={un}
                    key={un}
                    className="w-full px-2 py-1 text-green-500 cursor-pointer flex justify-start items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <p className="truncate font-code tracking-tighter text-sm">
                      {un}
                    </p>
                  </li>
                ))}
            </ul>

            <div className="px-4 py-2 w-full flex justify-between items-center">
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-mono tracking-tight">
                ~{successfullFiles.length} files read.
              </p>
              <button
                onClick={() => handleGenerate(fileContent)}
                className="bg-primary select-none flex justify-center items-center gap-2 px-4 py-1 outline-none rounded-lg cursor-pointer text-text-light hover:bg-primary-hover transition-colors duration-200"
              >
                <WandSparkles strokeWidth={1.25} />
                <span className="text-lg font-semibold tracking-normal max-sm:hidden">
                  Generate
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileAnaSection;
