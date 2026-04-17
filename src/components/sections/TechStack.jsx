import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../layout/SectionHeader';
import Card from '../ui/Card';
import { techCategories } from '../../data/techStack';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

function SkillBar({ name, icon: Icon, color, level, index }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reset',
          },
          delay: index * 0.05,
        }
      );
    }
  }, [level, index]);

  return (
    <motion.div
      className="skill-item"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="skill-header">
        <div className="skill-name">
          <Icon className="skill-icon" style={{ color }} />
          <span>{name}</span>
        </div>
        <span className="skill-level mono">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="techstack" className="section">
      <div className="container">
        <SectionHeader
          number="02"
          title="Tech Stack"
          subtitle="Technologies I use to bring ideas to life"
        />

        <div className="techstack-grid">
          {techCategories.map((cat, catIndex) => (
            <Card key={cat.title} delay={catIndex * 0.1} className="techstack-card">
              <div className="techstack-card-header">
                <span className="techstack-emoji">{cat.icon}</span>
                <div>
                  <h3>{cat.title}</h3>
                  <p className="techstack-card-desc">{cat.description}</p>
                </div>
              </div>

              <div className="techstack-skills">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
