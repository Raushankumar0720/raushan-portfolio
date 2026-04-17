import { motion } from 'framer-motion';
import './SectionHeader.css';

export default function SectionHeader({ number, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      className={`section-header section-header-${align}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header-top">
        <span className="section-number mono">{number}</span>
        <span className="section-divider" />
        <span className="section-label mono">{title.toUpperCase()}</span>
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
}
