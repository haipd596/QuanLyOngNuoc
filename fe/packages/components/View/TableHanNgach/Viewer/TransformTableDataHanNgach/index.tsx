import { buildResponseForServerTableHanNgach } from '@packages/components/View/TableGroup/Viewer/constant';
import { useLanguageForIndividual } from '@packages/components/View/TableGroup/Viewer/LanguageSwitcherForIndividuals';
import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useCallback } from 'react';

const TransformTableDataHanNgach = ({ children, onChange, ...rest }: any) => {
  const form = useFormInstance();
  const name = `${rest.id}SpecialHidden`;

  const { translations } = useLanguageForIndividual();

  // const handleChange = (_value: any) => {
  //   onChange(_value);

  //   const translatedDataTableHanNgach = _value.data.map((item: any) => {
  //     return {
  //       ...item,
  //       name: translations[item.name] || item.name,
  //     };
  //   });

  //   form.setFieldValue(
  //     name,
  //     buildResponseForServerTableHanNgach(2, _value.years, translatedDataTableHanNgach),
  //   );
  // };
  const handleChange = useCallback(
    (_value: any) => {
      const translatedDataTableHanNgach = _value.data.map((item: any) => ({
        ...item,
        name: translations[item.name] || item.name,
      }));

      form.setFieldValue(
        name,
        buildResponseForServerTableHanNgach(2, _value.years, translatedDataTableHanNgach),
      );

      onChange(_value);
    },
    [form, name, translations, onChange],
  );

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformTableDataHanNgach;
