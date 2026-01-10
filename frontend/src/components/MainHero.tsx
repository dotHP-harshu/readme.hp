import {
  AlertCircle,
  AlertTriangle,
  CircleCheckBig,
  FolderClosed,
  Link2,
  Loader2,
  MoveRight,
  WandSparkles,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import { makeImpFileArray, shuffleArray } from "../utils/MainHeroUtil";
import { getRepoTreeApi } from "../api/githubApi";
import type { fileTreeElement } from "../types/types";
import RepoFileItem from "./RepoFileSelection/RepoFileItem";

const PATH_COLORS = [
  "#FF9F1C", // mango
  "#FF6B6B", // watermelon
  "#6A4C93", // grape
  "#4ECDC4", // minty teal
  "#C06C84", // berry
  "#F7B801", // pineapple
  "#9BC53D", // kiwi
  "#5BC0EB", // blue raspberry
  "#E55934", // blood orange
  "#7768AE", // blueberry
];

// get files
// https://api.github.com/repos/[USER]/[REPO]/git/trees/[BRANCH]?recursive=1

function MainHero() {
  const pathColors = useMemo(() => {
    return shuffleArray(PATH_COLORS);
  }, []);

  const [impRepoFiles, setImpRepoFiles] = useState<fileTreeElement[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [repoError, setrepoError] = useState<string>("");
  const [urlError, seturlError] = useState("");

  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  const getRepoTree = useCallback(async () => {
    setrepoError("");
    setIsLoadingFiles(true);
    const { data, error } = await getRepoTreeApi("");

    if (error) {
      setIsLoadingFiles(false);
      return setrepoError(error);
    }

    if (data && Array.isArray(data)) {
      const impFiles = makeImpFileArray(data);
      setImpRepoFiles(impFiles);
      setSelectedPaths(new Set(impFiles.map((f) => f.path)));
    }
    setIsLoadingFiles(false);
    setrepoError("");
  }, []);

  const toggleFile = useCallback((path: string) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  }, []);

  const selectedFiles = useMemo(() => {
    return impRepoFiles.filter((f) => selectedPaths.has(f.path));
  }, [selectedPaths, impRepoFiles]);

  const totalSizeOfSelectedFiles = useMemo(() => {
    return selectedFiles.reduce((sum, f) => sum + (f.size ?? 0), 0);
  }, [selectedFiles]);

  useEffect(() => {
    getRepoTree();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-[70dvh] space-y-6 px-6 ">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(31, 177, 249, 0.15) 0%, rgba(12, 12, 13, 0) 70%)",
          }}
        ></div>
        <h2 className="md:text-5xl text-4xl max-xs:text-3xl font-semibold tracking-tight leading-tight text-center max-w-2xl w-full">
          Generate professional documentation from your code.
        </h2>

        <p className="md:text-xl text-lg font-light tracking-tight text-text-muted-light dark:text-text-muted-dark max-w-2xl w-full text-center">
          Paste a GitHub repository URL, select your context, and let our AI
          document your codebase in seconds.
        </p>

        <form className=" max-w-2xl w-full space-y-2">
          <div className="bg-surface-primary-light dark:bg-surface-primary-dark flex items-stretch gap-4 w-full px-4 py-3 max-xs:px-2 max-xs:py-1.5 border-2 border-border-light dark:border-border-dark rounded-lg overflow-hidden focus-within:border-primary-hover shadow-sm focus-within:shadow-primary transition-all duration-200">
            <div className="flex justify-center items-center ">
              <Link2 className="text-text-muted-light dark:text-text-muted-dark" />
            </div>
            <input
              type="text"
              className="flex-1 w-full outline-none bg-transparent px-2 font-code placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark text-base"
              placeholder="https://github.com/username/project"
            />
            <button className="bg-primary flex justify-center items-center gap-2 px-4 py-1 rounded-lg cursor-pointer text-text-light hover:bg-primary-hover transition-colors duration-200">
              <WandSparkles strokeWidth={1.25} />{" "}
              <span className="text-lg font-semibold tracking-normal max-sm:hidden">
                Generate
              </span>
            </button>
          </div>
          <div>
            <p className="text-sm max-xs:text-xs font-light text-text-muted-light dark:text-text-muted-dark flex justify-center items-center w-fit gap-2">
              <CircleCheckBig className="" strokeWidth={1} size={16} />{" "}
              <span>Public Repos Only</span>
            </p>
          </div>
        </form>
      </div>
      {/* Repository file selection starts  */}
      <div className="flex justify-center items-center mt-10 relative z-10">
        <div className="overflow-hidden border-2 border-border-light dark:border-border-dark max-w-3xl w-full rounded-lg">
          <div className="bg-surface-primary-light dark:bg-surface-primary-dark border-b-2 border-b-border-light dark:border-b-border-dark px-4 py-3 flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <FolderClosed className="text-text-muted-light dark:text-text-muted-dark" />
              <span className="font-semibold">Repository Context</span>
            </div>
            <div>
              <small className="font-code text-text-muted-light dark:text-text-muted-dark">
                github.com/username/project
              </small>
            </div>
          </div>

          {/* Files Selection  */}
          <div className="bg-surface-secondary-light dark:bg-surface-secondary-dark border-b-2 border-b-border-light dark:border-b-border-dark px-4 py-3 ">
            <div className="flex items-center justify-between gap-2 relative px-4 rounded-lg  ">
              <p className="truncate cursor-pointer peer">Folder/file</p>
              <small className="inline-block font-code text-text-muted-light dark:text-text-muted-dark text-center w-20 overflow-hidden">
                size
              </small>
            </div>
            <ul className="overflow-y-auto scroller max-h-[40dvh]">
              {isLoadingFiles && (
                <div className="flex flex-col gap-4 justify-center items-center w-full min-h-[20vh]">
                  <Loader2 className="text-text-muted-light dark:text-text-muted-dark animate-spin" />
                </div>
              )}

              {!isLoadingFiles && repoError && (
                <div className="flex flex-col gap-4 justify-center items-center w-full min-h-[20vh]">
                  <AlertTriangle className="text-red-500" />
                  <p className="text-red-500 max-w-xl text-center">
                    {repoError}
                  </p>
                </div>
              )}

              {!isLoadingFiles && !repoError && impRepoFiles.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center w-full min-h-[20vh]">
                  <AlertCircle className="text-text-muted-light dark:text-text-muted-dark" />
                  <p className="text-text-muted-light dark:text-text-muted-dark max-w-xl text-center ">
                    Please search for repository.
                  </p>
                </div>
              )}

              {impRepoFiles &&
                impRepoFiles.length > 0 &&
                impRepoFiles.map((file) => (
                  <RepoFileItem
                    key={file.path}
                    file={file}
                    toggleFile={toggleFile}
                    pathColors={pathColors}
                    isChecked={selectedPaths.has(file.path)}
                  />
                ))}
            </ul>
          </div>

          <div className="bg-surface-primary-light dark:bg-surface-primary-dark border-b-2 border-b-border-light dark:border-b-border-dark px-4 py-3 flex items-center justify-between">
            <div>
              <small className="font-code text-text-muted-light dark:text-text-muted-dark">
                {`~ ${
                  totalSizeOfSelectedFiles / 1024 < 1024
                    ? `${(totalSizeOfSelectedFiles / 1024).toFixed(2)} Kb`
                    : `${(totalSizeOfSelectedFiles / (1024 * 1024)).toFixed(
                        2
                      )} Mb`
                } selected `}
              </small>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button className="flex justify-center items-center gap-2 px-4 py-1.5 bg-surface-secondary-light dark:bg-surface-secondary-dark border-2 border-border-light dark:border-border-dark rounded-lg outline-none cursor-pointer select-none">
                <span className="text-base font-semibold tracking-tight">
                  Analyze Selected Files
                </span>
                <MoveRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Repository file selection ends */}
    </>
  );
}

export default MainHero;
