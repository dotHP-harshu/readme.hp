import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

function Header() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div className="bg-surface-primary-light border-b-2 border-b-border-light dark:bg-surface-primary-dark dark:border-b-border-dark flex justify-between items-center py-4 px-20 max-xs:px-6">
      <div className="text-xl flex justify-center items-center gap-0.5">
        <span className="font-code">readme</span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full self-baseline-last -translate-y-1/2"></span>
        <span className="font-extrabold font-sans italic">hp</span>
      </div>
      <div
        className="w-fit cursor-pointer hover:text-primary-hover text-primary transition-colors duration-200"
        onClick={toggleTheme}
      >
        {theme == "light" ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </div>
  );
}

export default Header;
