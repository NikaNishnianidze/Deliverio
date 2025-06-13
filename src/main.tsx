import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roles from "./pages/Roles";
import RolesProvider from "./context/RolesProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roles />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RolesProvider>
      <RouterProvider router={router} />
    </RolesProvider>
  </StrictMode>
);
