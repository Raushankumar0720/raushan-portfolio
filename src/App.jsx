import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import FigmaDesigns from './components/sections/FigmaDesigns';
import Certificates from './components/sections/Certificates';
import Hackathons from './components/sections/Hackathons';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

import './styles/themes.css';
import './styles/animations.css';
import './styles/responsive.css';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Raushan Kumar — Full Stack Developer | React, Node.js, MERN Stack Portfolio</title>
          <meta name="description" content="Raushan Kumar is a Full Stack Developer from Ahmedabad, India specializing in React, Node.js, MongoDB, and the MERN stack. Explore live projects, hackathon wins, and professional experience." />
          <meta name="keywords" content="Raushan Kumar, Full Stack Developer, React Developer, Node.js Developer, MERN Stack, Frontend Engineer, Ahmedabad Developer, India, Portfolio, Web Developer" />
          <meta name="author" content="Raushan Kumar" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Raushan Kumar — Full Stack Developer | React & MERN Stack Portfolio" />
          <meta property="og:description" content="Full Stack Developer from Ahmedabad, India. Building performant, elegant web apps with React, Node.js, and MongoDB. View live projects and hackathon case studies." />
          <meta property="og:url" content="https://raushankumar-dev.vercel.app" />
          <meta property="og:image" content="https://raushankumar-dev.vercel.app/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Raushan Kumar Portfolio" />
          <meta property="og:locale" content="en_IN" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Raushan Kumar — Full Stack Developer | React & MERN Stack Portfolio" />
          <meta name="twitter:description" content="Full Stack Developer from Ahmedabad, India. Building performant, elegant web apps with React, Node.js, and MongoDB." />
          <meta name="twitter:image" content="https://raushankumar-dev.vercel.app/og-image.png" />
          <meta name="twitter:creator" content="@RaushanKum68222" />

          {/* Canonical */}
          <link rel="canonical" href="https://raushankumar-dev.vercel.app" />
        </Helmet>

        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <FigmaDesigns />
          <Certificates />
          <Hackathons />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
}
