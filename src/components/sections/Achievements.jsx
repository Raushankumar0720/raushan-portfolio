import { motion } from 'framer-motion';
import SectionHeader from '../layout/SectionHeader';
import { achievements } from '../../data/achievements';
import { SECTION_NUMBERS } from '../../utils/constants';
import './Achievements.css';

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <SectionHeader
          number={SECTION_NUMBERS.achievements}
          title="Achievements"
          subtitle="Milestones, awards, and recognitions earned throughout my journey."
        />

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {achievements.map((item) => (
            <motion.div key={item.id} className="achievement-card glass" variants={itemVariants}>
              <div className="achievement-icon-wrap">
                <item.icon className="achievement-icon" />
                <div className="achievement-icon-glow" />
              </div>

              <div className="achievement-content">
                <div className="achievement-meta">
                  <span className="achievement-category mono">{item.category}</span>
                  <span className="achievement-date mono">{item.date}</span>
                </div>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-org">{item.organization}</p>
                <p className="achievement-desc">{item.description}</p>
              </div>

              <div className="achievement-card-bg" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
