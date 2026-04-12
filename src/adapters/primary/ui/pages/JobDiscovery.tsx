import { motion } from 'motion/react';
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { ThemeToggle } from '@/adapters/primary/ui/components/ThemeToggle';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    logo: '💻',
    location: 'Remote',
    type: 'Full-Time',
    experience: 'Senior',
    match: 92,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    salary: '$120k - $180k',
    posted: '2 days ago',
    isNew: true,
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Design Studio',
    logo: '🎨',
    location: 'New York, NY',
    type: 'Full-Time',
    experience: 'Mid',
    match: 88,
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    salary: '$100k - $140k',
    posted: '1 week ago',
    isNew: false,
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    logo: '🚀',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    experience: 'Senior',
    match: 85,
    skills: ['Node.js', 'React', 'MongoDB'],
    salary: '$130k - $170k',
    posted: '3 days ago',
    isNew: true,
  },
  {
    id: 4,
    title: 'UX Researcher',
    company: 'Research Lab',
    logo: '🔬',
    location: 'Remote',
    type: 'Contract',
    experience: 'Mid',
    match: 82,
    skills: ['User Testing', 'Analytics', 'Figma'],
    salary: '$90k - $120k',
    posted: '5 days ago',
    isNew: false,
  },
  {
    id: 5,
    title: 'Backend Developer',
    company: 'DataCore',
    logo: '⚡',
    location: 'Austin, TX',
    type: 'Full-Time',
    experience: 'Mid',
    match: 79,
    skills: ['Python', 'Django', 'PostgreSQL'],
    salary: '$110k - $150k',
    posted: '1 week ago',
    isNew: false,
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    logo: '☁️',
    location: 'Remote',
    type: 'Full-Time',
    experience: 'Senior',
    match: 76,
    skills: ['AWS', 'Docker', 'Kubernetes'],
    salary: '$140k - $190k',
    posted: '4 days ago',
    isNew: false,
  },
];

export default function JobDiscovery() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-8 py-4"
        style={{ 
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link 
            to="/dashboard"
            className="font-bold text-xl" 
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            TalentAI
          </Link>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <Link 
            to="/dashboard"
            className="px-4 py-2 rounded-lg text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 
            className="text-4xl mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Find Your Next Role
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Showing <span style={{ color: 'var(--accent-secondary)' }}>48 jobs</span> matched to your skills
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Jobs' },
              { id: 'remote', label: 'Remote' },
              { id: 'fulltime', label: 'Full-Time' },
              { id: 'contract', label: 'Contract' },
              { id: 'parttime', label: 'Part-Time' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  background: selectedFilter === filter.id ? 'rgba(108, 99, 255, 0.12)' : 'transparent',
                  border: selectedFilter === filter.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  color: selectedFilter === filter.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 active:scale-[0.97]"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </button>
            <select 
              className="px-4 py-2 rounded-lg text-sm focus:outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <option>Best Match</option>
              <option>Newest First</option>
              <option>Highest Salary</option>
            </select>
          </div>
        </motion.div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl transition-all duration-200 cursor-pointer group relative"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* New Badge */}
              {job.isNew && (
                <div 
                  className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(0, 229, 160, 0.12)', color: 'var(--success)' }}
                >
                  New
                </div>
              )}

              {/* Company Logo */}
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg mb-0.5 truncate" style={{ color: 'var(--text-primary)' }}>
                    {job.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(108, 99, 255, 0.12)', color: 'var(--accent-primary)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <div 
                  className="relative w-full h-20 flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {/* Circle Arc Background */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="rgba(0, 212, 255, 0.1)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="var(--accent-secondary)"
                      strokeWidth="6"
                      strokeDasharray={`${job.match * 2.2} ${220 - job.match * 2.2}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dasharray 1s ease-out' }}
                    />
                  </svg>
                  <div className="relative text-center">
                    <div className="text-3xl" style={{ color: 'var(--accent-secondary)' }}>
                      {job.match}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Match
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div 
                className="pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {job.salary}
                </span>
                <button 
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-150 active:scale-[0.97]"
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  View & Apply
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button 
            className="px-8 py-3 rounded-xl transition-all duration-150 active:scale-[0.97]"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
            }}
          >
            Load More Jobs
          </button>
        </motion.div>
      </main>
    </div>
  );
}