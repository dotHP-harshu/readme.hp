import { useState } from "react";
import GeneratingReadme from "../components/MainPage/GeneratingReadme";
import MainHero from "../components/MainPage/MainHero";
import { getReadmeApi } from "../api/serverApi";
import ReadmeSection from "../components/MainPage/ReadmeSection";
import Footer from "../components/Footer";

function MainPage() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [readmeMarkdown, setReadmeMarkdown] = useState<string>("");

  const handleGenerate = async (content: string) => {
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
    <div>
      <MainHero handleGenerate={handleGenerate} setReadmeMarkdown={setReadmeMarkdown} />
      {isGenerating && <GeneratingReadme />}
      {readmeMarkdown && <ReadmeSection readmeMarkdown={readmeMarkdown}/>}
      <Footer/>
    </div>
  );
}

export default MainPage;
