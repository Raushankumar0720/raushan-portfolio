import { motion } from 'framer-motion';

export default function Logo({ size = 44 }) {
  return (
    <div className="rk-logo-container" style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer Hexagon + Dotted Orbit */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <polygon 
          points="50,2 96,25 96,75 50,98 4,75 4,25" 
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="2"
          opacity="0.3"
        />
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
      </motion.svg>
      
      {/* Reverse spinning Inner geometry */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <polygon 
          points="50,12 83,31 83,69 50,88 17,69 17,31" 
          fill="none" 
          stroke="var(--text-secondary)" 
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle cx="50" cy="2" r="3" fill="var(--accent)" />
        <circle cx="50" cy="98" r="3" fill="var(--accent)" />
      </motion.svg>

      {/* Central Identity core */}
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
          boxShadow: '0 0 15px var(--accent-glow), inset 0 0 8px var(--accent-glow)'
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 800,
          fontSize: `${size * 0.3}px`,
          color: 'var(--accent)',
          letterSpacing: '-1px',
          textShadow: '0 0 4px var(--accent-glow)',
          marginLeft: '1px' // visual centering adjustment
        }}>
          RK
        </span>
      </div>
    </div>
  );
}
