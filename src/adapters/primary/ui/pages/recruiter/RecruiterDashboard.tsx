import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Briefcase, Users, UserCheck, TrendingUp, ArrowUpRight, PlusCircle,
} from 'lucide-react';
import RecruiterLayout from '../../components/RecruiterLayout';
import { Button } from '@/adapters/primary/ui/components/base/button';

const stats = [
  { value: '8',   label: 'Active Jobs',        icon: Briefcase,  trend: '+2 this month'  },
  { value: '142', label: 'Total Applicants',    icon: Users,      trend: '+24 this week'  },
  { value: '37',  label: 'Shortlisted',         icon: UserCheck,  trend: '8 new'          },
  { value: '84%', label: 'Avg Match Score',     icon: TrendingUp, trend: '+3% this month' },
];

const recentApplications = [
  { id: '#041', role: 'Senior Frontend Developer', time: '2 hours ago', match: 92, isNew: true  },
  { id: '#038', role: 'Product Designer',          time: '5 hours ago', match: 88, isNew: true  },
  { id: '#035', role: 'Full Stack Engineer',       time: '1 day ago',   match: 85, isNew: false },
];

const activeJobs = [
  { title: 'Senior Frontend Developer', applicants: 14, shortlisted: 5, posted: '2 days ago'  },
  { title: 'Product Designer',          applicants: 8,  shortlisted: 2, posted: '1 week ago'  },
  { title: 'Full Stack Engineer',       applicants: 21, shortlisted: 7, posted: '5 days ago'  },
];

export default function RecruiterDashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <RecruiterLayout>
      <div className="p-8">
        {/* Greeting row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Welcome back, Sarah 👋
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{today}</p>
          </div>
          <Button asChild variant="gradient" size="lg" className="shadow-[var(--shadow-glow)]">
            <Link to="/recruiter/post-job" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Post New Job
            </Link>
          </Button>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{s.value}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                </div>
                <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-radial-subtle)', border: '1px solid var(--border-accent)' }}>
                  <s.icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
              </div>
              <p className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                <ArrowUpRight className="w-3 h-3" />
                {s.trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two-column bottom */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Recent Applications
              </h2>
              <Link to="/recruiter/candidates" className="text-sm hover:underline" style={{ color: 'var(--accent-primary)' }}>
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentApplications.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="p-5 rounded-2xl flex items-center justify-between"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Candidate {app.id}
                      </span>
                      {app.isNew && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}>
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{app.role}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Applied {app.time}</p>
                  </div>
                  <div
                    className="px-4 py-1.5 rounded-full text-sm font-semibold shrink-0"
                    style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-secondary)', border: '1px solid var(--border-accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    {app.match}% Match
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active Jobs */}
          <div>
            <h2 className="text-xl font-semibold mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Active Jobs
            </h2>
            <div className="space-y-4">
              {activeJobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="p-5 rounded-2xl"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                >
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{job.title}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>Applicants</span>
                      <span style={{ color: 'var(--text-primary)' }}>{job.applicants}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>Shortlisted</span>
                      <span style={{ color: 'var(--text-primary)' }}>{job.shortlisted}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>Posted</span>
                      <span style={{ color: 'var(--text-muted)' }}>{job.posted}</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}
                  >
                    View Pipeline
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
