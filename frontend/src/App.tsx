import Header from "./components/Header"
import ThemeProvider from "./context/ThemeProvider"
import Main from "./pages/Main"

function App() {
  return (
    <ThemeProvider>
      <div className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <Header/>
      <Main/>
    </div>
    </ThemeProvider>
  )
}

export default App