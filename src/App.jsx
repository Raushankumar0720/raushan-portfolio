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
          <title>Raushan Kumar | Full Stack Developer</title>
          <meta name="description" content="Raushan Kumar — Full Stack Developer from Ahmedabad, India. Building performant, elegant web apps with React, Node.js, and MongoDB. Open to work." />
          <meta name="keywords" content="Raushan Kumar, Full Stack Developer, React, Node.js, MongoDB, Portfolio, Ahmedabad, India, MERN Stack" />
          <meta name="author" content="Raushan Kumar" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Raushan Kumar | Full Stack Developer" />
          <meta property="og:description" content="Full Stack Developer from Ahmedabad, India. Building performant, elegant web apps." />
          <meta property="og:url" content="https://raushankumar-dev.vercel.app" />
          <meta property="og:site_name" content="Raushan Kumar Portfolio" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Raushan Kumar | Full Stack Developer" />
          <meta name="twitter:description" content="Full Stack Developer from Ahmedabad, India. Building performant, elegant web apps." />
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
