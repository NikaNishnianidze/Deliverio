import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roles from "./pages/Roles";
import RolesProvider from "./context/RolesProvider";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LandginPage from "./pages/LandingPage";
import Store from "./pages/Store";
import Courier from "./pages/Courier";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandginPage />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/courier",
    element: <Courier />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RolesProvider>
      <RouterProvider router={router} />
    </RolesProvider>
  </StrictMode>
);
