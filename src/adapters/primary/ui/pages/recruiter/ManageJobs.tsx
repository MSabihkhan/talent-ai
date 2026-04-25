import { useState } from 'react';
import { ArrowLeft, Pencil, Eye, XCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import RecruiterLayout from '../../components/RecruiterLayout';

type Filter = 'All' | 'Active' | 'Closed';

const jobs = [
  { title: 'Senior Frontend Developer', posted: 'Mar 1, 2026',  applicants: 14, status: 'Active'  },
  { title: 'Product Designer',          posted: 'Feb 28, 2026', applicants: 8,  status: 'Active'  },
  { title: 'Full Stack Engineer',       posted: 'Mar 5, 2026',  applicants: 21, status: 'Active'  },
  { title: 'DevOps Engineer',           posted: 'Feb 15, 2026', applicants: 6,  status: 'Active'  },
  { title: 'Backend Developer',         posted: 'Feb 10, 2026', applicants: 12, status: 'Closed'  },
];

export default function ManageJobs() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = jobs.filter(j => filter === 'All' || j.status === filter);

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

        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Your Job Postings
          </h1>
          <Link
            to="/recruiter/post-job"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-green-sm)' }}
          >
            <PlusCircle className="w-4 h-4" />
            Post New Job
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 w-fit rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          {(['All', 'Active', 'Closed'] as Filter[]).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              style={{
                background: filter === tab ? 'var(--bg-tertiary)' : 'transparent',
                color: filter === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-12 px-6 py-4 text-xs font-semibold uppercase tracking-wider"
            style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <div className="col-span-4">Job Title</div>
            <div className="col-span-2">Posted Date</div>
            <div className="col-span-2">Applicants</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          {/* Rows */}
          {filtered.map((job, i) => (
            <div
              key={job.title}
              className="grid grid-cols-12 px-6 py-5 items-center transition-colors hover:opacity-90"
              style={{
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <div className="col-span-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {job.title}
              </div>
              <div className="col-span-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {job.posted}
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                  {job.applicants} Applicants
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: job.status === 'Active' ? 'var(--gradient-radial-subtle)' : 'var(--bg-tertiary)',
                    color: job.status === 'Active' ? 'var(--accent-primary)' : 'var(--text-muted)',
                    border: `1px solid ${job.status === 'Active' ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <span style={{ color: 'var(--border-medium)' }}>·</span>
                <button className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
                  <Eye className="w-3.5 h-3.5" />
                  Pipeline
                </button>
                {job.status === 'Active' && (
                  <>
                    <span style={{ color: 'var(--border-medium)' }}>·</span>
                    <button className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: 'var(--danger)' }}>
                      <XCircle className="w-3.5 h-3.5" />
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </RecruiterLayout>
  );
}
