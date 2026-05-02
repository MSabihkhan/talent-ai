import { useState } from 'react';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import RecruiterLayout from '../../components/RecruiterLayout';
import { Button } from '@/adapters/primary/ui/components/base/button';

type JobType = 'Full-Time' | 'Part-Time' | 'Contract';
type ExpLevel = 'Junior' | 'Mid' | 'Senior';

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="flex rounded-xl overflow-hidden"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
    >
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="flex-1 py-3 text-sm font-medium transition-all duration-200"
          style={{
            background: value === opt ? 'var(--gradient-primary)' : 'transparent',
            color: value === opt ? 'white' : 'var(--text-secondary)',
            borderRadius: '0.75rem',
            margin: '3px',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function PostJob() {
  const [title, setTitle]       = useState('Senior Frontend Developer');
  const [location, setLocation] = useState('');
  const [remote, setRemote]     = useState(true);
  const [jobType, setJobType]   = useState<JobType>('Full-Time');
  const [expLevel, setExpLevel] = useState<ExpLevel>('Mid');
  const [salaryMin, setSalaryMin] = useState('120000');
  const [salaryMax, setSalaryMax] = useState('180000');
  const [skills]                = useState(['React', 'TypeScript', 'Node.js']);

  const fmtSalary = (v: string) => {
    const n = parseInt(v.replace(/\D/g, '') || '0', 10);
    return `$${n.toLocaleString()}`;
  };

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

        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Post a New Job
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-2 p-8 rounded-2xl space-y-6"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            {/* Job Title */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Job Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Location + Remote */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Location</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={remote}
                    onChange={e => setRemote(e.target.checked)}
                    className="w-4 h-4 rounded accent-green-500"
                  />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Remote</span>
                </label>
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Job Type</label>
              <PillGroup options={['Full-Time', 'Part-Time', 'Contract'] as JobType[]} value={jobType} onChange={setJobType} />
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Experience Level</label>
              <PillGroup options={['Junior', 'Mid', 'Senior'] as ExpLevel[]} value={expLevel} onChange={setExpLevel} />
            </div>

            {/* Salary Range */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Salary Range</label>
              <div className="grid grid-cols-2 gap-4 mb-1">
                <input
                  type="number"
                  value={salaryMin}
                  onChange={e => setSalaryMin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
                <input
                  type="number"
                  value={salaryMax}
                  onChange={e => setSalaryMax(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {fmtSalary(salaryMin)} – {fmtSalary(salaryMax)}
              </p>
            </div>

            {/* Job Description */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Job Description</label>
              <textarea
                rows={5}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>Required Skills</label>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}
                  >
                    {skill}
                  </span>
                ))}
                <button
                  type="button"
                  className="px-3 py-1 rounded-full text-xs transition-opacity hover:opacity-80"
                  style={{ border: '1px dashed var(--border-accent)', color: 'var(--text-muted)' }}
                >
                  + Add skill
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <Button variant="gradient" size="lg">Publish Job</Button>
              <Button variant="outline" size="lg">Save Draft</Button>
            </div>
          </motion.div>

          {/* ── Live Preview ── */}
          <div>
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>Live Preview</p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-5 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {title || 'Job Title'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your Company</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {fmtSalary(salaryMin)} – {fmtSalary(salaryMax)}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                >
                  {jobType}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
