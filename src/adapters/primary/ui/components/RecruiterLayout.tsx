import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard, PlusCircle, Briefcase, Users, TrendingUp, Settings, LogOut, Bell, Search, User,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { id: 'dashboard',   icon: LayoutDashboard, label: 'Dashboard',   to: '/recruiter/dashboard'   },
  { id: 'post-job',    icon: PlusCircle,      label: 'Post a Job',  to: '/recruiter/post-job'    },
  { id: 'manage-jobs', icon: Briefcase,       label: 'Manage Jobs', to: '/recruiter/manage-jobs' },
  { id: 'candidates',  icon: Users,           label: 'Candidates',  to: '/recruiter/candidates'  },
  { id: 'analytics',   icon: TrendingUp,      label: 'Analytics',   to: '/recruiter/analytics'   },
  { id: 'settings',    icon: Settings,        label: 'Settings',    to: '/recruiter/settings'    },
] as const;

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const activeId = navItems.find(n => pathname.startsWith(n.to))?.id ?? 'dashboard';

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* ── Sidebar ── */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col min-h-screen sticky top-0"
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-5">
          <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            TalentAI
          </span>
        </div>

        {/* User chip */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>Sarah Johnson</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full inline-block mt-0.5"
                style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}
              >
                Recruiter
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(({ id, icon: Icon, label, to }) => {
            const active = activeId === id;
            return (
              <Link
                key={id}
                to={to}
                className="flex items-center gap-3 py-2.5 rounded-lg transition-colors duration-150 text-sm"
                style={{
                  paddingLeft: active ? 'calc(0.75rem - 3px)' : '0.75rem',
                  paddingRight: '0.75rem',
                  background: active ? 'var(--bg-tertiary)' : 'transparent',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderLeft: active ? '3px solid var(--accent-primary)' : '3px solid transparent',
                }}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            <LogOut className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            Logout
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="h-16 px-8 flex items-center justify-between shrink-0"
          style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                className="w-full pl-10 pr-16 py-2 rounded-lg text-sm focus:outline-none"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <ThemeToggle />
            <button className="relative p-2 rounded-lg hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--danger)' }} />
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto" style={{ background: 'var(--bg-primary)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
