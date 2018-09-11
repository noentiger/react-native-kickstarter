import english from './en';
import italian from './it';

export const DEFAULT_LOCALE = 'en';

export const Translations = {
  en: {
    name: 'English',
    translations: english,
  },
  it: {
    name: 'Italian',
    translations: italian,
  },
};

export function getLanguageNameByLocale(locale = DEFAULT_LOCALE) {
  return Translations[locale].name;
}

export function translate(message, locale = DEFAULT_LOCALE) {
  // We're actually asking for 'something' to be translated
  if (message) {
    // The translation exists AND the message exists in this translation
    if (Translations[locale].translations && Translations[locale].translations[message]) {
      return Translations[locale].translations[message];
    }

    // Otherwise try in the default translation
    if (Translations[DEFAULT_LOCALE] && Translations[DEFAULT_LOCALE].translations[message]) {
      return Translations[DEFAULT_LOCALE].translations[message];
    }
  }

  return '???';
}
