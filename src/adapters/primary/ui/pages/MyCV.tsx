import { useState } from 'react';
import { ArrowLeft, Upload, FileText, Trash2, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/adapters/primary/ui/components/base/button';

const RADIUS = 48;
const STROKE = 8;
const NORM_RADIUS = RADIUS - STROKE;
const CIRCUMFERENCE = NORM_RADIUS * 2 * Math.PI;

function ScoreGauge({ score }: { score: number }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <div className="relative inline-flex items-center justify-center my-4">
      <svg height={RADIUS * 2} width={RADIUS * 2} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-dark)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
        <circle
          fill="transparent"
          stroke="var(--border-subtle)"
          strokeWidth={STROKE}
          r={NORM_RADIUS}
          cx={RADIUS}
          cy={RADIUS}
        />
        <circle
          fill="transparent"
          stroke="url(#gaugeGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          r={NORM_RADIUS}
          cx={RADIUS}
          cy={RADIUS}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <p
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          {score}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          /100
        </p>
      </div>
    </div>
  );
}

const extractedSkills = ['React', 'TypeScript', 'Node.js', 'Figma', 'MongoDB', 'Problem Solving'];

export default function MyCV() {
  const [dragging, setDragging] = useState(false);
  const [uploaded] = useState(true);

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

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            CV Upload &amp; AI Analysis
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Upload your resume and get instant AI-powered feedback
          </p>
        </motion.div>

        {/* Two-column body */}
        <div className="grid grid-cols-2 gap-6">
          {/* ── Left: upload + file + skills ── */}
          <div className="space-y-5">
            {/* Drop zone */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); }}
              className="rounded-2xl p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
              style={{
                border: `2px dashed ${dragging ? 'var(--accent-primary)' : 'var(--border-accent)'}`,
                background: dragging ? 'var(--gradient-radial-subtle)' : 'var(--bg-secondary)',
                minHeight: '220px',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--gradient-radial-subtle)', border: '2px solid var(--border-accent)' }}
              >
                <Upload className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <p className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Drag &amp; drop your CV here
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>or</p>
              <button
                className="text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: 'var(--accent-primary)' }}
              >
                Browse Files
              </button>
            </motion.div>

            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              PDF, DOC, DOCX — Max 5MB
            </p>

            {/* Uploaded file */}
            {uploaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--gradient-radial-subtle)', border: '1px solid var(--border-accent)' }}
                >
                  <FileText className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      Resume_AliJohnson.pdf
                    </p>
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>345 KB</p>
                </div>
                <button className="p-1.5 rounded-lg transition-opacity hover:opacity-80">
                  <Trash2 className="w-4 h-4" style={{ color: 'var(--danger)' }} />
                </button>
              </motion.div>
            )}

            {/* Extracted Skills */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Extracted Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map(skill => (
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
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Button variant="outline" size="lg">
                Analyze Another CV
              </Button>
              <Button asChild variant="gradient" size="lg">
                <Link to="/jobs">View Matched Jobs</Link>
              </Button>
            </div>
          </div>

          {/* ── Right: AI feedback + score ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-2xl flex flex-col gap-5"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-accent)',
              boxShadow: 'var(--shadow-green-sm)',
            }}
          >
            {/* Heading */}
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                AI Resume Feedback
              </h2>
            </div>

            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
                  Strengths
                </p>
              </div>
              <ul className="space-y-1.5 pl-6">
                {[
                  'Strong technical skills in modern web development frameworks',
                  'Clear and well-structured work experience section',
                ].map(item => (
                  <li key={item} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--warning)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--warning)' }}>
                  Areas to Improve
                </p>
              </div>
              <ul className="space-y-1.5 pl-6">
                {[
                  'Consider adding quantifiable achievements and metrics',
                  'Profile summary could be more impactful and concise',
                ].map(item => (
                  <li key={item} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Actions */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4" style={{ color: 'var(--info)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--info)' }}>
                  Recommended Actions
                </p>
              </div>
              <ul className="space-y-1.5 pl-6">
                {[
                  'Add links to GitHub projects and portfolio',
                  'Include certifications or recent training completed',
                ].map(item => (
                  <li key={item} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Score gauge */}
            <div className="flex flex-col items-center pt-2">
              <ScoreGauge score={78} />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Overall CV Score
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
