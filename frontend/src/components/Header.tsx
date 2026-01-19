import { Moon, Star, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

function Header() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div className="border-b-2 border-b-border-light dark:border-b-border-dark flex justify-between items-center py-4 px-20 max-xs:px-6 fixed top-0 left-0 z-99 w-full bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-3xl">
      <div className="text-xl flex justify-center items-center gap-0.5">
        <span className="font-code">readme</span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full self-baseline-last -translate-y-1/2"></span>
        <span className="font-extrabold font-sans italic">hp</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div
          className="w-fit cursor-pointer hover:text-primary-hover text-primary transition-colors duration-200"
          onClick={toggleTheme}
        >
          {theme == "light" ? <Moon size={20} /> : <Sun size={20} />}
        </div>
        <div className="">
          <a
            href="https://github.com/dothp-harshu/readme.hp"
            target="_blank"
            className="flex justify-center items-center gap-2 border-2 border-border-light dark:border-border-dark px-4 py-1 rounded-lg hover:bg-surface-secondary-hover-light dark:hover:bg-surface-secondary-hover-dark transition-colors duration-300
        "
          >
            <span>
              <Star className="" size={16} />
            </span>
            <span className="text-sm font-semibold">Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
