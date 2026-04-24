import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect } from 'react';
import { SUBSTANCE_FIELD_NAME } from '../options';

const TransformCheckboxData = ({ children, onChange, ...rest }: any) => {
  const form = useFormInstance();
  const name = `${rest.id}Hidden`;

  const customizeOutput = (newSubstances: string[]) => {
    const output: Record<string, boolean> = {};

    Object.values(SUBSTANCE_FIELD_NAME).forEach((fieldName) => {
      output[fieldName] = false;
    });

    newSubstances.forEach((results) => {
      if (results in output) {
        output[results] = true;
      }
    });

    return output;
  };

  const handleChange = (_value: any) => {
    const updatedSubstances = _value;
    const customizedSubstances = customizeOutput(updatedSubstances);

    onChange(_value);

    form.setFieldValue(name, customizedSubstances);
  };

  useEffect(() => {
    const defaultValues = customizeOutput([]);
    form.setFieldValue(name, defaultValues);
  }, [form, name]);

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformCheckboxData;
