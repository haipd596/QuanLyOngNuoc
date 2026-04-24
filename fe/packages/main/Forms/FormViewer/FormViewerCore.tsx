import { TFormConfigProps, TJsonProperties } from '@packages/@types';
import { Field } from '@packages/schema/fields/fieldModel';
import { autoRun } from '@packages/utils/autoRun';
import { observableAutoRun } from '@packages/utils/observable';
import { AnyObject } from 'antd/es/_util/type';
import { useForm } from 'antd/es/form/Form';
import { FormInstance, FormProps } from 'antd/lib';
// import _debounce from 'lodash/debounce';
import { COLUMN_REFERENCES, FE_KEY } from '@packages/constants/commons';
import { buildDisplayForHiddenField } from '@packages/utils';
import { SPECIFIC_HIDDEN_KEYS } from '@packages/utils/common';
import { HIDDEN_FIELDS } from '@packages/utils/hiddenFields';
import { Form } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import React, {
  useEffect, useRef, useState,
} from 'react';
import ThemeProvider from '~/components/ThemeProvider';
import { FORM_SUBCRIBE_AUTORUN } from '~/constants';
import { FormBase } from '../FormBase';

export type FormViewerCoreProps = {
  formData?: any;
  onAutoRun?: (jsonProperties: TJsonProperties[]) => void,
  ref?: any,
  onMount?: (form: FormInstance) => void,
  onSchemaChange?: (schema: any) => void,
  onInitValueByInitialField?: (fields: any) => void
  onFormWatchChange?: (watchedValues: any) => void;
} & TFormConfigProps & FormProps;

export const FormViewerCore = React.forwardRef((
  {
    schema, formData, modeView, onFieldsRender,
    onAutoRun, onMount, onInitValueByInitialField, onFormWatchChange, ...rest
  }: FormViewerCoreProps,
  ref: React.LegacyRef<FormInstance<any>>,
) => {
  const { fields } = schema;
  const isFirstRenderRef = useRef(true);

  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(true);

  // Theo dõi các trường trong modal table
  const watchedValues = Form.useWatch([], form);
  useEffect(() => {
    if (onFormWatchChange && watchedValues) {
      onFormWatchChange(watchedValues);
    }
  }, [watchedValues, onFormWatchChange]);
  // const handleValuesChange: FormProps['onValuesChange'] = _debounce((_test, values) => {
  //   const { jsonProperties } = autoRun(fields, values);
  //   if (onAutoRun) {
  //     onAutoRun(jsonProperties);
  //   }
  // }, 200);

  // apply the code to field
  useEffect(() => {
    const handleAutoRun = (fieldsChanged: Field[], cb: any) => {
      const { jsonProperties } = autoRun(fieldsChanged, form.getFieldsValue());

      cb(jsonProperties);
    };

    observableAutoRun.subscribe(FORM_SUBCRIBE_AUTORUN, handleAutoRun);

    return () => {
      observableAutoRun.unsubscribe(FORM_SUBCRIBE_AUTORUN);
    };
  }, []);

  // init form data from props outside
  useEffect(() => {
    if (fields.length > 0) {
      if (isFirstRenderRef.current) {
        let fieldValues = form.getFieldsValue();

        if (formData?.[FE_KEY]) {
          delete formData[FE_KEY];
        }

        if (formData?.[COLUMN_REFERENCES]) {
          delete formData[COLUMN_REFERENCES];
        }

        if (!_isEmpty(formData)) {
          fieldValues = { ...formData };
          const hasSpecificKeys = SPECIFIC_HIDDEN_KEYS.some((key) => key in formData);
          if (hasSpecificKeys) {
            fields.forEach((cur) => {
              if (Field.isFormField(cur.fieldName)) {
                const serverPayloadKey = _get(cur, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue');
                const initValue = _get(cur, 'formItemPropsAllowConfig.initFieldData.props.defaultValue');

                if (HIDDEN_FIELDS[cur.fieldName]) {
                  fieldValues[buildDisplayForHiddenField(serverPayloadKey)] = initValue;
                }

                // Overide init value for SPECIFIC_HIDDEN_KEYS
                if (SPECIFIC_HIDDEN_KEYS.includes(serverPayloadKey)) {
                  fieldValues[serverPayloadKey] = initValue;
                }
              }
            });
          }
        } else {
          fieldValues = fields.reduce((acc, cur) => {
            if (Field.isFormField(cur.fieldName)) {
              const serverPayloadKey = _get(cur, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue');
              if (HIDDEN_FIELDS[cur.fieldName]) {
                acc[buildDisplayForHiddenField(serverPayloadKey)] = _get(cur, 'formItemPropsAllowConfig.initFieldData.props.defaultValue');
              }
              acc[serverPayloadKey] = _get(cur, 'formItemPropsAllowConfig.initFieldData.props.defaultValue');
            }
            return acc;
          }, {} as AnyObject);
        }

        const { jsonProperties } = autoRun(fields, fieldValues);

        if (onAutoRun) {
          onAutoRun(jsonProperties);
        }

        isFirstRenderRef.current = false;

        // if init data re-calculate
        const valueFromAuto = jsonProperties.reduce((acc, cur) => {
          if (cur.path.includes('initFieldData')) {
            if (_isEmpty(formData?.[cur.serverPayloadKey])) {
              acc[cur.serverPayloadKey] = cur.value;
            }
          }
          return acc;
        }, {} as AnyObject);

        fieldValues = { ...fieldValues, ...valueFromAuto };
        
        if (!_isEmpty(fieldValues)) {
          form.setFieldsValue(fieldValues);
          if (onInitValueByInitialField) {
            onInitValueByInitialField(fieldValues);
          }
          if (isLoading) {
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
          }
        }
      }
    }
  }, [formData, fields.length, onFieldsRender, onInitValueByInitialField]);

  // Fix lỗi lần đầu render không set được data vào form
  useEffect(() => {
    if (!_isEmpty(formData)) {
      const timer = setTimeout(() => {
        form.setFieldsValue(formData);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [formData, form]);
  return (
    <ThemeProvider>
      <FormBase
        {...rest}
        form={form}
        // onValuesChange={handleValuesChange}
        schema={schema}
        modeView={modeView}
        onFieldsRender={isLoading ? undefined : onFieldsRender}
        ref={ref}
      />
    </ThemeProvider>
  );
});
