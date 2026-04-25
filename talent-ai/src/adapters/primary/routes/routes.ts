import { createBrowserRouter } from "react-router";
// Public
import Landing             from "@/adapters/primary/ui/pages/Landing";
import Login               from "@/adapters/primary/ui/pages/Login";
import Register            from "@/adapters/primary/ui/pages/Register";
import NotFound            from "@/adapters/primary/ui/pages/NotFound";
// Candidate
import Dashboard           from "@/adapters/primary/ui/pages/Dashboard";
import JobDiscovery        from "@/adapters/primary/ui/pages/JobDiscovery";
import Applications        from "@/adapters/primary/ui/pages/Applications";
import Profile             from "@/adapters/primary/ui/pages/Profile";
import MyCV                from "@/adapters/primary/ui/pages/MyCV";
import Messages            from "@/adapters/primary/ui/pages/Messages";
import Notifications       from "@/adapters/primary/ui/pages/Notifications";
import Settings            from "@/adapters/primary/ui/pages/Settings";
// Recruiter
import RecruiterDashboard  from "@/adapters/primary/ui/pages/recruiter/RecruiterDashboard";
import PostJob             from "@/adapters/primary/ui/pages/recruiter/PostJob";
import ManageJobs          from "@/adapters/primary/ui/pages/recruiter/ManageJobs";
import Candidates          from "@/adapters/primary/ui/pages/recruiter/Candidates";
import RecruiterAnalytics  from "@/adapters/primary/ui/pages/recruiter/RecruiterAnalytics";
import RecruiterSettings   from "@/adapters/primary/ui/pages/recruiter/RecruiterSettings";

export const router = createBrowserRouter([
  // ── Public ──────────────────────────────────────────────────
  { path: "/",              Component: Landing            },
  { path: "/login",         Component: Login              },
  { path: "/register",      Component: Register           },

  // ── Candidate ───────────────────────────────────────────────
  { path: "/dashboard",     Component: Dashboard          },
  { path: "/profile",       Component: Profile            },
  { path: "/cv",            Component: MyCV               },
  { path: "/jobs",          Component: JobDiscovery       },
  { path: "/applications",  Component: Applications       },
  { path: "/messages",      Component: Messages           },
  { path: "/notifications", Component: Notifications      },
  { path: "/settings",      Component: Settings           },

  // ── Recruiter ───────────────────────────────────────────────
  { path: "/recruiter/dashboard",    Component: RecruiterDashboard  },
  { path: "/recruiter/post-job",     Component: PostJob             },
  { path: "/recruiter/manage-jobs",  Component: ManageJobs          },
  { path: "/recruiter/candidates",   Component: Candidates          },
  { path: "/recruiter/analytics",    Component: RecruiterAnalytics  },
  { path: "/recruiter/settings",     Component: RecruiterSettings   },

  // ── Fallback ────────────────────────────────────────────────
  { path: "*", Component: NotFound },
]);
