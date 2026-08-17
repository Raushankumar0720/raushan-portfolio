import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLocationDot, FaClock, FaTrophy, FaGithub, FaArrowUpRightFromSquare, FaUsers } from 'react-icons/fa6';
import Tilt from 'react-parallax-tilt';
import confetti from 'canvas-confetti';
import SectionHeader from '../layout/SectionHeader';
import Card from '../ui/Card';
import { offlineHackathons, onlineHackathons } from '../../data/hackathons';
import './Hackathons.css';

function TeamCarousel({ hack, onImageClick }) {
  const { teamMembers: members, images } = hack;
  const [activeIdx, setActiveIdx] = useState(0);
  const isImageMode = images && images.length > 0;

  useEffect(() => {
    if (!isImageMode) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isImageMode, images]);

  useEffect(() => {
    if (isImageMode) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % members.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isImageMode, members.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    const totalCount = isImageMode ? images.length : members.length;
    setActiveIdx((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const totalCount = isImageMode ? images.length : members.length;
    setActiveIdx((prev) => (prev + 1) % totalCount);
  };

  if (isImageMode) {
    return (
      <div className="team-carousel has-images">
        {/* Upper Half: Image slider with Prev/Next buttons */}
        <div className="team-image-slider">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={images[activeIdx]}
              alt={`Hackathon moment ${activeIdx + 1}`}
              className="team-slider-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => onImageClick && onImageClick(activeIdx)}
              style={{ cursor: 'zoom-in' }}
            />
          </AnimatePresence>

          {/* Navigation buttons */}
          <button className="team-slider-nav prev" onClick={handlePrev} aria-label="Previous image">
            &#10094;
          </button>
          <button className="team-slider-nav next" onClick={handleNext} aria-label="Next image">
            &#10095;
          </button>

          {/* Dots indicating current image */}
          <div className="team-slider-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`team-slider-dot ${i === activeIdx ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(i);
                }}
              />
            ))}
          </div>
        </div>

        {/* Lower Half: Name of all members */}
        <div className="team-members-section">
          <div className="team-carousel-header">
            <FaUsers className="team-icon" />
            <span className="mono team-label">Team Members</span>
          </div>
          <div className="team-members-list">
            {members.map((m, i) => (
              <div key={i} className="team-member-item">
                <div
                  className="team-member-avatar-mini"
                  style={{ background: m.color }}
                >
                  {m.initials || m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="team-member-info-mini">
                  <span className="team-member-name-mini">{m.name}</span>
                  <span className="team-member-role-mini">{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeZoomIdx, setActiveZoomIdx] = useState(null);
  const [isPsOpen, setIsPsOpen] = useState(false);

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

  const handleCertClick = (e) => {
    if (hack.certificate) {
      setActiveZoomIdx(null);
      setIsLightboxOpen(true);
    } else {
      triggerConfetti(e);
    }
  };

  const handleTeamImageClick = (index) => {
    setActiveZoomIdx(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
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
              {/* Certificate placeholder / image */}
              <div 
                className="hackathon-cert-visual" 
                onClick={handleCertClick} 
                style={{ cursor: hack.certificate ? 'zoom-in' : 'pointer' }}
              >
                {hack.certificate ? (
                  <>
                    <img src={hack.certificate} alt="" className="hackathon-cert-img-blur" />
                    <img src={hack.certificate} alt={`${hack.name} Certificate`} className="hackathon-cert-img" />
                  </>
                ) : (
                  <div className="hackathon-cert-placeholder">
                    <FaTrophy className="hackathon-cert-icon" />
                    <span className="mono hackathon-cert-label">Certificate</span>
                  </div>
                )}
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

                {hack.achievement && (
                  <p className="hackathon-achievement">{hack.achievement}</p>
                )}

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
                    {hack.project.demoUrl ? (
                      <a href={hack.project.demoUrl} target="_blank" rel="noopener noreferrer" className="hackathon-link hackathon-link-primary">
                        <FaArrowUpRightFromSquare /> Live Demo
                      </a>
                    ) : (
                      <span className="hackathon-link hackathon-link-local" title="Presented live at the hackathon venue — not deployed online">
                        🏟️ Venue Demo
                      </span>
                    )}
                    {hack.project.problemStatement && (
                      <button 
                        onClick={() => setIsPsOpen(true)} 
                        className="hackathon-link hackathon-link-ps"
                      >
                        📄 Problem Statement
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Team Members (offline only) */}
            {type === 'offline' && hack.teamMembers && (
              <TeamCarousel hack={hack} onImageClick={handleTeamImageClick} />
            )}
          </div>
        </Card>
      </Tilt>

      <AnimatePresence>
        {isLightboxOpen && (hack.certificate || (activeZoomIdx !== null && hack.images)) && (
          <motion.div
            className="hackathon-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="hackathon-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="hackathon-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
              >
                &times;
              </button>

              <img
                src={activeZoomIdx !== null ? hack.images[activeZoomIdx] : hack.certificate}
                alt={activeZoomIdx !== null ? `Hackathon Image ${activeZoomIdx + 1}` : `${hack.name} Certificate`}
                className="hackathon-lightbox-img"
              />

              {activeZoomIdx !== null && hack.images && hack.images.length > 1 && (
                <>
                  <button
                    className="hackathon-lightbox-nav prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveZoomIdx((prev) => (prev - 1 + hack.images.length) % hack.images.length);
                    }}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>
                  <button
                    className="hackathon-lightbox-nav next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveZoomIdx((prev) => (prev + 1) % hack.images.length);
                    }}
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPsOpen && hack.project.problemStatement && (
          <motion.div
            className="hackathon-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPsOpen(false)}
          >
            <motion.div
              className="hackathon-lightbox-content ps-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '650px',
                width: '100%',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                padding: '2rem',
                maxHeight: '85vh',
                overflowY: 'auto',
                display: 'block',
                cursor: 'default'
              }}
            >
              <button
                className="hackathon-lightbox-close"
                onClick={() => setIsPsOpen(false)}
                style={{ top: '15px', right: '15px' }}
              >
                &times;
              </button>

              <div className="ps-modal-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)', lineHeight: '1.3' }}>
                  Problem Statement: {hack.project.name}
                </h3>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {hack.name} — {hack.result}
                </span>
              </div>

              <div className="ps-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🚨 Core Problem
                  </h4>
                  <p>{hack.project.problemStatement.coreProblem}</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    🔥 Key Pain Points
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem', margin: 0 }}>
                    {hack.project.problemStatement.painPoints.map((pp, idx) => (
                      <li key={idx}>
                        <strong>{pp.title}</strong>: {pp.desc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🎯 Target Audience
                  </h4>
                  <p>{hack.project.problemStatement.targetAudience}</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🚀 Desired Outcome
                  </h4>
                  <p>{hack.project.problemStatement.desiredOutcome}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DossierLayout({ hacks, type }) {
  const [selectedHackId, setSelectedHackId] = useState(3);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPsOpen, setIsPsOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasCelebratedRef = useRef(false);
  const dossierCardRef = useRef(null);

  const activeHack = hacks.find(h => h.id === selectedHackId) || hacks[0];

  const runCelebration = () => {
    setShowCelebration(true);
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 99999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 60 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 200);

    setTimeout(() => setShowCelebration(false), 3800);
  };

  // Auto-fire celebration once when the card scrolls into view
  useEffect(() => {
    if (selectedHackId !== 3 || hasCelebratedRef.current) return;
    const node = dossierCardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCelebratedRef.current) {
          hasCelebratedRef.current = true;
          runCelebration();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [selectedHackId]);

  useEffect(() => {
    setActivePhotoIdx(0);
  }, [selectedHackId]);

  useEffect(() => {
    if (!activeHack.images || activeHack.images.length === 0) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % activeHack.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeHack.images, selectedHackId]);

  const stampInfo = {
    3: { icon: "🚀", label: "HackSprint" },
    1: { icon: "🇮🇳", label: "HackIndia" },
    2: { icon: "⚡", label: "CodeFest" }
  };

  const triggerConfetti = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#D4A73D', '#3FB89C', '#ffffff'],
      ticks: 200,
      gravity: 1.2
    });
  };

  const handleHeroClick = () => {
    setIsLightboxOpen(true);
  };

  return (
    <div className="dossier-wrapper">
      {/* Informational Tag Line */}
      <div className="dossier-stamp-hint">
        <span className="dossier-hint-icon">💡</span>
        <span>Click the circles below to explore other hackathons</span>
      </div>

      {/* Stamp Rail */}
      <div className="dossier-stamp-rail" role="tablist" aria-label="Hackathon selector">
        {hacks.map((hack) => {
          const info = stampInfo[hack.id] || { icon: "🏆", label: hack.name.split(' ')[0] };
          const isActive = hack.id === selectedHackId;
          return (
            <button
              key={hack.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Select ${hack.name}`}
              className={`dossier-stamp-button ${isActive ? 'active' : 'inactive'}`}
              onClick={() => setSelectedHackId(hack.id)}
            >
              <div className="dossier-stamp-medallion">
                {info.icon}
              </div>
              <span className="dossier-stamp-label">{info.label}</span>
            </button>
          );
        })}
      </div>

      {/* Switcher card area with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedHackId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {selectedHackId === 3 ? (
            /* Custom Dossier Layout for CodingGita HackSprint '26 */
            <div className="dossier-card" ref={dossierCardRef}>
              {/* Ribbon Badge for placement — pulses to hint interactivity */}
              {activeHack.result && (
                <div
                  className="dossier-ribbon dossier-ribbon-pulse"
                  onClick={runCelebration}
                  title="Click to celebrate! 🎉"
                  style={{ cursor: 'pointer' }}
                >
                  🥈 2nd Place
                </div>
              )}

              {/* Zone 1: Header */}
              <div className="dossier-header">
                <span className="dossier-eyebrow">proof of work</span>
                <h3 className="dossier-title">{activeHack.name}</h3>
                <div className="dossier-meta-row">
                  <span className="dossier-meta-item">
                    <FaLocationDot className="dossier-meta-icon" /> {activeHack.location}
                  </span>
                  <span className="dossier-meta-item">
                    <FaClock className="dossier-meta-icon" /> {activeHack.date} · {activeHack.duration}
                  </span>
                </div>
              </div>

              {/* Zone 2: Hero + Filmstrip */}
              {activeHack.images && activeHack.images.length > 0 && (
                <div className="dossier-gallery">
                  <div 
                    className="dossier-hero-container" 
                    onClick={handleHeroClick}
                    style={{ cursor: 'zoom-in' }}
                  >
                    <img 
                      src={activeHack.images[activePhotoIdx]} 
                      alt={`${activeHack.name} moment`} 
                      className="dossier-hero-image" 
                    />
                    
                    {/* Navigation buttons inside the hero container */}
                    <button 
                      className="team-slider-nav prev" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIdx((prev) => (prev - 1 + activeHack.images.length) % activeHack.images.length);
                      }} 
                      aria-label="Previous image"
                    >
                      &#10094;
                    </button>
                    <button 
                      className="team-slider-nav next" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIdx((prev) => (prev + 1) % activeHack.images.length);
                      }} 
                      aria-label="Next image"
                    >
                      &#10095;
                    </button>
                  </div>
                </div>
              )}

              {/* Zone 3: Body split panels */}
              <div className="dossier-body">
                {/* Left column: Project info */}
                <div className="dossier-left-panel">
                  <div className="dossier-project-header">
                    <FaGithub className="dossier-project-icon" />
                    <span className="dossier-project-name">{activeHack.project.name}</span>
                  </div>
                  <p className="dossier-project-desc">{activeHack.project.description}</p>
                  
                  <div>
                    <h4 className="dossier-section-title">stack</h4>
                    <div className="dossier-tech-stack">
                      {activeHack.project.techStack.map((tech) => (
                        <span key={tech} className="dossier-tech-chip">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="dossier-section-title">access</h4>
                    <div className="dossier-access-links">
                      {activeHack.project.repoUrl && (
                        <a href={activeHack.project.repoUrl} target="_blank" rel="noopener noreferrer" className="dossier-link-button primary">
                          <FaGithub /> Repository
                        </a>
                      )}
                      {activeHack.id === 3 ? (
                        <button 
                          onClick={() => setIsVideoOpen(true)}
                          className="dossier-link-button"
                          aria-label="Play demo video"
                        >
                          🎥 Video Demo
                        </button>
                      ) : (
                        <span className="dossier-link-button" title="Presented live at the hackathon venue — not deployed online">
                          🏟️ Local Demo
                        </span>
                      )}
                      {activeHack.project.problemStatement && (
                        <button 
                          onClick={() => setIsPsOpen(true)} 
                          className="dossier-link-button"
                        >
                          📄 Problem Statement
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column: Crew info */}
                <div className="dossier-right-panel">
                  <h4 className="dossier-section-title">crew</h4>
                  <div className="dossier-crew-list">
                    {activeHack.teamMembers && activeHack.teamMembers.map((member, idx) => (
                      <div key={idx} className="dossier-crew-item">
                        <div 
                          className="dossier-crew-avatar" 
                          style={{ backgroundColor: member.color || '#3FB89C' }}
                        >
                          {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="dossier-crew-info">
                          <span className="dossier-crew-name">{member.name}</span>
                          <span className="dossier-crew-role">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Original layout card for other offline hackathons */
            <HackathonEntry hack={activeHack} type={type} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox for Zoom */}
      <AnimatePresence>
        {isLightboxOpen && activeHack.images && activeHack.images.length > 0 && (
          <motion.div
            className="hackathon-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="hackathon-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="hackathon-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
              >
                &times;
              </button>

              <img
                src={activeHack.images[activePhotoIdx]}
                alt={`Zoomed image`}
                className="hackathon-lightbox-img"
              />

              {activeHack.images.length > 1 && (
                <>
                  <button
                    className="hackathon-lightbox-nav prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIdx((prev) => (prev - 1 + activeHack.images.length) % activeHack.images.length);
                    }}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>
                  <button
                    className="hackathon-lightbox-nav next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIdx((prev) => (prev + 1) % activeHack.images.length);
                    }}
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Problem Statement Modal */}
      <AnimatePresence>
        {isPsOpen && activeHack.project.problemStatement && (
          <motion.div
            className="hackathon-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPsOpen(false)}
          >
            <motion.div
              className="hackathon-lightbox-content ps-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '650px',
                width: '100%',
                backgroundColor: '#14171C',
                border: '1px solid #2A2F3A',
                borderRadius: '16px',
                padding: '2rem',
                maxHeight: '85vh',
                overflowY: 'auto',
                display: 'block',
                cursor: 'default'
              }}
            >
              <button
                className="hackathon-lightbox-close"
                onClick={() => setIsPsOpen(false)}
                style={{ top: '15px', right: '15px' }}
              >
                &times;
              </button>

              <div className="ps-modal-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #2A2F3A', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#D4A73D', lineHeight: '1.3' }}>
                  Problem Statement: {activeHack.project.name}
                </h3>
                <span className="mono" style={{ fontSize: '0.75rem', color: '#9AA1AE' }}>
                  {activeHack.name} — {activeHack.result}
                </span>
              </div>

              <div className="ps-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', lineHeight: '1.6', color: '#9AA1AE' }}>
                <div>
                  <h4 style={{ color: '#EDEEF2', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🚨 Core Problem
                  </h4>
                  <p>{activeHack.project.problemStatement.coreProblem}</p>
                </div>

                <div>
                  <h4 style={{ color: '#EDEEF2', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    🔥 Key Pain Points
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem', margin: 0 }}>
                    {activeHack.project.problemStatement.painPoints.map((pp, idx) => (
                      <li key={idx}>
                        <strong>{pp.title}</strong>: {pp.desc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: '#EDEEF2', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🎯 Target Audience
                  </h4>
                  <p>{activeHack.project.problemStatement.targetAudience}</p>
                </div>

                <div>
                  <h4 style={{ color: '#EDEEF2', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                    🚀 Desired Outcome
                  </h4>
                  <p>{activeHack.project.problemStatement.desiredOutcome}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Demo Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="hackathon-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="hackathon-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '800px',
                width: '100%',
                backgroundColor: '#14171C',
                border: '1px solid #2A2F3A',
                borderRadius: '16px',
                padding: '1rem',
                position: 'relative'
              }}
            >
              <button
                className="hackathon-lightbox-close"
                onClick={() => setIsVideoOpen(false)}
                style={{ top: '15px', right: '15px', zIndex: 10 }}
              >
                &times;
              </button>
              
              <video 
                src="https://res.cloudinary.com/dztrqgnkx/video/upload/v1786873147/WhatsApp_Video_2026-07-10_at_8.49.19_PM_1_un3epl.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                style={{ width: '100%', borderRadius: '8px', display: 'block' }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Banner Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="celebration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(15, 17, 22, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0, y: -50 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              style={{
                backgroundColor: '#14171C',
                border: '2px solid #D4A73D',
                borderRadius: '16px',
                padding: '2.5rem 3.5rem',
                textAlign: 'center',
                boxShadow: '0 0 30px rgba(212, 167, 61, 0.3)',
                maxWidth: '90%',
              }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                style={{ fontSize: '4.5rem', marginBottom: '1rem' }}
              >
                🏆
              </motion.div>
              <h2 style={{ fontSize: '2.2rem', color: '#D4A73D', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                CONGRATULATIONS!
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#EDEEF2', fontWeight: 600, margin: 0, fontFamily: 'JetBrains Mono, monospace' }}>
                🥈 2nd Place — Won ₹3,000 Cash Prize
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
            {activeTab === 'offline' ? (
              <DossierLayout hacks={offlineHackathons} type={activeTab} />
            ) : (
              onlineHackathons.map((hack) => (
                <HackathonEntry key={hack.id} hack={hack} type={activeTab} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
