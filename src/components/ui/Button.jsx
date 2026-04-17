import { motion } from 'framer-motion';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // primary | outline | ghost
  size = 'md', // sm | md | lg
  href,
  onClick,
  icon,
  disabled = false,
  className = '',
  ...props
}) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      className={`btn btn-${variant} btn-${size} ${className}`}
      href={href}
      onClick={onClick}
      disabled={disabled}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </Component>
  );
}
