import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrugSearchPage from "./page/DrugSearchPage";
import DrugDetailPage from "./page/DrugDetailPage";

const appRouter = createBrowserRouter([
  {
    path: '/drugs/search',
    element: <DrugSearchPage />
  },

  {
    path: '/drugs/:drug_name',
    element: <DrugDetailPage />
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