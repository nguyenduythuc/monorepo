import React, {createContext, useState, useContext, useMemo} from 'react';
import {IntlProvider} from 'use-intl';
import {createIntlInstance} from '@lfvn-customer/shared/i18n';

interface LocaleContextProps {
  locale: 'en' | 'vi';
  setLocale: (locale: 'en' | 'vi') => void;
}

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: 'en',
  setLocale: () => {},
});

const LocaleProvider: React.FC<LocaleProviderProps> = ({children}) => {
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  const intl = createIntlInstance(locale);

  const contextValue = useMemo(
    () => ({locale, setLocale}),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider {...intl}>{children}</IntlProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
export default LocaleProvider;
