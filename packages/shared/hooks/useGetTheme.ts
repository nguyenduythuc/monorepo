import { useContext, useMemo } from "react";
import { ThemeContext } from "../themes";
import { themeStyles } from "../themes/colors";

export const useGetTheme = () => {
  const context = useContext(ThemeContext);

  const theme = useMemo(() => {
    return themeStyles[context?.colorScheme ?? 'light']
  }, [context?.colorScheme])
  
  return {...context, theme};
};
