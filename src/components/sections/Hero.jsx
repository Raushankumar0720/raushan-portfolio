import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useSpring, animated } from '@react-spring/web';
import AnimatedText from '../ui/AnimatedText';
import Button from '../ui/Button';
import ResumeModal from '../ui/ResumeModal';
import { socialLinks } from '../../data/socialLinks';
import Magnetic from '../ui/Magnetic';
import { PERSONAL } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';
import './Hero.css';

const floatingBadges = [
  { label: 'React', emoji: '⚛️', x: '0%', y: '78%', delay: 1.5 },
  { label: 'Node.js', emoji: '🟢', x: '48%', y: '0%', delay: 0.8 },
  { label: 'MongoDB', emoji: '🍃', x: '-20%', y: '25%', delay: 1.6 },
  { label: 'TypeScript', emoji: '🔷', x: '87%', y: '40%', delay: 1.2 },
  { label: 'JavaScript', emoji: '🟡', x: '90%', y: '85%', delay: 1.0 },
];

const roleTitles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React Craftsman',
  'Backend Architect',
  'UI / UX Enthusiast',
  'Problem Solver',
];

function FloatingBadge({ label, emoji, x, y, delay }) {
  const props = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -10 });
        await next({ y: 10 });
      }
    },
    config: { duration: 2500 + delay * 500 },
    delay: delay * 400,
  });

  return (
    <animated.div
      className="hero-floating-badge glass"
      style={{
        left: x,
        top: y,
        transform: props.y.to((y) => `translateY(${y}px)`),
      }}
    >
      <span>{emoji}</span>
      <span className="mono">{label}</span>
    </animated.div>
  );
}

const avatarVariants = {
  enter: {
    opacity: 0,
    scale: 0.85,
    rotateY: 90,
    filter: 'blur(8px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    rotateY: -90,
    filter: 'blur(8px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Hero() {
  const [showPhoto, setShowPhoto] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhoto((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roleTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero section">
      <motion.div
        className="hero-aura"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow), transparent 80%)`,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      />
      <div className="hero-grid-bg grid-bg animate-grid" />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumeUrl="/resume.pdf" 
      />

      <div className="container hero-content">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="hero-status-dot" />
            <span className="mono">Available for work</span>
          </motion.div>

          <h1 className="hero-name">
            <AnimatedText text="Raushan Kumar." delay={0.2} />
          </h1>

          <motion.div
            className="hero-tagline-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="hero-tagline-prefix mono">{'< '}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="hero-tagline-text"
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {roleTitles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="hero-tagline-prefix mono">{' />'}</span>
          </motion.div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            I craft <strong>performant, elegant web apps</strong> — from pixel-perfect
            frontends to scalable backend systems. Based in Ahmedabad,
            building for the world. 🌍
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button
              variant="primary"
              size="lg"
              href="#projects"
              icon={<FaArrowUpRightFromSquare />}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Hire Me
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsResumeOpen(true)}
            >
              View Resume
            </Button>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {socialLinks.map((link) => (
              <Magnetic key={link.name} strength={0.3}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hero-social-btn ${link.label.toLowerCase()}`}
                  title={link.name}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-avatar-wrapper">
            <div className="hero-orbit-ring hero-orbit-ring-spin" />
            <div className="hero-orbit-ring hero-orbit-ring-2 hero-orbit-ring-spin-reverse" />
            <div className="hero-orbit-ring hero-orbit-ring-3" />

            <div className="hero-orbit-dot hero-orbit-dot-1" />
            <div className="hero-orbit-dot hero-orbit-dot-2" />
            <div className="hero-orbit-dot hero-orbit-dot-3" />

            <div className="hero-avatar">
              <AnimatePresence mode="wait">
                {showPhoto ? (
                  <motion.div
                    key="photo"
                    className="hero-avatar-photo-wrap"
                    variants={avatarVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <img
                      src="/profile.jpg"
                      alt="Raushan Kumar"
                      className="hero-avatar-photo"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="initials"
                    className="hero-avatar-initials-wrap"
                    variants={avatarVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <span className="hero-avatar-initials">RK</span>
                    <div className="hero-avatar-subtitle">
                      <span className="mono">Full Stack Dev</span>
                      <span className="hero-avatar-location">
                        <span className="gradient-text">Ahmedabad, India</span>
                        <span className="mono"> IN</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {floatingBadges.map((badge) => (
            <FloatingBadge key={badge.label} {...badge} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="mono">SCROLL</span>
        <div className="hero-scroll-dot" />
      </motion.div>
    </section>
  );
}
