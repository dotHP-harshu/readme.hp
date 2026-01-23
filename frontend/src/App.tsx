import { createBrowserRouter, RouterProvider } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";

const HomePage = lazy(() => import("./pages/HomePage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

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
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={Routes} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
