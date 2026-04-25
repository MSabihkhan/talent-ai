import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';

interface Conversation {
  id: number;
  company: string;
  role: string;
  time: string;
  preview: string;
  unread: boolean;
  initials: string;
  color: string;
}

const conversations: Conversation[] = [
  {
    id: 1,
    company: 'TechCorp',
    role: 'Senior Frontend Developer',
    time: '39 min ago',
    preview: "Thank you for your application! We'd like to\u2026",
    unread: true,
    initials: 'TC',
    color: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
  },
  {
    id: 2,
    company: 'Design Studio',
    role: 'Product Designer',
    time: '1d ago',
    preview: "Thank you for your application. We\u2019re reviewing\u2026",
    unread: false,
    initials: 'DS',
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    id: 3,
    company: 'StartupXYZ',
    role: 'Full Stack Engineer',
    time: '3d ago',
    preview: 'We really appreciate your interest in our position…',
    unread: false,
    initials: 'SX',
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    id: 4,
    company: 'DataCore',
    role: 'Backend Developer',
    time: '1w ago',
    preview: 'We appreciate your interest in the position…',
    unread: false,
    initials: 'DC',
    color: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
  },
];

const messageBody = `Hi Ali,

Thank you for applying to the Senior Frontend Developer position at TechCorp. We're impressed with your background and would love to move forward with an interview.

Please see the available time slots below and let us know what works best for you.

Looking forward to speaking with you.

Best regards,
TechCorp Recruiting Team`;

export default function Messages() {
  const [selected, setSelected] = useState<number>(1);
  const active = conversations.find(c => c.id === selected)!;

  return (
    <DashboardLayout>
      <div className="flex h-full" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* ── Conversation list ── */}
        <div
          className="w-72 flex-shrink-0 flex flex-col"
          style={{ borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}
        >
          {/* Header */}
          <div className="p-6 pb-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4 transition-opacity hover:opacity-80"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Messages
              </h1>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: 'var(--gradient-radial-subtle)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--border-accent)',
                }}
              >
                Unread 1
              </span>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => {
              const isSelected = selected === conv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv.id)}
                  className="w-full text-left px-4 py-4 transition-colors duration-150"
                  style={{
                    background: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                      style={{ background: conv.color }}
                    >
                      {conv.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {conv.company}
                        </p>
                        <span className="text-xs shrink-0 ml-2" style={{ color: 'var(--text-muted)' }}>
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                        {conv.role}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: conv.unread ? 'var(--text-secondary)' : 'var(--text-muted)' }}
                      >
                        {conv.preview}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Conversation detail ── */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div
            className="px-8 py-5 shrink-0"
            style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}
          >
            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {active.company}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {active.role}
            </p>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            {/* Interview proposal banner */}
            {active.id === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: 'white',
                }}
              >
                You've received an interview proposal. This recruiter has sent you available interview slots.
              </motion.div>
            )}

            {/* Message bubble */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="max-w-2xl p-6 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {messageBody}
            </motion.div>
          </div>

          {/* Reply bar */}
          <div
            className="px-8 py-4 shrink-0"
            style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
