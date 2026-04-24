import { TFormConfigProps } from '@packages/@types';
import NonActiveField from '@packages/components/ConfigFieldSideBar/NonActiveField';
import { useLanguage } from '@packages/components/LanguageContext';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { FormBase } from '../FormBase';

export function FormBuilder({ schema, isModeEditModal, ...rest }: TFormConfigProps) {
  const [form] = useForm();
  const { translate } = useLanguage();

  (window as any).formFields = form.getFieldsValue();

  const nonActiveMessage = {
    title: translate('title_form_builder'),
    description: translate('des1_form_builder'),
    description2: translate('des2_form_builder'),
  };

  if (schema.fields.length === 0) {
    return (
      <NonActiveField message={nonActiveMessage} />
    );
  }

  return (
    <FormBase {...rest} schema={schema} isModeEditModal={isModeEditModal} form={form} />
  );
}
