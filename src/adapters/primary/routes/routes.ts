import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobDiscovery from "./pages/JobDiscovery";
import Applications from "./pages/Applications";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/jobs",
    Component: JobDiscovery,
  },
  {
    path: "/applications",
    Component: Applications,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);