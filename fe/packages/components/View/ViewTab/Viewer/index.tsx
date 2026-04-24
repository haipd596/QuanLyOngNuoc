import { Form, Tabs } from 'antd';
import {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';

import { FORM_CONFIG } from '@packages/constants/commons';
import { useFetchBaseLogin } from '@packages/hooks';
import { Field } from '@packages/main/Forms';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { formManagers } from '@packages/utils/formManager';
import { AnyObject } from 'antd/es/_util/type';
import { useForm } from 'antd/es/form/Form';
import { FormInstance } from 'antd/lib';
import _ from 'lodash';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { dynamicMerge } from '../../ViewSelect/recursiveGetData';
import TabTitle from '../TabTitle';
import '../index.scss';
import { TFormTabProps } from '../type.tab';

const FormTabViewer = (props: TFormTabProps) => {
  const {
    fieldsInColumnIndex, fields, items, value, layout, labelCol,
    onChange, modeView, fieldKey, name, ...rest
  } = props;
  const { typeUser } = useFetchBaseLogin();
  // const timerRef = useRef<any>();

  const isKeyTabNeedCheck = name === KEY_OVERRIDE.TAB_DOI_TUONG_DE_NGHI;

  const [activeStep, setActiveStep] = useState(0);
  const ref:any = useRef<FormInstance>(null);
  const isFirstRenderRef = useRef(true);
  const [form] = useForm();
  const [tabValues, setTabValues] = useState(items.reduce((acc, _cur, index) => {
    (acc as any)[index] = value;
    return acc;
  }, {}));
  // const [count, setCount] = useState(0);
  const isDualLanguageTab = items.length === 2 && _.some((item: any) => item.label.includes('Vietnamese') || item.label.includes('English'));

  const flattenTabValues = (_value: any) => {
    return Object.values(_value).reduce((acc: any, cur) => {
      if (_.isObject(cur)) {
        // acc = { ...acc, ...cur };
        acc = dynamicMerge(acc, cur);
      }
      return acc;
    }, {});
  };

  // useEffect(() => {
  //   if (count > 0) {
  //     if (isDualLanguageTab) {
  //       onChange((tabValues as any)[activeStep]);
  //     } else {
  //       onChange(
  //         flattenTabValues(tabValues),
  //       );
  //     }
  //   }
  // }, [count]);

  // const handleChange = (allValuesChange: any) => {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }

  //   timerRef.current = setTimeout(() => {
  //     setTabValues(() => ({
  //       [activeStep]: allValuesChange,
  //     }));
  //     setCount((_prev) => {
  //       return _prev + 1;
  //     });
  //   }, 100);
  // };

  useEffect(() => {
    if (_.isEmpty(tabValues)) return;

    const submitValue = isDualLanguageTab
      ? (tabValues as any)[activeStep]
      : flattenTabValues(tabValues);

    onChange(submitValue);
  }, [tabValues, activeStep, isDualLanguageTab]);

  const handleChange = useCallback(
    _.debounce(() => {
      const currentValues = form.getFieldsValue();
      setTabValues(() => ({
        [activeStep]: currentValues,
      }));
      onChange(isDualLanguageTab ? currentValues : flattenTabValues({
        ...tabValues,
        [activeStep]: currentValues,
      }));
    }, 150),
    [activeStep, tabValues],
  );

  const { stylesPropsParseFromJsonTree } = props;
  const transitionStyle = { transition: 'all 0.2s ease-in-out' };

  const {
    stepButtonColor,
    stepButtonTextColor,
    progressBar: strokeColor,
    trailColor,
    height,
    underlineTabColor,
    hideLabel,
    hideIcon,
    ...restStyle
  } = stylesPropsParseFromJsonTree;

  useEffect(() => {
    if (isKeyTabNeedCheck && typeUser.isPerson) {
      setActiveStep(0);
    } else if (isKeyTabNeedCheck && typeUser.isOrganization) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [isKeyTabNeedCheck, typeUser.isOrganization, typeUser.isPerson]);

  useEffect(() => {
    return () => {
      formManagers.remove(fieldKey);
    };
  }, []);

  const fieldContainer = useMemo(() => (
    getFieldsByColumnIndex(fields, fieldsInColumnIndex)
  ), [fields, fieldsInColumnIndex]);

  const getTabContent = (indexField: any) => {
    return fieldContainer.filter(({ columnIndex }: any) => columnIndex === indexField);
  };

  // init form data from props outside
  useEffect(() => {
    if (fields.length > 0) {
      if (isFirstRenderRef.current) {
        let fieldValues = form.getFieldsValue();

        if (!_isEmpty(value)) {
          fieldValues = value;
        } else {
          fieldValues = fields.reduce((acc, cur) => {
            if (Field.isFormField(cur.fieldName)) {
              const serverPayloadKey = _get(cur, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue');
              acc[serverPayloadKey] = _get(cur, 'formItemPropsAllowConfig.initFieldData.props.defaultValue');
            }
            return acc;
          }, {} as AnyObject);
        }

        form.setFieldsValue(fieldValues);
        onChange(fieldValues);
        isFirstRenderRef.current = false;
      }
    }
  }, [value, fields.length]);

  const itemFields = items?.map(({ columnReferenceType, ...item }: any, index) => {
    let isDisabled = false;
    if (isKeyTabNeedCheck) {
      if (typeUser.isPerson && index === 1) {
        isDisabled = true;
      } else if (typeUser.isOrganization && index === 0) {
        isDisabled = true;
      }
    }
    return {
      ...item,
      key: String(index),
      label: (
        <TabTitle
          index={index}
          label={item.label}
          stepOrderStyle={{
            backgroundColor: stepButtonColor,
            color: stepButtonTextColor,
            ...transitionStyle,
            ...restStyle,
          }}
        />
      ),
      forceRender: true,
      children: (
        <>
          {getTabContent(index).map((field, fieldIndex) => {
            if (field) {
            // eslint-disable-next-line @typescript-eslint/no-shadow
              const { columnIndex, ...item } = field;

              return (
                <FieldItem
                  {...rest}
                  field={item as Field<any>}
                  fieldIndex={fieldIndex}
                  modeView={modeView}
                  key={field?.key}
                  fields={fields}
                  listKeyValueInViewInfo={field.listKeyValueInViewInfo ?? []}
                />
              );
            }
            return null;
          })}
        </>
      ),
      disabled: isDisabled,
    };
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--active-indicator-color', underlineTabColor);
  }, [stylesPropsParseFromJsonTree]);

  return (
    <div id={fieldKey}>
      <Form
        form={form}
        initialValues={(
          isDualLanguageTab
            ? _.get(tabValues, activeStep)
            : flattenTabValues(tabValues) as any
        )}
        onValuesChange={() => handleChange()}
        {...FORM_CONFIG}
        ref={(node: any) => {
          if (node) {
            formManagers.add({
              [fieldKey]: node,
            });
            ref.current = node;
          }
        }}
      >
        <Tabs
          {...rest}
          className="wrapper-tab"
          moreIcon={<span />}
          activeKey={String(activeStep)}
          onChange={(_active) => setActiveStep(Number(_active))}
          items={itemFields}
          centered
        />
      </Form>
    </div>
  );
};

export default FormTabViewer;
