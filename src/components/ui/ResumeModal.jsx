import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaDownload, FaEye } from 'react-icons/fa6';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose, resumeUrl }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="resume-modal-overlay" onClick={onClose}>
        <motion.div
          className="resume-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="resume-modal-header">
            <div className="resume-header-left">
              <FaEye className="resume-header-icon" />
              <h3>Resume Preview</h3>
            </div>
            <div className="resume-header-actions">
              <a 
                href={resumeUrl} 
                download="Raushan_Kumar_Resume.pdf" 
                className="resume-download-btn"
                title="Download PDF"
              >
                <FaDownload />
              </a>
              <button className="resume-close-btn" onClick={onClose}>
                <FaXmark />
              </button>
            </div>
          </div>

          <div className="resume-modal-body">
            {/* Using iframe to display PDF - satisfies "No auto-download" rule */}
            <iframe
              src={resumeUrl.includes('drive.google.com') 
                ? resumeUrl.replace('/view', '/preview').split('?')[0] 
                : `${resumeUrl}#toolbar=0`}
              title="Resume Preview"
              className="resume-iframe"
              width="100%"
              height="100%"
            />
          </div>

          <div className="resume-modal-footer">
            <p className="mono">Raushan Kumar | Full Stack Developer</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
