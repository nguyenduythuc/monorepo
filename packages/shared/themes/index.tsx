'use client';
import React, {createContext, ReactNode} from 'react';
import tw, {useDeviceContext, useAppColorScheme} from 'twrnc';
import {ThemeContextProps} from '../types/themeTypes';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

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
