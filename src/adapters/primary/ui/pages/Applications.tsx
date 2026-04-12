import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useState } from 'react';
import { Briefcase, Calendar, MapPin, Eye, LayoutGrid, List } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeToggle } from '@/adapters/primary/ui/components/ThemeToggle';

const initialApplications = {
  applied: [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      logo: '💻',
      date: 'Mar 5, 2026',
      location: 'Remote',
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Design Studio',
      logo: '🎨',
      date: 'Mar 3, 2026',
      location: 'New York, NY',
    },
  ],
  reviewing: [
    {
      id: 3,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      logo: '🚀',
      date: 'Feb 28, 2026',
      location: 'San Francisco, CA',
    },
  ],
  shortlisted: [
    {
      id: 4,
      title: 'UX Researcher',
      company: 'Research Lab',
      logo: '🔬',
      date: 'Feb 25, 2026',
      location: 'Remote',
    },
  ],
  rejected: [
    {
      id: 5,
      title: 'Backend Developer',
      company: 'DataCore',
      logo: '⚡',
      date: 'Feb 20, 2026',
      location: 'Austin, TX',
    },
  ],
};

const columns = [
  { id: 'applied', title: 'Applied', count: 2, color: 'var(--accent-primary)' },
  { id: 'reviewing', title: 'Under Review', count: 1, color: 'var(--warning)' },
  { id: 'shortlisted', title: 'Shortlisted', count: 1, color: 'var(--success)' },
  { id: 'rejected', title: 'Rejected', count: 1, color: 'var(--danger)' },
];

interface Application {
  id: number;
  title: string;
  company: string;
  logo: string;
  date: string;
  location: string;
}

interface ApplicationCardProps {
  application: Application;
  columnId: string;
}

const ApplicationCard = ({ application, columnId }: ApplicationCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'application',
    item: { ...application, fromColumn: columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 1.03 : 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl cursor-move group"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        boxShadow: isDragging ? 'var(--shadow-modal)' : 'var(--shadow-card)',
        transform: isDragging ? 'rotate(1.5deg)' : 'rotate(0deg)',
        transition: 'transform 200ms, box-shadow 200ms',
        opacity: columnId === 'rejected' ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: 'var(--bg-secondary)' }}
        >
          {application.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm mb-0.5 truncate" style={{ color: 'var(--text-primary)' }}>
            {application.title}
          </h4>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {application.company}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {application.date}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
        <MapPin className="w-3 h-3" />
        {application.location}
      </div>

      <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <button 
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
          style={{ color: 'var(--accent-primary)' }}
        >
          <Eye className="w-3 h-3" />
          View Details
        </button>
      </div>
    </motion.div>
  );
};

interface ColumnProps {
  column: typeof columns[0];
  applications: Application[];
  onDrop: (item: any, columnId: string) => void;
}

const Column = ({ column, applications, onDrop }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'application',
    drop: (item) => onDrop(item, column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="flex-1 min-w-[280px]"
      style={{
        background: isOver ? 'rgba(108, 99, 255, 0.05)' : 'transparent',
        transition: 'background 200ms',
      }}
    >
      <div className="mb-4">
        <div 
          className="h-1 rounded-full mb-3"
          style={{ background: column.color }}
        />
        <div className="flex items-center justify-between">
          <h3 className="text-sm" style={{ color: 'var(--text-primary)' }}>
            {column.title}
          </h3>
          <span 
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)' }}
          >
            {applications.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} columnId={column.id} />
        ))}
        {applications.length === 0 && (
          <div 
            className="p-8 rounded-xl text-center text-sm"
            style={{ 
              border: '2px dashed var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            Drop applications here
          </div>
        )}
      </div>
    </div>
  );
};

export default function Applications() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [applications, setApplications] = useState(initialApplications);

  const handleDrop = (item: any, toColumn: string) => {
    const fromColumn = item.fromColumn;
    if (fromColumn === toColumn) return;

    setApplications((prev) => {
      const newState = { ...prev };
      const appIndex = newState[fromColumn as keyof typeof prev].findIndex(
        (app: Application) => app.id === item.id
      );
      
      if (appIndex !== -1) {
        const [movedApp] = newState[fromColumn as keyof typeof prev].splice(appIndex, 1);
        newState[toColumn as keyof typeof prev].push(movedApp as any);
      }
      
      return newState;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link 
              to="/dashboard"
              className="font-bold text-xl" 
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              TalentAI
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <button
                  onClick={() => setView('kanban')}
                  className="px-3 py-1.5 rounded-md text-sm transition-all duration-150"
                  style={{
                    background: view === 'kanban' ? 'var(--accent-primary)' : 'transparent',
                    color: view === 'kanban' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className="px-3 py-1.5 rounded-md text-sm transition-all duration-150"
                  style={{
                    background: view === 'list' ? 'var(--accent-primary)' : 'transparent',
                    color: view === 'list' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Link 
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Back to Dashboard
              </Link>
            </div>
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
            <div className="flex items-center gap-3 mb-2">
              <h1 
                className="text-4xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                My Applications
              </h1>
              <span 
                className="px-3 py-1 rounded-full text-sm"
                style={{ background: 'rgba(108, 99, 255, 0.12)', color: 'var(--accent-primary)' }}
              >
                5 Active
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Track and manage all your job applications in one place
            </p>
          </motion.div>

          {/* Kanban Board */}
          {view === 'kanban' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex gap-6 overflow-x-auto pb-4"
              style={{ minHeight: '600px' }}
            >
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  applications={applications[column.id as keyof typeof applications]}
                  onDrop={handleDrop}
                />
              ))}
            </motion.div>
          )}

          {/* List View */}
          {view === 'list' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-4"
            >
              {Object.entries(applications).flatMap(([status, apps]) =>
                apps.map((app) => (
                  <div
                    key={app.id}
                    className="p-6 rounded-2xl flex items-center justify-between"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ background: 'var(--bg-tertiary)' }}
                      >
                        {app.logo}
                      </div>
                      <div>
                        <h3 className="text-lg mb-0.5" style={{ color: 'var(--text-primary)' }}>
                          {app.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {app.company} • {app.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                          Applied on
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
                          {app.date}
                        </div>
                      </div>
                      <div 
                        className="px-3 py-1.5 rounded-full text-xs"
                        style={{
                          background: columns.find(c => c.id === status)?.color 
                            ? `${columns.find(c => c.id === status)?.color}20`
                            : 'transparent',
                          color: columns.find(c => c.id === status)?.color,
                        }}
                      >
                        {columns.find(c => c.id === status)?.title}
                      </div>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm transition-all duration-150 active:scale-[0.97]"
                        style={{
                          background: 'var(--accent-primary)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </main>
      </div>
    </DndProvider>
  );
}