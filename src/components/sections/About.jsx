import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapPin, FaGraduationCap, FaRocket, FaCode } from 'react-icons/fa6';
import SectionHeader from '../layout/SectionHeader';
import Card from '../ui/Card';
import Timeline from '../ui/Timeline';
import './About.css';

const stats = [
  { label: 'Projects Built', value: '13+', icon: <FaCode /> },
  { label: 'Technologies', value: '25+', icon: <FaRocket /> },
  { label: 'Certifications', value: '6', icon: <FaGraduationCap /> },
];

export default function About() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const liveTime = formatter.format(time);

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionHeader
          number="01"
          title="About"
          subtitle="Turning complex ideas into clean code — one commit at a time."
        />

        <div className="about-content">
          {/* Bio */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-intro">
              I'm <strong>Raushan Kumar</strong>, a self-taught Full Stack Developer from
              <strong> Ahmedabad, India</strong>. I discovered programming through curiosity
              — and haven't stopped building since.
            </p>
            <p>
              I thrive at the intersection of design and engineering. Whether crafting a smooth
              UI transition or designing a database schema, I approach every layer with the same
              obsessive attention to detail.
            </p>
            <p>
              Currently a fresher actively seeking my first professional role. Open to full-time
              positions, internships, and freelance work — locally or remotely.
            </p>

            <div className="about-learning">
              <span className="about-learning-label mono">Currently learning</span>
              <div className="about-learning-tags">
                <span className="about-tag">TypeScript</span>
                <span className="about-tag">Docker</span>
                <span className="about-tag">AWS</span>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="about-cards">
            {/* Location Card */}
            <Card delay={0.1} glow>
              <div className="about-card-content">
                <FaMapPin className="about-card-icon" />
                <div>
                  <h4>Ahmedabad, India</h4>
                  <p className="about-card-sub mono" style={{ marginTop: '4px', color: 'var(--accent)' }}>
                    {liveTime}
                  </p>
                </div>
              </div>
            </Card>

            {/* Status Card */}
            <Card delay={0.2} glow>
              <div className="about-card-content">
                <div className="about-status-dot" />
                <div>
                  <h4 className="gradient-text">Open to Work</h4>
                  <p className="about-card-sub">Full-Time · Internship · Freelance · Remote</p>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="about-stats">
              {stats.map((stat, i) => (
                <Card key={stat.label} delay={0.3 + i * 0.1} className="about-stat-card">
                  <div className="about-stat-icon">{stat.icon}</div>
                  <div className="about-stat-value mono">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="about-timeline-section">
          <h4 className="mono timeline-section-label" style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--accent)', opacity: 0.8 }}>MY JOURNEY</h4>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
