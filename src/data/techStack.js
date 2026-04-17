import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma, FaNpm, FaGithub
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, SiExpress, SiMongodb,
  SiPostgresql, SiRedis, SiSocketdotio, SiJsonwebtokens, SiVite, SiVercel,
  SiPostman, SiRender, SiNetlify, SiBootstrap, SiFramer, SiChartdotjs
} from 'react-icons/si';

export const techCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    description: 'Building pixel-perfect, responsive interfaces',
    skills: [
      { name: 'HTML5', icon: FaHtml5, color: '#e34f26', level: 95 },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6', level: 92 },
      { name: 'JavaScript (ES6+)', icon: FaJsSquare, color: '#f7df1e', level: 90 },
      { name: 'React.js', icon: FaReact, color: '#61dafb', level: 88 },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', level: 75 },
      { name: 'Redux / Zustand', icon: SiRedux, color: '#764abc', level: 80 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4', level: 88 },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3', level: 85 },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055ff', level: 78 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    description: 'Designing scalable server architectures',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 85 },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff', level: 85 },
      { name: 'JWT Authentication', icon: SiJsonwebtokens, color: '#fb015b', level: 82 },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#010101', level: 72 },
      { name: 'REST API Design', icon: SiPostman, color: '#ff6c37', level: 88 },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    description: 'Managing data with efficiency',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248', level: 85 },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1', level: 70 },
      { name: 'Redis', icon: SiRedis, color: '#dc382d', level: 65 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    description: 'Streamlining the development workflow',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#f05032', level: 90 },
      { name: 'GitHub', icon: FaGithub, color: '#ffffff', level: 90 },
      { name: 'VS Code', icon: SiVite, color: '#007acc', level: 95 },
      { name: 'Vite', icon: SiVite, color: '#646cff', level: 85 },
      { name: 'Docker', icon: FaDocker, color: '#2496ed', level: 55 },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff', level: 82 },
      { name: 'Render', icon: SiRender, color: '#46e3b7', level: 75 },
      { name: 'Netlify', icon: SiNetlify, color: '#00c7b7', level: 80 },
      { name: 'Figma', icon: FaFigma, color: '#f24e1e', level: 70 },
      { name: 'npm', icon: FaNpm, color: '#cb3837', level: 88 },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37', level: 85 },
    ],
  },
];
