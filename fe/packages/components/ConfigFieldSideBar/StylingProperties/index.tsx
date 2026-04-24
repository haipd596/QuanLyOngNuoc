import { CaretDownOutlined, CaretUpFilled } from '@ant-design/icons';
import ConfigCodeBlock from '@packages/components/Config/ConfigCodeBlock';
import { useLanguage } from '@packages/components/LanguageContext';
import { usePrevious } from '@packages/hooks';
import { TConfigChange } from '@packages/schema/fields/fieldConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import { getDefaultCalculableFnc, updateAutoRunValue } from '@packages/utils/autoRun';
import { TComponentRender, parseConfigFromJsonTree } from '@packages/utils/browseJsonTree';
import {
  buildPathDefaultValue, defineComponent,
} from '@packages/utils/common';
import { getFieldSchemaByKey } from '@packages/utils/fields';
import { observableAutoRun } from '@packages/utils/observable';
import { Collapse, CollapseProps, Divider } from 'antd';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import _set from 'lodash/set';
import React, {
  FC, useCallback, useEffect, useMemo, useRef,
} from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveConfigFieldKey } from '~/redux/slices';
import ConfigLabel from '../ConfigProperties/ConfigLabel';
import './styles.scss';

interface StylingPropertiesProps {
  fields: Field[];
  onChange: (field: Field) => void;
}

const StylingProperties: FC<StylingPropertiesProps> = ({ fields, onChange }) => {
  const expandIcon = useCallback(({ isActive } : { isActive: boolean }) => (
    isActive ? <CaretUpFilled /> : <CaretDownOutlined />
  ), []);

  // States
  const [componentStyleConfigs, setComponentStyleConfigs] = React.useState<TComponentRender[]>([]);
  const [wrapperStyleConfigs, setWrapperStyleConfigs] = React.useState<TComponentRender[]>([]);
  const [labelStyleConfigs, setLabelStyleConfigs] = React.useState<TComponentRender[]>([]);

  const activeConfigFieldKey = useAppSelector(selectActiveConfigFieldKey);
  const prevActiveKey = usePrevious(activeConfigFieldKey);
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

  const handleSetUseCodeForRenderComponent = (
    parentIndex: number,
    childIndex: number,
    configType: 'component' | 'wrapper' | 'label',
  ) => {
    if (activeConfigFieldKey && fieldSchema) {
      let setter: any;
      switch (configType) {
        case 'component':
          setter = setComponentStyleConfigs;
          break;
        case 'wrapper':
          setter = setWrapperStyleConfigs;
          break;
        default:
          setter = setLabelStyleConfigs;
          break;
      }
      setter((prev : any) => handleUpdateConfigs(parentIndex, childIndex, prev));
    }
  };

  const handleSetUseCodeInSchema = (path: string) => {
    if (activeConfigFieldKey && fieldSchema) {
      const pathChangeUseCalculable = `${path}.useCalculable`;
      const prevUseCode = _get(fieldSchema, pathChangeUseCalculable, false);
      const changedUseCalculable = _set(
        _cloneDeep(fieldSchema),
        pathChangeUseCalculable,
        !prevUseCode,
      );
      handleOk(changedUseCalculable);
    }
  };

  const handleSaveCode = (code: string, path: string) => {
    if (activeConfigFieldKey && fieldSchema) {
      const pathChangeUseCalculable = `${path}.useCalculable`;
      const changedUseCalculable = _set(_cloneDeep(fieldSchema), pathChangeUseCalculable, true);

      const pathChangeValue = `${path}.calculateFnc`;

      const _newData = _set(changedUseCalculable, pathChangeValue, code);

      observableAutoRun.notify([_newData], (jsonProperties: any) => {
        const [fieldCalculate] = updateAutoRunValue([_newData], jsonProperties);
        handleOk(fieldCalculate);
      });
    }
  };

  // useEffect to parse configs
  useEffect(() => {
    if (
      !_isEmpty(fields)
      && _isString(activeConfigFieldKey)
      && activeConfigFieldKey !== prevActiveKey
    ) {
      if (fieldSchema) {
        const {
          styleComponentAllowConfig,
          styleWrapperAllowConfig,
          styleLabelAllowConfig,
        } = fieldSchema;

        Promise.all([
          parseConfigFromJsonTree(styleComponentAllowConfig),
          parseConfigFromJsonTree(styleWrapperAllowConfig),
          parseConfigFromJsonTree(styleLabelAllowConfig),
        ]).then(([componentStyles, wrapperStyles, labelStyles]) => {
          // Handle the results separately
          setComponentStyleConfigs(componentStyles);
          setWrapperStyleConfigs(wrapperStyles);
          setLabelStyleConfigs(labelStyles);
        });
      }
    }
  }, [fieldSchema, prevActiveKey]);

  const handleChange = (value: any, path: string) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      if (_isString(path) && activeConfigFieldKey) {
        const _fieldSchema = getFieldSchemaByKey(fields, activeConfigFieldKey);

        if (_fieldSchema && path) {
          const pathChangeValue = buildPathDefaultValue(path);
          const _newData = _set(_cloneDeep(_fieldSchema.field), pathChangeValue, value);

          const prevConfigChanged = _get(_newData, 'configChanged', {} as TConfigChange);
          prevConfigChanged[pathChangeValue] = value;

          handleOk(_newData);
        }
      }
    }, 500);
  };

  const renderConfig = (configSet: TComponentRender[], configType: 'label' | 'component' | 'wrapper') => configSet.map(({ content, label }, parentIndex) => (
    <div className="config-properties-group" key={parentIndex}>
      {content.map(({
        component, props, label: _label, path, useCalculable, calculateFnc,
      }, childIndex) => (
        <div className="each-config">
          <ConfigLabel
            key={childIndex}
            label={label}
            onOpenCode={() => {
              handleSetUseCodeForRenderComponent(parentIndex, childIndex, configType);
              handleSetUseCodeInSchema(path);
            }}
          />
          {
            useCalculable ? (
              <>
                <p>Code field</p>
                <ConfigCodeBlock
                  value={calculateFnc || getDefaultCalculableFnc(fields)}
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
                  },
                )}
              </div>
            )
          }
          <Divider style={{ margin: '8px 0' }} />
        </div>
      ))}
    </div>
  ));

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: translate('Component'),
      children: renderConfig(componentStyleConfigs, 'component'),
    },
    {
      key: '2',
      label: translate('Wrapper'),
      children: renderConfig(wrapperStyleConfigs, 'wrapper'),
    },
    {
      key: '3',
      label: translate('Label'),
      children: renderConfig(labelStyleConfigs, 'label'),
    },
  ].filter((item) => item.children.length > 0);

  return (
    <div className="styling-properties">
      <Collapse
        defaultActiveKey={['2', '3']}
        items={items}
        expandIconPosition="right"
        expandIcon={expandIcon as any}
      />
    </div>
  );
};

export default StylingProperties;
