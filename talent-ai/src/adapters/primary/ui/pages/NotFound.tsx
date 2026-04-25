import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10"
          style={{ background: 'var(--accent-primary)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-5"
          style={{ background: 'var(--accent-secondary)' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[200px] leading-none mb-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </motion.h1>
          <h2 
            className="text-3xl mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            You've wandered somewhere we haven't mapped yet.
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-150 active:scale-[0.97]"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Home className="w-5 h-5" />
            Take me home
          </Link>
        </motion.div>

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-16 h-16 rounded-xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(0, 212, 255, 0.2))',
            border: '1px solid var(--border-accent)',
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [360, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-32 left-20 w-12 h-12 rounded-full"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(108, 99, 255, 0.2))',
            border: '1px solid var(--border-accent)',
          }}
        />
      </div>
    </div>
  );
}
