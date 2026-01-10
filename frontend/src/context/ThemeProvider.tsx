import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeType } from "../types/types";

interface ThemeContextInterface {
  theme: ThemeType;
  toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextInterface | null>(null);

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>((): ThemeType => {
    return localStorage.getItem("readme-dot-hp-theme") === "light"
      ? "light"
      : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    theme === "light"
      ? (document.documentElement.className = "")
      : (document.documentElement.classList = "dark")
    localStorage.setItem("readme-dot-hp-theme", theme);
  },[theme]);

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const ctx = useContext(themeContext);
  if (!ctx) throw new Error("Theme context is null.");
  return ctx;
};
