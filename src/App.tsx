import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { CurrentBook } from "./pages/CurrentBook";
import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/book/:id",
        element: <CurrentBook />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

