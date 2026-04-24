import { useLanguage } from '@packages/components/LanguageContext';
import React from 'react';

function ConfigHideIfBlock() {
  const { translate } = useLanguage();

  return (
    <p>{translate('notice_hidelf')}</p>
  );
}

export default ConfigHideIfBlock;
