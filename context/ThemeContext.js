import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// Rosé Pine color palettes
export const lightTheme = {
  background: '#faf4ed',
  surface: '#fffaf3',
  text: '#575279',
  textSecondary: '#797593',
  accent: '#907aa9',
  accentLight: '#dfdad9',
  error: '#b4637a',
  success: '#56949f',
  warning: '#ea9d34',
  border: '#e5e2e0',
  card: '#ffffff',
  tabBar: '#ffffff',
  tabBarActive: '#907aa9',
  tabBarInactive: '#a5a3a0',
};

export const darkTheme = {
  background: '#191724',
  surface: '#1f1d2e',
  text: '#e0def4',
  textSecondary: '#908caa',
  accent: '#c4a7e7',
  accentLight: '#2a273f',
  error: '#eb6f92',
  success: '#9ccfd8',
  warning: '#f6c177',
  border: '#26233a',
  card: '#26233a',
  tabBar: '#1f1d2e',
  tabBarActive: '#c4a7e7',
  tabBarInactive: '#6e6a86',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme');
      if (saved !== null) {
        setIsDark(saved === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);