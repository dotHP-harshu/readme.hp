import { useState } from "react"
import GeneratingReadme from "../components/Main/GeneratingReadme"
import MainHero from "../components/MainHero"
import { getReadmeApi } from "../api/serverApi";

function MainPage() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  
   const handleGenerate = async (content: string) => {
    setIsGenerating(true);
      const { data, error } = await getReadmeApi(content);
      if(error){
        console.log(error)
      }
      if(data){
        console.log(data)
      }

      setIsGenerating(false);
    };
  
  return (
    <div>
      <MainHero handleGenerate={handleGenerate}/>
      {isGenerating && <GeneratingReadme />}
    </div>
  );
}

export default MainPage