import Header from "./components/Header"
import ThemeProvider from "./context/ThemeProvider"
import HomePage from "./pages/HomePage"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <ThemeProvider>
      <div className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <Header/>
      <HomePage/>
    </div>
    </ThemeProvider>
  )
}

export default App