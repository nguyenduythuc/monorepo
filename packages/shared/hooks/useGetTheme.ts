import {useContext, useMemo} from 'react';
import {ThemeContext} from '../themes';
import themeTokens, {themeStyles} from '../themes/colors';

export const useGetTheme = () => {
  const context = useContext(ThemeContext);

  const colors = useMemo(() => {
    return themeTokens[context?.colorScheme ?? 'light'];
  }, [context?.colorScheme]);

  const theme = useMemo(() => {
    return themeStyles[context?.colorScheme ?? 'light'];
  }, [context?.colorScheme]);

  return {...context, colors, theme};
};
