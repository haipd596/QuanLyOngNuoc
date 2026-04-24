import { Select } from 'antd';
import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'vi' | 'en');
  };

  return (
    <div className="select_language" style={{ display: 'flex', justifyContent: 'end', marginBottom: 10 }}>
      <Select
        defaultValue={language}
        style={{ width: 82, height: 30 }}
        onChange={handleLanguageChange}
        options={[
          { value: 'vi', label: <img src="https://cdn.parcellab.com/img/flags/vn.png" alt="language-switching icon" /> },
          { value: 'en', label: <img src="https://cdn.parcellab.com/img/flags/gb.png" alt="language-switching icon" /> },
        ]}
      />
    </div>
  );
};

export default LanguageSwitcher;
