export type RNColorScheme = 'light' | 'dark' | null | undefined
export interface ThemeContextProps {
  colorScheme: RNColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: RNColorScheme) => void;
}