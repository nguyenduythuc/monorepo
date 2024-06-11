"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { ColorSchemeName } from 'react-native';

interface ThemeContextProps {
  colorScheme: ColorSchemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light")
  };

  if (colorScheme)
    NativeWindStyleSheet.setColorScheme(colorScheme);

  const contextValue = React.useMemo(() => ({ colorScheme, toggleTheme }), [colorScheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
