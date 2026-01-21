import { useEffect, useRef, useState } from "react";
import GeneratingReadme from "../components/MainPage/GeneratingReadme";
import MainHero from "../components/MainPage/MainHero";
import { getReadmeApi } from "../api/serverApi";
import ReadmeSection from "../components/MainPage/ReadmeSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AlertCircle, Plus } from "lucide-react";

function MainPage() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [readmeMarkdown, setReadmeMarkdown] = useState<string>("# hello this is readme");
  const markdownSectionRef = useRef<HTMLDivElement>(null);
  const [error , setError ] = useState<string>("")

  const handleGenerate = async (content: string[]) => {
    setIsGenerating(true);
    setError("")
    const { data, error } = await getReadmeApi(content);
    if (error) {
      setError(error)
    }

    if (typeof data === "object") {
      const res = data as { readme: string };
      if (res.readme && typeof res.readme === "string") {
        setReadmeMarkdown(res.readme);
       
      }
    }

    setIsGenerating(false);
  };

  useEffect(()=>{
 if (markdownSectionRef.current && readmeMarkdown) {
          markdownSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
  }, [readmeMarkdown])

  if(error) return <div className="bg-bg-light dark:bg-bg-dark fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center border-2 border-border-light dark:border-border-dark z-99 p-4">
    <div className="bg-surface-primary-light dark:bg-surface-primary-dark rounded-lg w-full min-h-[20vh] max-w-sm relative flex flex-col gap-2 justify-center items-center p-6 border-2 border-border-light dark:border-border-dark">
      <span className="w-fit h-fit rounded-full bg-red-500/20 p-4 border border-red-500/50">
        <AlertCircle className="text-red-500/80 max-xs:w-4 max-xs:4-6 w-6 h-6"/>
      </span>
     <p className="text-center text-red-500/50 text-base leading-none">
       {error}
     </p>
     <button onClick={()=>setError("")} className="select-none cursor-pointer absolute top-4 right-4">
       <span><Plus className="rotate-45 text-primary"/></span>
     </button>
    </div>
  </div>

  return (
    <main className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <Header />
      <MainHero
        handleGenerate={handleGenerate}
        setReadmeMarkdown={setReadmeMarkdown}
      />
      {isGenerating && <GeneratingReadme />}
      {readmeMarkdown && (
        <div ref={markdownSectionRef}>
          <ReadmeSection readmeMarkdown={readmeMarkdown} />
        </div>
      )}
      <Footer />
    </main>
  );
}

export default MainPage;
