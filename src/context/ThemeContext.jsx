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

    // Update Favicon dynamically using the theme emoji
    const emoji = THEME_META[theme].emoji;
    const svgFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
    
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
