import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import en from '../../locales/en/translation.json';
import vi from '../../locales/vi/translation.json';

type Language = 'en' | 'vi';
export type Translations = typeof en | typeof vi;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: keyof Translations) => string;
  translateVNese: (key: keyof Translations) => string;
  translateEN: (key: keyof Translations) => string;
}

const languages: Record<Language, Translations> = {
  en,
  vi,
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');

    // Get language from localStorage or defauvalue is vi
    return (savedLanguage as Language) || 'vi';
  });

  useEffect(() => {
    // Saved language into localStorage when switcher between languages
    localStorage.setItem('language', language);
  }, [language]);

  const translate = (key: keyof Translations): string => languages[language][key] || key;

  const translateVNese = (key: keyof Translations): string => vi[key] || key;
  const translateEN = (key: keyof Translations): string => en[key] || key;

  const value = useMemo(() => ({
    language,
    setLanguage,
    translate,
    translateVNese,
    translateEN,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
