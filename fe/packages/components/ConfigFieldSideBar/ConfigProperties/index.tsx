import { CaretDownOutlined, CaretUpFilled } from '@ant-design/icons';
import ConfigCodeBlock from '@packages/components/Config/ConfigCodeBlock';
import { useLanguage } from '@packages/components/LanguageContext';
import { TConfigChange } from '@packages/schema/fields/fieldConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import { getDefaultCalculableFnc, updateAutoRunValue } from '@packages/utils/autoRun';
import { TComponentRender, isSpecialKeyUser, parseConfigFromJsonTree } from '@packages/utils/browseJsonTree';
import {
  buildPathDefaultValue, defineComponent,
} from '@packages/utils/common';
import { getFieldSchemaByKey } from '@packages/utils/fields';
import { observableAutoRun } from '@packages/utils/observable';
import {
  Collapse, CollapseProps, Divider, notification,
} from 'antd';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import _set from 'lodash/set';
import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import ConfigLabel from './ConfigLabel';
import './styles.scss';

interface ConfigPropertiesProps {
  fields: Field[];
  onChange: (field: Field) => void;
  activeConfigFieldKey: string | null,
  onFieldKeyChange?: (value: string) => void,
  fieldName?: string;
}

/**
 * Renders the ConfigProperties component.
 */
