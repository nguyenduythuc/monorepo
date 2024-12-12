import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'vi'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    locale = 'vi';
  }

  return {
    locale,
    messages: (
      await import(`@lfvn-customer/shared/i18n/locales/${locale}.json`)
    ).default,
  };
});
