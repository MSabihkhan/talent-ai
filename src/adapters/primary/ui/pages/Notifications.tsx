import { useState } from 'react';
import { ArrowLeft, User, Eye, Briefcase, MessageSquare } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';

type Tab = 'all' | 'jobs' | 'applications' | 'messages';

interface Notification {
  id: number;
  icon: typeof User;
  text: string;
  time: string;
  unread: boolean;
  group: 'today' | 'yesterday';
  type: 'jobs' | 'applications' | 'messages';
  iconColor: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    icon: User,
    text: 'You were shortlisted for Senior Frontend Developer at TechCorp',
    time: '2 hours ago',
    unread: true,
    group: 'today',
    type: 'applications',
    iconColor: 'var(--accent-primary)',
  },
  {
    id: 2,
    icon: Eye,
    text: 'Design Studio viewed your profile',
    time: '5 hours ago',
    unread: true,
    group: 'today',
    type: 'jobs',
    iconColor: 'var(--accent-primary)',
  },
  {
    id: 3,
    icon: Briefcase,
    text: 'New job match: UX Designer at Creative Labs',
    time: '1 day ago',
    unread: false,
    group: 'yesterday',
    type: 'jobs',
    iconColor: 'var(--warning)',
  },
  {
    id: 4,
    icon: MessageSquare,
    text: 'New message from StartupXYZ about Full Stack Engineer position',
    time: '1 day ago',
    unread: false,
    group: 'yesterday',
    type: 'messages',
    iconColor: 'var(--info)',
  },
];

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',          label: 'All'          },
  { id: 'jobs',         label: 'Job Matches'  },
  { id: 'applications', label: 'Applications' },
  { id: 'messages',     label: 'Messages'     },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered = notifications.filter(
    n => activeTab === 'all' || n.type === activeTab,
  );
  const todayItems     = filtered.filter(n => n.group === 'today');
  const yesterdayItems = filtered.filter(n => n.group === 'yesterday');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 transition-opacity hover:opacity-80"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Notifications
          </h1>
          <button
            className="text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            Mark all as read
          </button>
        </div>

        {/* Tab bar */}
        <div
          className="flex gap-0 mb-8"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 pb-3 text-sm font-medium transition-colors duration-150"
                style={{
                  color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
                  borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Notification groups */}
        <div className="space-y-8">
          {todayItems.length > 0 && (
            <section>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Today
              </p>
              <div className="space-y-3">
                {todayItems.map((n, i) => (
                  <NotificationRow key={n.id} n={n} delay={i * 0.05} />
                ))}
              </div>
            </section>
          )}

          {yesterdayItems.length > 0 && (
            <section>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Yesterday
              </p>
              <div className="space-y-3">
                {yesterdayItems.map((n, i) => (
                  <NotificationRow key={n.id} n={n} delay={i * 0.05} />
                ))}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <p className="text-sm text-center py-12" style={{ color: 'var(--text-muted)' }}>
              No notifications here.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function NotificationRow({ n, delay }: { n: Notification; delay: number }) {
  const Icon = n.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors duration-150 cursor-pointer hover:opacity-90"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderLeft: n.unread ? '3px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: 'var(--gradient-radial-subtle)',
          border: '1px solid var(--border-accent)',
        }}
      >
        <Icon className="w-5 h-5" style={{ color: n.iconColor }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {n.text}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {n.time}
        </p>
      </div>

      {/* Unread dot */}
      {n.unread && (
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: 'var(--accent-primary)' }}
        />
      )}
    </motion.div>
  );
}
