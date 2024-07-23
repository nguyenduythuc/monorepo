export type RNColorScheme = 'light' | 'dark' | null | undefined;
export interface ThemeContextProps {
  colorScheme: RNColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: RNColorScheme) => void;
}

export interface ColorProps {
  light: {
    'negative-100': string;
    'negative-200': string;
    'negative-300': string;
    'negative-400': string;
    'negative-500': string;
    'useful-100': string;
    'useful-200': string;
    'useful-300': string;
    'useful-400': string;
    'useful-500': string;
    'positive-100': string;
    'positive-200': string;
    'positive-300': string;
    'positive-400': string;
    'positive-500': string;
    'careful-100': string;
    'careful-200': string;
    'careful-300': string;
    'careful-400': string;
    'careful-500': string;
    'danger-100': string;
    'danger-200': string;
    'danger-300': string;
    'danger-400': string;
    'danger-500': string;
  };
  dark: {
    'negative-100': string;
    'negative-200': string;
    'negative-300': string;
    'negative-400': string;
    'negative-500': string;
    'useful-100': string;
    'useful-200': string;
    'useful-300': string;
    'useful-400': string;
    'useful-500': string;
    'positive-100': string;
    'positive-200': string;
    'positive-300': string;
    'positive-400': string;
    'positive-500': string;
    'careful-100': string;
    'careful-200': string;
    'careful-300': string;
    'careful-400': string;
    'careful-500': string;
    'danger-100': string;
    'danger-200': string;
    'danger-300': string;
    'danger-400': string;
    'danger-500': string;
  };
}
