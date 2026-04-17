import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMapPin, FaEnvelope, FaCircleCheck } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import SectionHeader from '../layout/SectionHeader';
import Button from '../ui/Button';
import Magnetic from '../ui/Magnetic';
import { socialLinks, contactInfo } from '../../data/socialLinks';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader
          number="06"
          title="Contact"
          subtitle="Let's build something remarkable together."
        />

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-headline">
              Let's build something{' '}
              <span className="gradient-text">remarkable together.</span>
            </h2>
            <p className="contact-desc">
              I'm actively looking for opportunities. Whether it's a job, a freelance project,
              or just a technical conversation — my inbox is always open.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <FaEnvelope className="contact-detail-icon" />
                <div>
                  <span className="contact-detail-label">Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact-detail-value">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="contact-detail-item">
                <FaMapPin className="contact-detail-icon" />
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{contactInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-socials">
              {socialLinks.map((link) => (
                <Magnetic key={link.name} strength={0.4}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-social ${link.label.toLowerCase()}`}
                    whileHover={{ y: -4 }}
                  >
                    <link.icon />
                    <span>{link.name}</span>
                  </motion.a>
                </Magnetic>
              ))}
            </div>

            {/* Availability */}
            <div className="contact-availability">
              <span className="contact-avail-dot" />
              <span className="contact-avail-text">
                {contactInfo.availability} — {contactInfo.roles.join(' · ')}
              </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={form}
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or idea..."
                required
                rows={5}
                className="form-input form-textarea"
              />
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaCircleCheck className="form-success-icon" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    icon={
                      <motion.span
                        animate={isLoading ? {
                          x: [0, 10, 300],
                          y: [0, -10, -50],
                          opacity: [1, 1, 0],
                          scale: [1, 1.2, 0.5],
                          rotate: [0, -10, -45]
                        } : {}}
                        transition={isLoading ? { duration: 1, ease: 'easeIn' } : {}}
                        style={{ display: 'inline-block' }}
                      >
                        <FaPaperPlane />
                      </motion.span>
                    }
                    disabled={isLoading}
                    className="contact-submit-btn"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
