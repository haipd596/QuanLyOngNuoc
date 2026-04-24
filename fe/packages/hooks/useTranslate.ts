import { useLanguage } from '../components/LanguageContext';

const useTranslate = () => {
  const { translate } = useLanguage();

  return translate;
};

export default useTranslate;
