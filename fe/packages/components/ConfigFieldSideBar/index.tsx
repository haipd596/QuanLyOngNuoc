import React, { useMemo } from 'react';

import { BgColorsOutlined, PicRightOutlined } from '@ant-design/icons';
import { inputIcon } from '@packages/assets/icons';
import { Field } from '@packages/schema/fields/fieldModel';
import { getFieldSchemaByKey } from '@packages/utils/fields';
import { FIELD_NAME_TO_ICON } from '@packages/utils/viewFields';
import { Tabs, TabsProps } from 'antd';
import ConfigProperties from './ConfigProperties';
import HeaderBox from './HeaderBox';
import './styles.scss';

import { useLanguage } from '../LanguageContext';
import StylingProperties from './StylingProperties';

type IProps = {
  activeConfigFieldKey: string | null;
  modeView: string;
  fields: Field[];
  onChange: (newData: Field) => void;
  onFieldKeyChange?: (value: string) => void;
};

const ConfigFieldSideBar: React.FC<IProps> = (props) => {
  const {
    activeConfigFieldKey,
    fields,
    onChange,
    onFieldKeyChange,
  } = props;
  const { translate } = useLanguage();

  // Collect fieldSchema to get the form names & icon for header box
  const fieldSchema = useMemo(() => {
    if (!activeConfigFieldKey) return { fieldName: 'FORM_FIELD', key: translate('Des_Config') };
    return getFieldSchemaByKey(fields, activeConfigFieldKey)?.field ?? { fieldName: 'FORM_FIELD', key: translate('Des_Config') };
  }, [fields, activeConfigFieldKey]);

  const { fieldName, key } = fieldSchema;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: translate('Main'),
      children: (
        <ConfigProperties
          fieldName={fieldName}
          activeConfigFieldKey={activeConfigFieldKey}
          fields={fields}
          onChange={onChange}
          onFieldKeyChange={onFieldKeyChange}
        />
      ),
      icon: <PicRightOutlined />,
    },
    {
      key: '2',
      label: translate('Style'),
      children: <StylingProperties fields={fields} onChange={onChange} />,
      icon: <BgColorsOutlined />,
    },
  ];

  return (
    <div className="config-field" key={activeConfigFieldKey}>
      <div className="config-editor">
        {/* Temporary leave description as null until finding a way to display it */}
        <HeaderBox
          title={fieldName.toLowerCase().replace('_', ' ') ?? 'Form'}
          description={key}
          icon={FIELD_NAME_TO_ICON[fieldName] ?? inputIcon}
        />
        <Tabs
          defaultActiveKey="1"
          items={items}
          centered
          animated={{ inkBar: true, tabPane: true }}
        />
      </div>
    </div>
  );
};

export default ConfigFieldSideBar;
