import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaArrowUpRightFromSquare, FaXmark } from 'react-icons/fa6';
import SectionHeader from '../layout/SectionHeader';
import Card from '../ui/Card';
import Tilt from 'react-parallax-tilt';
import { certificates } from '../../data/certificates';
import './Certificates.css';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="section">
      <div className="container">
        <SectionHeader
          number="04"
          title="Certificates"
          subtitle="Continuous learning, validated by industry-recognized certifications."
        />

        <div className="certificates-grid">
          {certificates.map((cert, i) => (
            <div key={cert.id} className="cert-card-wrapper">
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.02}
                transitionSpeed={1500}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
              >
                <Card delay={i * 0.08} glow className="cert-card">
                  {/* Certificate Visual */}
                  <div 
                    className="cert-visual" 
                    onClick={() => setSelectedCert(cert)}
                    style={{ cursor: 'zoom-in' }}
                  >
                    {cert.image ? (
                      <div className="cert-image-container">
                        <img src={cert.image} alt={cert.title} className="cert-image" loading="lazy" />
                        <div className="cert-image-overlay">
                          <FaAward className="cert-overlay-icon" />
                        </div>
                      </div>
                    ) : (
                      <div className="cert-placeholder">
                        <FaAward className="cert-icon" />
                        <span className="cert-issuer-badge mono">{cert.issuer}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cert-info">
                    <h3 className="cert-title">{cert.title}</h3>
                    <div className="cert-meta">
                      <span className="cert-issuer">{cert.issuer}</span>
                      <span className="cert-date mono">{cert.date}</span>
                    </div>
                    <p className="cert-desc">{cert.description}</p>

                    {/* Skills */}
                    <div className="cert-skills">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="cert-skill-tag mono">{skill}</span>
                      ))}
                    </div>

                    {/* Credential Link */}
                    <div className="cert-links">
                      <button 
                        className="cert-view-btn mono"
                        onClick={() => setSelectedCert(cert)}
                      >
                        Enlarge View
                      </button>
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                        whileHover={{ x: 4 }}
                      >
                        Verify <FaArrowUpRightFromSquare />
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </Tilt>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="cert-lightbox-close"
                onClick={() => setSelectedCert(null)}
              >
                <FaXmark />
              </button>
              
              <div className="cert-lightbox-visual">
                {selectedCert.image ? (
                  <img src={selectedCert.image} alt={selectedCert.title} className="cert-lightbox-img" loading="lazy" />
                ) : (
                  <FaAward className="cert-lightbox-icon" />
                )}
              </div>
              
              <div className="cert-lightbox-info">
                <span className="mono cert-lightbox-issuer">{selectedCert.issuer}</span>
                <h2 className="cert-lightbox-title">{selectedCert.title}</h2>
                <p className="cert-lightbox-date mono">Completed: {selectedCert.date}</p>
                
                <div className="cert-lightbox-actions">
                  <a 
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-lightbox-verify-btn"
                  >
                    Verify Official Credential <FaArrowUpRightFromSquare />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
