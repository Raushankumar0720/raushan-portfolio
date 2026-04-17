import { FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa6';

export const achievements = [
  {
    id: 1,
    title: 'Top Performer - Coding Gita',
    organization: 'Coding Gita',
    date: '2024',
    description: 'Recognized as a top-performing student in the Full Stack Development program for consistent excellence in project delivery and technical assessments.',
    icon: FaTrophy,
    category: 'academic',
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    organization: 'GitHub Community',
    date: '2024',
    description: 'Actively contributing to various open-source projects, improving documentation and fixing bugs in popular React libraries.',
    icon: FaStar,
    category: 'community',
  },
  {
    id: 3,
    title: '100 Days of Code Challenge',
    organization: 'Self-Initiated',
    date: '2023',
    description: 'Successfully completed the 100 Days of Code challenge, building 15+ mini-projects and documenting the learning journey daily.',
    icon: FaMedal,
    category: 'milestone',
  },
  {
    id: 4,
    title: 'Elite Coder Rank',
    organization: 'LeetCode',
    date: '2024',
    description: 'Achieved a significant milestone on LeetCode by solving 200+ problems with a focus on data structures and algorithms.',
    icon: FaAward,
    category: 'skill',
  },
];
