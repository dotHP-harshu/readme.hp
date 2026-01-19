import { Github } from "lucide-react";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate()
  return (
    <div className="bg-surface-primary-light dark:bg-surface-primary-dark flex justify-between items-center px-20 max-xs:px-6 py-2 border-t-2 border-border-light dark:border-t-border-dark max-sm:flex-col gap-4">
      <div onClick={()=>navigate("/")} className="text-xl flex justify-center items-center gap-0.5 cursor-pointer select-none">
        <span className="font-code">readme</span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full self-baseline-last -translate-y-1/2"></span>
        <span className="font-extrabold font-sans italic">hp</span>
      </div>
      <div>
        <p className="text-center text-text-muted-light dark:text-text-muted-dark text-xs">
          Build with ❤️ by dotHP
        </p>
      </div>
      <div className="flex justify-center items-center">
        <a
          href="https://github.com/dothp-harshu/readme.hp"
          target="_blank"
          className="p-2 rounded-full bg-surface-secondary-light dark:bg-surface-secondary-dark inline-block w-fit h-fit cursor-pointer text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 hover:bg-surface-secondary-hover-light dark:hover:bg-surface-secondary-hover-dark"
        >
          <Github />
        </a>
      </div>
    </div>
  );
}

export default Footer;
