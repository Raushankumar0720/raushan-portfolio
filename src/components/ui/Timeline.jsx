import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa6';
import './Timeline.css';

const timelineData = [
  {
    year: '2025',
    title: 'Self-Taught Mastery',
    category: 'learning',
    icon: <FaCode />,
    desc: 'Mastered the MERN stack and advanced frontend architectures. Focusing on performance and production-ready deployments.',
  },
  {
    year: '2024',
    title: 'Full Stack Engineering',
    category: 'learning',
    icon: <FaRocket />,
    desc: 'Dived deep into Node.js, Express, and MongoDB. Built multiple real-world applications and clones to sharpen architectural skills.',
  },
  {
    year: '2023',
    title: 'Frontend Foundations',
    category: 'learning',
    icon: <FaGraduationCap />,
    desc: 'Started the journey with HTML, CSS, and JavaScript. Fell in love with the creative aspect of web development.',
  },
];

export default function Timeline() {
  return (
    <div className="timeline-container">
      <div className="timeline-line">
        <motion.div 
          className="timeline-line-progress"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>

      <div className="timeline-items">
        {timelineData.map((item, i) => (
          <motion.div 
            key={i} 
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="timeline-dot">
              <div className="timeline-dot-inner">{item.icon}</div>
            </div>
            
            <div className="timeline-content card glass">
              <span className="timeline-year mono">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
