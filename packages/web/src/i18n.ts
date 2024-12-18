import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'vi'];

export default getRequestConfig(async ({ locale }) => {
  let currentLocale = locale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(currentLocale as any)) {
    currentLocale = 'vi';
  }

  return {
    currentLocale,
    messages: (
      await import(`@lfvn-customer/shared/i18n/locales/${currentLocale}.json`)
    ).default,
  };
});
