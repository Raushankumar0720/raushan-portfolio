import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa6';
import Logo from '../ui/Logo';
import Magnetic from '../ui/Magnetic';
import { socialLinks } from '../../data/socialLinks';
import './Footer.css';

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <Logo size={32} />
              <div className="footer-title-group">
                <span className="footer-name">Raushan Kumar</span>
                <div className="footer-signature">
                   <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d="M25 40V15C25 5 50 5 50 15C50 25 25 25 35 35C40 40 45 42 60 42C55 42 55 32 60 32C65 32 65 42 70 42C75 42 75 32 80 32C85 32 85 42 90 42C95 42 95 32 105 35C115 38 100 45 115 45H125V5V45C125 35 135 25 145 35V45C145 45 150 45 155 45C150 45 150 35 155 35C160 35 160 45 155 45H165V35C165 30 175 30 175 35V45C175 45 180 48 195 48"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p className="footer-tagline">
              Full Stack Developer · Ahmedabad, India <br/>
              <span className="mono footer-time">
                {liveTime}
              </span>
            </p>
          </div>

          <div className="footer-socials">
            {socialLinks.map((link) => (
              <Magnetic key={link.name} strength={0.4}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social-link ${link.label.toLowerCase()}`}
                  aria-label={link.name}
                  whileHover={{ y: -3 }}
                >
                  <link.icon />
                </motion.a>
              </Magnetic>
            ))}
          </div>

          <div className="footer-right">
            <p className="footer-copy">
              © {new Date().getFullYear()} Raushan Kumar (RK) [All rights reserved] 
            </p>
          </div>
        </div>

        <motion.button
          className="footer-back-top"
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </footer>
  );
}
