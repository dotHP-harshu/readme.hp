import { useState } from "react";
import GeneratingReadme from "../components/MainPage/GeneratingReadme";
import MainHero from "../components/MainPage/MainHero";
import { getReadmeApi } from "../api/serverApi";
import ReadmeSection from "../components/MainPage/ReadmeSection";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MainPage() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [readmeMarkdown, setReadmeMarkdown] = useState<string>("");

  const handleGenerate = async (content: string[]) => {
    setIsGenerating(true);
    const { data, error } = await getReadmeApi(content);
    if (error) {
      console.log(error);
    }
    if (typeof data === "object") {
      const res = data as { readme: string };
      if (res.readme && typeof res.readme === "string") {
        setReadmeMarkdown(res.readme);
      }
    }

    setIsGenerating(false);
  };

  return (
    <main className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <Header/>
      <MainHero handleGenerate={handleGenerate} setReadmeMarkdown={setReadmeMarkdown} />
      {isGenerating && <GeneratingReadme />}
      {readmeMarkdown && <ReadmeSection readmeMarkdown={readmeMarkdown}/>}
      <Footer/>
    </main>
  );
}

export default MainPage;
