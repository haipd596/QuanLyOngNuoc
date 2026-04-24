import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import { LANGUAGES_SWITCHER } from './constant';

type Language = 'en' | 'vi';
export type Translations = Record<string, string>;

interface LanguageContextProps {
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  lng?: Language;
  translationsEn: Translations;
  translationsVi: Translations;
}

export const LanguageProviderForIndividual: React.FC<LanguageProviderProps> = ({
  children,
  lng,
  translationsEn,
  translationsVi,
}) => {
  const translations = lng === LANGUAGES_SWITCHER.VI ? translationsVi : translationsEn;

  const value = useMemo(
    () => ({
      lng,
      translations,
    }),
    [translations],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageForIndividual = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
