import { useState } from 'react';
import { ArrowLeft, User, Upload } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import RecruiterLayout from '../../components/RecruiterLayout';
import { Button } from '@/adapters/primary/ui/components/base/button';

type Section = 'account' | 'company' | 'password' | 'notifications' | 'billing' | 'danger';

const menuItems: { id: Section; label: string; danger?: boolean }[] = [
  { id: 'account',       label: 'Account'             },
  { id: 'company',       label: 'Company Profile'      },
  { id: 'password',      label: 'Password & Security'  },
  { id: 'notifications', label: 'Notifications'        },
  { id: 'billing',       label: 'Billing'              },
  { id: 'danger',        label: 'Danger Zone', danger: true },
];

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
        onFocus={e => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = 'var(--shadow-green-sm)'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

function AccountPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Account Information</h2>
      <div>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Profile Photo</p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
            <User className="w-8 h-8 text-white" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80" style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', background: 'var(--bg-tertiary)' }}>
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
          <button className="text-sm transition-opacity hover:opacity-80" style={{ color: 'var(--danger)' }}>Remove</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Field label="Full Name"  defaultValue="John Smith"               />
        <Field label="Email"      defaultValue="john.smith@company.com"   type="email" />
        <Field label="Phone"      defaultValue="+1 (555) 987-6543"        type="tel"   />
        <Field label="Job Title"  defaultValue="Senior Recruiter"         />
      </div>
      <Button variant="gradient" size="lg">Save Changes</Button>
    </div>
  );
}

function CompanyPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Company Profile</h2>
      <div className="grid grid-cols-2 gap-5">
        <Field label="Company Name"    defaultValue="TechCorp Inc."           />
        <Field label="Industry"        defaultValue="Technology"              />
        <Field label="Company Size"    defaultValue="100 - 500 employees"     />
        <Field label="Website"         defaultValue="https://techcorp.com"    />
        <div className="col-span-2">
          <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Company Description</label>
          <textarea
            rows={4}
            defaultValue="A leading technology company focused on building innovative products..."
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>
      <Button variant="gradient" size="lg">Save Changes</Button>
    </div>
  );
}

function PasswordPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Password &amp; Security</h2>
      <div className="space-y-4">
        <Field label="Current Password" defaultValue="" type="password" />
        <Field label="New Password"     defaultValue="" type="password" />
        <Field label="Confirm Password" defaultValue="" type="password" />
      </div>
      <Button variant="gradient" size="lg">Update Password</Button>
    </div>
  );
}

function NotificationsPanel() {
  const prefs = [
    { label: 'New application received', desc: 'When a candidate applies to your job'      },
    { label: 'Candidate shortlisted',    desc: 'When AI auto-shortlists a strong match'    },
    { label: 'Interview scheduled',      desc: 'Reminders for upcoming interviews'          },
    { label: 'Weekly report',            desc: 'Summary of hiring activity every Monday'    },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Notification Preferences</h2>
      <div className="space-y-4">
        {prefs.map(p => (
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
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Billing</h2>
      <div className="p-5 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-accent)' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Pro Plan</p>
          <span className="px-3 py-0.5 rounded-full text-xs font-medium" style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}>Active</span>
        </div>
        <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>$99<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/month</span></p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Next billing date: May 1, 2026</p>
      </div>
      <Button variant="outline" size="lg">Manage Subscription</Button>
    </div>
  );
}

function DangerPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold" style={{ color: 'var(--danger)' }}>Danger Zone</h2>
      <div className="p-5 rounded-xl" style={{ border: '1px solid var(--danger)', background: 'rgba(239,68,68,0.05)' }}>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Delete Account</p>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>This will permanently delete your recruiter account, all job postings, and candidate data.</p>
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80" style={{ background: 'var(--danger)', color: 'white' }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

const panels: Record<Section, React.ReactNode> = {
  account:       <AccountPanel />,
  company:       <CompanyPanel />,
  password:      <PasswordPanel />,
  notifications: <NotificationsPanel />,
  billing:       <BillingPanel />,
  danger:        <DangerPanel />,
};

export default function RecruiterSettings() {
  const [active, setActive] = useState<Section>('account');

  return (
    <RecruiterLayout>
      <div className="p-8">
        <Link
          to="/recruiter/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 transition-opacity hover:opacity-80"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Settings</h1>

        <div className="grid grid-cols-4 gap-6">
          {/* Menu */}
          <div className="col-span-1 p-4 rounded-2xl h-fit" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: 'var(--text-muted)' }}>Settings</p>
            <nav className="space-y-0.5">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-150"
                  style={{
                    background: active === item.id ? 'var(--bg-tertiary)' : 'transparent',
                    color: item.danger ? 'var(--danger)' : active === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: active === item.id ? 500 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="col-span-3 p-8 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            {panels[active]}
          </motion.div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
