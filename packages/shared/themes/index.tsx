'use client';
import React, {createContext, useContext, ReactNode} from 'react';
import tw, {useDeviceContext, useAppColorScheme} from 'twrnc';
import {ThemeContextProps} from '../types/themeTypes';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: 'light',
  });

  const [colorScheme, toggleTheme, setColorScheme] = useAppColorScheme(tw);

  const contextValue = React.useMemo(
    (): ThemeContextProps => ({colorScheme, toggleTheme, setColorScheme}),
    [colorScheme],
  );

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
