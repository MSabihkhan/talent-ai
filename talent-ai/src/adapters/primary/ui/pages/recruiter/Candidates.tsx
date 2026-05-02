import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Mail, Phone, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import RecruiterLayout from '../../components/RecruiterLayout';

type StatusFilter = 'All' | 'Active' | 'Interviewing' | 'Hired';

interface Candidate {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Interviewing' | 'Hired';
  location: string;
  experience: string;
  email: string;
  phone: string;
  skills: string[];
  match: number;
  initials: string;
}

const candidates: Candidate[] = [
  {
    id: 1, name: 'Sarah Johnson', role: 'Senior Frontend Developer',
    status: 'Active', location: 'San Francisco, CA', experience: '5 years',
    email: 'sarah@example.com', phone: '+1 (555) 123-4567',
    skills: ['React', 'TypeScript', 'Tailwind'], match: 93, initials: 'SJ',
  },
  {
    id: 2, name: 'Michael Chen', role: 'Product Designer',
    status: 'Interviewing', location: 'New York, NY', experience: '4 years',
    email: 'michael@example.com', phone: '+1 (555) 234-5678',
    skills: ['Figma', 'UI/UX', 'Prototyping'], match: 87, initials: 'MC',
  },
  {
    id: 3, name: 'Emily Rodriguez', role: 'Full Stack Engineer',
    status: 'Active', location: 'Austin, TX', experience: '3 years',
    email: 'emily@example.com', phone: '+1 (555) 345-6789',
    skills: ['Node.js', 'React', 'MongoDB'], match: 82, initials: 'ER',
  },
  {
    id: 4, name: 'David Kim', role: 'DevOps Engineer',
    status: 'Active', location: 'Seattle, WA', experience: '6 years',
    email: 'david@example.com', phone: '+1 (555) 456-7890',
    skills: ['AWS', 'Docker', 'Kubernetes'], match: 78, initials: 'DK',
  },
  {
    id: 5, name: 'Jessica Park', role: 'Backend Developer',
    status: 'Hired', location: 'Remote', experience: '7 years',
    email: 'jessica@example.com', phone: '+1 (555) 567-8901',
    skills: ['Python', 'FastAPI', 'PostgreSQL'], match: 95, initials: 'JP',
  },
  {
    id: 6, name: 'Marcus Wilson', role: 'Mobile Developer',
    status: 'Interviewing', location: 'Chicago, IL', experience: '4 years',
    email: 'marcus@example.com', phone: '+1 (555) 678-9012',
    skills: ['React Native', 'iOS', 'Android'], match: 80, initials: 'MW',
  },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active:       { bg: 'var(--gradient-radial-subtle)', text: 'var(--accent-primary)',   border: 'var(--border-accent)' },
  Interviewing: { bg: 'rgba(99,102,241,0.1)',           text: '#818cf8',                 border: 'rgba(99,102,241,0.3)' },
  Hired:        { bg: 'rgba(245,158,11,0.1)',           text: 'var(--warning)',           border: 'rgba(245,158,11,0.3)' },
};

export default function Candidates() {
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [search, setSearch] = useState('');

  const filtered = candidates.filter(c => {
    const matchesFilter = filter === 'All' || c.status === filter;
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Candidates
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Browse and manage candidate profiles</p>
        </div>

        {/* Search + Filters row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search candidates by name, role, or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            {(['All', 'Active', 'Interviewing', 'Hired'] as StatusFilter[]).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  background: filter === tab ? 'var(--bg-tertiary)' : 'transparent',
                  color: filter === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate grid */}
        <div className="grid grid-cols-2 gap-5">
          {filtered.map((c, i) => {
            const sc = statusColors[c.status];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="p-6 rounded-2xl"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                    >
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.role}</p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0"
                    style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {c.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {c.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {c.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {c.phone}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: 'var(--gradient-radial-subtle)', color: 'var(--accent-primary)', border: '1px solid var(--border-accent)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Match bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-muted)' }}>Match Score</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>{c.match}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.match}%`, background: 'var(--gradient-primary)' }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--gradient-primary)', color: 'white' }}
                  >
                    View Profile
                  </button>
                  <button
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </RecruiterLayout>
  );
}
