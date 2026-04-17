import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  type = 'word', // 'word' | 'char'
}) {
  const items = type === 'word' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: type === 'word' ? '0.3em' : '0' }}
    >
      {items.map((item, i) => (
        <motion.span key={i} variants={child} style={{ display: 'inline-block' }}>
          {item}
          {type === 'word' && i < items.length - 1 ? '' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
