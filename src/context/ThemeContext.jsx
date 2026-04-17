import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = ['industrial', 'nordic', 'organic', 'dark', 'cupertino'];

const THEME_META = {
  industrial: { name: 'Industrial', emoji: '🏗️', color: '#E6B325' },
  nordic: { name: 'Nordic', emoji: '❄️', color: '#2D3748' },
  organic: { name: 'Organic', emoji: '🍀', color: '#00FF9D' },
  dark: { name: 'Dark', emoji: '🌙', color: '#818cf8' },
  cupertino: { name: 'Cupertino', emoji: '🍎', color: '#0066CC' },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rk-portfolio-theme');
    return saved && THEMES.includes(saved) ? saved : 'industrial';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rk-portfolio-theme', theme);

    // Dynamic 'RK' Logo Favicon matching Theme color
    const color = THEME_META[theme].color;
    const encodedColor = encodeURIComponent(color);
    const bgColor = theme === 'cupertino' || theme === 'nordic' ? '%23ffffff' : '%23111111';

    const svgFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polygon points="50,2 96,25 96,75 50,98 4,75 4,25" fill="none" stroke="${encodedColor}" stroke-width="4" opacity="0.5"/>
      <circle cx="50" cy="50" r="46" fill="none" stroke="${encodedColor}" stroke-width="2" stroke-dasharray="4 8" opacity="0.8" />
      <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" fill="none" stroke="%23888888" stroke-width="2" opacity="0.4"/>
      <circle cx="50" cy="50" r="32" fill="${bgColor}" />
      <text x="50" y="55" font-family="monospace" font-weight="900" font-size="34" fill="${encodedColor}" text-anchor="middle" dominant-baseline="middle">RK</text>
    </svg>`;
    
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = svgFavicon;
  }, [theme]);

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES, THEME_META }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export { THEMES, THEME_META };
