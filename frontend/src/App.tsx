import { createBrowserRouter, RouterProvider } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const Routes = createBrowserRouter([
    {
      element: <HomePage />,
      path: "/",
    },
    {
      element: <MainPage />,
      path: "/generator",
    },
    {
      element: <ContactPage />,
      path: "/contact",
    },
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={Routes}/>
    </ThemeProvider>
  );
}

export default App;