const ConfigProperties: React.FC<ConfigPropertiesProps> = ({
  fields,
  onChange,
  activeConfigFieldKey,
  fieldName,
}): React.JSX.Element => {
  // Separate component configs and form item configs for properties categorization
  const [componentConfigs, setComponentConfigs] = useState<TComponentRender[]>([]);
  const [formItemConfigs, setFormItemConfigs] = useState<TComponentRender[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const timeRef:any = useRef<NodeJS.Timeout>(null);
  const { translate } = useLanguage();

  // Component logic
  const fieldSchema = useMemo(() => (
    getFieldSchemaByKey(fields, activeConfigFieldKey)?.field
  ), [fields, activeConfigFieldKey]);

  const handleOk = (newData: Field) => {
    if (activeConfigFieldKey && newData) {
      onChange(new Field(newData));
    }
  };

  const handleUpdateConfigs = (parentIndex: number, childIndex: number, prevConfig: any) => {
    const pathUseCode = `${parentIndex}.content.${childIndex}.useCalculable`;
    const prevUseCode = _get(prevConfig, pathUseCode, false);
    const clone = _set(_cloneDeep(prevConfig), pathUseCode, !prevUseCode);

    return clone;
  };

  // This function will be called when the user clicks on the "Use Code" button
  const handleSetUseCodeForRenderComponent = (
    parentIndex: number,
    childIndex: number,
    configType: 'component' | 'formItem',
  ) => {
    if (activeConfigFieldKey && fieldSchema) {
      const setter = configType === 'component' ? setComponentConfigs : setFormItemConfigs;
      setter((prev) => handleUpdateConfigs(parentIndex, childIndex, prev));
    }
  };

  const handleSetUseCodeInSchema = (path: string) => {
    if (activeConfigFieldKey && fieldSchema) {
      const pathChangeUseCalculable = `${path}.useCalculable`;
      const prevUseCode = _get(fieldSchema, pathChangeUseCalculable, false);
      let changedUseCalculable = _set(
        _cloneDeep(fieldSchema),
        pathChangeUseCalculable,
        !prevUseCode,
      );
      // update changed path to configChanged
      const prevConfigChanged = _get(changedUseCalculable, 'configChanged', {} as TConfigChange);
      prevConfigChanged[pathChangeUseCalculable] = !prevUseCode;
      changedUseCalculable = _set(changedUseCalculable, 'configChanged', prevConfigChanged);
      handleOk(changedUseCalculable);
    }
  };

  useEffect(() => {
    if (
      !_isEmpty(fields)
      && _isString(activeConfigFieldKey)
    ) {
      if (fieldSchema) {
        const {
          componentPropsAllowConfig,
          formItemPropsAllowConfig,
        } = fieldSchema;

        setIsLoading(true);

        Promise.all([
          parseConfigFromJsonTree(componentPropsAllowConfig),
          parseConfigFromJsonTree(formItemPropsAllowConfig),
        ]).then(([componentResults, formItemResults]) => {
          // Handle the results separately
          setComponentConfigs(componentResults);
          setFormItemConfigs(formItemResults);
          setIsLoading(false);
        });
      }
    }
  }, [fieldSchema, activeConfigFieldKey]);

  const handleChange = (value: any, path: string) => {
    // Nếu sửa serverPayloadKey thì bổ sung validate kiểm tra key tồn tại với key đặc biệt hay không
    if (['formItemPropsAllowConfig.serverPayloadKey'].includes(path)) {
      const getExistServerKey = isSpecialKeyUser(value);
      if (getExistServerKey) {
        api.error({
          message: 'Lỗi',
          description: `Key [${value}] đã tồn tại trong hệ thống! Vui lòng sử dụng key khác`,
        });
        return;
      }
    }

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      if (_isString(path) && activeConfigFieldKey) {
        const _fieldSchema = getFieldSchemaByKey(fields, activeConfigFieldKey);

        if (_fieldSchema && path) {
          const pathChangeValue = buildPathDefaultValue(path);

          // update json
          let _newData = _set(_cloneDeep(_fieldSchema.field), pathChangeValue, value);

          // update changed path to configChanged
          const prevConfigChanged = _get(_newData, 'configChanged', {} as TConfigChange);
          prevConfigChanged[pathChangeValue] = value;
          _newData = _set(_newData, 'configChanged', prevConfigChanged);

          handleOk(_newData);
        }
      }
    }, 500);
  };

  const expandIcon = useCallback(({ isActive } : { isActive: boolean }) => (
    isActive ? <CaretUpFilled /> : <CaretDownOutlined />
  ), []);

  const handleSaveCode = (value: string, path: string) => {
    if (activeConfigFieldKey && fieldSchema) {
      const pathChangeUseCalculable = `${path}.useCalculable`;
      const changedUseCalculable = _set(_cloneDeep(fieldSchema), pathChangeUseCalculable, true);

      const pathChangeValue = `${path}.calculateFnc`;

      const _newData = _set(changedUseCalculable, pathChangeValue, value);

      const prevConfigChanged = _get(_newData, 'configChanged', {} as TConfigChange);
      prevConfigChanged[pathChangeValue] = value;
      const __newData = _set(_newData, 'configChanged', prevConfigChanged);

      observableAutoRun.notify([__newData], (jsonProperties: any) => {
        const [fieldCalculate] = updateAutoRunValue([__newData], jsonProperties);
        handleOk(fieldCalculate);
      });
    }
  };

  if (isLoading) return <p key="loading">Loading...</p>;

  /**
 * Renders the configuration set by mapping over each item in the configSet array.
 */
  const renderConfig = (configSet: TComponentRender[], configType: 'component' | 'formItem') => configSet.map(({ content, label }, parentIndex) => (
    <>
      {contextHolder}
      <div className="config-properties-group" key={parentIndex}>
        {content.map(({
          component, props, label: _label, path, useCalculable, calculateFnc,
        }, childIndex) => (
          <div className="each-config" key={childIndex}>
            <ConfigLabel
              label={label}
              onOpenCode={() => {
                handleSetUseCodeForRenderComponent(parentIndex, childIndex, configType);
                handleSetUseCodeInSchema(path);
              }}
              fieldNameOrigin={fieldName}
            />
            {
            useCalculable ? (
              <>
                <p>Code field</p>
                <ConfigCodeBlock
                  defaultValue={calculateFnc || getDefaultCalculableFnc(fields)}
                  onSave={(code) => handleSaveCode(code, path)}
                />
              </>
            ) : (
              <div key={path}>
                {_label}
                {defineComponent(
                  component,
                  {
                    ...props,
                    onChange: (value: any) => handleChange(value, path),
                    onSave: (value: any) => handleChange(value, path),
                    fieldSchema,
                    fields,
                  },
                )}
              </div>
            )
          }
          </div>
        ))}
      </div>
      <Divider />
    </>
  ));

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: translate('component_configuration'),
      children: renderConfig(formItemConfigs, 'formItem'),
    },
    {
      key: '2',
      label: translate('general_configuration'),
      children: renderConfig(componentConfigs, 'component'),
    },
  ];

  return (
    <Collapse
      defaultActiveKey={['1', '2']}
      items={items}
      expandIconPosition="end"
      expandIcon={expandIcon as any}
    />
  );
};

export default ConfigProperties;
