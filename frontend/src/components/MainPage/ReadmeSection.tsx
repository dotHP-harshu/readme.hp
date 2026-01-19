import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

interface PropsInterface {
  readmeMarkdown: string;
}
function ReadmeSection({ readmeMarkdown }: PropsInterface) {
  const [isShowingPreview, setIsShowingPreview] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyMarkdown = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(readmeMarkdown);
      } else {
        const text = document.createElement("textarea");
        text.value = readmeMarkdown;
        text.style.position = "fixed";
        text.style.zIndex = "-9999";
        document.body.appendChild(text);
        text.focus();
        text.select();
        document.execCommand("copy");
        document.body.removeChild(text);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      return console.log("error on copying..");
    }
  };

  return (
    <section className="readme-section px-6 py-6">
      {/* ----------------------- header start --------------------------------- */}
      <div className="readme-header flex justify-center items-center gap-4 my-10">
        <span className="flex-1 bg-linear-to-l from-text-muted-light dark:from-text-muted-dark to-transparent h-0.5 w-auto"></span>
        <span className="text-center text-lg uppercase text-text-muted-light dark:text-text-dark">
          Workspace
        </span>
        <span className="flex-1 bg-linear-to-r from-text-muted-light dark:from-text-muted-dark to-transparent h-0.5 w-auto"></span>
      </div>
      {/* ----------------------- header start --------------------------------- */}

      {/* --------------------------- buttons end ------------------------ */}
      <div className="w-full border-2 border-border-light dark:border-border-dark rounded-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="px-4 py-2 bg-surface-primary-light dark:bg-surface-primary-dark border-b-2 border-b-border-light dark:border-b-border-dark flex items-center justify-between">
          <div>
            <button
              onClick={() => setIsShowingPreview(false)}
              className={`${isShowingPreview ? "" : "border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"} text-base text-text-muted-light dark:text-text-muted-dark  px-4 py-1 rounded-lg cursor-pointer border-2 border-transparent outline-none`}
            >
              Markdown
            </button>
            <button
              onClick={() => setIsShowingPreview(true)}
              className={`${isShowingPreview ? "border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark" : ""} text-base text-text-muted-light dark:text-text-muted-dark  px-4 py-1 rounded-lg cursor-pointer border-2 border-transparent outline-none`}
            >
              Preview
            </button>
          </div>

          <div>
            <button
              onClick={() => copyMarkdown()}
              className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark cursor-pointer outline-none active:bg-border-light dark:active:bg-border-dark p-2 rounded-full"
            >
              {!isCopied ? <Copy size={20} /> : <CopyCheck size={20} />}
            </button>
          </div>
        </div>
        {/* --------------------------- buttons end ------------------------ */}
        <div className="overflow-y-auto scroller h-[80dvh] max-h-[90dvh] p-2 ">
          {isShowingPreview ? (
            <div className="disable-tailwind p-4">
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
              >
                {readmeMarkdown}
              </Markdown>
            </div>
          ) : (
            <div className="markdown-code p-4">
              <pre className="whitespace-break-spaces">{readmeMarkdown}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReadmeSection;
