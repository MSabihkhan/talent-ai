import { ArrowLeft, Pencil, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Link } from 'react-router';
import { Github, Linkedin, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';

const skills = ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Figma', 'Git', 'MongoDB', 'REST APIs'];

const links = [
  { icon: Github,   label: 'github.com/alijohnson'    },
  { icon: Linkedin, label: 'linkedin.com/in/alijohnson' },
  { icon: Globe,    label: 'alijohnson.dev'            },
];

const stats = [
  { label: 'Years Experience',  value: '4+' },
  { label: 'Applications Sent', value: '12' },
  { label: 'Profile Views',     value: '34' },
];

const experience = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechStart Inc.',
    period: '2022 – Present',
    description:
      'Lead frontend development for SaaS platform serving 50k+ users. Built reusable component library and improved performance by 40%.',
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Digital',
    period: '2020 - 2022',
    description:
      'Developed responsive web applications for clients in e-commerce and finance. Collaborated with designers to implement pixel-perfect UIs.',
  },
];

export default function Profile() {
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between mb-8"
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                AJ
              </span>
            </div>
            <div>
              <h1
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Ali Johnson
              </h1>
              <p className="text-base mb-1" style={{ color: 'var(--text-secondary)' }}>
                Frontend Developer
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                San Francisco, CA
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Profile 75% Complete
                </span>
                <div
                  className="w-32 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'var(--border-subtle)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: '75%', background: 'var(--gradient-primary)' }}
                  />
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}
                >
                  75%
                </span>
              </div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80"
            style={{
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              background: 'var(--bg-secondary)',
            }}
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </motion.div>

        {/* Two-column body */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-5">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'var(--gradient-radial-subtle)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-accent)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Links
              </h3>
              <div className="space-y-3">
                {links.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="col-span-2 space-y-5">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                About
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Passionate frontend developer with 4+ years of experience building modern web
                applications. Specialized in React, TypeScript, and creating intuitive user
                experiences. Always eager to learn new technologies and tackle challenging problems.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Experience
                </h3>
              </div>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: 'var(--accent-primary)' }}
                      />
                      {i < experience.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1.5"
                          style={{ background: 'var(--border-subtle)', minHeight: '24px' }}
                        />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {exp.title}
                      </p>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {exp.company}
                      </p>
                      <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                        {exp.period}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Education
                </h3>
              </div>
              <div className="flex gap-4">
                <div
                  className="w-3 h-3 rounded-full shrink-0 mt-1"
                  style={{ background: 'var(--accent-primary)' }}
                />
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    B.S. Computer Science
                  </p>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                    University of California
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    2016 - 2020
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Certifications
                </h3>
              </div>
              <ul className="space-y-2.5">
                {['AWS Certified Developer - Associate', 'React Advanced Certification'].map(cert => (
                  <li
                    key={cert}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--accent-primary)' }}
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
