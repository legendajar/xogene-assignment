import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrugSearchPage from "./page/DrugSearchPage";

const appRouter = createBrowserRouter([
  {
    path: '/drugs/search',
    element: <DrugSearchPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App