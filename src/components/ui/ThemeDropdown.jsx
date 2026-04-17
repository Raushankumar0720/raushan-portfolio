import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaPalette } from 'react-icons/fa6';
import './ThemeDropdown.css';

export default function ThemeDropdown() {
  const { theme, setTheme, THEMES, THEME_META } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="theme-dropdown" ref={dropdownRef}>
      <motion.button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <FaPalette />
        <span className="theme-current-label">{THEME_META[theme].emoji}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="theme-menu-header">
              <span className="mono">Theme</span>
            </div>
            {THEMES.map((t) => (
              <motion.button
                key={t}
                className={`theme-option ${theme === t ? 'active' : ''}`}
                onClick={() => { setTheme(t); setIsOpen(false); }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <span
                  className="theme-swatch"
                  style={{ backgroundColor: THEME_META[t].color }}
                />
                <span className="theme-option-name">{THEME_META[t].name}</span>
                <span className="theme-option-emoji">{THEME_META[t].emoji}</span>
                {theme === t && (
                  <motion.span
                    className="theme-check"
                    layoutId="theme-check"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
