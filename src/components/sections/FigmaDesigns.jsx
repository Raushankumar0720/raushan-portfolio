import { motion } from 'framer-motion';
import { FaFigma, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import SectionHeader from '../layout/SectionHeader';
import { figmaDesigns } from '../../data/figmaDesigns';
import { SECTION_NUMBERS } from '../../utils/constants';
import Button from '../ui/Button';
import './FigmaDesigns.css';

export default function FigmaDesigns() {
  return (
    <section id="figma-designs" className="section figma-section">
      <div className="container">
        <SectionHeader
          number={SECTION_NUMBERS['figma-designs']}
          title="Figma Designs"
          subtitle="UI/UX design systems and high-fidelity prototypes crafted with precision."
        />

        <div className="figma-grid">
          {figmaDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              className="figma-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="figma-preview-wrap">
                <img src={design.thumbnail} alt={design.title} className="figma-preview" />
                <div className="figma-overlay">
                  <Button
                    variant="primary"
                    size="md"
                    href={design.figmaLink}
                    icon={<FaFigma />}
                    className="figma-btn"
                  >
                    Open in Figma
                  </Button>
                </div>
              </div>

              <div className="figma-content">
                <div className="figma-tags">
                  {design.tags.map(tag => (
                    <span key={tag} className="figma-tag mono">{tag}</span>
                  ))}
                </div>
                <h3 className="figma-title">{design.title}</h3>
                <p className="figma-desc">{design.description}</p>
                <a href={design.figmaLink} className="figma-link mono" target="_blank" rel="noopener noreferrer">
                  View Prototype <FaArrowUpRightFromSquare />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
