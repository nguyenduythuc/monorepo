import {resources} from './locales';

export const createIntlInstance = (locale = 'en') => {
  return {
    locale,
    messages: resources[locale as keyof typeof resources],
  };
};

export const languages = Object.keys(resources);
