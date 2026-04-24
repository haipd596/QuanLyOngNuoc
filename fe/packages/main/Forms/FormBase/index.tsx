import { TFormConfigProps } from '@packages/@types';
import { FORM_CONFIG } from '@packages/constants/commons';
import { removeCaptchaFields } from '@packages/utils/fields';
import {
  Form, FormInstance, Row,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormProps } from 'antd/lib';
import clsx from 'clsx';
import React from 'react';
import ThemeProvider from '~/components/ThemeProvider';
import FieldItem from './FieldItem';
import './styles.scss';

type TProps = TFormConfigProps & FormProps;

export const FormBase = React.forwardRef((
  {
    schema, modeView, form, isModeEditModal, onFieldsRender, onFinish, onClickActionField, ...rest
  }: TProps,
  ref: React.LegacyRef<FormInstance<any>>,
) => {
  const { fields } = schema;
  // Delete captcha before submit data
  const handleFinish = (values: any) => {
    // Remove CAPTCHA fields from values
    const cleanedValues = removeCaptchaFields({ ...values });
    console.info('submit success', cleanedValues);
    if (onFinish) {
      onFinish(cleanedValues);
    }
  };

  return (
    <ThemeProvider>
      <Form
        layout="horizontal"
        onFinishFailed={(error) => console.info('submit failed', error)}
        form={form}
        ref={ref}
        className={clsx('form-viewer', 'theme-dvc')}
        {...rest}
        onFinish={handleFinish}
        {...FORM_CONFIG}
      >
        {
          (form && onFieldsRender) && (
            <Form.Item shouldUpdate style={{ display: 'none' }}>
              {() => {
                if (form && onFieldsRender) {
                  const itemFieldsValue: AnyObject = form.getFieldsValue();

                  // Remove CAPTCHA fields from itemFieldsValue
                  const cleanedFieldsValue = removeCaptchaFields(itemFieldsValue);

                  return (
                    <pre>
                      {onFieldsRender(cleanedFieldsValue)}
                    </pre>
                  );
                }
              }}
            </Form.Item>
          )
        }
        <Row justify="start" gutter={[20, 0]}>
          {fields
            .map((field, index) => {
              if (!field) return null;
              if (!field.isShowField) {
                return null;
              }
              return (
                <FieldItem
                  field={field}
                  fieldIndex={index}
                  modeView={modeView}
                  isModeEditModal={isModeEditModal}
                  key={field.key}
                  listKeyValueInViewInfo={field.listKeyValueInViewInfo}
                  fields={fields}
                  onClickActionField={onClickActionField}
                />
              );
            })}
        </Row>
      </Form>
    </ThemeProvider>
  );
});
