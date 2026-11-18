import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightColors, DarkColors } from '../constants/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@DevRoadmap:theme');
      if (savedTheme) setTheme(savedTheme);
    } catch (e) {
      console.log('Error loading theme:', e);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('@DevRoadmap:theme', newTheme);
    } catch (e) {
      console.log('Error saving theme:', e);
    }
  };

  const colors = theme === 'light' ? LightColors : DarkColors;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default useTheme;
