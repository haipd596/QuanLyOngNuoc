import { Select, SelectProps } from 'antd';
import React, { useMemo } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectSchemas } from '~/redux/slices';
import { useLanguage } from '../LanguageContext';
import './styles.scss';

type TFooterProps = {
  onChange: (schemaKey: string) => void,
  schemaKey?: string
} & SelectProps;

function SelectSchema({ schemaKey, onChange, ...rest }: TFooterProps) {
  const schemas = useAppSelector(selectSchemas);
  const items = useMemo(() => schemas.map(({ schemaKey: _schemaKey, title }) => ({
    value: _schemaKey,
    label: title,
  })), [schemas]);

  const handleChange = (_formKey: string) => {
    onChange(_formKey);
  };

  // Filter Option for search
  const filterOption: SelectProps['filterOption'] = (input, option) => {
    if (typeof option?.label === 'string') {
      return (option?.label || '').toLowerCase().includes(input.toLowerCase());
    }

    return false;
  };

  const { translate } = useLanguage();

  return (
    <Select
      showSearch
      placeholder={`${schemas.length > 0 ? `${translate('last_form')}: "${schemas[0].title}"` : 'No existing form, please create one'}`}
      className="select-schemas"
      value={schemaKey || undefined}
      options={items}
      onChange={handleChange}
      filterOption={filterOption}
      {...rest}
    />
  );
}

export default SelectSchema;
