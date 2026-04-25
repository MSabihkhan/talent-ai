import { ArrowLeft, Users, Briefcase, FileText, CheckCircle, Clock, User, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import RecruiterLayout from '../../components/RecruiterLayout';

const stats = [
  { value: '1,247', label: 'Total Candidates', icon: Users,       trend: '+12.5%' },
  { value: '23',    label: 'Active Jobs',       icon: Briefcase,   trend: '+3'     },
  { value: '856',   label: 'Applications',      icon: FileText,    trend: '+18.2%' },
  { value: '12',    label: 'Hired This Month',  icon: CheckCircle, trend: '+4'     },
];

const recentActivity = [
  { icon: FileText, title: 'New application received', sub: 'Senior Frontend Developer', time: '2 min ago',   iconColor: 'var(--accent-primary)'  },
  { icon: User,     title: 'Candidate moved to Interview', sub: 'Product Designer',      time: '1 hour ago',  iconColor: 'var(--accent-secondary)' },
  { icon: Globe,    title: 'Job posting published',      sub: 'DevOps Engineer',          time: '3 hours ago', iconColor: 'var(--info)'             },
  { icon: CheckCircle, title: 'Candidate hired',        sub: 'Backend Developer',         time: '1 day ago',   iconColor: 'var(--warning)'          },
];

const topJobs = [
  { title: 'Senior Frontend Developer', applications: 142, views: 1250, hired: 3 },
  { title: 'Product Designer',          applications: 89,  views: 940,  hired: 1 },
  { title: 'Full Stack Engineer',       applications: 201, views: 1780, hired: 5 },
];

export default function RecruiterAnalytics() {
  return (
    <RecruiterLayout>
      <div className="p-8">
        {/* Back */}
        <Link
          to="/recruiter/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 transition-opacity hover:opacity-80"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Analytics
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Track your hiring performance and insights</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl" style={{ background: 'var(--gradient-radial-subtle)', border: '1px solid var(--border-accent)' }}>
                  <s.icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>
                  ↑ {s.trend}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom two columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4" style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--gradient-radial-subtle)', border: '1px solid var(--border-accent)' }}>
                    <item.icon className="w-4 h-4" style={{ color: item.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.sub}</p>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Performing Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="p-6 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-base" style={{ color: 'var(--accent-primary)' }}>↗</span>
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Top Performing Jobs</h2>
            </div>
            <div className="space-y-5">
              {topJobs.map((job, i) => (
                <div key={i} style={{ borderBottom: i < topJobs.length - 1 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: i < topJobs.length - 1 ? '1.25rem' : '0' }}>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{job.title}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Applications</p>
                      <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{job.applications}</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Views</p>
                      <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{job.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Hired</p>
                      <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{job.hired}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
