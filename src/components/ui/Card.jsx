import { motion } from 'framer-motion';
import './Card.css';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      className={`card ${glow ? 'card-glow' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px', amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
