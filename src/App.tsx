import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@components/templates/Layout";

import { ApplicationProvider } from "@shared/store";

import WatchListRouteObject from "./watch-list";

import "@shared/styles/index.scss";

export default function App() {
  const routeList = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <AppLayout />,
        children: [WatchListRouteObject],
        errorElement: (
          <section>
            <h1>404</h1>
            <p>The page you are looking for does not exist.</p>
          </section>
        ),
      },
    ]);
  }, []);

  return (
    <ApplicationProvider>
      <RouterProvider router={routeList} />
    </ApplicationProvider>
  );
}
