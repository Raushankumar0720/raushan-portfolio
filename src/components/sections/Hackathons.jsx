import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLocationDot, FaClock, FaTrophy, FaGithub, FaArrowUpRightFromSquare, FaUsers } from 'react-icons/fa6';
import Tilt from 'react-parallax-tilt';
import confetti from 'canvas-confetti';
import SectionHeader from '../layout/SectionHeader';
import Card from '../ui/Card';
import { offlineHackathons, onlineHackathons } from '../../data/hackathons';
import './Hackathons.css';

function TeamCarousel({ members }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % members.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [members.length]);

  return (
    <div className="team-carousel">
      <div className="team-carousel-header">
        <FaUsers className="team-icon" />
        <span className="mono team-label">Team Members</span>
      </div>

      <div className="team-carousel-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="team-member-card"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div
              className="team-avatar"
              style={{ background: `linear-gradient(135deg, ${members[activeIdx].color}, ${members[activeIdx].color}88)` }}
            >
              {members[activeIdx].initials}
            </div>
            <div className="team-info">
              <span className="team-name">{members[activeIdx].name}</span>
              <span className="team-role">{members[activeIdx].role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="team-dots">
        {members.map((_, i) => (
          <button
            key={i}
            className={`team-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(i)}
            aria-label={`Show team member ${i + 1}`}
          />
        ))}
      </div>

      {/* All members mini */}
      <div className="team-all">
        {members.map((m, i) => (
          <motion.div
            key={i}
            className={`team-mini ${i === activeIdx ? 'team-mini-active' : ''}`}
            onClick={() => setActiveIdx(i)}
            whileHover={{ scale: 1.1 }}
            style={{ borderColor: i === activeIdx ? m.color : 'var(--card-border)' }}
          >
            <div
              className="team-mini-avatar"
              style={{ background: m.color }}
            >
              {m.initials}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HackathonEntry({ hack, type }) {
  const triggerConfetti = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#4ade80', '#22c55e', '#ffffff'],
      ticks: 200,
      gravity: 1.2
    });
  };

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.01}
      transitionSpeed={1500}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="24px"
    >
      <Card className="hackathon-card" glow>
        <div className="hackathon-entry">
          {/* Left: Certificate + Info */}
          <div className="hackathon-main">
            {/* Certificate placeholder */}
            <div className="hackathon-cert-visual" onClick={triggerConfetti} style={{ cursor: 'pointer' }}>
              <div className="hackathon-cert-placeholder">
                <FaTrophy className="hackathon-cert-icon" />
                <span className="mono hackathon-cert-label">Certificate</span>
              </div>
            </div>

            <div className="hackathon-info">
              <h3 className="hackathon-name">{hack.name}</h3>
              <div className="hackathon-meta">
                {type === 'offline' ? (
                  <span className="hackathon-meta-item">
                    <FaLocationDot /> {hack.location}
                  </span>
                ) : (
                  <span className="hackathon-meta-item">
                    🌐 {hack.platform}
                  </span>
                )}
                <span className="hackathon-meta-item">
                  <FaClock /> {hack.date} · {hack.duration}
                </span>
              </div>

              <div 
                className="hackathon-result" 
                onClick={triggerConfetti}
                style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {hack.result} {hack.result.toLowerCase().includes('winner') && '🏆'}
              </div>

              {/* Project Details */}
              <div className="hackathon-project">
                <h4 className="hackathon-project-name">
                  📦 {hack.project.name}
                </h4>
                <p className="hackathon-project-desc">{hack.project.description}</p>
                <div className="hackathon-tech">
                  {hack.project.techStack.map((tech) => (
                    <span key={tech} className="hackathon-tech-tag mono">{tech}</span>
                  ))}
                </div>
                <div className="hackathon-project-links">
                  {hack.project.repoUrl && (
                    <a href={hack.project.repoUrl} target="_blank" rel="noopener noreferrer" className="hackathon-link">
                      <FaGithub /> Repository
                    </a>
                  )}
                  {hack.project.demoUrl && (
                    <a href={hack.project.demoUrl} target="_blank" rel="noopener noreferrer" className="hackathon-link hackathon-link-primary">
                      <FaArrowUpRightFromSquare /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Team Members (offline only) */}
          {type === 'offline' && hack.teamMembers && (
            <TeamCarousel members={hack.teamMembers} />
          )}
        </div>
      </Card>
    </Tilt>
  );
}

export default function Hackathons() {
  const [activeTab, setActiveTab] = useState('offline');

  return (
    <section id="hackathons" className="section hackathons-section">
      <div className="container">
        <SectionHeader
          number="05"
          title="Hackathons"
          subtitle="Building under pressure, collaborating with brilliant minds."
        />

        {/* Tab Toggle */}
        <div className="hackathon-tabs">
          <motion.button
            className={`hackathon-tab ${activeTab === 'offline' ? 'active' : ''}`}
            onClick={() => setActiveTab('offline')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            🏢 Offline
            {activeTab === 'offline' && (
              <motion.div className="hackathon-tab-indicator" layoutId="hack-tab" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
            )}
          </motion.button>
          <motion.button
            className={`hackathon-tab ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            🌐 Online
            {activeTab === 'online' && (
              <motion.div className="hackathon-tab-indicator" layoutId="hack-tab" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
            )}
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="hackathon-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {(activeTab === 'offline' ? offlineHackathons : onlineHackathons).map((hack) => (
              <HackathonEntry key={hack.id} hack={hack} type={activeTab} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
