import { useState } from 'react';
import { ArrowLeft, User, Upload } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/adapters/primary/ui/components/base/button';

type Section = 'account' | 'password' | 'notifications' | 'privacy' | 'danger';

const menuItems: { id: Section; label: string; danger?: boolean }[] = [
  { id: 'account',       label: 'Account'             },
  { id: 'password',      label: 'Password & Security' },
  { id: 'notifications', label: 'Notifications'       },
  { id: 'privacy',       label: 'Privacy'             },
  { id: 'danger',        label: 'Danger Zone', danger: true },
];

function InputField({
  label,
  defaultValue,
  type = 'text',
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
        style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--accent-primary)';
          e.target.style.boxShadow  = 'var(--shadow-green-sm)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--border-subtle)';
          e.target.style.boxShadow  = 'none';
        }}
      />
    </div>
  );
}

function AccountPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        Account Information
      </h2>

      {/* Photo */}
      <div>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          Profile Photo
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
          >
            <User className="w-8 h-8 text-white" />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80"
            style={{
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              background: 'var(--bg-tertiary)',
            }}
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
          <button className="text-sm transition-opacity hover:opacity-80" style={{ color: 'var(--danger)' }}>
            Remove
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-5">
        <InputField label="Full Name"  defaultValue="Ali Johnson"           />
        <InputField label="Email"      defaultValue="ali.johnson@example.com" type="email" />
        <InputField label="Phone"      defaultValue="+1 (555) 123-4567"     type="tel"   />
        <InputField label="Location"   defaultValue="San Francisco, CA"     />
      </div>

      <div>
        <Button variant="gradient" size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function PasswordPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        Password &amp; Security
      </h2>
      <div className="space-y-4">
        <InputField label="Current Password" defaultValue="" type="password" />
        <InputField label="New Password"     defaultValue="" type="password" />
        <InputField label="Confirm Password" defaultValue="" type="password" />
      </div>
      <Button variant="gradient" size="lg">Update Password</Button>
    </div>
  );
}

function NotificationsPanel() {
  const prefs = [
    { label: 'Job match alerts',       desc: 'Get notified when new jobs match your profile' },
    { label: 'Application updates',    desc: 'Status changes on your submitted applications'   },
    { label: 'Messages',               desc: 'New messages from recruiters'                   },
    { label: 'Profile views',          desc: 'When a recruiter views your profile'             },
    { label: 'Weekly digest',          desc: 'Weekly summary of activity and new matches'      },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        Notification Preferences
      </h2>
      <div className="space-y-4">
        {prefs.map(p => (
          <div key={p.label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div
                className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{
                  background: 'var(--accent-primary)',
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        Privacy Settings
      </h2>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Control who can see your profile and information.
      </p>
      {[
        { label: 'Public profile',       desc: 'Allow anyone to view your profile'              },
        { label: 'Blind hiring mode',     desc: 'Hide personal details from recruiters initially' },
        { label: 'Show profile to all',   desc: 'Visible in company recruiter searches'           },
      ].map(p => (
        <div key={p.label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.label}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: 'var(--accent-primary)' }} />
          </label>
        </div>
      ))}
    </div>
  );
}

function DangerPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--danger)' }}>
        Danger Zone
      </h2>
      <div
        className="p-5 rounded-xl space-y-4"
        style={{ border: '1px solid var(--danger)', background: 'rgba(239,68,68,0.05)' }}
      >
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Delete Account
          </p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
            Once deleted, your account and all data will be permanently removed. This cannot be undone.
          </p>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--danger)', color: 'white' }}
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

const panels: Record<Section, React.ReactNode> = {
  account:       <AccountPanel />,
  password:      <PasswordPanel />,
  notifications: <NotificationsPanel />,
  privacy:       <PrivacyPanel />,
  danger:        <DangerPanel />,
};

export default function Settings() {
  const [activeSection, setActiveSection] = useState<Section>('account');

  return (
    <DashboardLayout>
      <div className="p-8">
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

        <h1
          className="text-4xl font-bold mb-8"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Settings
        </h1>

        <div className="grid grid-cols-4 gap-6">
          {/* ── Menu panel ── */}
          <div
            className="col-span-1 p-4 rounded-2xl h-fit"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest px-3 mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Settings
            </p>
            <nav className="space-y-0.5">
              {menuItems.map(item => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-150"
                    style={{
                      background: active ? 'var(--bg-tertiary)' : 'transparent',
                      color: item.danger
                        ? 'var(--danger)'
                        : active
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Content panel ── */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="col-span-3 p-8 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            {panels[activeSection]}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
