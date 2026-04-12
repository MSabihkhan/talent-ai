import { createBrowserRouter } from "react-router";
// Using the '@' alias to point directly to the Primary UI Adapter layer
import Landing from "@/adapters/primary/ui/pages/Landing";
import Login from "@/adapters/primary/ui/pages/Login";
import Register from "@/adapters/primary/ui/pages/Register";
import Dashboard from "@/adapters/primary/ui/pages/Dashboard";
import JobDiscovery from "@/adapters/primary/ui/pages/JobDiscovery";
import Applications from "@/adapters/primary/ui/pages/Applications";
import NotFound from "@/adapters/primary/ui/pages/NotFound";

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
    path: "*", // The "Wildcard" for any undefined URL
    Component: NotFound,
  },
]);