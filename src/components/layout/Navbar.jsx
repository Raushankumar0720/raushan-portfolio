import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeDropdown from '../ui/ThemeDropdown';
import Logo from '../ui/Logo';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { NAV_SECTIONS } from '../../utils/constants';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS.map(s => s.id), 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsShrunk(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = isShrunk ? 60 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Custom Animated Burger Component
  const BurgerIcon = ({ isOpen }) => (
    <div className={`burger-wrapper ${isOpen ? 'open' : ''}`}>
      <span className="burger-line line-1" />
      <span className="burger-line line-2" />
      <span className="burger-line line-3" />
    </div>
  );

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isShrunk ? 'navbar-shrunk' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="navbar-inner container-lg">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            <Logo size={isShrunk ? 36 : 42} />
          </a>

          {/* Desktop Links - Pill Style */}
          <div className="navbar-links">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                className={`navbar-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleNavClick(section.id)}
              >
                <span className="navbar-link-label">{section.label}</span>
                {activeSection === section.id && (
                  <motion.div
                    className="navbar-link-pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <ThemeDropdown />
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <BurgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="mobile-menu-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="mobile-menu-links">
                {NAV_SECTIONS.map((section, i) => (
                  <motion.button
                    key={section.id}
                    className={`mobile-menu-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(section.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                  >
                    <span className="mobile-menu-idx mono">0{i + 1}</span>
                    <span className="mobile-menu-title">{section.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
